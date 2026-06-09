import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity.client';

export const dynamic = 'force-dynamic';

const timeToMinutes = (timeStr: string): number => {
  if (!timeStr) return 0;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

export async function GET() {
  const now = new Date();
  let targetAudioUrl = '';
  let broadcastMode = 'playlist_mp3';
  let secondsSinceStarted = 0; // Penampung hitungan detik berjalan

  try {
    const sanityQuery = `*[_type == "radioConfig"][0] {
      schedules[] {
        day,
        startTime,
        endTime,
        broadcastMode,
        playlist[] { "audioFileUrl": audioFile.asset->url }
      }
    }`;
    
    const config = await client.fetch(sanityQuery, {}, { cache: 'no-store' });

    if (config?.schedules && Array.isArray(config.schedules)) {
      const timeFormatter = new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
      });
      const timeParts = timeFormatter.formatToParts(now);
      const currentHours = Number(timeParts.find(p => p.type === 'hour')?.value || 0);
      const currentMinutes = Number(timeParts.find(p => p.type === 'minute')?.value || 0);
      const currentSecs = Number(timeParts.find(p => p.type === 'second')?.value || 0);
      const currentTotalMinutes = currentHours * 60 + currentMinutes;

      const dayFormatter = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Jakarta', weekday: 'long' });
      const currentDayName = dayFormatter.format(now);

      for (const schedule of config.schedules) {
        const start = timeToMinutes(schedule.startTime);
        const end = timeToMinutes(schedule.endTime);
        const isTimeMatch = currentTotalMinutes >= start && currentTotalMinutes < end;
        const isDayMatch = schedule.day === 'everyday' || schedule.day === currentDayName;

        if (isTimeMatch && isDayMatch) {
          broadcastMode = schedule.broadcastMode;
          
          if (broadcastMode === 'playlist_mp3' && schedule.playlist?.length > 0) {
            const playlist = schedule.playlist;
            
            // Hitung total detik riil yang sudah berjalan sejak jam jadwal dimulai
            const totalSecondsTimeline = ((currentTotalMinutes - start) * 60) + currentSecs;
            
            // Misal: ganti lagu tiap 1 jam (3600 detik)
            const trackDuration = 3600; 
            const currentTrackIndex = Math.floor(totalSecondsTimeline / trackDuration) % playlist.length;
            
            targetAudioUrl = playlist[currentTrackIndex]?.audioFileUrl || '';
            
            // 🌟 HITUNG SISA DETIK UNTUK LAGU YANG SEDANG AKTIF INI
            secondsSinceStarted = totalSecondsTimeline % trackDuration;
          }
          break;
        }
      }
    }
  } catch (sanityError) {
    console.error(sanityError);
  }

  // 🌟 SEKARANG KITA KIRIM DATA DETIK BERJALAN KE LARAVEL HAWKHOST
  const HAWKHOST_CORE_URL = `http://sdit.my.id/radio/stream.php?mode=${broadcastMode}&stream_url=${encodeURIComponent(targetAudioUrl)}&current_seconds=${secondsSinceStarted}`;

  try {
    const response = await fetch(HAWKHOST_CORE_URL, {
      cache: 'no-store',
      headers: { 'Accept': 'audio/mpeg' },
    });

    if (!response.ok || !response.body) {
      return new NextResponse('Radio Stream Offline', { status: 503 });
    }

    return new NextResponse(response.body, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}