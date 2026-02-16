/** @type {import('next').NextConfig} */
import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
  dest: 'public', // Folder tujuan file Service Worker
  disable: process.env.NODE_ENV === 'development', // Matikan PWA di mode dev agar tidak mengganggu debugging
  register: true, // Daftarkan service worker secara otomatis
  skipWaiting: true, // Langsung aktifkan versi terbaru saat ada update
});

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default withPWA(nextConfig);