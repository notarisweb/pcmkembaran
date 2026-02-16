/** @type {import('next').NextConfig} */
// Menggunakan library yang lebih modern untuk menghindari WorkerError
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public", // Lokasi file service worker
  cacheOnFrontEndNav: true, // Meningkatkan kecepatan navigasi
  aggressiveFrontEndNavCaching: true, // Caching lebih agresif untuk performa
  reloadOnOnline: true, // Muat ulang otomatis saat koneksi kembali
  disable: process.env.NODE_ENV === "development", // Matikan di mode dev agar tidak mengganggu
});

const nextConfig = {
  // Solusi untuk error Turbopack & Call retries exceeded
  turbopack: {}, 
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io', // Tetap izinkan gambar dari Sanity
      },
    ],
  },
};

export default withPWA(nextConfig);