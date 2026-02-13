import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tafsir Al-Qur'an | NEWS.ID",
};

export default function TafsirPage() {
  return (
    <main className="container">
      <h1 className="page-title">Tafsir Al-Qur'an</h1>

      <div className="quote-box">
        <p>
          “Dan Kami turunkan Al-Qur’an sebagai penjelas atas segala sesuatu.”
        </p>
      </div>

      <section className="grid-news">
        {[1,2,3].map((i)=>(
          <article key={i} className="news-card">
            <img src={`https://picsum.photos/400/240?tafsir=${i}`} />
            <div className="news-card-content">
              <h3>Tafsir Surat Pilihan {i}</h3>
              <span>Kajian Ulama</span>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
