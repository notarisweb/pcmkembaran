// components/RecommendationSection.tsx
import { getAllPosts } from "@/lib/sanity.query";
import Link from "next/link";
import LatestArticlesSidebar from "./LatestArticlesSidebar";

export default async function RecommendationSection() {
  // 1. Mengambil semua data postingan dari Sanity
  const allData = await getAllPosts();

  // 2. Logika Random: Mengacak data agar setiap refresh muncul rekomendasi berbeda
  const recommendedData = [...allData]
    .sort(() => Math.random() - 0.5)
    .slice(0, 6); 

  return (
    <section style={{ marginTop: '50px', paddingTop: '40px', borderTop: '2px solid #f0f0f0' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '40px' }}>
        
        {/* ================= KIRI: GRID REKOMENDASI ================= */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
            <h2 style={{ fontSize: '22px', color: '#004a8e', fontWeight: '900', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Rekomendasi <span style={{ color: 'var(--abah-gold)' }}>Untuk Anda</span>
            </h2>
            <Link href="/berita" style={{ fontSize: '13px', color: '#888', textDecoration: 'none', fontWeight: '600' }}>
              LIHAT SEMUA ❯
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px' }}>
            {recommendedData.map((item: any) => (
              <Link 
                /* PERBAIKAN SEO: Menggunakan kategori asli dari Sanity untuk URL dinamis */
                href={`/${item.category}/${item.slug}`} 
                key={item._id} 
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                {/* Thumbnail Gambar */}
                <div style={{ 
                  width: '100%', 
                  height: '150px', 
                  borderRadius: '10px', 
                  overflow: 'hidden', 
                  marginBottom: '12px',
                  backgroundColor: '#f9f9f9',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}>
                  <img 
                    src={item.image || "https://via.placeholder.com/300/200?text=PCM+Kembaran"} 
                    alt={item.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.3s' }} 
                  />
                </div>

                {/* Badge Kategori - Warna Emas untuk Identitas PCM */}
                <span style={{ 
                  fontSize: '11px', 
                  color: item.category === 'berita' ? '#e64d31' : 'var(--abah-gold)', 
                  fontWeight: '800', 
                  display: 'block', 
                  marginBottom: '6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {item.category}
                </span>

                {/* Judul Konten */}
                <h3 style={{ 
                  fontSize: '15px', 
                  fontWeight: '700', 
                  lineHeight: '1.4', 
                  margin: '0 0 8px 0', 
                  color: '#1a1a1a',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {item.title}
                </h3>

                {/* FITUR: JUMLAH PEMBACA (Admin Editable) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#aaa' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <span>{item.views || 0} dibaca</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Fallback jika data kosong */}
          {recommendedData.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px', color: '#999', backgroundColor: '#fdfdfd', borderRadius: '12px' }}>
              Belum ada konten rekomendasi saat ini.
            </div>
          )}
        </div>

        {/* ================= KANAN: SIDEBAR ================= */}
        <aside style={{ borderLeft: '1px solid #eee', paddingLeft: '30px' }}>
          <LatestArticlesSidebar />
        </aside>

      </div>
    </section>
  );
}