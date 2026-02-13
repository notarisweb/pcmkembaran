// app/page.tsx
import { getKhutbahPosts } from "@/lib/sanity.query";
import Headline from "@/components/Headline";
import TopNews from "@/components/TopNews";
import PopularSidebar from "@/components/PopularSidebar";
import RecommendationSection from "@/components/RecommendationSection";
import LatestPosts from "@/components/LatestPosts";
import KhutbahSidebar from "@/components/KhutbahSidebar";
import InfoDakwah from "@/components/InfoDakwah";

export default async function Home() {
  // Mengambil data Khutbah secara server-side
  const khutbahData = await getKhutbahPosts() || [];

  return (
    <div className="container" style={{ margin: '0 auto', maxWidth: '1200px', padding: '0 20px' }}>
      {/* BAGIAN ATAS: Running News / Top News */}
      <TopNews />

      {/* BAGIAN TENAH: Headline Utama & Sidebar Populer */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '30px', marginTop: '20px' }}>
        <main><Headline /></main>
        <aside><PopularSidebar /></aside>
      </div>

      {/* SEKSI REKOMENDASI */}
      <RecommendationSection />

      {/* --- BLOK BAWAH: TATA LETAK 2 KOLOM (LATEST POSTS & SIDEBAR GABUNGAN) --- */}
      <div className="bottom-layout-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 340px', 
        gap: '30px', 
        marginTop: '40px' 
      }}>
        {/* KOLOM 1 (KIRI): Daftar Postingan Terbaru dari Semua Kategori */}
        <section>
          <LatestPosts />
        </section>

        {/* KOLOM 2 (KANAN): Sidebar Khutbah & Info Dakwah */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          {/* List Khutbah Terbaru */}
          <KhutbahSidebar articles={khutbahData} />
          
          {/* Card Informasi Kerjasama/Dakwah */}
          <InfoDakwah />
        </aside>
      </div>

      {/* CSS RESPONSIVE: Otomatis Menjadi 1 Kolom di Layar Kecil */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 992px) {
          .bottom-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </div>
  );
}