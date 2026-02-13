import Link from "next/link";
import { getArticlePosts } from "@/lib/sanity.query";

export default async function LatestArticlesSidebar() {
  // Mengambil data artikel terbaru secara dinamis dari Sanity CMS
  const articles = await getArticlePosts();

  return (
    <div style={{ 
      background: '#003d71', 
      borderRadius: '12px', 
      padding: '25px 20px', 
      color: '#fff',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* HEADER */}
      <div style={{ 
        borderBottom: '2px solid #ffcc00', 
        paddingBottom: '10px', 
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h4 style={{ color: '#ffcc00', fontSize: '16px', fontWeight: 'bold', margin: 0 }}>
          ARTIKEL TERBARU
        </h4>
        <span style={{ fontSize: '18px' }}>📄</span>
      </div>

      {/* LIST ARTIKEL DARI CMS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {articles.map((item: any) => (
          <Link 
            href={`/artikel/${item.slug}`} 
            key={item._id} 
            style={{ 
              textDecoration: 'none', 
              color: '#fff', 
              display: 'block',
              paddingBottom: '12px',
              borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <h5 style={{ 
              fontSize: '14px', 
              fontWeight: '600', 
              lineHeight: '1.4', 
              margin: '0 0 5px 0'
            }}>
              {item.title}
            </h5> 
            <span style={{ fontSize: '11px', opacity: 0.7 }}>
              {/* Format tanggal agar user-friendly */}
              {new Date(item.publishedAt).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </span>
          </Link>
        ))}
      </div>

      {/* FOOTER LINK */}
      <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
        <Link href="/artikel" style={{ 
          display: 'block',
          textAlign: 'center',
          backgroundColor: 'rgba(255,255,255,0.1)',
          color: '#ffcc00',
          padding: '10px',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: 'bold',
          textDecoration: 'none'
        }}>
          Lihat Semua Artikel ❯
        </Link>
      </div>
    </div>
  );
}