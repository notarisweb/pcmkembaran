import { getAllPosts } from "@/lib/sanity.query"; 
import Link from "next/link";

export default async function LatestPosts() {
  // 1. Mengambil data dari Sanity (Project ID: deyoeizv)
  const posts = await getAllPosts();

  return (
    <section style={{ paddingBottom: '50px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {/* LIST POSTINGAN: Tanpa Header h2 agar tidak dobel */}
        {posts.map((post: any) => {
          // Logika rute dinamis: /[category]/[slug]
          const categoryPath = post.category?.toLowerCase().replace(/\s+/g, '-') || "artikel";
          
          return (
            <Link 
              href={`/${categoryPath}/${post.slug}`} 
              key={post._id} 
              style={{ display: 'flex', gap: '20px', textDecoration: 'none', alignItems: 'flex-start' }}
              className="post-card-item"
            >
              {/* THUMBNAIL */}
              <div style={{ 
                width: '200px', 
                height: '125px', 
                borderRadius: '10px', 
                overflow: 'hidden', 
                flexShrink: 0,
                backgroundColor: '#f8f9fa',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <img 
                  src={post.image || "/logo-md.png"} 
                  alt={post.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>

              {/* KONTEN TEKS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ 
                  fontSize: '11px', 
                  color: post.category?.toLowerCase() === 'berita' ? '#e64d31' : 'var(--abah-blue)', 
                  fontWeight: '800', 
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {post.category}
                </span>
                
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: '800', 
                  color: '#1a1a1a', 
                  margin: 0, 
                  lineHeight: '1.4'
                }}>
                  {post.title}
                </h3>
                
                {/* METADATA: TANGGAL & VIEWS (Editable Admin) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#999' }}>
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                  <span>•</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <span style={{ color: 'var(--abah-gold)', fontWeight: '700' }}>
                      {post.views || 0} Kali Dibaca
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}

        {/* Fallback jika kosong */}
        {posts.length === 0 && (
           <p style={{ color: '#888', textAlign: 'center', padding: '40px' }}>
             Belum ada postingan terbaru dari PCM Kembaran.
           </p>
        )}
      </div>

      {/* TOMBOL INDEKS */}
      <div style={{ marginTop: '40px' }}>
        <Link href="/berita" style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '10px', 
          backgroundColor: 'var(--abah-blue)', 
          color: '#fff', 
          padding: '12px 25px', 
          borderRadius: '8px', 
          textDecoration: 'none', 
          fontWeight: '900', 
          fontSize: '13px',
          textTransform: 'uppercase',
          boxShadow: '0 4px 12px rgba(0,74,142,0.2)'
        }}>
          Indeks Berita PCM <span style={{ fontSize: '18px' }}>➔</span>
        </Link>
      </div>
    </section>
  );
}