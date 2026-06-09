import { NextResponse } from 'next/server';

// Memaksa Vercel agar API ini selalu dinamis (Server-Side Rendering) 
// dan tidak dibekukan menjadi HTML statis saat build proses
export const dynamic = 'force-dynamic';

export async function GET() {
  // 🔗 Alirkan pipa sedotan langsung ke core engine PHP yang ada di Hawkhost (sdit.my.id)
  const HAWKHOST_CORE_URL = 'http://sdit.my.id/radio/stream.php';

  try {
    // 1. Ambil data stream audio mentah dari Hawkhost
    const response = await fetch(HAWKHOST_CORE_URL, {
      cache: 'no-store', // Bypass cache internal Vercel agar audio selalu realtime
      headers: {
        'Accept': 'audio/mpeg',
      },
    });

    // Jalur pengaman jika server Hawkhost mati atau belum dikonfigurasi
    if (!response.ok || !response.body) {
      return new NextResponse('Radio Stream Offline (Hawkhost Unreachable)', { status: 503 });
    }

    // 2. Semburkan kembali chunk audio murni menggunakan Transfer-Encoding Chunked lewat Vercel
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