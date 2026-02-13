import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fiqih Praktis | NEWS.ID",
};

export default function FiqihPage() {
  return (
    <main className="container">
      <h1 className="page-title">Fiqih Praktis</h1>

      <section className="list-modern">
        {[1,2,3].map((i)=>(
          <article key={i} className="list-item">
            <img src={`https://picsum.photos/200/140?fiqih=${i}`} />
            <div>
              <h3>Panduan Ibadah {i}</h3>
              <p>Penjelasan fiqih yang mudah dipahami.</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
