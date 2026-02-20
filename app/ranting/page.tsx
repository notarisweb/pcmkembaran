import { client } from "@/lib/sanity.client";
import Link from "next/link";
import { Metadata } from "next";

async function getRantingAndMasjidData() {
  // Query ganda untuk mengambil data Ranting dan Masjid sekaligus
  const query = `{
    "rantings": *[_type == "ranting"] | order(order asc) {
      _id, name, leader, address, "imageUrl": image.asset->url
    },
    "masjids": *[_type == "masjid"] {
      _id, name, address
    }
  }`;
  
  try {
    return await client.fetch(query, {}, { cache: 'no-store' });
  } catch (error) {
    console.error("Gagal mengambil data wilayah:", error);
    return { rantings: [], masjids: [] };
  }
}

export const metadata: Metadata = {
  title: "Data Ranting (PRM) - PCM Kembaran",
  description: "Informasi lengkap wilayah Pimpinan Ranting Muhammadiyah di lingkungan Cabang Kembaran.",
};

export default async function RantingPage() {
  const { rantings, masjids } = await getRantingAndMasjidData();

  return (
    <main id="pcm-ranting-premium">
      <div className="pcm-container">
        <header className="pcm-hero-header">
          <span className="pcm-top-tag">PEMETAAN WILAYAH</span>
          <h1>DATA RANTING (PRM)</h1>
          <p>Menggerakkan dakwah dari tingkat akar rumput mencerahkan semesta.</p>
          <div className="pcm-accent-line"></div>
        </header>

        {rantings.length > 0 ? (
          <div className="pcm-ranting-grid">
            {rantings.map((prm: any) => (
              <div key={prm._id} className="pcm-prm-card">
                <div className="pcm-prm-img">
                  <img src={prm.imageUrl || "/logo-md.png"} alt={prm.name} />
                  <div className="pcm-prm-overlay">
                    <h3>{prm.name}</h3>
                  </div>
                </div>
                
                <div className="pcm-prm-content">
                  <div className="pcm-prm-leader">
                    <span className="pcm-label">Ketua Ranting:</span>
                    <h4 className="pcm-leader-name">{prm.leader}</h4>
                  </div>

                  <div className="pcm-prm-info">
                    <div className="pcm-info-item">
                      <span className="pcm-icon">📍</span>
                      <p>{prm.address || "Wilayah Kembaran"}</p>
                    </div>
                  </div>

                  {/* INFO MASJID DI WILAYAH INI */}
                  <div className="pcm-prm-masjid">
                    <h5>Daftar Masjid Terkait:</h5>
                    <ul className="pcm-masjid-mini-list">
                      {/* Untuk sementara kita tampilkan random/semua jika belum ada relasi teknis di Sanity */}
                      {masjids.slice(0, 2).map((msj: any) => (
                        <li key={msj._id}>• {msj.name}</li>
                      ))}
                    </ul>
                  </div>

                  <Link href="/pimpinan" className="pcm-btn-view">
                    Detail Pimpinan Ranting →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="pcm-empty-state">Data Ranting belum diinput.</div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
        
        :root { --pcm-blue: #004a8e; --pcm-gold: #ffc107; --pcm-slate: #1e293b; }
        #pcm-ranting-premium { background: #f8fafc; font-family: 'Plus Jakarta Sans', sans-serif; padding: 60px 0 100px; }
        .pcm-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

        .pcm-hero-header { text-align: center; margin-bottom: 70px; }
        .pcm-top-tag { font-size: 13px; font-weight: 800; color: var(--pcm-blue); letter-spacing: 2px; text-transform: uppercase; }
        .pcm-hero-header h1 { font-size: clamp(32px, 5vw, 42px); font-weight: 800; margin: 10px 0; color: var(--pcm-blue); }
        .pcm-accent-line { width: 70px; height: 5px; background: var(--pcm-gold); margin: 25px auto; border-radius: 10px; }

        /* RANTING GRID */
        .pcm-ranting-grid { 
          display: grid !important; 
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)) !important; 
          gap: 35px !important; 
        }

        .pcm-prm-card { 
          background: #fff; border-radius: 28px; overflow: hidden; 
          border: 1px solid #f1f5f9; transition: 0.4s ease;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
          display: flex; flex-direction: column;
        }
        .pcm-prm-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.06); border-color: var(--pcm-blue); }

        .pcm-prm-img { position: relative; aspect-ratio: 16/9; overflow: hidden; background: var(--pcm-blue); }
        .pcm-prm-img img { width: 100%; height: 100%; object-fit: cover; opacity: 0.8; transition: 0.6s; }
        .pcm-prm-card:hover .pcm-prm-img img { transform: scale(1.1); opacity: 1; }

        .pcm-prm-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); display: flex; align-items: flex-end; padding: 20px; }
        .pcm-prm-overlay h3 { color: #fff; margin: 0; font-weight: 800; font-size: 22px; text-transform: uppercase; letter-spacing: 0.5px; }

        .pcm-prm-content { padding: 30px; flex-grow: 1; display: flex; flex-direction: column; }
        .pcm-prm-leader { margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #f1f5f9; }
        .pcm-label { font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; }
        .pcm-leader-name { font-size: 18px; font-weight: 800; color: var(--pcm-blue); margin: 5px 0 0 0; }

        .pcm-info-item { display: flex; gap: 10px; align-items: flex-start; margin-bottom: 20px; }
        .pcm-info-item p { font-size: 14px; color: #64748b; line-height: 1.5; margin: 0; }

        .pcm-prm-masjid { background: #f8fafc; padding: 15px; border-radius: 15px; margin-bottom: 25px; }
        .pcm-prm-masjid h5 { font-size: 12px; font-weight: 800; color: var(--pcm-slate); margin: 0 0 10px 0; text-transform: uppercase; }
        .pcm-masjid-mini-list { list-style: none; padding: 0; margin: 0; }
        .pcm-masjid-mini-list li { font-size: 13px; color: #64748b; font-weight: 600; margin-bottom: 5px; }

        .pcm-btn-view { 
          margin-top: auto; font-size: 13px; font-weight: 800; color: var(--pcm-blue); text-decoration: none;
          text-align: center; padding: 12px; border: 2px solid #eff6ff; border-radius: 12px; transition: 0.3s;
        }
        .pcm-btn-view:hover { background: var(--pcm-blue); color: #fff; border-color: var(--pcm-blue); }

        .pcm-empty-state { text-align: center; padding: 80px; border: 2px dashed #ddd; border-radius: 28px; color: #94a3b8; }

        @media (max-width: 640px) { .pcm-ranting-grid { grid-template-columns: 1fr !important; } }
      `}} />
    </main>
  );
}