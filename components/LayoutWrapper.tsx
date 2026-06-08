"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import BottomPlayer from "./BottomPlayer"; // Impor BottomPlayer agar terintegrasi dengan wrapper ini

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Cek apakah URL diawali dengan /studio atau /admin
  const isStudio = pathname?.startsWith("/studio") || pathname?.startsWith("/admin");

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header hanya muncul jika BUKAN halaman Sanity Studio */}
      {!isStudio && <Header />}
      
      {/* Main content */}
      <main
        style={{
          flex: 1,
          position: 'relative',  // pastikan main tidak menutupi fixed BottomPlayer
          zIndex: 1,              // agar BottomPlayer tetap di atas
        }}
      >
        {children}
      </main>

      {/* Footer hanya muncul jika BUKAN halaman Sanity Studio */}
      {!isStudio && <Footer />}

      {/* Bottom Player: Otomatis ikut tersembunyi dengan aman dari dashboard Sanity Studio */}
      {!isStudio && <BottomPlayer />}
    </div>
  );
}