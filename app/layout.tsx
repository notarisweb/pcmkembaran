import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Menambahkan Metadata agar website lebih mudah ditemukan di Google
export const metadata: Metadata = {
  title: "Abah Saif - Menggali Ilmu, Membuka Cahaya",
  description: "Wadah edukasi dan literasi Islam yang menyajikan konten murni, menyejukkan, dan mencerahkan.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="antialiased" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Header muncul di bagian paling atas di semua halaman */}
        <Header />
        
        {/* Main diberikan 'flex: 1' agar jika kontennya sedikit, 
          Footer akan tetap berada di bawah (tidak melayang ke tengah) 
        */}
        <main style={{ flex: 1 }}>
          {children}
        </main>

        {/* Footer muncul secara global di semua halaman */}
        <Footer />
      </body>
    </html>
  );
}