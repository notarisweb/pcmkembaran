import { getSinglePost } from "@/lib/sanity.query";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

// Konfigurasi khusus untuk merender komponen Rich Text dari Sanity
const ptComponents = {
  block: {
    h2: ({ children }: any) => <h2 style={{ fontSize: '24px', margin: '30px 0 15px', color: '#333' }}>{children}</h2>,
    h3: ({ children }: any) => <h3 style={{ fontSize: '20px', margin: '25px 0 12px', color: '#333' }}>{children}</h3>,
    normal: ({ children }: any) => <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote style={{ borderLeft: '4px solid #004a8e', paddingLeft: '20px', fontStyle: 'italic', margin: '30px 0', color: '#555' }}>
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul style={{ marginLeft: '25px', marginBottom: '20px', listStyleType: 'disc' }}>{children}</ul>,
    number: ({ children }: any) => <ol style={{ marginLeft: '25px', marginBottom: '20px', listStyleType: 'decimal' }}>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li style={{ marginBottom: '10px' }}>{children}</li>,
    number: ({ children }: any) => <li style={{ marginBottom: '10px' }}>{children}</li>,
  },
  marks: {
    link: ({ children, value }: any) => (
      <a href={value.href} style={{ color: '#004a8e', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

// Next.js 15: params adalah sebuah Promise
export default async function PostDetail({ params }: { params: Promise<{ slug: string }> }) {
  // Wajib menggunakan await untuk mengakses slug di Next.js 15
  const { slug } = await params;
  const post = await getSinglePost(slug);

  if (!post) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Halaman tidak ditemukan</h2>
        <Link href="/" style={{ color: '#004a8e' }}>Kembali ke Beranda</Link>
      </div>
    );
  }

  return (
    <main className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 15px', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Breadcrumb yang merujuk ke kategori dinamis */}
      <nav style={{ fontSize: '13px', color: '#888', marginBottom: '25px', fontWeight: '500' }}>
        <Link href="/" style={{ color: '#004a8e', textDecoration: 'none' }}>Home</Link>
        <span style={{ margin: '0 8px' }}>/</span>
        <Link href={`/${post.category}`} style={{ color: '#004a8e', textDecoration: 'none', textTransform: 'capitalize' }}>
          {post.category.replace(/-/g, ' ')}
        </Link>
      </nav>

      {/* Header Artikel */}
      <header style={{ marginBottom: '35px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '800', lineHeight: '1.2', color: '#111', marginBottom: '15px', letterSpacing: '-0.5px' }}>
          {post.title}
        </h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {/* FOTO AUTHOR: Menggunakan abah.jpeg dari folder public */}
          <div style={{ 
            width: '45px', 
            height: '45px', 
            borderRadius: '50%', 
            overflow: 'hidden', 
            backgroundColor: '#f0f0f0',
            border: '1px solid #eee' 
          }}>
            <img 
              src="/abah-saif.jpeg" 
              alt="Abah Saif" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
          
          <div>
            <p style={{ fontSize: '14px', fontWeight: 'bold', margin: 0, color: '#333' }}>Abah Saif</p>
            <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>
              {new Date(post.publishedAt).toLocaleDateString('id-ID', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
              })} WIB
            </p>
          </div>
        </div>
      </header>

      {/* Gambar Utama dengan aspek rasio yang baik */}
      {post.image && (
        <div style={{ width: '100%', marginBottom: '40px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <img 
            src={post.image} 
            alt={post.title} 
            style={{ width: '100%', height: 'auto', display: 'block' }} 
          />
        </div>
      )}

      {/* Konten Utama menggunakan PortableText */}
      <article style={{ fontSize: '18px', color: '#333', textAlign: 'justify' }}>
        <PortableText value={post.body} components={ptComponents} />
      </article>

      {/* Footer Navigasi & Share Buttons dengan Ikon Keren */}
      <footer style={{ 
        marginTop: '60px', 
        paddingTop: '30px', 
        borderTop: '2px solid #f0f0f0', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <Link href="/" style={{ color: '#004a8e', fontWeight: 'bold', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px' }}>
          <span style={{ fontSize: '18px' }}>←</span> BERANDA
        </Link>
        
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span style={{ color: '#888', fontSize: '14px', fontWeight: '500' }}>Bagikan:</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            
            {/* Facebook */}
            <button title="Share ke Facebook" style={{ 
              border: 'none', background: '#1877F2', color: 'white', 
              width: '35px', height: '35px', borderRadius: '50%', 
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </button>

            {/* WhatsApp */}
            <button title="Share ke WhatsApp" style={{ 
              border: 'none', background: '#25D366', color: 'white', 
              width: '35px', height: '35px', borderRadius: '50%', 
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.27 9.27 0 01-4.487-1.178l-.322-.19-3.333.874.89-3.248-.208-.33a9.223 9.223 0 01-1.411-4.88c0-5.113 4.156-9.27 9.274-9.27A9.269 9.269 0 0121.03 9.27c0 5.115-4.156 9.274-9.27 9.274z"/></svg>
            </button>

            {/* X (Twitter) */}
            <button title="Share ke X" style={{ 
              border: 'none', background: '#000', color: 'white', 
              width: '35px', height: '35px', borderRadius: '50%', 
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z"/></svg>
            </button>

          </div>
        </div>
      </footer>
    </main>
  );
}