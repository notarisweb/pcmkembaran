import { client } from "@/lib/sanity.client";
import Link from "next/link";
import { Metadata } from "next";

async function getPimpinanData() {
  const query = `*[_type == "pimpinan"] | order(order asc) {
    _id, name, nbm, position, category, whatsapp,
    "photoUrl": photo.asset->url
  }`;
  try {
    return await client.fetch(query, {}, { cache: 'no-store' });
  } catch (error) {
    console.error("Gagal mengambil data pimpinan:", error);
    return [];
  }
}

export const metadata: Metadata = {
  title: "Struktur Organisasi - PCM Kembaran",
};

export default async function PimpinanPage() {
  const data = await getPimpinanData();
  const harian = data.filter((p: any) => p.category === 'harian');
  
  // Daftar Majelis & Lembaga hasil revisi
  const majelisGroups = [
    { id: 'tabligh', title: 'Majelis Tabligh' },
    { id: 'tarjih', title: 'Majelis Tarjih dan Tajdid' },
    { id: 'dikdasmen', title: 'Majelis Dikdasmen' },
    { id: 'ekonomi', title: 'Majelis Ekonomi Kewirausahaan & UMKM' },
    { id: 'wakaf', title: 'Majelis Pendayagunaan Wakaf dan Kehartabendaan' },
    { id: 'mkkm', title: 'Majelis Kesehatan dan Kesejahteraan Masyarakat (MKKM)' },
    { id: 'mpm', title: 'Majelis Pemberdayaan Masyarakat (MPM)' },
    { id: 'mpksdi', title: 'Majelis Pembinaan Kader dan Sumber Daya Insani' },
    { id: 'lppr', title: 'Lembaga Pengembangan dan Pemberdayaan Ranting' },
    { id: 'mpi', title: 'Majelis Pustaka dan Informasi (MPI)' },
    { id: 'lazismu', title: 'LAZISMU' },
    { id: 'lphm', title: 'Lembaga Persaudaraan Haji Muhammadiyah (LPHM)' },
    { id: 'lsbo', title: 'Lembaga Seni Budaya dan Olah Raga' },
  ];

  return (
    <main id="pcm-pimpinan-ultra">
      <div className="pcm-container">
        <header className="pcm-hero-header">
          <span className="pcm-top-tag">PCM KEMBARAN</span>
          <h1>STRUKTUR ORGANISASI</h1>
          <div className="pcm-accent-line"></div>
        </header>

        {/* SECTION 1: PIMPINAN HARIAN (PREMIUM HEADING) */}
        <section className="pcm-main-section">
          <div className="pcm-premium-heading">
            <div className="pcm-vertical-bar"></div>
            <div className="pcm-heading-txt">
              <h2>Pimpinan Harian</h2>
              <p>Core Leadership Team</p>
            </div>
          </div>
          
          <div className="pcm-harian-grid">
            {harian.map((person: any) => (
              <div key={person._id} className="pcm-leader-wrapper">
                <div className="pcm-leader-card">
                  <div className="pcm-photo-frame">
                    <img src={person.photoUrl || "/logo-md.png"} alt={person.name} />
                    {person.whatsapp && (
                      <div className="pcm-photo-overlay">
                        <a href={`https://wa.me/${person.whatsapp}`} target="_blank" className="pcm-wa-action">
                          <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="pcm-leader-info">
                    <h3>{person.name}</h3>
                    {person.nbm && <p className="pcm-nbm">NBM: {person.nbm}</p>}
                    <p className="pcm-role-tag">{person.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: MAJELIS & LEMBAGA (BENTO LIST) */}
        <div className="pcm-bento-grid">
          {majelisGroups.map((m) => {
            const members = data.filter((p: any) => p.category === m.id);
            if (members.length === 0) return null;
            return (
              <div key={m.id} className="pcm-bento-item">
                <div className="pcm-bento-head">
                  <div className="pcm-gold-dot"></div>
                  <h3>{m.title}</h3>
                </div>
                <ul className="pcm-member-list">
                  {members.map((person: any) => (
                    <li key={person._id}>
                      <div className="pcm-m-txt">
                        <span className="pcm-m-name">{person.name}</span>
                        {person.nbm && <span className="pcm-m-nbm">NBM: {person.nbm}</span>}
                      </div>
                      <span className="pcm-m-role">{person.position}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
        
        :root { --pcm-blue: #004a8e; --pcm-gold: #ffc107; --pcm-bg: #f8fafc; }
        #pcm-pimpinan-ultra { background: var(--pcm-bg); font-family: 'Plus Jakarta Sans', sans-serif; padding: 60px 0 100px; color: #1e293b; }
        .pcm-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

        .pcm-hero-header { text-align: center; margin-bottom: 70px; }
        .pcm-top-tag { font-size: 13px; font-weight: 800; color: var(--pcm-blue); letter-spacing: 2px; text-transform: uppercase; }
        .pcm-hero-header h1 { font-size: clamp(32px, 5vw, 42px); font-weight: 800; margin: 10px 0; color: var(--pcm-blue); }
        .pcm-accent-line { width: 70px; height: 5px; background: var(--pcm-gold); margin: 0 auto; border-radius: 10px; }

        /* PREMIUM HEADING */
        .pcm-premium-heading { display: flex; align-items: flex-start; gap: 18px; margin-bottom: 45px; }
        .pcm-vertical-bar { width: 6px; height: 50px; background: var(--pcm-blue); border-radius: 10px; }
        .pcm-heading-txt h2 { font-size: 30px; font-weight: 800; color: var(--pcm-blue); margin: 0; }
        .pcm-heading-txt p { font-size: 14px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 6px; }

        /* GRID LOCK (EQUAL HEIGHT) */
        .pcm-harian-grid { 
          display: grid !important; 
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)) !important; 
          gap: 30px !important; 
          align-items: stretch !important;
          margin-bottom: 80px;
        }

        .pcm-leader-wrapper { display: flex; }
        .pcm-leader-card { 
          background: #fff; border-radius: 24px; overflow: hidden; 
          border: 1.5px solid #f1f5f9; transition: 0.4s ease; 
          display: flex; flex-direction: column; width: 100%;
        }
        .pcm-leader-card:hover { transform: translateY(-10px); box-shadow: 0 20px 30px -5px rgba(0,0,0,0.1); border-color: var(--pcm-blue); }

        .pcm-photo-frame { position: relative; aspect-ratio: 4/5; overflow: hidden; background: #f1f5f9; }
        .pcm-photo-frame img { width: 100%; height: 100%; object-fit: cover; }
        .pcm-photo-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; opacity: 0; transition: 0.3s; }
        .pcm-leader-card:hover .pcm-photo-overlay { opacity: 1; }
        .pcm-wa-action { background: #25D366; color: #fff; width: 50px; height: 50px; border-radius: 14px; display: flex; align-items: center; justify-content: center; text-decoration: none; }

        .pcm-leader-info { padding: 25px; text-align: center; flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between; }
        .pcm-leader-info h3 { font-size: 17px; font-weight: 800; color: #111; margin: 0 0 5px 0; min-height: 48px; display: flex; align-items: center; justify-content: center; line-height: 1.3; }
        .pcm-nbm { font-size: 11px; color: #94a3b8; font-weight: 600; margin-bottom: 12px; }
        .pcm-role-tag { display: inline-block; background: #eff6ff; color: var(--pcm-blue); font-size: 11px; font-weight: 800; padding: 6px 16px; border-radius: 50px; text-transform: uppercase; }

        /* BENTO LIST */
        .pcm-bento-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 24px; }
        .pcm-bento-item { background: #fff; border-radius: 20px; padding: 30px; border: 1.5px solid #f1f5f9; }
        .pcm-bento-head { display: flex; align-items: center; gap: 12px; margin-bottom: 25px; }
        .pcm-gold-dot { width: 8px; height: 8px; background: var(--pcm-gold); border-radius: 50%; }
        .pcm-bento-head h3 { font-size: 16px; font-weight: 800; color: var(--pcm-blue); margin: 0; text-transform: uppercase; line-height: 1.3; }

        .pcm-member-list { list-style: none; padding: 0; margin: 0; }
        .pcm-member-list li { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #f8fafc; }
        .pcm-member-list li:last-child { border: none; }
        .pcm-m-txt { display: flex; flex-direction: column; }
        .pcm-m-name { font-weight: 700; font-size: 14px; color: #334155; }
        .pcm-m-nbm { font-size: 10px; color: #94a3b8; font-weight: 600; }
        .pcm-m-role { font-size: 11px; font-weight: 700; color: var(--pcm-blue); text-transform: uppercase; text-align: right; }

        @media (max-width: 768px) {
          .pcm-harian-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 15px !important; }
          .pcm-bento-grid { grid-template-columns: 1fr; }
          .pcm-leader-info h3 { font-size: 15px; }
        }
      `}} />
    </main>
  );
}