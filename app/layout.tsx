import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper"; // Kita buat komponen ini di bawah

// Metadata tetap aman sebagai Server Component (Bagus untuk SEO)
export const metadata: Metadata = {
  title: "PCM Kembaran - Menggali Ilmu, Membuka Cahaya",
  description: "Wadah edukasi dan literasi Islam yang menyajikan konten murni, menyejukkan, dan mencerahkan.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="antialiased">
        {/* Kita bungkus children dengan wrapper khusus */}
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}