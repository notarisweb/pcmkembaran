import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artikel | NEWS.ID",
};

export default function ArtikelPage() {
  return (
    <main className="container">
      <h1 className="page-title">Artikel Islami</h1>

      <section className="list-modern">
        {[1,2,3,4].map((i)=>(
          <article key={i} className="list-item">
            <img src={`https://picsum.photos/200/140?${i}`} />
            <div>
              <h3>Artikel Inspiratif {i}</h3>
              <p>Ulasan mendalam tentang kehidupan muslim modern.</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
