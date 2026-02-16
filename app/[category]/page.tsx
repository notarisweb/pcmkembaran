import { getPostsByCategory } from "@/lib/sanity.query";
import Link from "next/link";
import Image from "next/image";

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
      {/* 1. HEADER KATEGORI */}
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
        /* 2. DAFTAR BERITA */
        <div className="news-list">
          {posts.map((post: any) => {
            const postLink = `/${category}/${post.slug}`;

            return (
              <Link href={postLink} key={post._id} className="news-item-row">
                {/* Thumbnail Gambar */}
                <div className="news-image-wrapper">
                  <Image 
                    src={post.image || "https://via.placeholder.com/280x160?text=No+Image"} 
                    alt={post.title} 
                    fill
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
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* 3. CSS RESPONSIVE (MEDIA QUERIES) */}
      <style dangerouslySetInnerHTML={{ __html: `
        .category-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 40px 15px;
          font-family: Arial, sans-serif;
        }
        .category-header {
          border-bottom: 3px solid #004a8e;
          margin-bottom: 40px;
          padding-bottom: 10px;
        }
        .category-title {
          font-size: 28px;
          color: #004a8e;
          fontWeight: 900;
          margin: 0;
        }
        .news-list {
          display: flex;
          flex-direction: column;
          gap: 35px;
        }
        .news-item-row {
          display: flex;
          gap: 25px;
          text-decoration: none;
          color: inherit;
          padding-bottom: 30px;
          border-bottom: 1px solid #f0f0f0;
          transition: opacity 0.2s;
        }
        .news-item-row:hover { opacity: 0.8; }
        
        .news-image-wrapper {
          width: 280px;
          height: 160px;
          flex-shrink: 0;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          background-color: #eee;
        }
        .news-content {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .news-title {
          font-size: 22px;
          font-weight: 800;
          line-height: 1.3;
          margin: 0 0 12px 0;
          color: #1a1a1a;
        }
        .news-excerpt {
          font-size: 15px;
          color: #555;
          margin: 0 0 15px 0;
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .news-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: auto;
        }
        .meta-label {
          font-size: 11px;
          background-color: #eef4ff;
          padding: 4px 10px;
          border-radius: 4px;
          color: #004a8e;
          font-weight: bold;
        }
        .meta-date { font-size: 12px; color: #999; }
        .empty-state { padding: 100px 0; text-align: center; color: #888; }
        .back-link { color: #004a8e; font-weight: bold; margin-top: 15px; display: inline-block; }

        /* === RESPONSIVE BREAKPOINT (HP) === */
        @media (max-width: 768px) {
          .category-container { padding: 20px 15px; }
          .news-item-row {
            flex-direction: column; /* Gambar pindah ke atas teks */
            gap: 15px;
            padding-bottom: 25px;
          }
          .news-image-wrapper {
            width: 100%; /* Gambar ambil lebar penuh */
            height: 200px;
          }
          .news-title { font-size: 18px; }
          .news-excerpt { -webkit-line-clamp: 3; } /* Tampilkan lebih banyak teks di HP */
        }
      `}} />
    </main>
  );
}