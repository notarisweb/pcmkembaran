import type { Metadata, Viewport } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
// Impor sensor pelacak instalasi otomatis
import InstallationTracker from "@/components/InstallationTracker"; 

// 1. KONFIGURASI VIEWPORT (Wajib dipisah di Next.js 15)
export const viewport: Viewport = {
  themeColor: "#004a8e", // Warna Biru PCM resmi
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// 2. GLOBAL METADATA
export const metadata: Metadata = {
  // Alamat dasar website untuk SEO
  metadataBase: new URL('https://pcmkembaran.com'), 

  title: {
    // Tagline utama PCM Kembaran
    default: "PCM Kembaran - Dakwah Berkemajuan, Mencerahkan Kehidupan",
    template: "%s | PCM Kembaran"
  },
  description: "Portal resmi PCM Kembaran. Wadah edukasi, literasi Islam, dan informasi dakwah berkemajuan yang mencerahkan kehidupan jamaah.",
  keywords: ["PCM Kembaran", "Muhammadiyah Kembaran", "Dakwah Berkemajuan", "Literasi Islam", "Khutbah Jumat"],

  // === KONFIGURASI PWA ===
  manifest: "/manifest.json", 
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PCM Kembaran",
  },
  
  // 3. Open Graph (WhatsApp & Facebook Preview)
  openGraph: {
    title: "PCM Kembaran - Dakwah Berkemajuan, Mencerahkan Kehidupan",
    description: "Menyajikan konten dakwah murni yang menyejukkan, mencerahkan, dan berkemajuan bagi umat.",
    url: 'https://pcmkembaran.com',
    siteName: 'PCM Kembaran',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.jpg', // Pastikan file ini ada di folder /public
        width: 1200,
        height: 630,
        alt: 'PCM Kembaran',
      },
    ],
  },

  // 4. Twitter/X Card
  twitter: {
    card: 'summary_large_image',
    title: "PCM Kembaran - Dakwah Berkemajuan, Mencerahkan Kehidupan",
    description: "Informasi dakwah, edukasi Islam, dan naskah khutbah terbaru yang mencerahkan.",
    images: ['/opengraph-image.jpg'], 
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/icons/icon-192x192.png", // Ikon untuk perangkat iPhone/iPad
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body 
        className="antialiased" 
        style={{ 
          backgroundColor: '#fcfcfc', // Abu-abu sangat muda agar logo biru terlihat kontras
          color: '#1a1a1a',
          margin: 0 
        }}
      >
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        
        {/* Sensor otomatis yang menangkap sinyal 'appinstalled' dari browser jamaah */}
        <InstallationTracker /> 
      </body>
    </html>
  );
}