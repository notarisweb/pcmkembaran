// app/api/push/route.ts
import { NextResponse } from 'next/server';
import webpush from 'web-push';

const initializeWebPush = () => {
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;

  if (!publicKey || !privateKey) {
    throw new Error("VAPID keys are not set.");
  }

  webpush.setVapidDetails(
    'mailto:admin@pcmkembaran.com',
    publicKey,
    privateKey
  );
};

export async function POST(request: Request) {
  try {
    initializeWebPush();
    // API sekarang menerima data lengkap dari Sanity
    const { subscription, title, message, url } = await request.json();

    const payload = JSON.stringify({
      title: title || "Info Terbaru PCM Kembaran", // Menampilkan judul postingan asli
      body: message || "Ada postingan baru, silakan cek di website.",
      icon: "/icons/icon-192x192.png",
      badge: "/favicon.ico",
      data: {
        url: url || "https://pcmkembaran.com", // Link otomatis menuju artikel tersebut
      },
    });

    await webpush.sendNotification(subscription, payload);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}