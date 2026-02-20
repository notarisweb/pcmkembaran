import { client } from "@/lib/sanity.client";
import Link from "next/link";
import { Metadata } from "next";

async function getMasjidData() {
  const query = `*[_type == "masjid"] | order(order asc) {
    _id,
    name,
    address,
    locationUrl,
    "imageUrl": image.asset->url
  }`;
  try {
    return await client.fetch(query, {}, { cache: 'no-store' });
  } catch (error) {
    console.error("Gagal mengambil data masjid:", error);
    return [];
  }
}

export const metadata: Metadata = {
  title: "Daftar Masjid - PCM Kembaran",
  description: "Daftar masjid dan mushola di bawah naungan Pimpinan Cabang Muhammadiyah Kembaran.",
};

export default async function MasjidPage() {
  const dataMasjid = await getMasjidData();

  return (
    <main id="pcm-masjid-premium">
      <div className="pcm-container">
        <header className="pcm-hero-header">
          <span className="pcm-top-tag">FASILITAS IBADAH</span>
          <h1>DAFTAR MASJID & MUSHOLA</h1>
          <p>Menebar risalah Islam mencerahkan di setiap sudut Kembaran.</p>
          <div className="pcm-accent-line"></div>
        </header>

        {dataMasjid.length > 0 ? (
          <div className="pcm-masjid-grid">
            {dataMasjid.map((masjid: any) => (
              <div key={masjid._id} className="pcm-masjid-card">
                <div className="pcm-img-frame">
                  <img src={masjid.imageUrl || "/logo-md.png"} alt={masjid.name} />
                  {masjid.locationUrl && (
                    <a href={masjid.locationUrl} target="_blank" className="pcm-map-overlay">
                      <span>Buka di Maps</span>
                    </a>
                  )}
                </div>
                <div className="pcm-card-content">
                  <h3 className="pcm-masjid-name">{masjid.name}</h3>
                  <p className="pcm-masjid-addr">{masjid.address}</p>
                  
                  {masjid.locationUrl && (
                    <a href={masjid.locationUrl} target="_blank" className="pcm-btn-maps">
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      Petunjuk Arah
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="pcm-empty-state">
            <p>Data masjid belum tersedia di sistem.</p>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
        
        :root { --pcm-blue: #004a8e; --pcm-gold: #ffc107; --pcm-slate: #1e293b; }
        #pcm-masjid-premium { background: #f8fafc; font-family: 'Plus Jakarta Sans', sans-serif; padding: 60px 0 100px; color: var(--pcm-slate); }
        .pcm-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

        .pcm-hero-header { text-align: center; margin-bottom: 70px; }
        .pcm-top-tag { font-size: 13px; font-weight: 800; color: var(--pcm-blue); letter-spacing: 2px; text-transform: uppercase; }
        .pcm-hero-header h1 { font-size: clamp(32px, 5vw, 42px); font-weight: 800; margin: 10px 0; color: var(--pcm-blue); }
        .pcm-accent-line { width: 70px; height: 5px; background: var(--pcm-gold); margin: 25px auto; border-radius: 10px; }

        /* MASJID GRID */
        .pcm-masjid-grid { 
          display: grid !important; 
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) !important; 
          gap: 30px !important; 
        }

        .pcm-masjid-card { 
          background: #fff; border-radius: 24px; overflow: hidden; 
          border: 1.5px solid #f1f5f9; transition: 0.4s ease;
          display: flex; flex-direction: column;
        }
        .pcm-masjid-card:hover { transform: translateY(-10px); box-shadow: 0 20px 30px -5px rgba(0,0,0,0.06); border-color: var(--pcm-blue); }

        .pcm-img-frame { position: relative; aspect-ratio: 16/10; overflow: hidden; background: #eee; }
        .pcm-img-frame img { width: 100%; height: 100%; object-fit: cover; transition: 0.6s; }
        .pcm-masjid-card:hover .pcm-img-frame img { transform: scale(1.1); }

        .pcm-map-overlay { position: absolute; inset: 0; background: rgba(0,74,142,0.6); display: flex; align-items: center; justify-content: center; opacity: 0; transition: 0.3s; backdrop-filter: blur(4px); text-decoration: none; }
        .pcm-map-overlay span { color: #fff; font-weight: 800; border: 2px solid #fff; padding: 8px 20px; border-radius: 50px; font-size: 12px; text-transform: uppercase; }
        .pcm-masjid-card:hover .pcm-map-overlay { opacity: 1; }

        .pcm-card-content { padding: 25px; flex-grow: 1; display: flex; flex-direction: column; }
        .pcm-masjid-name { font-size: 20px; font-weight: 800; color: #111; margin-bottom: 10px; line-height: 1.3; }
        .pcm-masjid-addr { font-size: 14px; color: #64748b; margin-bottom: 25px; line-height: 1.6; flex-grow: 1; }

        .pcm-btn-maps { 
          display: flex; align-items: center; justify-content: center; gap: 8px;
          background: #f1f5f9; color: var(--pcm-blue); padding: 12px; border-radius: 12px;
          font-size: 14px; font-weight: 800; text-decoration: none; transition: 0.3s;
        }
        .pcm-btn-maps:hover { background: var(--pcm-blue); color: #fff; }

        .pcm-empty-state { text-align: center; padding: 100px; border: 2px dashed #ddd; border-radius: 24px; color: #94a3b8; font-weight: 600; }

        @media (max-width: 640px) {
          .pcm-masjid-grid { grid-template-columns: 1fr !important; }
          .pcm-hero-header h1 { font-size: 28px; }
        }
      `}} />
    </main>
  );
}