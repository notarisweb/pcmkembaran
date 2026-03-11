import { getAllPosts } from "@/lib/sanity.query"; 
import Link from "next/link";
// 1. IMPOR KOMPONEN IMAGE UNTUK OPTIMASI
import Image from "next/image";

export default async function LatestPosts() {
  const posts = await getAllPosts();

  return (
    <section style={{ paddingBottom: '50px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {posts.map((post: any) => {
          // Logika rute dinamis: /[category]/[slug]
          const categoryPath = post.category?.toLowerCase().replace(/\s+/g, '-') || "artikel";
          
          return (
            <Link 
              href={`/${categoryPath}/${post.slug}`} 
              key={post._id} 
              className="post-card-item-horizontal"
            >
              {/* 2. THUMBNAIL OPTIMIZED */}
              <div className="thumb-wrapper">
                <Image 
                  src={post.image || "/logo-md.png"} 
                  alt={post.title} 
                  fill
                  // Mengunduh gambar sesuai ukuran elemen (200px)
                  sizes="(max-width: 768px) 100vw, 200px"
                  style={{ objectFit: 'cover' }} 
                />
              </div>

              {/* 3. KONTEN TEKS PREMIUM */}
              <div className="post-text-content">
                <span className="post-cat-label" style={{ 
                  color: post.category?.toLowerCase() === 'berita' ? '#e64d31' : '#004a8e' 
                }}>
                  {post.category}
                </span>
                
                <h3 className="post-item-title">
                  {post.title}
                </h3>
                
                {/* METADATA */}
                <div className="post-meta-row">
                  <span suppressHydrationWarning>
                    {new Date(post.publishedAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                  <span className="meta-dot">•</span>
                  <div className="post-views-box">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <span className="gold-views">
                      {post.views || 0} Kali Dibaca
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}

        {posts.length === 0 && (
           <p className="empty-msg">Belum ada postingan terbaru dari PCM Kembaran.</p>
        )}
      </div>

      {/* 4. TOMBOL INDEKS */}
      <div style={{ marginTop: '40px' }}>
        <Link href="/berita" className="btn-indeks">
          Indeks Berita PCM <span>➔</span>
        </Link>
      </div>

      {/* CSS INTERNAL UNTUK KERAPIHAN RESPONSIVE */}
      <style dangerouslySetInnerHTML={{ __html: `
        .post-card-item-horizontal { 
          display: flex; gap: 20px; text-decoration: none; align-items: flex-start; 
          transition: 0.3s;
        }
        .post-card-item-horizontal:hover { opacity: 0.7; }
        
        .thumb-wrapper { 
          width: 200px; height: 125px; border-radius: 12px; overflow: hidden; 
          flex-shrink: 0; background: #f8f9fa; position: relative;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        .post-text-content { display: flex; flex-direction: column; gap: 6px; }
        .post-cat-label { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; }
        .post-item-title { font-size: 18px; font-weight: 800; color: #1a1a1a; margin: 0; line-height: 1.4; }
        
        .post-meta-row { display: flex; align-items: center; gap: 12px; font-size: 12px; color: #999; font-weight: 600; }
        .meta-dot { color: #ddd; }
        .post-views-box { display: flex; align-items: center; gap: 4px; }
        .gold-views { color: #ffc107; font-weight: 800; }

        .btn-indeks { 
          display: inline-flex; alignItems: center; gap: 10px; background: #004a8e; 
          color: #fff; padding: 12px 28px; border-radius: 10px; text-decoration: none; 
          font-weight: 900; font-size: 13px; text-transform: uppercase;
          box-shadow: 0 8px 15px rgba(0,74,142,0.2); transition: 0.3s;
        }
        .btn-indeks:hover { transform: translateY(-3px); box-shadow: 0 12px 20px rgba(0,74,142,0.3); }

        .empty-msg { color: #888; text-align: center; padding: 40px; border: 1px dashed #ddd; border-radius: 15px; }

        @media (max-width: 640px) {
          .post-card-item-horizontal { flex-direction: column; gap: 15px; }
          .thumb-wrapper { width: 100%; height: 180px; }
        }
      `}} />
    </section>
  );
}