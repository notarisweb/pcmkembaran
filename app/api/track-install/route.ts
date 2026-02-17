import { NextResponse } from "next/server";
import { createClient } from "next-sanity";

// 1. Konfigurasi Client Sanity dengan Akses Tulis
const client = createClient({
  projectId: "deyoeizv", // Project ID PCM Kembaran
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN, // Wajib menggunakan Token untuk operasi tulis
  useCdn: false, // Harus false agar data langsung masuk ke database utama
});

export async function POST() {
  try {
    // 2. Membuat Dokumen Baru di Skema 'installations'
    const result = await client.create({
      _type: "installations", // Nama tipe dokumen sesuai skema
      deviceName: "Android Device (TWA)", // Identitas default perangkat
      installedAt: new Date().toISOString(), // Mencatat waktu saat ini
      platform: "Android", // Menggunakan value 'Android' sesuai pilihan skema
    });

    return NextResponse.json({ 
      success: true, 
      message: "Instalasi berhasil dicatat",
      id: result._id 
    });
  } catch (error) {
    console.error("Gagal mengirim data ke Sanity:", error);
    return NextResponse.json(
      { message: "Gagal mencatat instalasi", error },
      { status: 500 }
    );
  }
}