import { client } from "@/lib/sanity.client";
import Link from "next/link";
import { Metadata } from "next";
import { Calendar, MapPin, Clock, User, ArrowRight, Bell } from "lucide-react";

async function getMasidData() {
  const query = `*[_type == "masjid"] | order(order asc) {
    _id,
    name,
    address,
    locationUrl,
    "imageUrl": image.asset->url,
    "jadwalKajian": *[_type == "jadwalKajian" && references(^._id)] | order(hari asc) {
      _id,
      hari,
      ustadz,
      waktu,
      tema
    }
  }`;
  try {
    return await client.fetch(query, {}, { next: { revalidate: 3600 } });
  } catch (error) {
    console.error("Gagal mengambil data masjid:", error);
    return [];
  }
}

export const metadata: Metadata = {
  title: "Pusat Dakwah & Masjid - PCM Kembaran",
  description: "Daftar masjid dan jadwal kajian rutin di bawah naungan Pimpinan Cabang Muhammadiyah Kembaran.",
};

export default async function MasjidPage() {
  const dataMasjid = await getMasidData();

  return (
    <main id="pcm-masjid-premium">
      <div className="pcm-container">
        
        {/* 1. HERO HEADER */}
        <header className="pcm-hero-header">
          <span className="pcm-top-tag">Sektor Keumatan</span>
          <h1>MASJID & PUSAT DAKWAH</h1>
          <p>Mengelola pusat peradaban dan persemaian ilmu di wilayah Kembaran.</p>
          <div className="pcm-accent-line"></div>
        </header>

        {/* 2. BANNER STRATEGIS */}
        <div className="pcm-banner-kajian animate-in fade-in slide-in-from-top-6 duration-700">
           <div className="banner-content">
              <div className="banner-icon">
                 <Bell className="text-[#ffc107] animate-bounce" size={32} />
              </div>
              <div className="banner-text">
                 <h4>Kajian Hari Ini</h4>
                 <p>Lihat dan download flyer jadwal kajian otomatis untuk disebarkan hari ini.</p>
              </div>
           </div>
           <Link href="/kajian-hari-ini" className="pcm-btn-primary">
              Buka Flyer Generator <ArrowRight size={18} />
           </Link>
        </div>

        {/* 3. GRID MASJID */}
        {dataMasjid.length > 0 ? (
          <div className="pcm-masjid-grid">
            {dataMasjid.map((masjid: any) => (
              <div key={masjid._id} className="pcm-masjid-card">
                
                {/* 🖼️ FRAME GAMBAR: Ukuran Disamakan Secara Paksa */}
                <div className="pcm-img-frame">
                  <img 
                    src={masjid.imageUrl || "/logo-md.png"} 
                    alt={masjid.name} 
                    className="pcm-masjid-img"
                    loading="lazy" 
                  />
                  <div className="pcm-badge-total">
                     {masjid.jadwalKajian?.length || 0} Jadwal Rutin
                  </div>
                </div>

                <div className="pcm-card-content">
                  <h3 className="pcm-masjid-name">{masjid.name}</h3>
                  <p className="pcm-masjid-addr">
                    <MapPin size={14} className="inline mr-1 text-slate-400" /> {masjid.address}
                  </p>

                  <div className="pcm-schedule-section">
                    <h4 className="section-label">Jadwal Pengajian Rutin:</h4>
                    {masjid.jadwalKajian && masjid.jadwalKajian.length > 0 ? (
                      <div className="schedule-list">
                        {masjid.jadwalKajian.map((kj: any) => (
                          <div key={kj._id} className="schedule-item">
                            <div className="day-badge">{kj.hari}</div>
                            <div className="kj-detail">
                              <p className="kj-pembimbing"><User size={10} className="inline mr-1"/> {kj.ustadz}</p>
                              <p className="kj-tema">"{kj.tema || 'Kajian Umum'}"</p>
                              <p className="kj-waktu"><Clock size={10} className="inline mr-1"/> {kj.waktu}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="no-schedule">Belum ada jadwal rutin terdaftar.</p>
                    )}
                  </div>
                  
                  <div className="pcm-card-actions">
                    {masjid.locationUrl && (
                      <a href={masjid.locationUrl} target="_blank" className="pcm-btn-maps">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        Petunjuk Arah
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="pcm-empty-state">
            <p>Data masjid sedang disinkronkan oleh tim IT PCM Kembaran.</p>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
        
        :root { --pcm-blue: #004a8e; --pcm-gold: #ffc107; --pcm-slate: #1e293b; --pcm-border: #e2e8f0; }
        #pcm-masjid-premium { background: #f8fafc; font-family: 'Plus Jakarta Sans', sans-serif; padding: 40px 0 100px; color: var(--pcm-slate); }
        .pcm-container { max-width: 1240px; margin: 0 auto; padding: 0 24px; }

        .pcm-hero-header { text-align: center; margin-bottom: 50px; }
        .pcm-top-tag { font-size: 11px; font-weight: 900; color: var(--pcm-blue); letter-spacing: 3px; text-transform: uppercase; opacity: 0.6; }
        .pcm-hero-header h1 { font-size: clamp(32px, 5vw, 48px); font-weight: 900; margin: 10px 0; color: var(--pcm-blue); tracking: -1px; }
        .pcm-accent-line { width: 80px; height: 6px; background: var(--pcm-gold); margin: 25px auto; border-radius: 10px; }

        /* BANNER KAJIAN */
        .pcm-banner-kajian { background: var(--pcm-blue); border-radius: 32px; padding: 30px; margin-bottom: 60px; display: flex; justify-content: space-between; align-items: center; gap: 30px; box-shadow: 0 20px 40px rgba(0,74,142,0.2); }
        .banner-content { display: flex; align-items: center; gap: 20px; }
        .banner-text h4 { color: #fff; font-size: 20px; font-weight: 800; margin-bottom: 4px; }
        .banner-text p { color: rgba(255,255,255,0.7); font-size: 14px; font-weight: 500; }
        .pcm-btn-primary { background: var(--pcm-gold); color: var(--pcm-blue); padding: 16px 28px; border-radius: 18px; font-weight: 800; font-size: 14px; text-decoration: none; display: flex; align-items: center; gap: 10px; transition: 0.3s; white-space: nowrap; }

        /* GRID: Memastikan semua kartu sama tinggi dalam satu baris */
        .pcm-masjid-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 32px; align-items: stretch; }
        
        .pcm-masjid-card { 
          background: #fff; border-radius: 32px; overflow: hidden; 
          border: 1px solid var(--pcm-border); transition: 0.4s; 
          display: flex; flex-direction: column; height: 100%; 
        }
        .pcm-masjid-card:hover { transform: translateY(-12px); box-shadow: 0 30px 60px -12px rgba(0,0,0,0.1); }

        /* 🎯 FIX UKURAN GAMBAR: Rasio 16:10 yang sangat disiplin */
        .pcm-img-frame { 
          position: relative; 
          width: 100%; 
          height: 0; 
          padding-bottom: 62.5%; /* Ini adalah rasio 16:10 (10/16 * 100) */
          overflow: hidden; 
          background: #f1f5f9; 
        }
        .pcm-masjid-img { 
          position: absolute; 
          top: 0; 
          left: 0; 
          width: 100%; 
          height: 100%; 
          object-fit: cover; 
          transition: 0.6s ease;
        }
        .pcm-masjid-card:hover .pcm-masjid-img { transform: scale(1.08); }

        .pcm-badge-total { position: absolute; bottom: 20px; right: 20px; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); color: #fff; padding: 6px 14px; font-size: 10px; font-weight: 800; border-radius: 50px; z-index: 2; }

        .pcm-card-content { padding: 30px; flex-grow: 1; display: flex; flex-direction: column; }
        .pcm-masjid-name { font-size: 22px; font-weight: 900; color: #0f172a; margin-bottom: 8px; }
        .pcm-masjid-addr { font-size: 13px; color: #64748b; margin-bottom: 25px; line-height: 1.4; height: 2.8em; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }

        .pcm-schedule-section { background: #f8fafc; border-radius: 24px; padding: 20px; margin-bottom: 25px; border: 1px solid #f1f5f9; flex-grow: 1; }
        .section-label { font-size: 11px; font-weight: 900; color: var(--pcm-blue); text-transform: uppercase; margin-bottom: 15px; letter-spacing: 1px; }
        .schedule-list { display: flex; flex-direction: column; gap: 12px; }
        .schedule-item { display: flex; gap: 12px; align-items: flex-start; }
        .day-badge { background: var(--pcm-blue); color: #fff; padding: 4px 10px; border-radius: 8px; font-size: 10px; font-weight: 800; min-width: 55px; text-align: center; }
        .kj-pembimbing { font-size: 11px; font-weight: 800; color: #1e293b; }
        .kj-tema { font-size: 13px; font-weight: 700; color: var(--pcm-blue); margin: 2px 0; line-height: 1.2; }
        .kj-waktu { font-size: 10px; font-weight: 600; color: #94a3b8; }
        
        .pcm-card-actions { margin-top: auto; }
        .pcm-btn-maps { display: flex; align-items: center; justify-content: center; gap: 8px; border: 2px solid var(--pcm-border); color: var(--pcm-slate); padding: 14px; border-radius: 16px; font-size: 14px; font-weight: 800; text-decoration: none; transition: 0.3s; }
        .pcm-btn-maps:hover { background: var(--pcm-slate); color: #fff; }

        @media (max-width: 768px) { .pcm-banner-kajian { flex-direction: column; text-align: center; } .pcm-masjid-grid { grid-template-columns: 1fr; } }
      `}} />
    </main>
  );
}