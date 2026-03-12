import { getSinglePost, getRelatedPosts } from "@/lib/sanity.query"; 
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image"; // Optimasi LCP
import ViewCounter from "@/components/ViewCounter"; 
import ShareButtons from "@/components/ShareButtons";
import PortableTextContent from "@/components/PortableTextContent";

// 1. GENERATE METADATA DINAMIS (Surat Cinta untuk Sosmed & Google)
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ category: string, slug: string }> 
}): Promise<Metadata> {
  const { category, slug } = await params;
  const post = await getSinglePost(slug);

  if (!post) {
    return { title: "Berita Tidak Ditemukan | PCM Kembaran" };
  }

  const url = `https://pcmkembaran.com/${category}/${slug}`;
  const description = post.excerpt || "Baca informasi terbaru dan dakwah berkemajuan dari PCM Kembaran.";

  return {
    title: post.title,
    description: description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: description,
      url: url,
      siteName: "PCM Kembaran",
      // Gambar dinamis: Kalau ada gambar berita, pakai itu. Kalau tidak, pakai logo.
      images: [
        { 
          url: post.image || "/opengraph-image.jpg", 
          width: 1200, 
          height: 630,
          alt: post.title 
        }
      ],
      locale: "id_ID",
      type: "article",
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
      images: [post.image || "/opengraph-image.jpg"],
    },
  };
}

// 2. KOMPONEN UTAMA
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
                <Image src="/logo-md.png" width={45} height={45} className="author-img" alt="Redaksi" />
                <div className="author-info">
                  <span className="name">Redaksi PCM Kembaran</span>
                  <div className="meta-sub">
                    <span suppressHydrationWarning>{new Date(post.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    <span className="sep">•</span>
                    <span className="views">{post.views || 0} Kali Dibaca</span>
                  </div>
                </div>
              </div>
              <ShareButtons shareUrl={shareUrl} postTitle={post.title} />
            </div>
          </header>

          {/* GAMBAR UTAMA DENGAN PRIORITY UNTUK LCP */}
          {post.image && (
            <div className="featured-img-container">
              <Image 
                src={post.image} 
                alt={post.title} 
                fill 
                priority 
                sizes="(max-width: 1200px) 100vw, 800px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}

          <div className="article-content">
            {post.body && <PortableTextContent value={post.body} />}
          </div>

          {/* POSTINGAN TERKAIT */}
          {relatedPosts?.length > 0 && (
            <section className="related-box">
              <h3 className="related-title">Postingan Terkait</h3>
              <div className="related-grid">
                {relatedPosts.slice(0, 3).map((rel: any) => (
                  <Link href={`/${category}/${rel.slug}`} key={rel._id} className="related-item">
                    <div className="thumb">
                      <Image src={rel.image || "/logo-md.png"} alt={rel.title} fill sizes="300px" style={{ objectFit: 'cover' }} />
                    </div>
                    <h4>{rel.title}</h4>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>

        {/* ================= SISI KANAN: SIDEBAR ================= */}
        <aside className="sidebar">
          <div className="sidebar-widget">
            <h3 className="widget-title gold">IKUTI KAMI</h3>
            <div className="social-grid">
              {/* SVG Ikon tetap sama ... */}
            </div>
          </div>

          <div className="sidebar-widget">
            <h3 className="widget-title blue">TERPOPULER</h3>
            <div className="popular-list">
              {relatedPosts?.slice(0, 5).map((pop: any, idx: number) => (
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
        .post-detail-main { max-width: 1200px; margin: 40px auto; padding: 0 20px; }
        .breadcrumb { font-size: 13px; color: #888; margin-bottom: 25px; }
        .breadcrumb-cat { color: var(--abah-blue); font-weight: bold; text-decoration: none; }
        .main-grid-layout { display: grid; grid-template-columns: 1fr 340px; gap: 40px; }
        .main-title { font-size: clamp(24px, 5vw, 40px); font-weight: 900; line-height: 1.2; color: #111; margin-bottom: 20px; }
        .meta-bar { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 20px; margin-bottom: 30px; }
        .author-box { display: flex; align-items: center; gap: 12px; }
        .author-img { border-radius: 50%; border: 1px solid #eee; }
        .featured-img-container { position: relative; width: 100%; height: 450px; border-radius: 20px; overflow: hidden; margin-bottom: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        .article-content { font-size: 18px; line-height: 1.8; color: #333; }
        .related-box { margin-top: 60px; border-top: 4px solid var(--abah-blue); padding-top: 30px; }
        .related-title { font-size: 26px; font-weight: 900; margin-bottom: 25px; }
        .related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .thumb { position: relative; aspect-ratio: 16/9; border-radius: 12px; overflow: hidden; margin-bottom: 12px; }
        .pop-rank { font-size: 32px; font-weight: 900; color: #f1f5f9; line-height: 1; }
        @media (max-width: 992px) { .main-grid-layout { grid-template-columns: 1fr; } }
        @media (max-width: 600px) { .featured-img-container { height: 250px; } }
      `}} />
    </main>
  );
}