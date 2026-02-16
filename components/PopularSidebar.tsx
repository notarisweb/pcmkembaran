// components/PopularSidebar.tsx
import { getNewsPosts } from "@/lib/sanity.query";
import Link from "next/link";

export default async function PopularSidebar() {
  // Mengambil berita terbaru dari Sanity
  const popularData = await getNewsPosts();

  /** * PALET WARNA UNTUK ANGKA 01 - 05
   * Menggunakan format RGBA agar warna tetap "tebal" tapi tidak menutupi teks.
   */
  const rankColors = [
    'rgba(0, 74, 142, 0.2)',   // 01: Biru PCM
    'rgba(40, 167, 69, 0.2)',   // 02: Hijau Segar
    'rgba(230, 77, 49, 0.2)',   // 03: Merah Jingga
    'rgba(255, 152, 0, 0.25)',  // 04: Oranye Emas
    'rgba(156, 39, 176, 0.2)',  // 05: Ungu Elegan
  ];

  return (
    <section style={{ height: '480px', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ 
        fontSize: '18px', 
        color: 'var(--abah-blue)', 
        fontWeight: '900', 
        marginBottom: '20px',
        paddingLeft: '12px',
        borderLeft: '5px solid var(--abah-gold)',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        Terpopuler
      </h2>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {popularData.slice(0, 5).map((news: any, index: number) => (
          <Link 
            href={`/${news.category}/${news.slug}`} 
            key={news._id} 
            style={{ 
              display: 'flex', 
              gap: '15px', 
              textDecoration: 'none', 
              padding: '10px',
              borderBottom: '1px solid #f8f8f8',
              transition: 'all 0.2s ease',
              alignItems: 'center'
            }}
          >
            {/* PERBAIKAN: Angka Rank dengan Warna Berbeda-beda */}
            <span style={{ 
              fontSize: '42px', 
              fontWeight: '1000', 
              color: rankColors[index] || '#f0f0f0', // Mengambil dari array warna
              lineHeight: '1',
              minWidth: '50px',
              fontStyle: 'italic',
              fontFamily: 'Arial Black, sans-serif'
            }}>
              0{index + 1}
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h3 style={{ 
                fontSize: '14px', 
                fontWeight: '700', 
                color: '#222', 
                margin: 0, 
                lineHeight: '1.4',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {news.title}
              </h3>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#999' }}>
                <span style={{ color: 'var(--abah-gold)', fontWeight: '800', textTransform: 'uppercase' }}>
                  {news.category}
                </span>
                <span>•</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <span style={{ fontWeight: '600' }}>{news.views || 0}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
        
        {popularData.length === 0 && (
          <p style={{ fontSize: '12px', color: '#888', textAlign: 'center', padding: '20px' }}>
            Belum ada data populer.
          </p>
        )}
      </div>

      <Link href="/berita" style={{ 
        marginTop: '20px',
        padding: '14px', 
        textAlign: 'center',
        color: '#ffffff', 
        fontWeight: '800', 
        fontSize: '13px', 
        textDecoration: 'none',
        backgroundColor: 'var(--abah-blue)',
        borderRadius: '8px',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        boxShadow: '0 4px 6px rgba(0,74,142,0.2)'
      }}>
        Lihat Semua Berita
      </Link>
    </section>
  );
}