import { getSearchedPosts } from "@/lib/sanity.query";
import NewsCard from "@/components/NewsCard";
import Link from "next/link";

// 1. KONFIGURASI VIEWPORT (Next.js 15)
export const viewport = {
  themeColor: "#004a8e",
  width: "device-width",
  initialScale: 1,
};

export default async function SearchPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ q?: string }> 
}) {
  // Ambil data query secara asinkron (Wajib di Next.js 15)
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";
  
  // Ambil data dari Sanity
  const results = await getSearchedPosts(query);

  return (
    <main className="search-container">
      {/* 1. BREADCRUMB */}
      <nav className="breadcrumb">
        <Link href="/" className="breadcrumb-link">Home</Link>
        <span className="mx-2">/</span>
        <span className="breadcrumb-current">Pencarian</span>
      </nav>

      {/* 2. HEADER HASIL PENCARIAN */}
      <div className="search-header">
        <h1 className="search-title">
          HASIL PENCARIAN: <span>"{query}"</span>
        </h1>
        <p className="search-count">Ditemukan {results.length} postingan terkait.</p>
      </div>

      {results.length > 0 ? (
        /* 3. GRID HASIL PENCARIAN */
        <div className="results-grid">
          {results.map((item: any) => (
            <NewsCard 
              key={item._id}
              title={item.title}
              image={item.image}
              date={item.publishedAt}
              // Slug dikirim sebagai string langsung dari query
              slug={item.slug}
              category={item.category}
              views={item.views}
            />
          ))}
        </div>
      ) : (
        /* 4. TAMPILAN JIKA TIDAK ADA HASIL */
        <div className="empty-search">
          <div className="empty-icon">🔍</div>
          <h2 className="empty-title">Pencarian Tidak Ditemukan</h2>
          <p className="empty-desc">
            Maaf, kami tidak menemukan artikel dengan kata kunci <strong>"{query}"</strong>. 
            Coba gunakan kata kunci lain yang lebih spesifik.
          </p>
          <Link href="/" className="btn-home">
            Kembali ke Beranda
          </Link>
        </div>
      )}

      {/* 5. CSS STYLES */}
      <style dangerouslySetInnerHTML={{ __html: `
        :root { --abah-blue: #004a8e; --abah-gold: #ffc107; }
        .search-container { max-width: 1200px; margin: 40px auto; padding: 0 20px; min-height: 70vh; font-family: sans-serif; }
        
        .breadcrumb { font-size: 13px; color: #888; margin-bottom: 25px; display: flex; align-items: center; }
        .breadcrumb-link { text-decoration: none; color: #888; }
        .breadcrumb-current { color: var(--abah-blue); font-weight: bold; }

        .search-header { border-bottom: 4px solid var(--abah-blue); margin-bottom: 40px; padding-bottom: 15px; }
        .search-title { font-size: 26px; font-weight: 900; color: #111; margin: 0; text-transform: uppercase; }
        .search-title span { color: var(--abah-blue); }
        .search-count { font-size: 14px; color: #666; margin-top: 8px; font-weight: 500; }

        .results-grid { 
          display: grid; 
          grid-template-columns: repeat(3, 1fr); 
          gap: 30px; 
        }

        .empty-search { 
          text-align: center; padding: 100px 20px; 
          background-color: #f8fafc; border-radius: 20px; border: 2px dashed #e2e8f0; 
        }
        .empty-icon { font-size: 60px; margin-bottom: 20px; }
        .empty-title { font-size: 24px; font-weight: 900; color: var(--abah-blue); margin-bottom: 15px; }
        .empty-desc { color: #64748b; max-width: 500px; margin: 0 auto 30px; line-height: 1.6; }
        .btn-home { 
          background-color: var(--abah-blue); color: #fff; padding: 14px 35px; 
          border-radius: 50px; text-decoration: none; font-weight: 800; 
          display: inline-block; transition: 0.3s; box-shadow: 0 4px 12px rgba(0,74,142,0.2);
        }
        .btn-home:hover { transform: translateY(-3px); box-shadow: 0 6px 15px rgba(0,74,142,0.3); }

        @media (max-width: 992px) {
          .results-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .results-grid { grid-template-columns: 1fr; gap: 20px; }
          .search-title { font-size: 20px; }
        }
      `}} />
    </main>
  );
}