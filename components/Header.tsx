"use client"; // Wajib ditambahkan agar style jsx dan animasi bisa berjalan di Next.js App Router

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const menus = [
    { name: "Berita", slug: "berita" },
    { name: "Artikel", slug: "artikel" },
    { name: "Tafsir Al-Qur'an", slug: "tafsir" },
    { name: "Hadits Pilihan", slug: "hadits" },
    { name: "Fiqih Praktis", slug: "fiqih" },
    { name: "Mutiara Hikmah", slug: "hikmah" },
    { name: "Khutbah", slug: "khutbah" },
    { name: "Dzikir & Doa", slug: "dzikir-doa" },
  ];

  return (
    <header className="header" style={{ backgroundColor: '#fff', width: '100%', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
      
      {/* --- LAPIS 1: TOPBAR (MENU & SEARCH & LOGIN) --- */}
      <div style={{ borderBottom: '1px solid #eee' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '46px', margin: '0 auto', maxWidth: '1200px', padding: '0 15px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '13px', color: '#555', display: 'flex', alignItems: 'center', gap: '5px' }}>
             <span style={{ color: '#004a8e', fontSize: '18px' }}>☰</span> MENU
          </div>
          
          <div style={{ flex: 1, maxWidth: '400px', position: 'relative', margin: '0 20px' }}>
            <input 
              type="text" 
              placeholder="Cari berita dan artikel..." 
              style={{ width: '100%', padding: '7px 15px', borderRadius: '20px', border: '1px solid #ddd', fontSize: '13px', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Link 
              href="https://abahsaif.web.id/studio" 
              style={{ 
                padding: '5px 20px', 
                borderRadius: '20px', 
                border: '1px solid #004a8e', 
                color: '#004a8e', 
                background: 'none', 
                fontWeight: 'bold', 
                fontSize: '12px', 
                textDecoration: 'none',
                cursor: 'pointer' 
              }}
            >
              Masuk
            </Link>
          </div>
        </div>
      </div>

      {/* --- LAPIS 2: LOGO SECTION --- */}
      <div style={{ padding: '15px 0' }}>
        <div className="container" style={{ margin: '0 auto', maxWidth: '1200px', padding: '0 15px' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <Image src="/abah-saif.jpeg" alt="Logo" width={45} height={45} style={{ borderRadius: '5px' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h1 style={{ fontSize: '35px', fontWeight: '900', fontStyle: 'italic', letterSpacing: '-1.5px', margin: 0, color: '#004a8e', lineHeight: '1' }}>
                ABAH<span style={{ color: '#10D10B' }}>SAIF</span><span style={{ color: '#ccc', fontWeight: '300' }}>.WEB.ID</span>
              </h1>
              <span style={{ fontSize: '11px', color: '#666', fontWeight: '500', letterSpacing: '1px', marginTop: '4px', textTransform: 'uppercase' }}>
                Menggali Ilmu, Membuka Cahaya
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* --- LAPIS 3: BAR BIRU (MENU UTAMA) --- */}
      <nav style={{ background: 'linear-gradient(to right, #004a8e 0%, #004a8e 75%, #4a90e2 100%)' }}>
        <div className="container" style={{ margin: '0 auto', maxWidth: '1200px' }}>
          <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, overflowX: 'auto', scrollbarWidth: 'none' }}>
            <li style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
              <Link href="/" style={{ color: '#fff', padding: '14px 20px', display: 'block', fontWeight: 'bold', textDecoration: 'none', fontSize: '13px' }}>HOME</Link>
            </li>
            {menus.map((menu) => (
              <li key={menu.slug}>
                <Link href={`/${menu.slug}`} style={{ color: '#fff', padding: '14px 18px', display: 'block', fontWeight: 'bold', textDecoration: 'none', fontSize: '13px', whiteSpace: 'nowrap' }}>
                  {menu.name.toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* --- LAPIS 4: RUNNING TEXT (HOT NEWS) --- */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #eee', overflow: 'hidden' }}>
        <div className="container" style={{ margin: '0 auto', maxWidth: '1200px', display: 'flex', alignItems: 'center', height: '40px' }}>
          
          <div style={{ 
            color: '#ce1111', 
            padding: '0 15px', 
            fontSize: '12px', 
            fontWeight: '800', 
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            borderRight: '2px solid #eee',
            height: '100%'
          }}>
            <span style={{ fontSize: '14px' }}>🔥</span> HOT NEWS
          </div>

          <div style={{ flex: 1, padding: '0 15px', overflow: 'hidden', whiteSpace: 'nowrap', position: 'relative' }}>
            <div className="marquee-container">
              <span className="marquee-text">• Selamat Datang di ABAHSAIF.WEB.ID - Wadah Menggali Ilmu dan Membuka Cahaya Kebajikan.</span>
              <span className="marquee-text">• Update: Simak Rubrik Khutbah Terbaru untuk Persiapan Jemaah.</span>
              <span className="marquee-text">• Baru: Panduan Dzikir dan Doa Harian Lengkap Kini Tersedia.</span>
            </div>

            <style jsx>{`
              .marquee-container {
                display: inline-block;
                white-space: nowrap;
                animation: marquee 30s linear infinite;
              }
              .marquee-text {
                margin-right: 60px;
                font-size: 13px;
                color: #444;
                font-weight: 500;
              }
              @keyframes marquee {
                0% { transform: translateX(100%); }
                100% { transform: translateX(-100%); }
              }
            `}</style>
          </div>
        </div>
      </div>
    </header>
  );
}