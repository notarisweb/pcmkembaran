import { getNewsPosts } from "@/lib/sanity.query";
import Link from "next/link";

export default async function TopNews() {
  // Mengambil berita terbaru
  // Kita bisa menggunakan slice untuk mengambil berita urutan ke 4-8 
  // agar tidak duplikat dengan yang ada di Headline Utama
  const allNews = await getNewsPosts();
  const topBarNews = allNews.slice(0, 5); 

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(5, 1fr)', 
      gap: '15px', 
      padding: '20px 0',
      borderBottom: '1px solid #eee' 
    }}>
      {topBarNews.map((item: any) => (
        <Link 
          href={`/artikel/${item.slug}`} 
          key={item._id} 
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div style={{ cursor: 'pointer', transition: 'opacity 0.2s' }}>
            <div style={{ 
              width: '100%', 
              aspectRatio: '16/9', 
              borderRadius: '4px', 
              overflow: 'hidden', 
              marginBottom: '8px',
              backgroundColor: '#f0f0f0' 
            }}>
              <img 
                src={item.image || "https://via.placeholder.com/240x135?text=No+Image"} 
                alt={item.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
            <h4 style={{ 
              fontSize: '12px', 
              lineHeight: '1.4', 
              margin: 0, 
              fontWeight: '600', 
              color: '#004a8e',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {item.title}
            </h4>
          </div>
        </Link>
      ))}

      {/* Tampilan jika data kosong */}
      {topBarNews.length === 0 && (
        <p style={{ gridColumn: 'span 5', textAlign: 'center', fontSize: '12px', color: '#888' }}>
          Belum ada berita pilihan.
        </p>
      )}
    </div>
  );
}