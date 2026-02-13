import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="antialiased">
        <Header />
        
        {/* Konten halaman akan merender di sini */}
        <main>{children}</main>

        {/* Footer dipanggil di sini agar muncul secara global */}
        <Footer />
      </body>
    </html>
  );
}