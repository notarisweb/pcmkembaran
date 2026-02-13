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
  const khutbahData = await getKhutbahPosts() || [];

  return (
    <div className="container" style={{ margin: '0 auto', maxWidth: '1200px', padding: '0 20px' }}>
      <TopNews />

      {/* BARIS ATAS: Headline & Popular Posts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '30px', marginTop: '20px' }}>
        <main><Headline /></main>
        <aside><PopularSidebar /></aside>
      </div>

      <RecommendationSection />

      {/* BARIS BAWAH: Latest Posts & Sidebar Gabungan */}
      <div className="bottom-layout-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 340px', 
        gap: '30px', 
        marginTop: '40px' 
      }}>
        {/* KOLOM KIRI: Daftar Postingan Terbaru saja (Hapus InfoDakwah dari sini) */}
        <section>
          <LatestPosts />
        </section>

        {/* KOLOM KANAN: Sidebar Khutbah & Info Dakwah di sini saja */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <KhutbahSidebar articles={khutbahData} />
          <InfoDakwah />
        </aside>
      </div>

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