// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata: Metadata = {
  // 1. Alamat dasar website
  metadataBase: new URL('https://pcmkembaran.com'), 

  title: {
    // Sinkronisasi dengan tagline terbaru
    default: "PCM Kembaran - Dakwah Berkemajuan, Mencerahkan Kehidupan",
    template: "%s | PCM Kembaran"
  },
  description: "Portal resmi PCM Kembaran. Wadah edukasi, literasi Islam, dan informasi dakwah berkemajuan yang mencerahkan kehidupan jamaah.",
  keywords: ["PCM Kembaran", "Muhammadiyah Kembaran", "Dakwah Berkemajuan", "Literasi Islam", "Khutbah Jumat"],

  // === FITUR PWA START ===
  manifest: "/manifest.json", 
  themeColor: "#004a8e", // Warna Biru PCM
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PCM Kembaran",
  },
  // === FITUR PWA END ===
  
  // 2. Open Graph (WhatsApp, Facebook, LinkedIn)
  openGraph: {
    title: "PCM Kembaran - Dakwah Berkemajuan, Mencerahkan Kehidupan",
    description: "Menyajikan konten dakwah murni yang menyejukkan, mencerahkan, dan berkemajuan bagi umat.",
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
    title: "PCM Kembaran - Dakwah Berkemajuan, Mencerahkan Kehidupan",
    description: "Informasi dakwah, edukasi Islam, dan naskah khutbah terbaru yang mencerahkan.",
    images: ['/opengraph-image.jpg'], 
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/icons/icon-192x192.png", // Ikon PWA untuk perangkat Apple
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