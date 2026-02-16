// app/api/push/route.ts
import { NextResponse } from 'next/server';
import webpush from 'web-push';

// Konfigurasi VAPID dengan kunci yang Anda berikan
webpush.setVapidDetails(
  'mailto:admin@pcmkembaran.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(request: Request) {
  try {
    const { subscription, title, body } = await request.json();

    // Payload notifikasi yang akan muncul di layar HP jamaah
    const payload = JSON.stringify({
      title: title || "Naskah Khutbah Terbaru",
      body: body || "Silakan cek naskah khutbah Jumat terbaru di portal PCM Kembaran.",
      icon: "/icons/icon-192x192.png", // Menggunakan ikon yang sudah didaftarkan di manifest
      badge: "/favicon.ico",
      data: {
        url: "https://pcmkembaran.com/khutbah", // Arahkan jamaah langsung ke rubrik khutbah
      },
    });

    // Proses pengiriman ke Push Service (Google/Apple/Mozilla)
    await webpush.sendNotification(subscription, payload);

    return NextResponse.json({ success: true, message: 'Notifikasi berhasil dikirim!' });
  } catch (error) {
    console.error('Gagal mengirim push notification:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal mengirim notifikasi' },
      { status: 500 }
    );
  }
}