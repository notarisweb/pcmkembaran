import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import InstallationTracker from "@/components/InstallationTracker"; 

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
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
  description: "Portal resmi PCM Kembaran. Wadah edukasi, literasi Islam, dan informasi dakwah berkemajuan bagi umat di wilayah Kembaran dan sekitarnya.",
  keywords: ["PCM Kembaran", "Muhammadiyah Kembaran", "Dakwah Berkemajuan", "Khutbah Jumat", "Banyumas"],
  manifest: "/manifest.json", 
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PCM Kembaran",
  },
  openGraph: {
    title: "PCM Kembaran - Dakwah Berkemajuan, Mencerahkan Kehidupan",
    description: "Menyajikan konten dakwah murni yang menyejukkan, mencerahkan, dan berkemajuan.",
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
  // 1. UPDATE ICON: Agar Google & Browser mengenali favicon Anda
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" }, // File .ico standar
      { url: "/icon.png", type: "image/png", sizes: "32x32" }, // Ikon PNG kecil
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180" }, // Khusus iPhone/iPad
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  // 2. DATA TERSTRUKTUR (JSON-LD): "Surat Cinta" buat Google
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PCM Kembaran",
    "alternateName": "Pimpinan Cabang Muhammadiyah Kembaran",
    "url": "https://pcmkembaran.com",
    "logo": "https://pcmkembaran.com/icon.png", // Pastikan file ini ada di /public
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "", 
      "contactType": "customer service",
      "areaServed": "ID",
      "availableLanguage": "Indonesian"
    },
    "sameAs": [
      "https://www.instagram.com/pcmkembaran.bms/", // Sesuaikan link medsos jika ada
      "https://www.youtube.com/@pcmkembaran"
    ],
    "description": "Portal resmi PCM Kembaran. Pusat edukasi, literasi Islam, dan informasi dakwah berkemajuan."
  };

  return (
    <html lang="id" className={plusJakartaSans.variable}>
      <head>
        {/* Menyisipkan JSON-LD ke dalam head secara aman */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body 
        className="antialiased" 
        style={{ 
          backgroundColor: '#fcfcfc',
          color: '#1a1a1a',
          margin: 0,
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