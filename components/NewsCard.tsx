// components/NewsCard.tsx
import Link from "next/link";

type NewsCardProps = {
  title?: string;
  image?: string;
  date?: string;
  slug?: string;
  category?: string;
  views?: number;
};

export default function NewsCard({
  title = "Judul Berita",
  image = "/logo-md.png",
  date,
  slug = "#",
  category = "Berita",
  views = 0,
}: NewsCardProps) {
  
  /** * LOGIKA NAVIGASI DINAMIS: 
   * Memastikan slug kategori bersih untuk URL (contoh: "Info Dakwah" -> "info-dakwah")
   */
  const path = category.toLowerCase().replace(/\s+/g, "-");

  /** * FORMAT TANGGAL:
   * Menggunakan "id-ID" agar sesuai dengan bahasa Indonesia.
   */
  const formattedDate = date 
    ? new Date(date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Baru saja";

  return (
    <article className="news-card-item" style={{ marginBottom: '25px' }}>
      <Link href={`/${path}/${slug}`} style={{ textDecoration: 'none', display: 'block' }}>
        
        {/* 1. THUMBNAIL DENGAN BADGE KATEGORI */}
        <div style={{ 
          width: '100%', 
          aspectRatio: '16/9', 
          borderRadius: '12px', 
          overflow: 'hidden', 
          marginBottom: '14px',
          backgroundColor: '#f8f9fa',
          position: 'relative',
          boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
        }}>
          <img 
            src={image} 
            alt={title} 
            loading="lazy" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
          />
          
          {/* Badge Kategori PCM Kembaran */}
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            backgroundColor: 'var(--abah-blue)',
            color: '#fff',
            fontSize: '10px',
            fontWeight: '900',
            padding: '4px 10px',
            borderRadius: '6px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}>
            {category}
          </div>
        </div>

        {/* 2. KONTEN TEKS */}
        <div className="news-card-content">
          <h3 style={{ 
            fontSize: '17px', 
            fontWeight: '800', 
            color: '#1a1a1a', 
            lineHeight: '1.4',
            margin: '0 0 10px 0',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            height: '46px' // Menjaga kerapihan grid
          }}>
            {title}
          </h3>
          
          {/* 3. METADATA: TANGGAL & VIEWS */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            fontSize: '12px', 
            color: '#888',
            fontWeight: '600'
          }}>
            {/* PENTING: suppressHydrationWarning untuk mencegah error di browser */}
            <span suppressHydrationWarning>{formattedDate}</span>
            
            {/* Tampilan Views dengan Ikon Mata yang dipertebal */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <span style={{ color: 'var(--abah-gold)', fontWeight: '800' }}>
                {views}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}