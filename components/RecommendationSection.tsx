// Ganti import fungsi ke getAllPosts agar mengambil semua kategori
import { getAllPosts } from "@/lib/sanity.query";
import Link from "next/link";
import LatestArticlesSidebar from "./LatestArticlesSidebar";

export default async function RecommendationSection() {
  // 1. Mengambil semua data postingan (Berita, Artikel, Khutbah, dll)
  const allData = await getAllPosts();

  // 2. Logika Random: Mengacak urutan data menggunakan Fisher-Yates shuffle atau sort sederhana
  const recommendedData = [...allData]
    .sort(() => Math.random() - 0.5)
    .slice(0, 6); // Ambil 6 item teratas setelah diacak

  return (
    <section style={{ marginTop: '50px', paddingTop: '30px', borderTop: '1px solid #eee' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '30px' }}>
        
        {/* KIRI: GRID 6 POSTINGAN RANDOM */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '20px', color: '#004a8e', fontWeight: 'bold', margin: 0 }}>
              Rekomendasi untuk Anda
            </h2>
            <Link href="/berita" style={{ fontSize: '13px', color: '#555', textDecoration: 'none' }}>
              Selengkapnya ❯
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px' }}>
            {recommendedData.map((item: any) => (
              <Link 
                href={`/artikel/${item.slug}`} 
                key={item._id} 
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                {/* Thumbnail Gambar Dinamis */}
                <div style={{ 
                  width: '100%', 
                  height: '140px', 
                  borderRadius: '8px', 
                  overflow: 'hidden', 
                  marginBottom: '10px',
                  backgroundColor: '#f0f0f0' 
                }}>
                  <img 
                    src={item.image || "https://via.placeholder.com/300/200?text=No+Image"} 
                    alt={item.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>

                {/* Kategori Otomatis - Warna Hijau untuk Artikel, Merah untuk Berita */}
                <span style={{ 
                  fontSize: '12px', 
                  color: item.category === 'berita' ? '#e64d31' : '#28a745', 
                  fontWeight: 'bold', 
                  display: 'block', 
                  marginBottom: '5px',
                  textTransform: 'uppercase' 
                }}>
                  {item.category}
                </span>

                {/* Judul Konten */}
                <h3 style={{ 
                  fontSize: '14px', 
                  fontWeight: 'bold', 
                  lineHeight: '1.4', 
                  margin: 0, 
                  color: '#333',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {item.title}
                </h3>
              </Link>
            ))}
          </div>

          {/* Fallback jika data kosong */}
          {recommendedData.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
              Belum ada konten yang tersedia.
            </div>
          )}
        </div>

        {/* KANAN: SIDEBAR ARTIKEL TERBARU */}
        <aside>
          <LatestArticlesSidebar />
        </aside>

      </div>
    </section>
  );
}