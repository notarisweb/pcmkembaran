// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

/** * METADATA: Dioptimalkan untuk SEO dan Media Sosial.
 * Pastikan Anda memiliki file gambar bernama 'opengraph-image.jpg' di dalam folder /public.
 */
export const metadata: Metadata = {
  // 1. Alamat dasar website (Penting agar link gambar tidak error)
  metadataBase: new URL('https://pcmkembaran.com'), //

  title: {
    default: "PCM Kembaran - Pimpinan Cabang Muhammadiyah Kembaran",
    template: "%s | PCM Kembaran"
  },
  description: "Portal resmi PCM Kembaran. Wadah edukasi, literasi Islam, dan informasi kegiatan dakwah yang mencerahkan jamaah.",
  keywords: ["PCM Kembaran", "Muhammadiyah Kembaran", "Dakwah Islam", "Khutbah Jumat", "Berita Muhammadiyah"],
  
  // 2. Open Graph (Untuk WhatsApp, Facebook, LinkedIn)
  openGraph: {
    title: "PCM Kembaran - Pimpinan Cabang Muhammadiyah Kembaran",
    description: "Wadah edukasi dan literasi Islam yang menyajikan konten murni, menyejukkan, dan mencerahkan.",
    url: 'https://pcmkembaran.com',
    siteName: 'PCM Kembaran',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.jpg', // File ini harus ada di folder /public
        width: 1200,
        height: 630,
        alt: 'Thumbnail PCM Kembaran',
      },
    ],
  },

  // 3. Twitter Card (Untuk tampilan besar di X/Twitter)
  twitter: {
    card: 'summary_large_image',
    title: "PCM Kembaran - Pimpinan Cabang Muhammadiyah Kembaran",
    description: "Portal resmi PCM Kembaran. Informasi dakwah dan khutbah terbaru.",
    images: ['/opengraph-image.jpg'], // Gunakan gambar yang sama
  },

  icons: {
    icon: "/favicon.ico",
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