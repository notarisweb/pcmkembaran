import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hadits Pilihan | NEWS.ID",
};

export default function HaditsPage() {
  return (
    <main className="container">
      <h1 className="page-title">Hadits Pilihan</h1>

      {[1,2,3].map((i)=>(
        <div key={i} className="hadits-card">
          <p className="arab">
            إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ
          </p>
          <p>
            “Sesungguhnya amal itu tergantung niatnya.”
          </p>
        </div>
      ))}
    </main>
  );
}
