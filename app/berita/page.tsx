import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Berita | NEWS.ID",
  description: "Kumpulan berita terbaru umat dan dunia Islam",
};

export default function BeritaPage() {
  return (
    <main className="container">
      <h1 className="page-title">Berita Terbaru</h1>

      <section className="grid-news">
        {[1,2,3,4,5,6].map((i)=>(
          <article key={i} className="news-card">
            <img src={`https://picsum.photos/400/240?${i}`} />
            <div className="news-card-content">
              <h3>Judul Berita {i}</h3>
              <span>Dipublikasikan hari ini</span>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
