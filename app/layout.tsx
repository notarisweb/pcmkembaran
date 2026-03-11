import type { Metadata, Viewport } from "next";
// 1. IMPOR FONT DARI NEXT/FONT/GOOGLE
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import InstallationTracker from "@/components/InstallationTracker"; 

// 2. KONFIGURASI FONT UNTUK OPTIMASI PERFORMA
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap", // Menghindari teks hilang saat font didownload
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#004a8e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://pcmkembaran.com'), 
  title: {
    default: "PCM Kembaran - Dakwah Berkemajuan, Mencerahkan Kehidupan",
    template: "%s | PCM Kembaran"
  },
  description: "Portal resmi PCM Kembaran. Wadah edukasi, literasi Islam, dan informasi dakwah berkemajuan.",
  keywords: ["PCM Kembaran", "Muhammadiyah Kembaran", "Dakwah Berkemajuan", "Khutbah Jumat"],
  manifest: "/manifest.json", 
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PCM Kembaran",
  },
  openGraph: {
    title: "PCM Kembaran - Dakwah Berkemajuan, Mencerahkan Kehidupan",
    description: "Menyajikan konten dakwah murni yang menyejukkan dan mencerahkan.",
    url: 'https://pcmkembaran.com',
    siteName: 'PCM Kembaran',
    locale: 'id_ID',
    type: 'website',
    images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630, alt: 'PCM Kembaran' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "PCM Kembaran - Dakwah Berkemajuan, Mencerahkan Kehidupan",
    images: ['/opengraph-image.jpg'], 
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/icon-192x192.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={plusJakartaSans.variable}>
      <body 
        className="antialiased" 
        style={{ 
          backgroundColor: '#fcfcfc',
          color: '#1a1a1a',
          margin: 0,
          // Menerapkan font secara global agar efisien
          fontFamily: 'var(--font-plus-jakarta), sans-serif'
        }}
      >
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        <InstallationTracker /> 
      </body>
    </html>
  );
}