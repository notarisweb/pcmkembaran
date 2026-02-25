import { client } from "@/lib/sanity.client";
import { Metadata } from "next";

// 1. FUNGSI AMBIL DATA (Query diperbarui dengan field baru)
async function getRantingData() {
  const query = `*[_type == "ranting"] | order(order asc) {
    _id, 
    name, 
    establishedYear,
    leader, 
    nbm, 
    secretary,
    nbmSecretary,
    treasurer,
    nbmTreasurer,
    address, 
    latitude, 
    longitude,
    "imageUrl": image.asset->url
  }`;
  try {
    return await client.fetch(query, {}, { cache: 'no-store' });
  } catch (error) {
    console.error("Gagal mengambil data Ranting:", error);
    return [];
  }
}

export const metadata: Metadata = {
  title: "Data Ranting (PRM) - PCM Kembaran",
  description: "Daftar Pimpinan Ranting Muhammadiyah (PRM) di wilayah Cabang Kembaran.",
};

export default async function RantingPage() {
  const rantings = await getRantingData();
  
  // Titik tengah peta (Kecamatan Kembaran)
  const centerLat = "-7.4264"; 
  const centerLng = "109.2892";

  return (
    <main id="pcm-ranting-final" style={{ background: '#f8fafc', padding: '60px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        
        <header style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#004a8e', letterSpacing: '2px' }}>STRUKTUR ORGANISASI</span>
          <h1 style={{ fontSize: '42px', fontWeight: 800, color: '#004a8e', margin: '10px 0' }}>DATA RANTING (PRM)</h1>
          <div style={{ width: '70px', height: '5px', background: '#ffc107', margin: '15px auto', borderRadius: '10px' }}></div>
        </header>

        {/* GRID KARTU RANTING */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px', marginBottom: '80px' }}>
          {rantings.map((prm: any) => (
            <div key={prm._id} style={{ background: '#fff', borderRadius: '28px', overflow: 'hidden', border: '1px solid #f1f5f9', boxShadow: '0 10px 25px rgba(0,0,0,0.03)', transition: '0.3s' }}>
              
              {/* HEADER GAMBAR & TAHUN */}
              <div style={{ position: 'relative', aspectRatio: '16/9', background: '#004a8e' }}>
                <img src={prm.imageUrl || "/logo-md.png"} alt={prm.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,74,142,0.9), transparent)' }}></div>
                <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
                  <h3 style={{ color: '#fff', margin: 0, fontSize: '22px', fontWeight: 800 }}>{prm.name}</h3>
                  {prm.establishedYear && (
                    <span style={{ color: '#ffc107', fontSize: '12px', fontWeight: 700 }}>BERDIRI TAHUN {prm.establishedYear}</span>
                  )}
                </div>
              </div>

              {/* DATA PIMPINAN RANTING */}
              <div style={{ padding: '25px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  
                  {/* KETUA */}
                  <div>
                    <p style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '2px' }}>Ketua Ranting</p>
                    <h4 style={{ fontSize: '16px', color: '#1e293b', margin: 0 }}>{prm.leader || '-'}</h4>
                    {prm.nbm && <span style={{ fontSize: '11px', color: '#64748b' }}>NBM: {prm.nbm}</span>}
                  </div>

                  {/* SEKRETARIS & BENDAHARA */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
                    <div>
                      <p style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '2px' }}>Sekretaris</p>
                      <h4 style={{ fontSize: '14px', color: '#1e293b', margin: 0 }}>{prm.secretary || '-'}</h4>
                      {prm.nbmSecretary && <span style={{ fontSize: '10px', color: '#64748b' }}>NBM: {prm.nbmSecretary}</span>}
                    </div>
                    <div>
                      <p style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '2px' }}>Bendahara</p>
                      <h4 style={{ fontSize: '14px', color: '#1e293b', margin: 0 }}>{prm.treasurer || '-'}</h4>
                      {prm.nbmTreasurer && <span style={{ fontSize: '10px', color: '#64748b' }}>NBM: {prm.nbmTreasurer}</span>}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '20px', padding: '15px', background: '#f8fafc', borderRadius: '12px' }}>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: '1.5' }}>📍 {prm.address}</p>
                </div>

                {prm.latitude && (
                  <a 
                    href={`https://www.google.com/maps?q=${prm.latitude},${prm.longitude}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px', background: '#004a8e', color: '#fff', padding: '10px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '13px', transition: '0.2s' }}
                  >
                    Buka Petunjuk Lokasi →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* PETA SEBARAN */}
        <section style={{ background: '#fff', padding: '35px', borderRadius: '32px', border: '1px solid #f1f5f9', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
             <div style={{ width: '10px', height: '30px', background: '#ffc107', borderRadius: '5px' }}></div>
             <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#004a8e', margin: 0 }}>PETA SEBARAN DAKWAH</h2>
          </div>
          <iframe 
            src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15825.0!2d${centerLng}!3d${centerLat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1710000000000`}
            width="100%" height="450" style={{ border: 0, borderRadius: '20px' }} allowFullScreen loading="lazy"
          ></iframe>
        </section>
      </div>
    </main>
  );
}