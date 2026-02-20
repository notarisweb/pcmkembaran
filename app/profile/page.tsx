import { client } from "@/lib/sanity.client";
import { PortableText } from "@portabletext/react";
import urlBuilder from "@sanity/image-url";
import Link from "next/link";
import { Metadata } from "next";

/* ================= 1. PENGATURAN DATA ================= */
async function getProfileData() {
  const query = `*[_type == "profile"][0] {
    "logoUrl": logo.asset->url,
    history,
    vision,
    mission,
    address,
    phone,
    email
  }`;
  
  try {
    return await client.fetch(query, {}, { next: { revalidate: 10 } });
  } catch (error) {
    console.error("Gagal mengambil data profil:", error);
    return null;
  }
}

const builder = urlBuilder(client);
function urlFor(source: any) { return builder.image(source); }

// Komponen untuk merender gambar di dalam teks sejarah
const ptComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="pcm-content-img-wrapper" style={{ margin: '20px 0' }}>
        <img 
          src={urlFor(value).url()} 
          alt="Gambar Sejarah" 
          style={{ width: '100%', borderRadius: '15px' }} 
        />
      </div>
    ),
  },
};

export const metadata: Metadata = {
  title: "Profil Resmi - PCM Kembaran",
  description: "Mengenal sejarah, visi, dan misi Pimpinan Cabang Muhammadiyah Kembaran.",
};

/* ================= 2. HALAMAN UTAMA ================= */
export default async function ProfilePage() {
  const profile = await getProfileData();

  if (!profile) return <div style={{ padding: '120px', textAlign: 'center' }}><h2>Data Profil sedang disiapkan.</h2></div>;

  return (
    <main id="pcm-profile-final-clean">
      <div className="pcm-max-width">
        
        <nav className="pcm-breadcrumb">
          <Link href="/">Home</Link> / <span className="active">Profil Cabang</span>
        </nav>

        <header className="pcm-header">
          <h1 className="pcm-h1">PROFIL PCM KEMBARAN</h1>
          <div className="pcm-gold-divider"></div>
        </header>

        <div className="pcm-main-grid">
          
          <div className="pcm-article-col" style={{ minWidth: 0 }}>
            <article className="pcm-card-premium">
              {/* GAMBAR LOGO / KANTOR */}
              {profile.logoUrl && (
                <div className="pcm-hero-frame">
                  <img src={profile.logoUrl} alt="Logo PCM Kembaran" style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              )}

              {/* SEJARAH SINGKAT */}
              <div className="pcm-history-body" style={{ fontSize: '18px', lineHeight: '1.9', color: '#374151', marginBottom: '50px' }}>
                {profile.history ? (
                   <PortableText value={profile.history} components={ptComponents} />
                ) : (
                   <p style={{ fontStyle: 'italic', color: '#888' }}>Sejarah singkat belum diisi.</p>
                )}
              </div>

              {/* VISI MISI */}
              <div className="pcm-vm-grid">
                <div className="pcm-vm-item v-border" style={{ padding: '30px', background: '#f9fafb', borderRadius: '20px', borderTop: '5px solid #ffc107' }}>
                  <h3 style={{ fontWeight: 900, color: '#004a8e', marginBottom: '15px' }}>VISI</h3>
                  <p>{profile.vision || "Visi belum diatur."}</p>
                </div>
                <div className="pcm-vm-item m-border" style={{ padding: '30px', background: '#f9fafb', borderRadius: '20px', borderTop: '5px solid #004a8e' }}>
                  <h3 style={{ fontWeight: 900, color: '#004a8e', marginBottom: '15px' }}>MISI</h3>
                  <ul style={{ paddingLeft: '20px' }}>
                    {profile.mission?.map((item: string, idx: number) => (
                      <li key={idx} style={{ marginBottom: '10px' }}>{item}</li>
                    )) || <li>Misi belum diatur.</li>}
                  </ul>
                </div>
              </div>
            </article>
          </div>

          {/* SIDEBAR KONTAK */}
          <aside className="pcm-sidebar" style={{ width: '340px' }}>
            <div className="pcm-side-card" style={{ background: '#fff', padding: '25px', borderRadius: '20px', border: '1px solid #eee' }}>
              <h3 style={{ borderLeft: '5px solid #004a8e', paddingLeft: '15px', fontWeight: 900, marginBottom: '20px' }}>KONTAK</h3>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', color: '#666' }}>
                <li style={{ marginBottom: '15px' }}><strong>Alamat:</strong> {profile.address || "-"}</li>
                <li style={{ marginBottom: '15px' }}><strong>Telepon:</strong> {profile.phone || "-"}</li>
                <li style={{ marginBottom: '15px' }}><strong>Email:</strong> {profile.email || "-"}</li>
              </ul>
              <Link href="/pimpinan" style={{ color: '#004a8e', fontWeight: 800, textDecoration: 'none', fontSize: '14px', display: 'block', marginTop: '20px' }}>
                Jajaran Pimpinan →
              </Link>
            </div>
          </aside>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .pcm-max-width { max-width: 1200px; margin: 40px auto; padding: 0 20px; font-family: sans-serif; }
        .pcm-breadcrumb { font-size: 13px; font-weight: 800; color: #888; text-transform: uppercase; margin-bottom: 20px; }
        .pcm-breadcrumb .active { color: #004a8e; }
        .pcm-h1 { font-size: 42px; font-weight: 900; margin: 0; }
        .pcm-gold-divider { width: 80px; height: 5px; background: #ffc107; margin: 15px 0 50px; border-radius: 10px; }
        .pcm-main-grid { display: flex; gap: 50px; align-items: flex-start; }
        .pcm-article-col { flex: 1; }
        .pcm-card-premium { background: #fff; border-radius: 24px; padding: 40px; border: 1px solid #eee; }
        .pcm-hero-frame { border-radius: 20px; overflow: hidden; margin-bottom: 40px; border: 1px solid #eee; }
        .pcm-vm-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
        @media (max-width: 992px) { 
          .pcm-main-grid { flex-direction: column; } 
          .pcm-sidebar { width: 100% !important; }
          .pcm-vm-grid { grid-template-columns: 1fr; }
        }
      `}} />
    </main>
  );
}