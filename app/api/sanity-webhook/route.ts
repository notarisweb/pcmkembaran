import { NextResponse } from 'next/server';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import webpush from 'web-push';
import { createClient } from 'next-sanity';

// 1. Konfigurasi Sanity Client Khusus (Server-side dengan Write Token)
const client = createClient({
  projectId: "deyoeizv", // Project ID Anda
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN, // Membutuhkan token dengan akses Editor
  useCdn: false, // Wajib false untuk data terbaru
});

// 2. Inisialisasi Web Push
const initializeWebPush = () => {
  webpush.setVapidDetails(
    'mailto:aris.suharyanto79@gmail.com', // Email penanggung jawab
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
  );
};

export async function POST(request: Request) {
  try {
    // 3. Verifikasi Keamanan (Secret Signature)
    const signature = request.headers.get(SIGNATURE_HEADER_NAME) || '';
    const bodyText = await request.text();
    const secret = process.env.SANITY_WEBHOOK_SECRET || '';

    if (!isValidSignature(bodyText, signature, secret)) {
      console.error('Akses Ilegal: Signature Webhook Sanity tidak valid!');
      return NextResponse.json({ message: 'Akses Ditolak' }, { status: 401 });
    }

    // 4. Persiapan Data
    initializeWebPush();
    const body = JSON.parse(bodyText);
    const { title, slug, message } = body;

    // 5. Ambil Seluruh Data Subscription dari Sanity
    const allSubscriptions = await getAllSubscriptionsFromDB(); 

    if (!allSubscriptions || allSubscriptions.length === 0) {
      return NextResponse.json({ message: "Verifikasi sukses, namun belum ada perangkat terdaftar." });
    }

    // 6. Buat Payload Notifikasi
    const notificationPayload = JSON.stringify({
      title: title || "Dakwah Berkemajuan",
      body: message || `Baca kabar terbaru: ${title}`,
      icon: "/icons/icon-192x192.png", // Ikon PWA resmi
      badge: "/favicon.ico",
      data: {
        url: `https://pcmkembaran.com/${slug}`, // Link langsung ke artikel terkait
      },
    });

    // 7. Pengiriman Paralel ke Ribuan Jamaah
    const pushPromises = allSubscriptions.map((subscription: any) =>
      webpush.sendNotification(subscription, notificationPayload).catch((err) => {
        // Hapus subscription jika sudah kadaluwarsa (404/410)
        if (err.statusCode === 404 || err.statusCode === 410) {
          removeSubscriptionFromDB(subscription.endpoint);
        }
      })
    );

    await Promise.all(pushPromises);

    return NextResponse.json({ 
      success: true, 
      message: `Notifikasi terkirim ke ${allSubscriptions.length} jamaah.` 
    });

  } catch (error: any) {
    console.error('Webhook Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// === FUNGSI HELPER INTEGRASI SANITY ===

async function getAllSubscriptionsFromDB() {
  try {
    // Mengambil data dari tipe dokumen pwa_subscription
    return await client.fetch(`*[_type == "pwa_subscription"]{
      endpoint,
      keys
    }`);
  } catch (error) {
    console.error("Gagal mengambil data dari Sanity:", error);
    return [];
  }
}

async function removeSubscriptionFromDB(endpoint: string) {
  try {
    // Menghapus data perangkat yang sudah tidak aktif
    await client.delete({
      query: `*[_type == "pwa_subscription" && endpoint == $endpoint][0]`,
      params: { endpoint }
    });
    console.log(`Endpoint dihapus: ${endpoint}`);
  } catch (error) {
    console.error("Gagal menghapus data di Sanity:", error);
  }
}