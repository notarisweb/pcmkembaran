"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Cek apakah URL diawali dengan /studio
  const isStudio = pathname?.startsWith("/studio");

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header hanya muncul jika BUKAN halaman Sanity Studio */}
      {!isStudio && <Header />}
      
      <main style={{ flex: 1 }}>
        {children}
      </main>

      {/* Footer hanya muncul jika BUKAN halaman Sanity Studio */}
      {!isStudio && <Footer />}
    </div>
  );
}