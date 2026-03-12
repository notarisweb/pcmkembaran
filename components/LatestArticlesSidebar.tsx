import Link from "next/link";
import { getArticlePosts } from "@/lib/sanity.query";

export default async function LatestArticlesSidebar() {
  // 1. Mengambil data artikel pilihan dari Sanity (Project ID: deyoeizv)
  const articles = await getArticlePosts();

  /** * PALET WARNA IDENTITAS PCM 
   * Menggunakan variasi opasitas pada warna emas dan putih agar tetap harmonis 
   * dengan latar belakang biru gelap.
   */
  const rankColors = [
    'rgba(255, 193, 7, 0.6)',  // 01: Gold Utama
    'rgba(255, 255, 255, 0.5)', // 02: Putih Kristal
    'rgba(255, 193, 7, 0.4)',  // 03: Gold Muda
    'rgba(255, 255, 255, 0.3)', // 04: Putih Transparan
    'rgba(255, 193, 7, 0.2)',  // 05: Gold Halus
  ];

  return (
    <div style={{ 
      backgroundColor: '#004a8e', // Biru PCM Resmi
      borderRadius: '20px', 
      padding: '35px 25px', 
      color: '#fff',
      boxShadow: '0 15px 35px rgba(0,74,142,0.25)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid rgba(255,255,255,0.05)'
    }}>
      {/* HEADER SIDEBAR */}
      <div style={{ 
        borderBottom: '2px solid #ffc107', 
        paddingBottom: '18px', 
        marginBottom: '30px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{ fontSize: '20px', filter: 'drop-shadow(0 0 8px rgba(255,193,7,0.5))' }}>⭐</div>
        <h4 style={{ 
          color: '#ffc107', 
          fontSize: '17px', 
          fontWeight: '900', 
          margin: 0,
          textTransform: 'uppercase',
          letterSpacing: '1.5px'
        }}>
          Artikel Pilihan
        </h4>
      </div>

      {/* LIST ARTIKEL DENGAN PERBAIKAN RUTE */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {articles?.slice(0, 5).map((item: any, index: number) => {
          // Logika pembersihan URL: /[category]/[slug]
          const categoryPath = item.category?.toLowerCase().replace(/\s+/g, '-') || "artikel";
          const fullPath = `/${categoryPath}/${item.slug}`;

          return (
            <Link 
              href={fullPath} 
              key={item._id} 
              className="article-sidebar-link"
              style={{ 
                textDecoration: 'none', 
                color: '#fff', 
                display: 'flex',
                alignItems: 'center', 
                gap: '20px',
                padding: '15px 0',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                transition: 'all 0.3s ease'
              }}
            >
              {/* ANGKA URUTAN TEBAL */}
              <span style={{ 
                fontSize: '40px', 
                fontWeight: '900', 
                color: rankColors[index] || 'rgba(255,255,255,0.2)', 
                lineHeight: '1',
                minWidth: '55px',
                fontStyle: 'italic',
                fontFamily: 'sans-serif'
              }}>
                0{index + 1}
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <h5 style={{ 
                  fontSize: '14.5px', 
                  fontWeight: '700', 
                  lineHeight: '1.5', 
                  margin: 0,
                  color: '#ffffff',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {item.title}
                </h5> 

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px', opacity: 0.7, fontWeight: '600' }}>
                  {/* FIX HYDRATION: Menghindari ketidakcocokan waktu server-client */}
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
                    <span style={{ color: '#ffc107', fontWeight: '800' }}>
                      {item.views || 0}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* TOMBOL LIHAT SEMUA */}
      <div style={{ marginTop: 'auto', paddingTop: '35px' }}>
        <Link href="/artikel" className="btn-sidebar-all">
          Semua Artikel ❯
        </Link>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .article-sidebar-link:hover { transform: translateX(8px); }
        .article-sidebar-link:hover h5 { color: #ffc107 !important; }
        
        .btn-sidebar-all {
          display: block;
          text-align: center;
          background-color: #ffc107;
          color: #004a8e;
          padding: 15px;
          border-radius: 12px;
          fontSize: 13px;
          font-weight: 900;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.25);
          transition: all 0.3s ease;
        }
        .btn-sidebar-all:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(255, 193, 7, 0.4);
          background-color: #ffffff;
        }
      `}} />
    </div>
  );
}