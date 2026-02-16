// components/LatestArticlesSidebar.tsx
import Link from "next/link";
import { getArticlePosts } from "@/lib/sanity.query";

export default async function LatestArticlesSidebar() {
  const articles = await getArticlePosts();

  /** * PALET WARNA KHUSUS BACKGROUND GELAP
   * Menggunakan warna yang lebih cerah agar kontras dengan biru PCM.
   */
  const rankColors = [
    'rgba(255, 204, 0, 0.4)',   // 01: Gold
    'rgba(0, 255, 127, 0.3)',   // 02: Spring Green
    'rgba(0, 191, 255, 0.4)',   // 03: Deep Sky Blue
    'rgba(255, 105, 180, 0.4)',  // 04: Hot Pink
    'rgba(255, 255, 255, 0.3)',  // 05: Silver/White
  ];

  return (
    <div style={{ 
      backgroundColor: 'var(--abah-blue)', 
      borderRadius: '15px', 
      padding: '30px 20px', 
      color: '#fff',
      boxShadow: '0 10px 30px rgba(0,74,142,0.15)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* HEADER DENGAN AKSEN EMAS */}
      <div style={{ 
        borderBottom: '2px solid var(--abah-gold)', 
        paddingBottom: '15px', 
        marginBottom: '25px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <span style={{ fontSize: '20px' }}>⭐</span>
        <h4 style={{ 
          color: 'var(--abah-gold)', 
          fontSize: '17px', 
          fontWeight: '900', 
          margin: 0,
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          Artikel Pilihan
        </h4>
      </div>

      {/* LIST ARTIKEL DENGAN ANGKA URUTAN WARNA-WARNI */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {articles.slice(0, 5).map((item: any, index: number) => (
          <Link 
            href={`/${item.category}/${item.slug}`} 
            key={item._id} 
            style={{ 
              textDecoration: 'none', 
              color: '#fff', 
              display: 'flex',
              alignItems: 'center', // Agar angka sejajar tengah dengan teks
              gap: '15px',
              paddingBottom: '15px',
              borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            {/* ANGKA URUTAN BESAR, TEBAL & WARNA-WARNI */}
            <span style={{ 
              fontSize: '40px', 
              fontWeight: '1000', 
              color: rankColors[index] || 'rgba(255,255,255,0.2)', 
              lineHeight: '1',
              minWidth: '50px',
              fontStyle: 'italic',
              fontFamily: 'Arial Black, sans-serif'
            }}>
              0{index + 1}
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <h5 style={{ 
                fontSize: '14px', 
                fontWeight: '700', 
                lineHeight: '1.5', 
                margin: 0,
                color: '#f8f8f8'
              }}>
                {item.title}
              </h5> 

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px', opacity: 0.8 }}>
                <span>
                  {new Date(item.publishedAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short'
                  })}
                </span>
                <span>•</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <span style={{ fontWeight: '600' }}>{item.views || 0}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: 'auto', paddingTop: '30px' }}>
        <Link href="/artikel" style={{ 
          display: 'block',
          textAlign: 'center',
          backgroundColor: 'var(--abah-gold)',
          color: 'var(--abah-blue)',
          padding: '12px',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: '900',
          textDecoration: 'none',
          textTransform: 'uppercase',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
        }}>
          Semua Artikel ❯
        </Link>
      </div>
    </div>
  );
}