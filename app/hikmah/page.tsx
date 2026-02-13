import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mutiara Hikmah | NEWS.ID",
};

export default function HikmahPage() {
  return (
    <main className="container">
      <h1 className="page-title">Mutiara Hikmah</h1>

      {[1,2,3,4].map((i)=>(
        <div key={i} className="hikmah-box">
          <p>
            “Barangsiapa menempuh jalan untuk mencari ilmu,
            Allah akan mudahkan jalannya menuju surga.”
          </p>
        </div>
      ))}
    </main>
  );
}
