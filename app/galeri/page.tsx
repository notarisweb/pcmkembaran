import { client } from "@/lib/sanity.client";
import Link from "next/link";
import { Metadata } from "next";
// IMPOR KOMPONEN BARU KITA
import GalleryTrigger from "@/components/GalleryTrigger";

// --- FUNGSI AMBIL DATA (Sama seperti sebelumnya karena sudah berhasil) ---
async function getGalleryData() {
  // Menggunakan tipe "gallery" sesuai schema Anda
  const query = `*[_type == "gallery" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id, title, publishedAt,
    "slug": slug.current,
    // Ambil URL gambar kualitas tinggi untuk popup
    "imageUrl": image.asset->url
  }`;
  
  try {
    return await client.fetch(query, {}, { cache: 'no-store' });
  } catch (error) {
    console.error("Gagal ambil data:", error);
    return [];
  }
}

export const metadata: Metadata = {
  title: "Galeri Foto - PCM Kembaran",
  description: "Dokumentasi kegiatan resmi PCM Kembaran",
};

export default async function GaleriPage() {
  const posts = await getGalleryData();

  return (
    <main className="pcm-galeri-premium">
      <div className="pcm-max-container">
        <nav className="pcm-bread"><Link href="/">Home</Link> / <span className="pcm-blue-txt">Galeri</span></nav>
        <header><h1 className="pcm-h1">GALERI KEGIATAN</h1><div className="pcm-gold-bar"></div></header>

        {posts && posts.length > 0 ? (
          <div className="pcm-galeri-grid-system">
            {posts.map((post: any) => {
              // Siapkan URL gambar (pakai placeholder jika kosong)
              const finalImageUrl = post.imageUrl || "/logo-md.png";
              
              return (
                // BUNGKUS KARTU DENGAN TRIGGER KLIK
                <GalleryTrigger key={post._id} imageUrl={finalImageUrl} title={post.title}>
                  
                  {/* TAMPILAN KARTU (DESAIN YANG SUDAH JADI) */}
                  <div className="pcm-galeri-item-card group">
                    <div className="pcm-img-frame">
                      <img src={finalImageUrl} alt={post.title} loading="lazy" />
                      {/* Overlay Icon Mata */}
                      <div className="pcm-overlay-eye">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        <span>Perbesar</span>
                      </div>
                    </div>
                    <div className="pcm-galeri-meta">
                      <h3 className="pcm-item-h3">{post.title}</h3>
                      <span className="pcm-date-small">
                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : 'Terbaru'}
                      </span>
                    </div>
                  </div>

                </GalleryTrigger>
              );
            })}
          </div>
        ) : (
          <div className="pcm-empty-debug"><p>Data galeri belum tersedia.</p></div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        :root { --pcm-blue: #004a8e; --pcm-gold: #ffc107; }
        .pcm-max-container { max-width: 1200px; margin: 40px auto; padding: 0 20px; font-family: sans-serif; min-height: 80vh; }
        .pcm-bread { font-size: 13px; color: #888; margin-bottom: 20px; font-weight: 700; text-transform: uppercase; }
        .pcm-blue-txt { color: var(--pcm-blue); }
        .pcm-h1 { font-size: 42px; font-weight: 900; margin: 0; color: #1a1a1a; }
        .pcm-gold-bar { width: 80px; height: 5px; background: var(--pcm-gold); margin: 15px 0 50px; border-radius: 10px; }

        /* GRID SYSTEM */
        .pcm-galeri-grid-system { display: grid !important; grid-template-columns: repeat(3, 1fr) !important; gap: 30px !important; }
        
        /* CARD DESIGN */
        .pcm-galeri-item-card { background: #fff; border-radius: 20px; overflow: hidden; border: 1px solid #eee; box-shadow: 0 5px 15px rgba(0,0,0,0.05); transition: all 0.3s ease; height: 100%; display: flex; flex-direction: column; }
        .pcm-galeri-item-card:hover { transform: translateY(-7px); box-shadow: 0 15px 30px rgba(0,0,0,0.1); border-color: var(--pcm-blue); }

        /* IMAGE FRAME & OVERLAY */
        .pcm-img-frame { aspect-ratio: 1/1; overflow: hidden; background: #f0f0f0; position: relative; }
        .pcm-img-frame img { width: 100%; height: 100%; object-fit: cover; transition: 0.5s ease; }
        .pcm-galeri-item-card:hover .pcm-img-frame img { transform: scale(1.1); }
        
        .pcm-overlay-eye { position: absolute; inset: 0; background: rgba(0,74,142,0.6); display: flex; flex-direction: column; align-items: center; justify-content: center; color: #fff; opacity: 0; transition: 0.3s ease; backdrop-filter: blur(2px); gap: 10px; }
        .pcm-overlay-eye span { font-weight: 800; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
        .pcm-galeri-item-card:hover .pcm-overlay-eye { opacity: 1; }

        /* META INFO */
        .pcm-galeri-meta { padding: 20px; flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between; }
        .pcm-item-h3 { font-size: 16px; font-weight: 800; margin: 0 0 10px 0; line-height: 1.4; color: #1a1a1a; }
        .pcm-date-small { font-size: 12px; color: #999; font-weight: 600; }
        
        .pcm-empty-debug { text-align: center; padding: 100px 20px; border: 2px dashed #ddd; border-radius: 20px; }

        @media (max-width: 992px) { .pcm-galeri-grid-system { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .pcm-galeri-grid-system { grid-template-columns: 1fr !important; } .pcm-h1 { font-size: 30px; } }
      `}} />
    </main>
  );
}