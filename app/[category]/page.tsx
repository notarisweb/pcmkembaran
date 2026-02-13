import { getPostsByCategory } from "@/lib/sanity.query";
import Link from "next/link";

/**
 * Komponen Halaman Kategori
 * Menampilkan daftar artikel berdasarkan kategori yang dipilih di URL.
 */
export default async function CategoryPage({ 
  params 
}: { 
  params: Promise<{ category: string }> 
}) {
  // Pada Next.js 15, params harus di-await sebelum diakses
  const { category } = await params;
  
  // Mengambil data artikel secara dinamis dari Sanity berdasarkan kategori
  const posts = await getPostsByCategory(category);
  
  // Format Judul Tampilan: 'fiqih-praktis' -> 'FIQIH PRAKTIS'
  const categoryTitle = category.replace(/-/g, ' ').toUpperCase();

  return (
    <main className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 15px' }}>
      
      {/* Header Kategori: Gaya khas portal berita dengan border biru */}
      <div style={{ borderBottom: '2px solid #004a8e', marginBottom: '30px', paddingBottom: '10px' }}>
        <h1 style={{ fontSize: '24px', color: '#004a8e', fontWeight: 'bold', margin: 0 }}>
          {categoryTitle}
        </h1>
      </div>

      {posts.length === 0 ? (
        /* State Tampilan jika kategori masih kosong */
        <div style={{ padding: '80px 0', textAlign: 'center', color: '#888' }}>
          <div style={{ fontSize: '50px', marginBottom: '20px' }}>📂</div>
          <p>Belum ada postingan untuk kategori <strong>{categoryTitle}</strong>.</p>
          <Link href="/" style={{ color: '#004a8e', textDecoration: 'underline', marginTop: '10px', display: 'inline-block' }}>
            Kembali ke Beranda
          </Link>
        </div>
      ) : (
        /* Daftar Berita Vertikal */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          {posts.map((post: any) => (
            <Link 
              href={`/artikel/${post.slug}`} 
              key={post._id} 
              style={{ 
                display: 'flex', 
                gap: '25px', 
                textDecoration: 'none', 
                color: 'inherit', 
                borderBottom: '1px solid #f0f0f0', 
                paddingBottom: '25px' 
              }}
            >
              {/* Thumbnail Gambar Dinamis */}
              <div style={{ 
                width: '240px', 
                height: '140px', 
                flexShrink: 0, 
                borderRadius: '8px', 
                overflow: 'hidden', 
                backgroundColor: '#eee',
                position: 'relative'
              }}>
                <img 
                  src={post.image || "https://via.placeholder.com/240x140?text=No+Image"} 
                  alt={post.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>

              {/* Konten Teks */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
                <h2 style={{ 
                  fontSize: '22px', 
                  fontWeight: 'bold', 
                  lineHeight: '1.3', 
                  margin: '0 0 10px 0', 
                  color: '#333',
                  transition: 'color 0.2s'
                }}>
                  {post.title}
                </h2>
                
                {/* Deskripsi singkat (Excerpt) */}
                {post.excerpt && (
                  <p style={{ 
                    fontSize: '14px', 
                    color: '#666', 
                    margin: '0 0 12px 0', 
                    lineHeight: '1.5', 
                    display: '-webkit-box', 
                    WebkitLineClamp: 2, 
                    WebkitBoxOrient: 'vertical', 
                    overflow: 'hidden' 
                  }}>
                    {post.excerpt}
                  </p>
                )}

                {/* Meta Data: Kategori & Tanggal Rilis */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                   <span style={{ fontSize: '11px', backgroundColor: '#f0f0f0', padding: '2px 8px', borderRadius: '4px', color: '#004a8e', fontWeight: 'bold' }}>
                     {category.toUpperCase()}
                   </span>
                   <span style={{ fontSize: '12px', color: '#888' }}>
                    {new Date(post.publishedAt).toLocaleDateString('id-ID', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}