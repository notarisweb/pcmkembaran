// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata: Metadata = {
  // 1. Alamat dasar website
  metadataBase: new URL('https://pcmkembaran.com'), 

  title: {
    default: "PCM Kembaran - Pimpinan Cabang Muhammadiyah Kembaran",
    template: "%s | PCM Kembaran"
  },
  description: "Portal resmi PCM Kembaran. Wadah edukasi, literasi Islam, dan informasi kegiatan dakwah yang mencerahkan jamaah.",
  keywords: ["PCM Kembaran", "Muhammadiyah Kembaran", "Dakwah Islam", "Khutbah Jumat", "Berita Muhammadiyah"],

  // === FITUR PWA START ===
  manifest: "/manifest.json", 
  themeColor: "#004a8e", // Warna Biru PCM untuk status bar
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PCM Kembaran",
  },
  // === FITUR PWA END ===
  
  // 2. Open Graph
  openGraph: {
    title: "PCM Kembaran - Pimpinan Cabang Muhammadiyah Kembaran",
    description: "Wadah edukasi dan literasi Islam yang menyajikan konten murni, menyejukkan, dan mencerahkan.",
    url: 'https://pcmkembaran.com',
    siteName: 'PCM Kembaran',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.jpg', 
        width: 1200,
        height: 630,
        alt: 'Thumbnail PCM Kembaran',
      },
    ],
  },

  // 3. Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: "PCM Kembaran - Pimpinan Cabang Muhammadiyah Kembaran",
    description: "Portal resmi PCM Kembaran. Informasi dakwah dan khutbah terbaru.",
    images: ['/opengraph-image.jpg'], 
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/icons/icon-192x192.png", // Ikon khusus perangkat Apple
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="antialiased" style={{ backgroundColor: '#fcfcfc', color: '#1a1a1a' }}>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}