// app/page.tsx
import { client } from "@/lib/sanity.client"; 
import { getAllPosts, getKhutbahPosts } from "@/lib/sanity.query";
import Headline from "@/components/Headline";
import TopNews from "@/components/TopNews";
import PopularSidebar from "@/components/PopularSidebar";
import RecommendationSection from "@/components/RecommendationSection";
import LatestPosts from "@/components/LatestPosts";
import KhutbahSidebar from "@/components/KhutbahSidebar";
import InfoDakwah from "@/components/InfoDakwah";
import LatestArticlesSidebar from "@/components/LatestArticlesSidebar";
import NotificationButton from "@/components/NotificationButton";
import BentoDashboard from "@/components/BentoDashboard"; 

// Memastikan data selalu segar dari Project ID: deyoeizv
export const dynamic = 'force-dynamic';
export const revalidate = 0; 

export default async function Home() {
  // 1. Multi-Query untuk Bento Grid (Diperluas untuk kategori Unduhan)
  const bentoQuery = `{
    "latestPost": *[_type == "post"] | order(publishedAt desc)[0] {
      title,
      category,
      publishedAt,
      slug,
      "fileUrl": fileSource.asset->url, // Menarik URL file jika ada unggahan langsung
      downloadLink,                     // Menarik link luar (GDrive/Dropbox)
      fileSize
    },
    "installCount": count(*[_type == "installations"]),
    "leader": *[_type == "board"] | order(order asc)[0],
    "profile": *[_type == "profile"][0]
  }`;

  // 2. Fetching data secara paralel
  const allPosts = await getAllPosts() || [];
  const khutbahData = await getKhutbahPosts() || [];
  const bentoData = await client.fetch(bentoQuery); 

  return (
    <div className="page-wrapper" style={{ 
      margin: '0 auto', 
      maxWidth: '1200px', 
      padding: '0 20px', 
      minHeight: '100vh', 
      display: 'flex',
      flexDirection: 'column',
      position: 'relative' 
    }}>
      
      {/* 1. TOP NEWS - Informasi baris tunggal paling atas */}
      <div className="hide-on-mobile">
        <TopNews />
      </div>

      {/* 2. GRID UTAMA - Headline Utama & Sidebar Populer */}
      <div className="main-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 340px', 
        gap: '40px', 
        marginTop: '25px' 
      }}>
        <div className="content-headline" style={{ minHeight: '300px' }}>
          <Headline />
        </div>
        <div className="sidebar-popular hide-on-mobile">
          <PopularSidebar />
        </div>
      </div>

      {/* === 3. BENTO DASHBOARD - Mecerahkan di bawah Headline === */}
      <section style={{ marginTop: '45px' }}>
        <BentoDashboard data={bentoData} />
      </section>

      {/* 4. REKOMENDASI UNTUK ANDA */}
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

      {/* 5. POSTINGAN TERBARU & SIDEBAR DAKWAH */}
      <div className="bottom-layout-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 340px', 
        gap: '40px', 
        marginTop: '50px',
        paddingBottom: '60px',
        flex: 1 
      }}>
        <div className="content-latest">
          <h2 style={{ fontSize: '22px', color: '#004a8e', fontWeight: '900', marginBottom: '25px', textTransform: 'uppercase' }}>
            Postingan <span style={{ color: '#ffc107' }}>Terbaru</span>
          </h2>
          <LatestPosts />
        </div>

        <div className="sidebar-dakwah" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <KhutbahSidebar articles={khutbahData} />
          <InfoDakwah />
        </div>
      </div>

      {/* TOMBOL MELAYANG (FAB) */}
      <div className="floating-notif-container" style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 2000,
        filter: 'drop-shadow(0 8px 20px rgba(0,74,142,0.4))',
        transition: 'all 0.3s ease'
      }}>
        <NotificationButton />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 992px) {
          .hide-on-mobile { display: none !important; }
          .main-grid, .bottom-layout-grid {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
            margin-top: 20px !important;
          }
          .content-headline { order: 1; }
          .content-latest { order: 2; }
          .sidebar-dakwah { order: 3; }
        }
      `}} />
    </div>
  );
}