import { getSinglePost, getRelatedPosts } from "@/lib/sanity.query"; 
import { Metadata } from "next";
import Link from "next/link";
import ViewCounter from "@/components/ViewCounter"; 
import ShareButtons from "@/components/ShareButtons";
import PortableTextContent from "@/components/PortableTextContent";

// 1. KONFIGURASI VIEWPORT
export const viewport = { 
  themeColor: "#004a8e", 
  width: "device-width", 
  initialScale: 1 
};

// 2. GENERATE METADATA DINAMIS
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ category: string, slug: string }> 
}): Promise<Metadata> {
  const { category, slug } = await params;
  const post = await getSinglePost(slug);

  if (!post) return { title: "Not Found" };

  const url = `https://pcmkembaran.com/${category}/${slug}`;
  return {
    title: post.title,
    description: post.excerpt || "Baca informasi terbaru dari PCM Kembaran",
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: url,
      siteName: "PCM Kembaran",
      images: [{ url: post.image || "/logo-md.png", width: 1200, height: 630 }],
      locale: "id_ID",
      type: "article",
    },
  };
}

// 3. KOMPONEN UTAMA
export default async function PostDetail({ 
  params 
}: { 
  params: Promise<{ category: string, slug: string }> 
}) {
  const { category, slug } = await params;
  
  // Mengambil data artikel tunggal dan artikel terkait secara paralel
  const [post, relatedPosts] = await Promise.all([ 
    getSinglePost(slug), 
    getRelatedPosts(category, slug) 
  ]);

  if (!post) return <div style={{ padding: '100px', textAlign: 'center' }}>Artikel tidak ditemukan.</div>;
  
  const shareUrl = `https://pcmkembaran.com/${category}/${slug}`;

  return (
    <main className="post-detail-main">
      <ViewCounter slug={slug} />
      
      <nav className="breadcrumb">
        <Link href="/">Home</Link> <span className="mx-2">/</span>
        <Link href={`/${category}`} className="breadcrumb-cat">{category}</Link>
        <span className="mx-2">/</span>
        <span className="breadcrumb-title">{post.title}</span>
      </nav>

      <div className="main-grid-layout">
        {/* ================= SISI KIRI: ARTIKEL ================= */}
        <article>
          <header className="article-header">
            <h1 className="main-title">{post.title}</h1>
            <div className="meta-bar">
              <div className="author-box">
                <img src="/logo-md.png" className="author-img" alt="Redaksi" />
                <div className="author-info">
                  <span className="name">Redaksi PCM Kembaran</span>
                  <div className="meta-sub">
                    <span>{new Date(post.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    <span className="sep">•</span>
                    <span className="views">{post.views || 0} Kali Dibaca</span>
                  </div>
                </div>
              </div>
              <ShareButtons shareUrl={shareUrl} postTitle={post.title} />
            </div>
          </header>

          {post.image && <img src={post.image} alt={post.title} className="featured-img" />}

          <div className="article-content">
            {/* Menggunakan PortableTextContent (Client Component) untuk menghindari Digest Error */}
            {post.body && <PortableTextContent value={post.body} />}
          </div>

          {/* FITUR POSTINGAN TERKAIT (BAWAH ARTIKEL) */}
          {relatedPosts?.length > 0 && (
            <section className="related-box">
              <h3 className="related-title">Postingan Terkait</h3>
              <div className="related-grid">
                {relatedPosts.slice(0, 3).map((rel: any) => (
                  /* PERBAIKAN: Gunakan rel.slug secara langsung karena query sudah mengembalikan string */
                  <Link href={`/${category}/${rel.slug}`} key={rel._id} className="related-item">
                    <div className="thumb"><img src={rel.image || "/logo-md.png"} alt={rel.title} /></div>
                    <h4>{rel.title}</h4>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>

        {/* ================= SISI KANAN: SIDEBAR ================= */}
        <aside className="sidebar">
          {/* WIDGET SOSIAL MEDIA */}
          <div className="sidebar-widget">
            <h3 className="widget-title gold">IKUTI KAMI</h3>
            <div className="social-grid">
              <a href="https://facebook.com/pcmkembaran" target="_blank" className="sc-icon">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://instagram.com/pcmkembaran" target="_blank" className="sc-icon">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://wa.me/6281234567890" target="_blank" className="sc-icon">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </a>
            </div>
          </div>

          {/* WIDGET TERPOPULER */}
          <div className="sidebar-widget">
            <h3 className="widget-title blue">TERPOPULER</h3>
            <div className="popular-list">
              {relatedPosts?.slice(0, 5).map((pop: any, idx: number) => (
                /* PERBAIKAN: Gunakan pop.slug secara langsung */
                <Link href={`/${category}/${pop.slug}`} key={pop._id} className="pop-item">
                  <span className="pop-rank">{idx + 1}</span>
                  <p className="pop-text">{pop.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        :root { --abah-blue: #004a8e; --abah-gold: #ffc107; }
        .post-detail-main { max-width: 1200px; margin: 40px auto; padding: 0 20px; font-family: sans-serif; }
        .breadcrumb { font-size: 13px; color: #888; margin-bottom: 25px; display: flex; gap: 8px; }
        .breadcrumb-cat { color: var(--abah-blue); font-weight: bold; text-transform: capitalize; text-decoration: none; }
        .main-grid-layout { display: grid; grid-template-columns: 1fr 340px; gap: 40px; }
        .main-title { font-size: clamp(24px, 5vw, 40px); font-weight: 900; line-height: 1.2; color: #111; margin-bottom: 20px; }
        
        .meta-bar { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 20px; margin-bottom: 30px; }
        .author-box { display: flex; align-items: center; gap: 12px; }
        .author-img { width: 45px; height: 45px; border-radius: 50%; object-fit: cover; border: 1px solid #eee; }
        .name { font-weight: 800; font-size: 15px; color: #333; }
        .meta-sub { font-size: 12px; color: #999; margin-top: 2px; }
        .views { color: var(--abah-blue); font-weight: bold; }
        
        .featured-img { width: 100%; border-radius: 15px; margin-bottom: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }

        .related-box { margin-top: 60px; border-top: 4px solid var(--abah-blue); padding-top: 30px; }
        .related-title { font-size: 26px; font-weight: 900; margin-bottom: 25px; }
        .related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .related-item { text-decoration: none; color: inherit; }
        .thumb { aspect-ratio: 16/9; border-radius: 10px; overflow: hidden; margin-bottom: 10px; background: #eee; }
        .thumb img { width: 100%; height: 100%; object-fit: cover; transition: 0.3s; }
        .related-item:hover img { transform: scale(1.05); }
        .related-item h4 { font-size: 15px; font-weight: 700; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

        .sidebar-widget { background: #fff; padding: 25px; border-radius: 15px; border: 1px solid #eee; margin-bottom: 30px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .widget-title { font-size: 16px; font-weight: 900; margin-bottom: 20px; padding-left: 12px; }
        .widget-title.gold { border-left: 5px solid var(--abah-gold); }
        .widget-title.blue { border-left: 5px solid var(--abah-blue); }
        
        .social-grid { display: flex; gap: 15px; }
        .sc-icon { color: #555; transition: 0.3s; }
        .sc-icon:hover { color: var(--abah-blue); transform: translateY(-3px); }

        .popular-list { display: flex; flex-direction: column; gap: 18px; }
        .pop-item { display: flex; gap: 15px; text-decoration: none; color: inherit; align-items: flex-start; }
        .pop-rank { font-size: 28px; font-weight: 900; color: #e5e7eb; line-height: 1; min-width: 30px; }
        .pop-text { font-size: 14px; font-weight: 700; line-height: 1.4; color: #333; transition: 0.2s; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .pop-item:hover .pop-text { color: var(--abah-blue); }

        @media (max-width: 992px) { .main-grid-layout { grid-template-columns: 1fr; } }
        @media (max-width: 600px) { .related-grid { grid-template-columns: 1fr; } .meta-bar { flex-direction: column; align-items: flex-start; gap: 20px; } }
      `}} />
    </main>
  );
}