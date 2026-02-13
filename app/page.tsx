import Headline from "@/components/Headline";
import TopNews from "@/components/TopNews";
import PopularSidebar from "@/components/PopularSidebar";
import RecommendationSection from "@/components/RecommendationSection";
import LatestPosts from "@/components/LatestPosts"; // Komponen baru

export default function Home() {
  return (
    <div className="container" style={{ margin: '0 auto', maxWidth: '1200px', padding: '0 20px' }}>
      <TopNews />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '30px', marginTop: '20px' }}>
        <main><Headline /></main>
        <aside><PopularSidebar /></aside>
      </div>

      <RecommendationSection />

      {/* --- BLOK POSTINGAN TERBARU (BARU) --- */}
      <LatestPosts />
    </div>
  );
}