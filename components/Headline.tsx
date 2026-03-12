import { getNewsPosts } from "@/lib/sanity.query";
import Link from "next/link";
// 1. IMPOR KOMPONEN IMAGE UNTUK OPTIMASI LCP
import Image from "next/image";

export default async function Headline() {
  const allNews = await getNewsPosts();
  const mainNews = allNews?.[0];
  const relatedNews = allNews?.slice(1, 3);

  if (!mainNews) return null;

  return (
    <section style={{ 
      position: 'relative', 
      width: '100%', 
      borderRadius: '16px', 
      overflow: 'hidden', 
      boxShadow: '0 10px 30px rgba(0,74,142,0.15)',
      height: '480px',
      backgroundColor: '#004a8e' 
    }}>
      
      {/* 1. OPTIMASI GAMBAR UTAMA (LCP ELEMENT) */}
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <Image 
          src={mainNews.image || "/logo-md.png"} 
          alt={mainNews.title} 
          fill
          // Priority memberitahu browser untuk mendownload gambar ini SEGERA
          priority 
          sizes="(max-width: 1200px) 100vw, 900px"
          style={{ objectFit: 'cover' }}
          className="headline-img"
        />
        
        {/* Overlay Gradient Premium */}
        <div style={{ 
          position: 'absolute', 
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,74,142,1) 0%, rgba(0,74,142,0.6) 40%, transparent 100%)',
          padding: '60px 40px 35px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          color: '#fff'
        }}>
          
          {/* 2. KONTEN UTAMA */}
          <Link 
            // Menggunakan slug string murni sesuai perbaikan query
            href={`/${mainNews.category?.toLowerCase() || 'berita'}/${mainNews.slug}`} 
            style={{ textDecoration: 'none', color: '#fff' }}
          >
            <h2 style={{ 
              fontSize: 'clamp(24px, 4vw, 36px)', 
              fontWeight: '900', 
              margin: '0 0 15px 0', 
              lineHeight: '1.2', 
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
              cursor: 'pointer'
            }}>
              {mainNews.title}
            </h2>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: '600', opacity: 0.9 }}>
            <span style={{ color: '#ffc107' }}>PCM KEMBARAN</span>
            <span>•</span>
            <span suppressHydrationWarning>
              {new Date(mainNews.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>

          {/* 3. AREA BERITA TERKAIT */}
          {relatedNews?.length > 0 && (
            <div className="headline-related" style={{ 
              marginTop: '30px', 
              paddingTop: '25px', 
              borderTop: '1px solid rgba(255,255,255,0.2)', 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '40px' 
            }}>
              {relatedNews.map((related: any) => (
                <Link 
                  key={related._id} 
                  href={`/${related.category?.toLowerCase() || 'berita'}/${related.slug}`} 
                  style={{ textDecoration: 'none', color: '#fff' }}
                >
                  <div style={{ cursor: 'pointer' }} className="related-hover">
                    <span style={{ 
                      color: '#ffc107', // Gold PCM
                      fontSize: '11px', 
                      fontWeight: '800', 
                      display: 'block', 
                      marginBottom: '6px', 
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      {related.category} Terkait
                    </span>
                    <p style={{ 
                      fontSize: '15px', 
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

      <style dangerouslySetInnerHTML={{ __html: `
        .related-hover { transition: 0.3s; }
        .related-hover:hover { transform: translateX(5px); opacity: 0.8; }
        @media (max-width: 768px) {
          .headline-related { display: none !important; }
        }
      `}} />
    </section>
  );
}