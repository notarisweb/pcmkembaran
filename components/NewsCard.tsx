import Link from "next/link";

type NewsCardProps = {
  title?: string;
  image?: string;
  date?: string;
  slug?: string;
  category?: string;
};

export default function NewsCard({
  title = "Judul Berita",
  image = "https://via.placeholder.com/400/240?text=No+Image",
  date,
  slug = "#",
  category = "Berita",
}: NewsCardProps) {
  
  /** * LOGIKA DINAMIS: 
   * Mengubah kategori menjadi slug URL (Contoh: "Dzikir & Doa" -> "dzikir-dan-doa")
   */
  const path = category
    .toLowerCase()
    .replace(/ & /g, "-dan-") 
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

  // Format tanggal Indonesia
  const formattedDate = date 
    ? new Date(date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Baru saja";

  return (
    <article className="news-card" style={{ 
      borderBottom: '1px solid #f0f0f0', 
      paddingBottom: '15px', 
      marginBottom: '20px' 
    }}>
      <Link href={`/${path}/${slug}`} style={{ textDecoration: 'none', display: 'block' }}>
        <div style={{ 
          width: '100%', 
          aspectRatio: '16/9', 
          borderRadius: '12px', 
          overflow: 'hidden', 
          marginBottom: '12px',
          backgroundColor: '#f8f9fa'
        }}>
          <img 
            src={image} 
            alt={title} 
            loading="lazy" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div className="news-card-content">
          <span style={{ 
            fontSize: '11px', 
            color: '#004a8e', 
            fontWeight: 700, 
            textTransform: 'uppercase',
            display: 'inline-block',
            marginBottom: '6px',
            letterSpacing: '0.5px'
          }}>
            {category}
          </span>
          
          <h3 style={{ 
            fontSize: '17px', 
            fontWeight: 700, 
            color: '#1a1a1a', 
            lineHeight: '1.4',
            margin: '0 0 10px 0',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {title}
          </h3>
          
          <span style={{ fontSize: '11px', color: '#999', display: 'block' }}>
            {formattedDate}
          </span>
        </div>
      </Link>
    </article>
  );
}