// components/LatestArticlesSidebar.tsx
import Link from "next/link";
import { getArticlePosts } from "@/lib/sanity.query";

export default async function LatestArticlesSidebar() {
  // Mengambil data artikel pilihan dari Sanity (Project ID: deyoeizv)
  const articles = await getArticlePosts();

  /** * PALET WARNA NEON UNTUK BACKGROUND GELAP
   * Menggunakan opasitas 0.4 agar warna angka terlihat menyala namun tetap elegan.
   */
  const rankColors = [
    'rgba(255, 204, 0, 0.45)',   // 01: Gold (Identitas PCM)
    'rgba(0, 255, 127, 0.35)',   // 02: Spring Green
    'rgba(0, 191, 255, 0.45)',   // 03: Deep Sky Blue
    'rgba(255, 105, 180, 0.45)',  // 04: Hot Pink
    'rgba(255, 255, 255, 0.35)',  // 05: Silver/White
  ];

  return (
    <div style={{ 
      backgroundColor: 'var(--abah-blue)', 
      borderRadius: '16px', 
      padding: '30px 20px', 
      color: '#fff',
      boxShadow: '0 12px 40px rgba(0,74,142,0.2)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* HEADER SIDEBAR */}
      <div style={{ 
        borderBottom: '2px solid var(--abah-gold)', 
        paddingBottom: '15px', 
        marginBottom: '25px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
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

      {/* LIST ARTIKEL DENGAN ANGKA URUTAN TEBAL */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
        {articles.slice(0, 5).map((item: any, index: number) => (
          <Link 
            href={`/${item.category}/${item.slug}`} 
            key={item._id} 
            style={{ 
              textDecoration: 'none', 
              color: '#fff', 
              display: 'flex',
              alignItems: 'center', 
              gap: '18px',
              paddingBottom: '18px',
              borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            {/* ANGKA URUTAN: Arial Black agar sangat tebal */}
            <span style={{ 
              fontSize: '42px', 
              fontWeight: '1000', 
              color: rankColors[index] || 'rgba(255,255,255,0.2)', 
              lineHeight: '1',
              minWidth: '55px',
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
                color: '#f8f8f8',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {item.title}
              </h5> 

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px', opacity: 0.8 }}>
                {/* FIX HYDRATION: Menambahkan suppressHydrationWarning */}
                <span suppressHydrationWarning>
                  {new Date(item.publishedAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short'
                  })}
                </span>
                <span>•</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <span style={{ fontWeight: '800', color: 'var(--abah-gold)' }}>
                    {item.views || 0}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* TOMBOL LIHAT SEMUA */}
      <div style={{ marginTop: 'auto', paddingTop: '30px' }}>
        <Link href="/artikel" style={{ 
          display: 'block',
          textAlign: 'center',
          backgroundColor: 'var(--abah-gold)',
          color: 'var(--abah-blue)',
          padding: '14px',
          borderRadius: '10px',
          fontSize: '13px',
          fontWeight: '1000',
          textDecoration: 'none',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          transition: 'transform 0.2s'
        }}>
          Semua Artikel ❯
        </Link>
      </div>
    </div>
  );
}