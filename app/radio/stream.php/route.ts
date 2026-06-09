import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity.client'; // 👈 Pastikan path import client Sanity kamu sudah benar ya, Fal!

// Memaksa Vercel agar API ini selalu dinamis (Server-Side Rendering) 
// dan tidak dibekukan menjadi HTML statis saat build proses
export const dynamic = 'force-dynamic';

// Fungsi pembantu untuk mengubah format "HH:MM" menjadi total menit
const timeToMinutes = (timeStr: string): number => {
  if (!timeStr) return 0;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

export async function GET() {
  const now = new Date();
  let targetAudioUrl = '';
  let broadcastMode = 'playlist_mp3'; // Default mode jika tidak ada kecocokan jadwal

  try {
    // 1. QUERY JADWAL RADIO DARI SANITY CMS
    const sanityQuery = `*[_type == "radioConfig"][0] {
      schedules[] {
        day,
        startTime,
        endTime,
        broadcastMode,
        playlist[] { 
          "audioFileUrl": audioFile.asset->url 
        }
      }
    }`;
    
    const config = await client.fetch(sanityQuery, {}, { cache: 'no-store' });

    if (config?.schedules && Array.isArray(config.schedules)) {
      // Paksa kalkulasi jam server Vercel agar mengikuti zona Asia/Jakarta (WIB)
      const timeFormatter = new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      const timeParts = timeFormatter.formatToParts(now);
      const currentHours = Number(timeParts.find(p => p.type === 'hour')?.value || 0);
      const currentMinutes = Number(timeParts.find(p => p.type === 'minute')?.value || 0);
      const currentSecs = Number(timeParts.find(p => p.type === 'second')?.value || 0);
      const currentTotalMinutes = currentHours * 60 + currentMinutes;

      // Ambil nama hari bahasa Inggris sesuai zona WIB (Monday, Tuesday, dsb.)
      const dayFormatter = new Intl.DateTimeFormat('en-US', { 
        timeZone: 'Asia/Jakarta', 
        weekday: 'long' 
      });
      const currentDayName = dayFormatter.format(now);

      // Cocokkan jam dan hari saat ini dengan database Sanity
      for (const schedule of config.schedules) {
        const start = timeToMinutes(schedule.startTime);
        const end = timeToMinutes(schedule.endTime);
        const isTimeMatch = currentTotalMinutes >= start && currentTotalMinutes < end;
        const isDayMatch = schedule.day === 'everyday' || schedule.day === currentDayName;

        if (isTimeMatch && isDayMatch) {
          broadcastMode = schedule.broadcastMode;
          
          // Jika modenya adalah playlist kaset MP3, hitung track index virtualnya
          if (broadcastMode === 'playlist_mp3' && schedule.playlist?.length > 0) {
            const playlist = schedule.playlist;
            const secondsSinceStarted = ((currentTotalMinutes - start) * 60) + currentSecs;
            
            // Asumsi per track diganti setiap 1 jam (3600 detik) sesuai logic awalmu
            const currentTrackIndex = Math.floor(secondsSinceStarted / 3600) % playlist.length;
            targetAudioUrl = playlist[currentTrackIndex]?.audioFileUrl || '';
          }
          break; // Keluar perulangan jika jadwal aktif sudah ditemukan
        }
      }
    }
  } catch (sanityError) {
    console.error('Gagal fetch data Sanity di Vercel:', sanityError);
    // Jika Sanity down, biarkan data kosong agar Laravel langsung mengambil file cadangan lokalnya
  }

  // 2. OPER DATA JADWAL YANG SUDAH MATANG KE LARAVEL HAWKHOST VIA URL QUERY
  const HAWKHOST_CORE_URL = `http://sdit.my.id/radio/stream.php?mode=${broadcastMode}&stream_url=${encodeURIComponent(targetAudioUrl)}`;

  try {
    // 3. Tembak pipa sedotan langsung ke core engine Laravel di Hawkhost
    const response = await fetch(HAWKHOST_CORE_URL, {
      cache: 'no-store', // Bypass cache internal Vercel agar data selalu realtime
      headers: {
        'Accept': 'audio/mpeg',
      },
    });

    // Jalur pengaman jika Laravel Hawkhost mati
    if (!response.ok || !response.body) {
      return new NextResponse('Radio Stream Offline (Hawkhost Unreachable)', { status: 503 });
    }

    // 4. Semburkan kembali chunk audio murni menggunakan Transfer-Encoding Chunked lewat Vercel
    return new NextResponse(response.body, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Error Proxy Radio Vercel:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}