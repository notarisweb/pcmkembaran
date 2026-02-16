import { getNewsPosts } from "@/lib/sanity.query";
import Link from "next/link";

export default async function Headline() {
  // Mengambil berita terbaru dari Sanity (Kategori: Berita)
  const allNews = await getNewsPosts();
  const mainNews = allNews[0];
  
  // Berita terkait diambil dari index berikutnya
  const relatedNews = allNews.slice(1, 3);

  if (!mainNews) return null;

  return (
    <section style={{ 
      position: 'relative', 
      width: '100%', 
      borderRadius: '12px', 
      overflow: 'hidden', 
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      height: '480px' 
    }}>
      
      {/* 1. AREA UTAMA: GAMBAR DAN GRADIENT */}
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <img 
          src={mainNews.image || "https://via.placeholder.com/900/500?text=PCM+Kembaran"} 
          alt={mainNews.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        
        {/* Overlay Gradient: Background untuk teks agar terbaca jelas */}
        <div style={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          background: 'linear-gradient(to top, rgba(0,74,142,1) 0%, rgba(0,74,142,0.8) 45%, transparent 100%)',
          padding: '60px 30px 25px 30px',
          color: '#fff'
        }}>
          
          {/* 2. LINK JUDUL UTAMA: Jalur Dinamis /[category]/[slug] */}
          <Link href={`/${mainNews.category}/${mainNews.slug}`} style={{ textDecoration: 'none', color: '#fff' }}>
            <h2 style={{ 
              fontSize: '32px', 
              fontWeight: '900', 
              margin: '0 0 12px 0', 
              lineHeight: '1.2', 
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              cursor: 'pointer'
            }}>
              {mainNews.title}
            </h2>
          </Link>

          <span style={{ fontSize: '13px', opacity: 0.9, fontWeight: '500' }}>
            PCM Kembaran | {new Date(mainNews.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>

          {/* 3. AREA BERITA TERKAIT */}
          {relatedNews.length > 0 && (
            <div style={{ 
              marginTop: '25px', 
              paddingTop: '20px', 
              borderTop: '1px solid rgba(255,255,255,0.3)', 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '30px' 
            }}>
              {relatedNews.map((related: any) => (
                /* Jalur Dinamis: Menggunakan category asli dari data Sanity */
                <Link key={related._id} href={`/${related.category}/${related.slug}`} style={{ textDecoration: 'none', color: '#fff' }}>
                  <div style={{ cursor: 'pointer' }}>
                    <span style={{ 
                      color: 'var(--abah-gold)', 
                      fontSize: '11px', 
                      fontWeight: 'bold', 
                      display: 'block', 
                      marginBottom: '5px', 
                      textTransform: 'uppercase' 
                    }}>
                      {related.category} Terkait
                    </span>
                    <p style={{ 
                      fontSize: '14px', 
                      margin: 0, 
                      fontWeight: '700', 
                      lineHeight: '1.4', 
                      display: '-webkit-box', 
                      WebkitLineClamp: 2, 
                      WebkitBoxOrient: 'vertical', 
                      overflow: 'hidden' 
                    }}>
                      {related.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}