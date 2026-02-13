import { getNewsPosts } from "@/lib/sanity.query";
import Link from "next/link";

export default async function PopularSidebar() {
  // Mengambil berita terbaru dari Sanity
  const popularData = await getNewsPosts();

  return (
    <section style={{ height: '450px', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ 
        fontSize: '18px', 
        color: '#004a8e', 
        fontWeight: 'bold', 
        marginBottom: '15px',
        paddingLeft: '10px'
      }}>
        Berita Terpopuler
      </h2>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {popularData.slice(0, 5).map((news: any, index: number) => (
          <Link 
            href={`/artikel/${news.slug}`} 
            key={news._id} 
            style={{ 
              display: 'flex', 
              gap: '12px', 
              textDecoration: 'none', 
              padding: '8px 10px',
              borderBottom: '1px solid #f0f0f0',
              transition: 'background 0.2s'
            }}
          >
            {/* Angka Rank Dinamis Berdasarkan Index */}
            <span style={{ 
              fontSize: '20px', 
              fontWeight: 'bold', 
              color: '#ccc', 
              minWidth: '35px'
            }}>
              #{index + 1}
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <h3 style={{ 
                fontSize: '13.5px', 
                fontWeight: '700', 
                color: '#333', 
                margin: 0, 
                lineHeight: '1.2',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {news.title}
              </h3>
              <span style={{ fontSize: '11px', color: '#888' }}>
                <strong style={{ color: '#004a8e', textTransform: 'uppercase' }}>
                  {news.category}
                </strong> | {new Date(news.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
              </span>
            </div>
          </Link>
        ))}
        
        {/* State jika data kosong */}
        {popularData.length === 0 && (
          <p style={{ fontSize: '12px', color: '#888', textAlign: 'center' }}>Tidak ada data populer.</p>
        )}
      </div>

      {/* Tombol Lihat Selengkapnya Dinamis */}
      <Link href="/berita" style={{ 
        marginTop: '10px',
        padding: '8px', 
        textAlign: 'center',
        color: '#e64d31', 
        fontWeight: 'bold', 
        fontSize: '12px', 
        textDecoration: 'none',
        backgroundColor: '#f9f9f9',
        borderRadius: '4px'
      }}>
        Lihat Selengkapnya →
      </Link>
    </section>
  );
}