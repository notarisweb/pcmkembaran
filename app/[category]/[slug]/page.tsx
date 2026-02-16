// app/[category]/[slug]/page.tsx
import { getSinglePost, getRelatedPosts } from "@/lib/sanity.query"; 
import { PortableText } from "@portabletext/react";
import urlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity.client";
import Link from "next/link";

const builder = urlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        <div style={{ margin: '35px 0', textAlign: 'center' }}>
          <img
            src={urlFor(value).fit('max').auto('format').url()}
            alt={value.alt || "Gambar Konten"}
            style={{ borderRadius: '10px', maxWidth: '100%', height: 'auto' }}
          />
          {value.caption && (
            <p style={{ fontSize: '14px', color: '#666', marginTop: '10px', fontStyle: 'italic' }}>
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
  block: {
    normal: ({ children }: any) => (
      <p style={{ marginBottom: '1.8rem', lineHeight: '1.8', fontSize: '18px', color: '#333' }}>
        {children}
      </p>
    ),
    h2: ({ children }: any) => (
      <h2 style={{ marginTop: '2.5rem', marginBottom: '1.2rem', color: '#004a8e', fontSize: '24px', fontWeight: 'bold' }}>
        {children}
      </h2>
    ),
  },
};

export default async function PostDetail({ 
  params 
}: { 
  params: Promise<{ category: string, slug: string }> 
}) {
  const { category, slug } = await params;
  const [post, relatedPosts] = await Promise.all([
    getSinglePost(slug),
    getRelatedPosts(category, slug)
  ]);

  if (!post) return <div style={{ padding: '50px', textAlign: 'center' }}>Postingan tidak ditemukan.</div>;

  const shareUrl = `https://pcmkembaran.com/${category}/${slug}`;

  return (
    <main style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
      
      {/* 1. BREADCRUMB - PERBAIKAN SEO: MENAMPILKAN JUDUL ARTIKEL */}
      <nav style={{ fontSize: '13px', color: '#888', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <Link href="/" style={{ textDecoration: 'none', color: '#888' }}>Home</Link>
        <span>/</span>
        <Link href={`/${category}`} style={{ textDecoration: 'none', color: '#004a8e', fontWeight: 'bold', textTransform: 'capitalize' }}>{category}</Link>
        <span>/</span>
        <span style={{ color: '#333', fontWeight: '500' }}>{post.title}</span>
      </nav>

      <div className="main-grid-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '40px' }}>
        
        {/* ================= SISI KIRI: KONTEN UTAMA ================= */}
        <article>
          <header style={{ marginBottom: '30px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: '900', lineHeight: '1.2', marginBottom: '25px', color: '#1a1a1a' }}>
              {post.title}
            </h1>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', border: '1px solid #eee' }}>
                   <img src="/logo-md.png" alt="MPI PCM Kembaran" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 'bold', color: '#333', fontSize: '15px' }}>Redaksi PCM Kembaran</span>
                  <span style={{ fontSize: '12px', color: '#888' }}>
                    {new Date(post.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>

              {/* Tombol Share Medsos - Sesuai Referensi Gambar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px', 
                  border: '1px solid #ddd', 
                  padding: '8px 20px', 
                  borderRadius: '8px', 
                  fontSize: '15px', 
                  fontWeight: '700', 
                  color: '#333', 
                  backgroundColor: '#fff'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                  Bagikan
                </div>

                <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" style={{ backgroundColor: '#1877F2', width: '42px', height: '42px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="24" height="24" fill="#fff" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>

                <a href={`https://twitter.com/intent/tweet?url=${shareUrl}`} target="_blank" style={{ backgroundColor: '#000', width: '42px', height: '42px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="20" fill="#fff" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>

                <a href={`https://api.whatsapp.com/send?text=${shareUrl}`} target="_blank" style={{ backgroundColor: '#25D366', width: '42px', height: '42px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="26" height="26" fill="#fff" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                </a>
              </div>
            </div>
          </header>

          {post.image && (
            <img src={post.image} alt={post.title} style={{ width: '100%', borderRadius: '12px', marginBottom: '40px' }} />
          )}

          <div className="article-body">
            {post.body && <PortableText value={post.body} components={ptComponents} />}
          </div>

          {/* RELATED POSTS */}
          {relatedPosts && relatedPosts.length > 0 && (
            <section style={{ marginTop: '60px', borderTop: '4px solid var(--abah-blue)', paddingTop: '30px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '25px', color: '#004a8e', textTransform: 'uppercase' }}>
                Postingan Terkait
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                {relatedPosts.slice(0, 3).map((rel: any) => (
                  <Link href={`/${category}/${rel.slug}`} key={rel._id} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ width: '100%', aspectRatio: '16/9', backgroundColor: '#f0f0f0', borderRadius: '8px', overflow: 'hidden', marginBottom: '10px' }}>
                      <img src={rel.image || "/logo-md.png"} alt={rel.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <h4 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0, lineHeight: '1.4' }}>{rel.title}</h4>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>

        {/* ================= SISI KANAN: SIDEBAR ================= */}
        <aside>
          {/* 1. SOSIAL MEDIA BLOCK */}
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #eee', marginBottom: '30px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', borderLeft: '4px solid var(--abah-gold)', paddingLeft: '10px', marginBottom: '20px' }}>IKUTI KAMI</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <a href="#" style={{ color: '#1877F2' }}><svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
              <a href="#" style={{ color: '#000' }}><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
              <a href="#" style={{ color: '#E4405F' }}><svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
              <a href="#" style={{ color: '#FF0000' }}><svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
              <a href="#" style={{ color: '#25D366' }}><svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg></a>
            </div>
          </div>

          {/* 2. POSTINGAN POPULER */}
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #eee', marginBottom: '30px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', borderLeft: '4px solid var(--abah-blue)', paddingLeft: '10px', marginBottom: '20px' }}>TERPOPULER</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {relatedPosts.slice(0, 4).map((pop: any, idx: number) => (
                <Link href={`/${category}/${pop.slug}`} key={pop._id} style={{ display: 'flex', gap: '12px', textDecoration: 'none', color: 'inherit' }}>
                  <span style={{ fontSize: '24px', fontWeight: '900', color: '#eee', lineHeight: '1' }}>{idx + 1}</span>
                  <p style={{ fontSize: '14px', fontWeight: 'bold', margin: 0, lineHeight: '1.4' }}>{pop.title}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* 3. GALERI FOTO */}
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #eee' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', borderLeft: '4px solid var(--abah-gold)', paddingLeft: '10px', marginBottom: '20px' }}>GALERI FOTO</h3>
            <div style={{ width: '100%', aspectRatio: '4/3', backgroundColor: '#f9f9f9', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
               <img src="/logo-md.png" style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: 0.5 }} />
               <div style={{ position: 'absolute', bottom: 0, width: '100%', padding: '10px', background: 'linear-gradient(transparent, rgba(0,0,0,0.7))', color: '#fff', fontSize: '11px' }}>
                 Dokumentasi PCM Kembaran
               </div>
            </div>
          </div>

        </aside>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 992px) {
          .main-grid-layout {
            grid-template-columns: 1fr !important;
          }
          aside {
            margin-top: 40px;
          }
        }
      `}} />
    </main>
  );
}