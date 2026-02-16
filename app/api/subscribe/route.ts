import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';

// 1. Inisialisasi Sanity Client dengan Izin Menulis (Write Token)
const client = createClient({
  projectId: "deyoeizv", // Project ID PCM Kembaran
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN, // Pastikan Token ini memiliki akses 'Editor'
  useCdn: false,
});

export async function POST(request: Request) {
  try {
    // 2. Terima data subscription dari browser jamaah
    const subscription = await request.json();

    if (!subscription || !subscription.endpoint) {
      return NextResponse.json({ error: "Data subscription tidak valid." }, { status: 400 });
    }

    // 3. Simpan atau Update data ke Sanity
    // Kita gunakan 'createIfNotExists' agar tidak ada duplikasi data perangkat yang sama
    const result = await client.createOrReplace({
      _type: 'pwa_subscription',
      _id: `sub-${Buffer.from(subscription.endpoint).toString('base64').slice(-32)}`, // Generate ID unik dari endpoint
      endpoint: subscription.endpoint,
      keys: {
        p256dh: subscription.keys?.p256dh,
        auth: subscription.keys?.auth,
      },
      subscribedAt: new Date().toISOString(),
    });

    console.log(`Jamaah baru terdaftar: ${result._id}`);

    return NextResponse.json({ 
      success: true, 
      message: "Alhamdulillah, perangkat Anda berhasil terdaftar untuk menerima info dakwah." 
    });

  } catch (error: any) {
    console.error("Gagal menyimpan data ke Sanity:", error.message);
    return NextResponse.json({ error: "Gagal memproses pendaftaran." }, { status: 500 });
  }
}