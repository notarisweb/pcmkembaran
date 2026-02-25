import { getSinglePost, getRelatedPosts } from "@/lib/sanity.query"; 
import { Metadata } from "next";
import Link from "next/link";
import ViewCounter from "@/components/ViewCounter"; 
import ShareButtons from "@/components/ShareButtons";
// Import Wrapper Client Baru
import PortableTextContent from "@/components/PortableTextContent";

export const viewport = {
  themeColor: "#004a8e",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ category: string, slug: string }> 
}): Promise<Metadata> {
  const { category, slug } = await params;
  const post = await getSinglePost(slug);

  if (!post) return { title: "Postingan Tidak Ditemukan" };

  const url = `https://pcmkembaran.com/${category}/${slug}`;
  const imageFallback = "https://pcmkembaran.com/logo-md.png";

  return {
    title: post.title,
    description: post.excerpt || "Baca informasi terbaru dari PCM Kembaran",
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: url,
      siteName: "PCM Kembaran",
      images: [{ url: post.image || imageFallback, width: 1200, height: 630 }],
      locale: "id_ID",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image || imageFallback],
    },
  };
}

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
      <ViewCounter slug={slug} />
      
      <nav className="breadcrumb">
        <Link href="/" className="breadcrumb-link">Home</Link>
        <span>/</span>
        <Link href={`/${category}`} className="breadcrumb-category">{category}</Link>
        <span>/</span>
        <span className="breadcrumb-current">{post.title}</span>
      </nav>

      <div className="main-grid-layout">
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
                  <div className="post-meta-details">
                    <span className="post-date">
                      {new Date(post.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                    <span className="meta-separator">•</span>
                    <div className="view-count">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      <span>{post.views || 0} Kali Dibaca</span>
                    </div>
                  </div>
                </div>
              </div>
              <ShareButtons shareUrl={shareUrl} postTitle={post.title} />
            </div>
          </header>

          {post.image && (
            <img src={post.image} alt={post.title} className="featured-image" />
          )}

          <div className="article-body">
            {/* Menggunakan Komponen Wrapper Client untuk menghindari error serialization */}
            {post.body && <PortableTextContent value={post.body} />}
          </div>

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

        <aside className="sidebar">
          <div className="sidebar-card">
            <h3 className="sidebar-heading gold-border">IKUTI KAMI</h3>
            <div className="social-row">
              <a href="https://facebook.com/pcmkembaran" target="_blank" className="sc-icon fb">FB</a>
              <a href="https://instagram.com/pcmkembaran" target="_blank" className="sc-icon ig">IG</a>
              <a href="https://wa.me/6281234567890" target="_blank" className="sc-icon wa">WA</a>
            </div>
          </div>

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
        :root { --abah-blue: #004a8e; --abah-gold: #ffc107; }
        .post-detail-main { max-width: 1200px; margin: 40px auto; padding: 0 20px; font-family: sans-serif; }
        .main-grid-layout { display: grid; grid-template-columns: 1fr 340px; gap: 40px; }
        .main-title { font-size: 36px; font-weight: 900; line-height: 1.2; margin-bottom: 20px; color: #1a1a1a; }
        .article-p { margin-bottom: 1.8rem; line-height: 1.8; font-size: 18px; color: #333; }
        .article-h2 { margin-top: 2.5rem; margin-bottom: 1.2rem; color: var(--abah-blue); font-size: 24px; font-weight: bold; }
        .content-image { border-radius: 10px; max-width: 100%; height: auto; }
        .image-caption { font-size: 14px; color: #666; margin-top: 10px; font-style: italic; }
        /* ... Sisa CSS Anda tetap sama ... */
      `}} />
    </main>
  );
}