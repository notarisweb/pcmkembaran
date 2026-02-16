// components/NewsCard.tsx
import Link from "next/link";

type NewsCardProps = {
  title?: string;
  image?: string;
  date?: string;
  slug?: string;
  category?: string;
  views?: number; // Menambahkan prop views dari Sanity
};

export default function NewsCard({
  title = "Judul Berita",
  image = "/logo-md.png", // Default ke logo PCM jika gambar kosong
  date,
  slug = "#",
  category = "Berita",
  views = 0,
}: NewsCardProps) {
  
  /** * LOGIKA NAVIGASI DINAMIS: 
   * Menggunakan category asli agar sinkron dengan routing [category]/[slug]
   */
  const path = category.toLowerCase().replace(/\s+/g, "-");

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
          borderRadius: '10px', 
          overflow: 'hidden', 
          marginBottom: '12px',
          backgroundColor: '#f8f9fa',
          position: 'relative',
          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
        }}>
          <img 
            src={image} 
            alt={title} 
            loading="lazy" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {/* Badge Kategori PCM */}
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            backgroundColor: 'var(--abah-blue)',
            color: '#fff',
            fontSize: '9px',
            fontWeight: '800',
            padding: '3px 8px',
            borderRadius: '4px',
            textTransform: 'uppercase'
          }}>
            {category}
          </div>
        </div>

        {/* 2. KONTEN TEKS */}
        <div className="news-card-content">
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: '800', 
            color: '#1a1a1a', 
            lineHeight: '1.4',
            margin: '0 0 8px 0',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            height: '44px' // Menjaga ketinggian agar grid tetap sejajar
          }}>
            {title}
          </h3>
          
          {/* 3. METADATA: TANGGAL & VIEWS (Fitur Admin Editable) */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            fontSize: '11px', 
            color: '#999',
            fontWeight: '500'
          }}>
            <span>{formattedDate}</span>
            
            {/* Tampilan Views dengan Ikon Mata */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <span style={{ color: 'var(--abah-gold)', fontWeight: '700' }}>
                {views}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}