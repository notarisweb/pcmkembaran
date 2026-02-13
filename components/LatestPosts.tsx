// Ganti import fungsi ke getAllPosts agar semua kategori muncul
import { getAllPosts } from "@/lib/sanity.query"; 
import Link from "next/link";

export default async function LatestPosts() {
  // Mengambil SEMUA data postingan terbaru (Berita, Artikel, Khutbah, dll)
  const posts = await getAllPosts();

  return (
    <section style={{ marginTop: '40px', paddingBottom: '50px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '30px' }}>
        
        {/* KIRI: DAFTAR POSTINGAN VERTIKAL DINAMIS */}
        <div>
          <h2 style={{ 
            fontSize: '20px', 
            color: '#004a8e', 
            fontWeight: 'bold', 
            marginBottom: '25px', 
            borderBottom: '2px solid #004a8e', 
            display: 'inline-block', 
            paddingBottom: '5px' 
          }}>
            Postingan Terbaru
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            {posts.map((post: any) => (
              <Link 
                href={`/artikel/${post.slug}`} 
                key={post._id} 
                style={{ display: 'flex', gap: '20px', textDecoration: 'none', alignItems: 'flex-start' }}
              >
                {/* Gambar Thumbnail Dinamis */}
                <div style={{ 
                  width: '180px', 
                  height: '110px', 
                  borderRadius: '6px', 
                  overflow: 'hidden', 
                  flexShrink: 0,
                  backgroundColor: '#f0f0f0'
                }}>
                  <img 
                    src={post.image || "https://via.placeholder.com/300/200?text=No+Image"} 
                    alt={post.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>

                {/* Teks Konten Dinamis */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {/* Label Kategori Otomatis - Warna Hijau jika Artikel, Merah jika Berita */}
                  <span style={{ 
                    fontSize: '11px', 
                    color: post.category === 'berita' ? '#e64d31' : '#28a745', 
                    fontWeight: 'bold', 
                    textTransform: 'uppercase' 
                  }}>
                    {post.category}
                  </span>
                  
                  <h3 style={{ 
                    fontSize: '17px', 
                    fontWeight: 'bold', 
                    color: '#333', 
                    margin: 0, 
                    lineHeight: '1.4',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {post.title}
                  </h3>
                  
                  <span style={{ fontSize: '12px', color: '#888' }}>
                    {new Date(post.publishedAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </Link>
            ))}

            {/* Jika belum ada konten */}
            {posts.length === 0 && (
               <p style={{ color: '#888' }}>Belum ada postingan terbaru.</p>
            )}
          </div>

          {/* Tombol Indeks Berita Dinamis */}
          <div style={{ marginTop: '40px' }}>
            <Link href="/berita" style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              backgroundColor: '#e64d31', 
              color: '#fff', 
              padding: '10px 20px', 
              borderRadius: '4px', 
              textDecoration: 'none', 
              fontWeight: 'bold', 
              fontSize: '14px' 
            }}>
              Indeks Berita <span style={{ fontSize: '18px' }}>➔</span>
            </Link>
          </div>
        </div>

        {/* KANAN: ASIDE (LAYOUT DETIK) */}
        <aside>
          <div style={{ 
            backgroundColor: '#f9f9f9', 
            padding: '20px', 
            borderRadius: '8px', 
            textAlign: 'center', 
            fontSize: '13px', 
            color: '#888',
            border: '1px solid #eee'
          }}>
            <h4 style={{ color: '#004a8e', marginBottom: '10px', fontSize: '14px' }}>INFO DAKWAH</h4>
            <p style={{ margin: 0, lineHeight: '1.5' }}>
              Dukung operasional dakwah digital ABAHSAIF dengan menjadi donatur atau mitra kerjasama.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}