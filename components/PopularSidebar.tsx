import { getNewsPosts } from "@/lib/sanity.query";
import Link from "next/link";

export default async function PopularSidebar() {
  // 1. Ambil data berita terbaru (Project ID: deyoeizv)
  const popularData = await getNewsPosts();

  /** * PALET WARNA UNTUK ANGKA 01 - 05
   * Menggunakan warna khas PCM Kembaran
   */
  const rankColors = [
    'rgba(0, 74, 142, 0.25)',   // 01: Biru PCM
    'rgba(255, 193, 7, 0.4)',    // 02: Emas PCM
    'rgba(0, 74, 142, 0.20)',   // 03: Biru Muda
    'rgba(255, 193, 7, 0.3)',    // 04: Emas Muda
    'rgba(203, 213, 225, 0.5)', // 05: Abu-abu Netral
  ];

  return (
    <section className="popular-sidebar-container" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* HEADER: TERPOPULER DENGAN AKSEN EMAS */}
      <h2 style={{ 
        fontSize: '18px', 
        color: '#004a8e', 
        fontWeight: '900', 
        marginBottom: '20px',
        paddingLeft: '12px',
        borderLeft: '5px solid #ffc107',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        Terpopuler
      </h2>

      {/* LIST BERITA TERPOPULER */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {popularData?.slice(0, 5).map((news: any, index: number) => {
          // Sinkronisasi URL: Pastikan kategori dislugify
          const categoryPath = news.category?.toLowerCase().replace(/\s+/g, '-') || "berita";
          // Slug sekarang berupa string murni dari query
          const newsLink = `/${categoryPath}/${news.slug}`;

          return (
            <Link 
              href={newsLink} 
              key={news._id} 
              className="pop-sidebar-item"
              style={{ 
                display: 'flex', 
                gap: '15px', 
                textDecoration: 'none', 
                padding: '12px 10px',
                borderBottom: '1px solid #f1f5f9',
                transition: 'all 0.2s ease',
                alignItems: 'center'
              }}
            >
              {/* ANGKA URUTAN BESAR & TEBAL */}
              <span style={{ 
                fontSize: '42px', 
                fontWeight: '900', 
                color: rankColors[index] || '#f1f5f9', 
                lineHeight: '1',
                minWidth: '55px',
                fontStyle: 'italic',
                fontFamily: 'sans-serif'
              }}>
                0{index + 1}
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <h3 style={{ 
                  fontSize: '14px', 
                  fontWeight: '800', 
                  color: '#1e293b', 
                  margin: 0, 
                  lineHeight: '1.4',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {news.title}
                </h3>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#64748b' }}>
                  <span style={{ color: '#004a8e', fontWeight: '800', textTransform: 'uppercase' }}>
                    {news.category}
                  </span>
                  <span>•</span>
                  <div 
                    suppressHydrationWarning 
                    style={{ display: 'flex', alignItems: 'center', gap: '3px' }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <span style={{ fontWeight: '700', color: '#ffc107' }}>
                      {news.views || 0}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
        
        {/* FALLBACK JIKA DATA KOSONG */}
        {(!popularData || popularData.length === 0) && (
          <p style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center', padding: '30px', border: '1px dashed #e2e8f0', borderRadius: '10px' }}>
            Belum ada berita populer saat ini.
          </p>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .pop-sidebar-item:hover { 
          background-color: #f8fafc; 
          transform: translateX(5px);
        }
        .pop-sidebar-item:hover h3 {
          color: #004a8e;
        }
      `}} />
    </section>
  );
}