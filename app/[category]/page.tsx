import { getPostsByCategory } from "@/lib/sanity.query";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

// 1. GENERATE METADATA DINAMIS
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ category: string }> 
}): Promise<Metadata> {
  const { category } = await params;
  const categoryTitle = category.replace(/-/g, ' ').toUpperCase();
  
  return {
    title: `${categoryTitle} - PCM Kembaran`,
    description: `Kumpulan informasi dan berita terbaru mengenai ${categoryTitle} di PCM Kembaran.`,
  };
}

export default async function CategoryPage({ 
  params 
}: { 
  params: Promise<{ category: string }> 
}) {
  const { category } = await params;
  const posts = await getPostsByCategory(category);
  const categoryTitle = category.replace(/-/g, ' ').toUpperCase();

  return (
    <main className="category-container">
      {/* 1. BREADCRUMB */}
      <nav className="breadcrumb">
        <Link href="/" className="breadcrumb-link">Home</Link>
        <span className="mx-2">/</span>
        <span className="breadcrumb-current">{categoryTitle}</span>
      </nav>

      {/* 2. HEADER KATEGORI */}
      <div className="category-header">
        <h1 className="category-title">{categoryTitle}</h1>
      </div>

      {posts.length === 0 ? (
        <div className="empty-state">
          <div style={{ fontSize: '60px', marginBottom: '20px' }}>📂</div>
          <p>Belum ada postingan untuk kategori <strong>{categoryTitle}</strong>.</p>
          <Link href="/" className="back-link">Kembali ke Beranda</Link>
        </div>
      ) : (
        /* 3. DAFTAR BERITA */
        <div className="news-list">
          {posts.map((post: any) => {
            // PERBAIKAN: post.slug di sini sudah string murni dari query
            const postLink = `/${category}/${post.slug}`;

            return (
              <Link href={postLink} key={post._id} className="news-item-row">
                {/* Thumbnail Gambar */}
                <div className="news-image-wrapper">
                  <Image 
                    src={post.image || "https://pcmkembaran.com/logo-md.png"} 
                    alt={post.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, 280px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                {/* Konten Teks */}
                <div className="news-content">
                  <h2 className="news-title">{post.title}</h2>
                  
                  {post.excerpt && (
                    <p className="news-excerpt">{post.excerpt}</p>
                  )}

                  <div className="news-meta">
                     <span className="meta-label">{categoryTitle}</span>
                     <span className="meta-date">
                      {new Date(post.publishedAt).toLocaleDateString('id-ID', { 
                        day: 'numeric', month: 'long', year: 'numeric' 
                      })}
                    </span>
                    <span className="meta-sep">•</span>
                    <span className="meta-views">{post.views || 0} Dilihat</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* 4. CSS STYLES */}
      <style dangerouslySetInnerHTML={{ __html: `
        :root { --abah-blue: #004a8e; --abah-gold: #ffc107; }
        .category-container { max-width: 1100px; margin: 40px auto; padding: 0 15px; font-family: sans-serif; }
        
        .breadcrumb { font-size: 13px; color: #888; margin-bottom: 20px; display: flex; align-items: center; }
        .breadcrumb-link { text-decoration: none; color: #888; transition: 0.2s; }
        .breadcrumb-link:hover { color: var(--abah-blue); }
        .breadcrumb-current { color: #333; font-weight: bold; }

        .category-header { border-bottom: 4px solid var(--abah-blue); margin-bottom: 45px; padding-bottom: 12px; }
        .category-title { font-size: 32px; color: var(--abah-blue); font-weight: 900; margin: 0; }
        
        .news-list { display: flex; flex-direction: column; gap: 30px; }
        .news-item-row { 
          display: flex; gap: 30px; text-decoration: none; color: inherit; 
          padding-bottom: 30px; border-bottom: 1px solid #f1f1f1; transition: 0.2s;
        }
        .news-item-row:hover { background-color: #fafafa; }
        
        .news-image-wrapper { 
          width: 280px; height: 170px; flex-shrink: 0; border-radius: 12px; 
          overflow: hidden; position: relative; background: #eee; box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
        
        .news-content { display: flex; flex-direction: column; flex: 1; padding: 5px 0; }
        .news-title { 
          font-size: 22px; font-weight: 800; line-height: 1.3; 
          margin: 0 0 12px 0; color: #111; transition: 0.2s; 
        }
        .news-item-row:hover .news-title { color: var(--abah-blue); }
        
        .news-excerpt { 
          font-size: 15px; color: #555; margin-bottom: 15px; line-height: 1.6;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        
        .news-meta { display: flex; align-items: center; gap: 12px; margin-top: auto; }
        .meta-label { 
          font-size: 10px; background-color: #eef4ff; padding: 4px 10px; 
          border-radius: 4px; color: var(--abah-blue); font-weight: 900; 
        }
        .meta-date { font-size: 12px; color: #999; }
        .meta-sep { color: #ddd; }
        .meta-views { font-size: 12px; color: var(--abah-blue); font-weight: bold; }

        .empty-state { padding: 120px 0; text-align: center; color: #888; border: 2px dashed #eee; border-radius: 20px; }
        .back-link { color: var(--abah-blue); font-weight: 800; text-decoration: none; margin-top: 15px; display: inline-block; border-bottom: 2px solid var(--abah-blue); }

        @media (max-width: 768px) {
          .news-item-row { flex-direction: column; gap: 15px; }
          .news-image-wrapper { width: 100%; height: 210px; }
          .news-title { font-size: 18px; }
          .news-excerpt { -webkit-line-clamp: 3; }
        }
      `}} />
    </main>
  );
}