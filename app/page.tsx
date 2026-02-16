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
  /** * 1. Pengambilan Data Khutbah.
   * Fungsi ini mengambil data dari Project ID 'deyoeizv'. 
   * Jika data belum ada di Sanity, sistem akan memberikan array kosong agar tidak crash.
   */
  const khutbahData = await getKhutbahPosts() || [];

  return (
    <div className="container" style={{ margin: '0 auto', maxWidth: '1200px', padding: '0 20px' }}>
      
      {/* LAPIS 1: TopNews (Berita pilihan urutan 4-8) */}
      <TopNews />

      {/* LAPIS 2: Grid Utama - Headline (Berita 1-3) & Sidebar Terpopuler */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 340px', 
        gap: '40px', 
        marginTop: '25px' 
      }}>
        <main>
          {/* Komponen Headline yang mengambil 3 berita terbaru */}
          <Headline />
        </main>
        
        <aside>
          {/* Menampilkan Sidebar Populer dengan angka urutan tebal & warna-warni */}
          <PopularSidebar />
        </aside>
      </div>

      {/* LAPIS 3: Bagian Rekomendasi (Grid 6 Postingan Acak dari Semua Kategori) */}
      <RecommendationSection />

      {/* LAPIS 4: Konten Terbaru & Sidebar Sekunder */}
      <div className="bottom-layout-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 340px', 
        gap: '40px', 
        marginTop: '50px',
        paddingBottom: '60px'
      }}>
        {/* KOLOM KIRI: Umpan berita terbaru (LatestPosts) */}
        <section>
          <h2 style={{ 
            fontSize: '22px', 
            color: 'var(--abah-blue)', 
            fontWeight: '900', 
            marginBottom: '25px',
            textTransform: 'uppercase'
          }}>
            Postingan <span style={{ color: 'var(--abah-gold)' }}>Terbaru</span>
          </h2>
          <LatestPosts />
        </section>

        {/* KOLOM KANAN: Naskah Khutbah & Informasi Dakwah PCM */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {/* KhutbahSidebar sekarang menerima data yang sudah ditarik di level page */}
          <KhutbahSidebar articles={khutbahData} />
          
          {/* Info pendaftaran, jadwal sholat, atau agenda PCM */}
          <InfoDakwah />
        </aside>
      </div>

      {/* CSS INTERNAL: Memastikan tampilan tetap rapi di Smartphone */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 992px) {
          /* Mengubah Grid 2 kolom menjadi 1 kolom di layar tablet/HP */
          div[style*="gridTemplateColumns: 1fr 340px"], 
          .bottom-layout-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          /* Memastikan Sidebar Populer pindah ke bawah Headline di Mobile */
          aside {
            order: 2;
          }
          main, section {
            order: 1;
          }
        }
      `}} />
    </div>
  );
}