import { client } from "@/lib/sanity.client";
import Link from "next/link";
import { Metadata } from "next";

async function getRantingData() {
  const query = `*[_type == "ranting"] | order(order asc) {
    _id, name, leader, nbm, address, latitude, longitude,
    "imageUrl": image.asset->url
  }`;
  try {
    return await client.fetch(query, {}, { cache: 'no-store' });
  } catch (error) {
    console.error("Gagal mengambil data:", error);
    return [];
  }
}

export const metadata: Metadata = {
  title: "Data Ranting - PCM Kembaran",
};

export default async function RantingPage() {
  const rantings = await getRantingData();
  const centerLat = "-7.4264"; 
  const centerLng = "109.2892";

  return (
    <main id="pcm-ranting-premium-final" style={{ background: '#f8fafc', padding: '60px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        
        <header style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '42px', fontWeight: 800, color: '#004a8e' }}>DATA RANTING (PRM)</h1>
          <div style={{ width: '70px', height: '5px', background: '#ffc107', margin: '15px auto', borderRadius: '10px' }}></div>
        </header>

        {/* GRID KARTU */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px', marginBottom: '80px' }}>
          {rantings.map((prm: any) => (
            <div key={prm._id} style={{ background: '#fff', borderRadius: '24px', overflow: 'hidden', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
              <div style={{ position: 'relative', aspectRatio: '16/9', background: '#004a8e' }}>
                <img src={prm.imageUrl || "/logo-md.png"} alt={prm.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                <div style={{ position: 'absolute', bottom: 0, padding: '20px', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', width: '100%' }}>
                  <h3 style={{ color: '#fff', margin: 0 }}>{prm.name}</h3>
                </div>
              </div>
              <div style={{ padding: '25px' }}>
                <p style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Ketua Ranting</p>
                <h4 style={{ fontSize: '18px', color: '#004a8e', margin: '5px 0' }}>{prm.leader}</h4>
                {prm.nbm && <p style={{ fontSize: '12px', color: '#64748b' }}>NBM: {prm.nbm}</p>}
                <hr style={{ margin: '15px 0', borderColor: '#f1f5f9' }} />
                <p style={{ fontSize: '14px', color: '#64748b' }}>{prm.address}</p>
                {prm.latitude && (
                  <a href={`https://www.google.com/maps?q=${prm.latitude},${prm.longitude}`} target="_blank" style={{ display: 'inline-block', marginTop: '15px', color: '#004a8e', fontWeight: 800, textDecoration: 'none', fontSize: '13px' }}>
                    📍 Petunjuk Lokasi →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* PETA INTERAKTIF */}
        <section style={{ background: '#fff', padding: '30px', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#004a8e', marginBottom: '20px' }}>PETA SEBARAN DAKWAH</h2>
          <iframe 
            src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15825.0!2d${centerLng}!3d${centerLat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1710000000000`}
            width="100%" height="400" style={{ border: 0, borderRadius: '15px' }} allowFullScreen loading="lazy"
          ></iframe>
        </section>
      </div>
    </main>
  );
}