import { client } from "@/lib/sanity.client";
import { Metadata } from "next";

async function getDownloadData() {
  const query = `*[_type == "download"] | order(order asc) {
    _id,
    title,
    category,
    description,
    "fileUrl": file.asset->url,
    "fileName": file.asset->originalFilename
  }`;
  try {
    return await client.fetch(query, {}, { cache: 'no-store' });
  } catch (error) {
    console.error("Gagal mengambil data unduhan:", error);
    return [];
  }
}

export const metadata: Metadata = {
  title: "Pusat Unduhan - PCM Kembaran",
  description: "Download dokumen resmi, formulir, dan panduan Pimpinan Cabang Muhammadiyah Kembaran.",
};

export default async function DownloadPage() {
  const allDownloads = await getDownloadData();

  const categories = [
    { id: 'sk', title: 'Surat Keputusan (SK)' },
    { id: 'formulir', title: 'Formulir Pendaftaran' },
    { id: 'panduan', title: 'Panduan & Edukasi' },
    { id: 'laporan', title: 'Laporan Organisasi' },
    { id: 'lainnya', title: 'Dokumen Lainnya' },
  ];

  return (
    <main id="pcm-download-premium">
      <div className="pcm-container">
        <header className="pcm-hero-header">
          <span className="pcm-top-tag">REPOSITORI DOKUMEN</span>
          <h1>PUSAT UNDUHAN</h1>
          <p>Akses dokumen resmi dan administrasi PCM Kembaran dengan mudah.</p>
          <div className="pcm-accent-line"></div>
        </header>

        <div className="pcm-download-wrapper">
          {categories.map((cat) => {
            const files = allDownloads.filter((f: any) => f.category === cat.id);
            if (files.length === 0) return null;

            return (
              <section key={cat.id} className="pcm-download-section">
                <h2 className="pcm-cat-title">{cat.title}</h2>
                <div className="pcm-file-grid">
                  {files.map((file: any) => (
                    <div key={file._id} className="pcm-file-card">
                      <div className="pcm-file-icon">
                        <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                      </div>
                      <div className="pcm-file-info">
                        <h4>{file.title}</h4>
                        <p>{file.description || "Klik tombol di samping untuk mengunduh file."}</p>
                      </div>
                      <a href={`${file.fileUrl}?dl=${file.fileName}`} className="pcm-btn-download">
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        Unduh
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
        
        :root { --pcm-blue: #004a8e; --pcm-gold: #ffc107; --pcm-slate: #1e293b; }
        #pcm-download-premium { background: #f8fafc; font-family: 'Plus Jakarta Sans', sans-serif; padding: 60px 0 100px; }
        .pcm-container { max-width: 1000px; margin: 0 auto; padding: 0 24px; }

        .pcm-hero-header { text-align: center; margin-bottom: 60px; }
        .pcm-top-tag { font-size: 13px; font-weight: 800; color: var(--pcm-blue); letter-spacing: 2px; text-transform: uppercase; }
        .pcm-hero-header h1 { font-size: 42px; font-weight: 800; margin: 10px 0; color: var(--pcm-blue); }
        .pcm-accent-line { width: 70px; height: 5px; background: var(--pcm-gold); margin: 25px auto; border-radius: 10px; }

        .pcm-download-section { margin-bottom: 50px; }
        .pcm-cat-title { font-size: 20px; font-weight: 800; color: var(--pcm-blue); margin-bottom: 20px; border-left: 5px solid var(--pcm-gold); padding-left: 15px; }

        .pcm-file-grid { display: flex; flex-direction: column; gap: 15px; }
        .pcm-file-card { 
          background: #fff; padding: 20px; border-radius: 20px; border: 1.5px solid #f1f5f9;
          display: flex; align-items: center; gap: 20px; transition: 0.3s ease;
        }
        .pcm-file-card:hover { border-color: var(--pcm-blue); transform: translateX(5px); box-shadow: 0 10px 20px rgba(0,0,0,0.05); }

        .pcm-file-icon { background: #eff6ff; color: var(--pcm-blue); padding: 12px; border-radius: 14px; }
        .pcm-file-info { flex-grow: 1; }
        .pcm-file-info h4 { font-size: 16px; font-weight: 800; color: #111; margin: 0 0 5px 0; }
        .pcm-file-info p { font-size: 13px; color: #64748b; margin: 0; line-height: 1.5; }

        .pcm-btn-download { 
          display: flex; align-items: center; gap: 8px; background: var(--pcm-blue); color: #fff;
          padding: 10px 20px; border-radius: 10px; font-size: 14px; font-weight: 700; text-decoration: none; transition: 0.3s;
        }
        .pcm-btn-download:hover { background: #003366; transform: scale(1.05); }

        @media (max-width: 640px) {
          .pcm-file-card { flex-direction: column; text-align: center; }
          .pcm-btn-download { width: 100%; justify-content: center; }
        }
      `}} />
    </main>
  );
}