// app/search/page.tsx
import { getSearchedPosts } from "@/lib/sanity.query";
import NewsCard from "@/components/NewsCard";
import Link from "next/link";

// Next.js 15 mengharuskan searchParams di-await
export default async function SearchPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ q?: string }> 
}) {
  // Ambil data query secara asinkron
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";
  
  // Cari data ke Sanity
  const results = await getSearchedPosts(query);

  return (
    <div className="container" style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px', minHeight: '75vh' }}>
      
      <h1 style={{ fontSize: '24px', fontWeight: '900', color: 'var(--abah-blue)', marginBottom: '30px', textTransform: 'uppercase' }}>
        Hasil Pencarian: <span style={{ color: 'var(--abah-gold)' }}>"{query}"</span>
      </h1>

      {results.length > 0 ? (
        <div className="results-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
          {results.map((item: any) => (
            <NewsCard 
              key={item._id}
              title={item.title}
              image={item.image}
              date={item.publishedAt}
              slug={item.slug}
              category={item.category}
              views={item.views}
            />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '100px 0', backgroundColor: '#f9f9f9', borderRadius: '15px' }}>
          <p style={{ fontSize: '18px', color: '#888', marginBottom: '25px' }}>
            Maaf, tidak ada informasi yang ditemukan untuk kata kunci <strong>"{query}"</strong>.
          </p>
          <Link href="/" style={{ backgroundColor: 'var(--abah-blue)', color: '#fff', padding: '12px 30px', borderRadius: '30px', textDecoration: 'none', fontWeight: '700', display: 'inline-block' }}>
            Kembali ke Beranda
          </Link>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 992px) {
          .results-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
      `}} />
    </div>
  );
}