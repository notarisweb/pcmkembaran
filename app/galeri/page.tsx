import { client } from "@/lib/sanity.client";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";
// IMPOR KOMPONEN CLIENT UNTUK POPUP
import GalleryTrigger from "@/components/GalleryTrigger";

// 1. KONFIGURASI VIEWPORT (Standar Next.js 15)
export const viewport = {
  themeColor: "#004a8e",
  width: "device-width",
  initialScale: 1,
};

// 2. FUNGSI AMBIL DATA DARI SANITY
async function getGalleryData() {
  const query = `*[_type == "gallery" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id, 
    title, 
    publishedAt,
    "slug": slug.current,
    "imageUrl": image.asset->url
  }`;
  
  try {
    // Menggunakan revalidasi 60 detik agar data tetap segar
    return await client.fetch(query, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error("Gagal ambil data galeri:", error);
    return [];
  }
}

// 3. METADATA HALAMAN
export const metadata: Metadata = {
  title: "Galeri Kegiatan - PCM Kembaran",
  description: "Dokumentasi foto kegiatan resmi dan dakwah Pimpinan Cabang Muhammadiyah Kembaran.",
};

export default async function GaleriPage() {
  const posts = await getGalleryData();

  return (
    <main className="pcm-galeri-premium">
      <div className="pcm-max-container">
        {/* BREADCRUMB */}
        <nav className="pcm-bread">
          <Link href="/">Home</Link> <span>/</span> <span className="pcm-blue-txt">Galeri</span>
        </nav>

        <header className="pcm-header-section">
          <h1 className="pcm-h1">GALERI KEGIATAN</h1>
          <div className="pcm-gold-bar"></div>
        </header>

        {posts && posts.length > 0 ? (
          /* 4. GRID SISTEM GALERI */
          <div className="pcm-galeri-grid">
            {posts.map((post: any) => {
              const finalImageUrl = post.imageUrl || "/logo-md.png";
              
              return (
                <GalleryTrigger key={post._id} imageUrl={finalImageUrl} title={post.title}>
                  <div className="pcm-galeri-card group">
                    <div className="pcm-img-container">
                      {/* Menggunakan Next.js Image untuk optimasi otomatis */}
                      <Image 
                        src={finalImageUrl} 
                        alt={post.title} 
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="pcm-main-img"
                      />
                      
                      {/* OVERLAY ICON (MUNCUL SAAT HOVER) */}
                      <div className="pcm-overlay-eye">
                        <div className="pcm-icon-circle">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        </div>
                        <span>Lihat Foto</span>
                      </div>
                    </div>

                    <div className="pcm-galeri-info">
                      <h3 className="pcm-item-title">{post.title}</h3>
                      <div className="pcm-item-meta">
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        <span>
                          {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : 'Terbaru'}
                        </span>
                      </div>
                    </div>
                  </div>
                </GalleryTrigger>
              );
            })}
          </div>
        ) : (
          <div className="pcm-empty-state">
            <div className="pcm-empty-icon">📸</div>
            <p>Belum ada dokumentasi foto yang diunggah.</p>
            <Link href="/" className="pcm-btn-back">Kembali ke Beranda</Link>
          </div>
        )}
      </div>

      {/* 5. CSS STYLES (PREMIUM LOOK) */}
      <style dangerouslySetInnerHTML={{ __html: `
        :root { --pcm-blue: #004a8e; --pcm-gold: #ffc107; }
        .pcm-galeri-premium { background: #fafafa; padding-bottom: 80px; }
        .pcm-max-container { max-width: 1200px; margin: 0 auto; padding: 40px 20px; font-family: sans-serif; min-height: 80vh; }
        
        .pcm-bread { font-size: 12px; color: #94a3b8; margin-bottom: 25px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
        .pcm-blue-txt { color: var(--pcm-blue); }
        
        .pcm-header-section { margin-bottom: 50px; }
        .pcm-h1 { font-size: clamp(30px, 5vw, 42px); font-weight: 900; margin: 0; color: #0f172a; letter-spacing: -1px; }
        .pcm-gold-bar { width: 60px; height: 6px; background: var(--pcm-gold); margin-top: 15px; border-radius: 10px; }

        /* GRID SYSTEM */
        .pcm-galeri-grid { 
          display: grid; 
          grid-template-columns: repeat(3, 1fr); 
          gap: 30px; 
        }
        
        /* CARD DESIGN */
        .pcm-galeri-card { 
          background: #fff; border-radius: 24px; overflow: hidden; 
          border: 1px solid #e2e8f0; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
          height: 100%; display: flex; flex-direction: column; cursor: pointer;
        }
        .pcm-galeri-card:hover { transform: translateY(-10px); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); border-color: var(--pcm-blue); }

        /* IMAGE CONTAINER */
        .pcm-img-container { aspect-ratio: 1/1; overflow: hidden; position: relative; background: #f1f5f9; }
        .pcm-main-img { transition: transform 0.6s ease; }
        .pcm-galeri-card:hover .pcm-main-img { transform: scale(1.1); }
        
        /* OVERLAY */
        .pcm-overlay-eye { 
          position: absolute; inset: 0; background: rgba(0, 74, 142, 0.7); 
          display: flex; flex-direction: column; align-items: center; 
          justify-content: center; color: #fff; opacity: 0; transition: 0.3s ease; 
          backdrop-filter: blur(4px); gap: 12px; 
        }
        .pcm-icon-circle { background: #fff; color: var(--pcm-blue); padding: 12px; border-radius: 50%; display: flex; }
        .pcm-overlay-eye span { font-weight: 800; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; }
        .pcm-galeri-card:hover .pcm-overlay-eye { opacity: 1; }

        /* INFO AREA */
        .pcm-galeri-info { padding: 25px; flex-grow: 1; display: flex; flex-direction: column; }
        .pcm-item-title { font-size: 17px; font-weight: 800; margin: 0 0 12px 0; line-height: 1.5; color: #1e293b; }
        .pcm-item-meta { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #64748b; font-weight: 600; margin-top: auto; }
        
        /* EMPTY STATE */
        .pcm-empty-state { 
          text-align: center; padding: 100px 20px; border: 3px dashed #e2e8f0; 
          border-radius: 30px; background: #fff; 
        }
        .pcm-empty-icon { font-size: 60px; margin-bottom: 20px; }
        .pcm-btn-back { 
          display: inline-block; margin-top: 25px; background: var(--pcm-blue); 
          color: #fff; padding: 12px 30px; border-radius: 50px; 
          text-decoration: none; font-weight: 800; transition: 0.3s; 
        }

        @media (max-width: 992px) { .pcm-galeri-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { 
          .pcm-galeri-grid { grid-template-columns: 1fr; gap: 20px; } 
          .pcm-max-container { padding: 30px 15px; }
        }
      `}} />
    </main>
  );
}