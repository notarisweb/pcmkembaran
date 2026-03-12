import Link from "next/link";

export default function KhutbahSidebar({ articles = [] }: { articles?: any[] }) {
  // Pengaman jika data kosong
  if (!articles || articles.length === 0) {
    return (
      <div style={{ backgroundColor: '#004a8e', borderRadius: '16px', padding: '25px', color: '#fff' }}>
        <p style={{ fontSize: '13px', opacity: 0.7, textAlign: 'center' }}>Belum ada naskah khutbah terbaru.</p>
      </div>
    );
  }

  return (
    <div style={{ 
      backgroundColor: '#004a8e', // Biru PCM resmi
      borderRadius: '16px', 
      padding: '30px 25px', 
      color: '#fff',
      boxShadow: '0 10px 20px rgba(0,74,142,0.15)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
        <div style={{ width: '4px', height: '20px', backgroundColor: '#ffc107', borderRadius: '2px' }}></div>
        <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#ffc107', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
          KHUTBAH TERBARU
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
        {articles.map((item) => {
          // Logika pembersihan URL Kategori
          const categoryPath = item.category?.toLowerCase().replace(/\s+/g, '-') || "khutbah";
          // Menggunakan slug string murni sesuai perbaikan query Sanity
          const fullLink = `/${categoryPath}/${item.slug}`;

          return (
            <Link 
              key={item._id} 
              href={fullLink} 
              style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              className="khutbah-item-hover"
            >
              <h3 style={{ 
                fontSize: '15px', 
                fontWeight: '700', 
                margin: '0 0 8px 0', 
                lineHeight: '1.5',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                transition: 'color 0.2s ease'
              }}>
                {item.title}
              </h3>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.7, fontSize: '11px', fontWeight: '600' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                {/* Menghindari mismatch hidrasi pada elemen waktu */}
                <span suppressHydrationWarning>
                  {new Date(item.publishedAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* FOOTER AKSI */}
      <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <Link 
          href="/khutbah" 
          style={{ 
            color: '#ffc107', 
            textDecoration: 'none', 
            fontSize: '12px', 
            fontWeight: '800',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          ARSIP KHUTBAH JUMAT <span>→</span>
        </Link>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .khutbah-item-hover { transition: transform 0.2s ease; }
        .khutbah-item-hover:hover { transform: translateX(5px); }
        .khutbah-item-hover:hover h3 { color: #ffc107; }
      `}} />
    </div>
  );
}