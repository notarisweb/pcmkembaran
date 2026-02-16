// app/page.tsx
import { getAllPosts, getKhutbahPosts } from "@/lib/sanity.query";
import Headline from "@/components/Headline";
import TopNews from "@/components/TopNews";
import PopularSidebar from "@/components/PopularSidebar";
import RecommendationSection from "@/components/RecommendationSection";
import LatestPosts from "@/components/LatestPosts";
import KhutbahSidebar from "@/components/KhutbahSidebar";
import InfoDakwah from "@/components/InfoDakwah";
import LatestArticlesSidebar from "@/components/LatestArticlesSidebar";
import NotificationButton from "@/components/NotificationButton"; // FIX: Import komponen melayang

// Menjamin data dari Project ID: deyoeizv selalu segar
export const dynamic = 'force-dynamic';
export const revalidate = 0; 

export default async function Home() {
  // 1. Fetching data di Server Component
  const allPosts = await getAllPosts() || [];
  const khutbahData = await getKhutbahPosts() || [];

  return (
    <div className="page-wrapper" style={{ 
      margin: '0 auto', 
      maxWidth: '1200px', 
      padding: '0 20px', 
      minHeight: '100vh', 
      display: 'flex',
      flexDirection: 'column',
      position: 'relative' // Base untuk koordinat elemen melayang
    }}>
      
      {/* 1. TOP NEWS - Sembunyi di HP */}
      <div className="hide-on-mobile">
        <TopNews />
      </div>

      {/* 2. GRID UTAMA - Headline & Sidebar Populer */}
      <div className="main-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '40px', marginTop: '25px' }}>
        <div className="content-headline" style={{ minHeight: '300px' }}>
          <Headline />
        </div>
        <div className="sidebar-popular hide-on-mobile">
          <PopularSidebar />
        </div>
      </div>

      {/* 3. REKOMENDASI */}
      <section className="hide-on-mobile" style={{ marginTop: '50px', paddingTop: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '40px' }}>
          <div>
            <RecommendationSection allData={allPosts} />
          </div>
          <aside style={{ paddingLeft: '0' }}>
            <LatestArticlesSidebar />
          </aside>
        </div>
      </section>

      {/* 4. POSTINGAN TERBARU & SIDEBAR DAKWAH */}
      <div className="bottom-layout-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 340px', 
        gap: '40px', 
        marginTop: '50px',
        paddingBottom: '60px',
        flex: 1 
      }}>
        <div className="content-latest">
          <h2 style={{ fontSize: '22px', color: 'var(--abah-blue)', fontWeight: '900', marginBottom: '25px', textTransform: 'uppercase' }}>
            Postingan <span style={{ color: 'var(--abah-gold)' }}>Terbaru</span>
          </h2>
          <LatestPosts />
        </div>

        <div className="sidebar-dakwah" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <KhutbahSidebar articles={khutbahData} />
          <InfoDakwah />
        </div>
      </div>

      {/* === TOMBOL MELAYANG (FLOATING ACTION BUTTON) === */}
      <div className="floating-notif-container" style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 2000, // Menjamin berada di atas konten apapun
        filter: 'drop-shadow(0 8px 20px rgba(0,74,142,0.4))', // Bayangan khas FAB agar melayang nyata
        transition: 'all 0.3s ease'
      }}>
        <NotificationButton />
      </div>

      {/* CSS KHUSUS MOBILE DENGAN CLASS SPESIFIK */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 992px) {
          .hide-on-mobile {
            display: none !important;
          }
          .main-grid, .bottom-layout-grid {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
            margin-top: 20px !important;
          }
          .content-headline { order: 1; }
          .content-latest { order: 2; }
          .sidebar-dakwah { order: 3; }

          /* Penyesuaian tombol melayang agar lebih manis di layar HP */
          .floating-notif-container {
            bottom: 20px !important;
            right: 20px !important;
            transform: scale(0.85); /* Sedikit lebih kecil di HP */
          }
        }
      `}} />
    </div>
  );
}