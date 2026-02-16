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
        <div className="content-image-container">
          <img
            src={urlFor(value).fit('max').auto('format').url()}
            alt={value.alt || "Gambar Konten"}
            className="content-image"
          />
          {value.caption && (
            <p className="image-caption">{value.caption}</p>
          )}
        </div>
      );
    },
  },
  block: {
    normal: ({ children }: any) => (
      <p className="article-p">{children}</p>
    ),
    h2: ({ children }: any) => (
      <h2 className="article-h2">{children}</h2>
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
    <main className="post-detail-main">
      
      {/* 1. BREADCRUMB */}
      <nav className="breadcrumb">
        <Link href="/" className="breadcrumb-link">Home</Link>
        <span>/</span>
        <Link href={`/${category}`} className="breadcrumb-category">{category}</Link>
        <span>/</span>
        <span className="breadcrumb-current">{post.title}</span>
      </nav>

      <div className="main-grid-layout">
        
        {/* ================= SISI KIRI: KONTEN UTAMA ================= */}
        <article>
          <header className="article-header">
            <h1 className="main-title">{post.title}</h1>
            
            <div className="meta-bar">
              <div className="author-info">
                <div className="author-avatar">
                   <img src="/logo-md.png" alt="MPI PCM Kembaran" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="author-text">
                  <span className="author-name">Redaksi PCM Kembaran</span>
                  <span className="post-date">
                    {new Date(post.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>

              {/* Tombol Share Medsos */}
              <div className="share-buttons">
                <div className="share-label-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                  <span className="share-text">Bagikan</span>
                </div>

                <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" className="social-icon fb">
                  <svg width="22" height="22" fill="#fff" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>

                <a href={`https://api.whatsapp.com/send?text=${shareUrl}`} target="_blank" className="social-icon wa">
                  <svg width="24" height="24" fill="#fff" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                </a>
              </div>
            </div>
          </header>

          {post.image && (
            <img src={post.image} alt={post.title} className="featured-image" />
          )}

          <div className="article-body">
            {post.body && <PortableText value={post.body} components={ptComponents} />}
          </div>

          {/* RELATED POSTS SECTION */}
          {relatedPosts && relatedPosts.length > 0 && (
            <section className="related-section">
              <h3 className="related-heading">Postingan Terkait</h3>
              <div className="related-grid">
                {relatedPosts.slice(0, 3).map((rel: any) => (
                  <Link href={`/${category}/${rel.slug}`} key={rel._id} className="related-card">
                    <div className="related-thumb">
                      <img src={rel.image || "/logo-md.png"} alt={rel.title} />
                    </div>
                    <h4 className="related-title">{rel.title}</h4>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>

        {/* ================= SISI KANAN: SIDEBAR ================= */}
        <aside className="sidebar">
          {/* SOSIAL MEDIA BLOCK */}
          <div className="sidebar-card">
            <h3 className="sidebar-heading gold-border">IKUTI KAMI</h3>
            <div className="social-row">
              <a href="#" className="sc-icon-fb"><svg width="26" height="26" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
              <a href="#" className="sc-icon-tw"><svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
              <a href="#" className="sc-icon-wa"><svg width="26" height="26" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg></a>
            </div>
          </div>

          {/* TERPOPULER */}
          <div className="sidebar-card">
            <h3 className="sidebar-heading blue-border">TERPOPULER</h3>
            <div className="popular-list">
              {relatedPosts.slice(0, 4).map((pop: any, idx: number) => (
                <Link href={`/${category}/${pop.slug}`} key={pop._id} className="popular-item">
                  <span className="pop-number">{idx + 1}</span>
                  <p className="pop-title">{pop.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --abah-blue: #004a8e;
          --abah-gold: #ffc107;
        }
        .post-detail-main { max-width: 1200px; margin: 40px auto; padding: 0 20px; font-family: sans-serif; }
        .breadcrumb { font-size: 13px; color: #888; marginBottom: 25px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 25px; }
        .breadcrumb-link { text-decoration: none; color: #888; }
        .breadcrumb-category { text-decoration: none; color: var(--abah-blue); font-weight: bold; text-transform: capitalize; }
        .breadcrumb-current { color: #333; fontWeight: 500; }

        .main-grid-layout { display: grid; grid-template-columns: 1fr 340px; gap: 40px; }
        
        .main-title { fontSize: 36px; fontWeight: 900; lineHeight: 1.2; marginBottom: 25px; color: #1a1a1a; margin-bottom: 20px; }
        .meta-bar { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid #eee; }
        .author-info { display: flex; alignItems: center; gap: 12px; }
        .author-avatar { width: 48px; height: 48px; borderRadius: 50%; overflow: hidden; border: 1px solid #eee; }
        .author-text { display: flex; flex-direction: column; }
        .author-name { fontWeight: bold; color: #333; fontSize: 15px; }
        .post-date { fontSize: 12px; color: #888; }

        .share-buttons { display: flex; alignItems: center; gap: 10px; }
        .share-label-box { display: flex; alignItems: center; gap: 10px; border: 1px solid #ddd; padding: 8px 20px; borderRadius: 8px; fontSize: 15px; fontWeight: 700; color: #333; background-color: #fff; }
        .social-icon { width: 42px; height: 42px; borderRadius: 8px; display: flex; alignItems: center; justifyContent: center; text-decoration: none; }
        .social-icon.fb { background-color: #1877F2; }
        .social-icon.wa { background-color: #25D366; }

        .featured-image { width: 100%; borderRadius: 12px; marginBottom: 40px; margin-bottom: 40px; }
        .article-body { color: #333; }
        .article-p { margin-bottom: 1.8rem; line-height: 1.8; font-size: 18px; color: #333; }
        .article-h2 { margin-top: 2.5rem; margin-bottom: 1.2rem; color: var(--abah-blue); font-size: 24px; font-weight: bold; }
        .content-image-container { margin: 35px 0; text-align: center; }
        .content-image { borderRadius: 10px; maxWidth: 100%; height: auto; }
        .image-caption { font-size: 14px; color: #666; margin-top: 10px; font-style: italic; }

        /* RELATED POSTS RESPONSIVE */
        .related-section { margin-top: 60px; border-top: 4px solid var(--abah-blue); padding-top: 30px; }
        .related-heading { font-size: 18px; font-weight: bold; margin-bottom: 25px; color: var(--abah-blue); text-transform: uppercase; }
        .related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .related-card { text-decoration: none; color: inherit; display: block; }
        .related-thumb { width: 100%; aspect-ratio: 16/9; background-color: #f0f0f0; borderRadius: 8px; overflow: hidden; margin-bottom: 10px; }
        .related-thumb img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
        .related-card:hover img { transform: scale(1.05); }
        .related-title { font-size: 14px; font-weight: bold; margin: 0; line-height: 1.4; }

        /* SIDEBAR */
        .sidebar-card { background-color: #fff; padding: 20px; borderRadius: 12px; border: 1px solid #eee; margin-bottom: 30px; }
        .sidebar-heading { font-size: 16px; font-weight: bold; padding-left: 10px; margin-bottom: 20px; }
        .gold-border { border-left: 4px solid var(--abah-gold); }
        .blue-border { border-left: 4px solid var(--abah-blue); }
        .social-row { display: flex; justify-content: space-between; align-items: center; }
        .social-row a { text-decoration: none; }
        .sc-icon-fb { color: #1877F2; } .sc-icon-tw { color: #000; } .sc-icon-wa { color: #25D366; }
        
        .popular-list { display: flex; flex-direction: column; gap: 15px; }
        .popular-item { display: flex; gap: 12px; text-decoration: none; color: inherit; }
        .pop-number { font-size: 24px; font-weight: 900; color: #eee; line-height: 1; }
        .pop-title { font-size: 14px; font-weight: bold; margin: 0; line-height: 1.4; }

        /* === BREAKPOINTS === */
        @media (max-width: 992px) {
          .main-grid-layout { grid-template-columns: 1fr !important; }
          .main-title { font-size: 28px; }
          .sidebar { margin-top: 40px; }
          .share-buttons { width: 100%; justify-content: flex-start; margin-top: 10px; }
        }

        @media (max-width: 768px) {
          .related-grid { grid-template-columns: repeat(2, 1fr); } /* 2 Kolom untuk Tablet */
        }

        @media (max-width: 600px) {
          .related-grid { grid-template-columns: 1fr; } /* 1 Kolom untuk HP */
          .article-p { font-size: 16px; }
          .main-title { font-size: 24px; }
          .share-text { display: none; } /* Sembunyikan teks 'Bagikan' di layar sangat kecil */
          .share-label-box { padding: 8px 12px; }
        }
      `}} />
    </main>
  );
}