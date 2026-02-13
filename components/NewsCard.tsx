import Link from "next/link";

type NewsCardProps = {
  title?: string;
  image?: string;
  date?: string;
  slug?: string;
  category?: string;
};

export default function NewsCard({
  title = "Judul Berita dari CMS",
  image = "https://via.placeholder.com/400/240?text=No+Image",
  date = "Baru saja",
  slug = "#",
  category = "Berita",
}: NewsCardProps) {
  return (
    <article className="news-card" style={{ 
      borderBottom: '1px solid #f0f0f0', 
      paddingBottom: '15px',
      transition: 'transform 0.2s ease-in-out'
    }}>
      {/* Menggunakan Link Next.js agar navigasi instan tanpa reload */}
      <Link href={`/artikel/${slug}`} style={{ textDecoration: 'none' }}>
        <div style={{ 
          width: '100%', 
          aspectRatio: '16/9', 
          borderRadius: '8px', 
          overflow: 'hidden', 
          marginBottom: '12px',
          backgroundColor: '#eee'
        }}>
          <img 
            src={image} 
            alt={title} 
            loading="lazy" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div className="news-card-content">
          {/* Menampilkan kategori dengan aksen warna biru abah */}
          <span style={{ 
            fontSize: '11px', 
            color: '#004a8e', 
            fontWeight: 'bold', 
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '4px'
          }}>
            {category}
          </span>
          
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            color: '#333', 
            lineHeight: '1.4',
            margin: '0 0 8px 0',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {title}
          </h3>
          
          <span style={{ 
            fontSize: '11px', 
            color: '#888',
            display: 'block'
          }}>
            {date}
          </span>
        </div>
      </Link>
    </article>
  );
}