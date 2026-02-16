"use client";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  // Navbar Biru (Kategori Rubrik)
  const categoryMenus = [
    { name: "Berita", slug: "berita" },
    { name: "Artikel", slug: "artikel" },
    { name: "Liputan Dakwah", slug: "liputan-dakwah" },
    { name: "Pendidikan", slug: "pendidikan" },
    { name: "Video", slug: "video" },
    { name: "Bisnis", slug: "bisnis" },
    { name: "Tokoh & Inspirasi", slug: "tokoh-inspirasi" },
    { name: "Teknologi", slug: "teknologi" },
    { name: "Kesehatan", slug: "kesehatan" },
    { name: "Unduhan", slug: "unduhan" },
  ];

  // Lapis Terakhir (Menu Organisasi - Di bawah Navbar Biru)
  const orgMenus = [
    { name: "Profil Cabang", slug: "profil" },
    { name: "Majelis & Lembaga", slug: "lembaga" },
    { name: "Data Ranting (PRM)", slug: "ranting" },
    { name: "Daftar Masjid", slug: "masjid" },
    { name: "Galeri Kegiatan", slug: "galeri" },
    { name: "Kontak", slug: "kontak" },
  ];

  return (
    <header className="header-container" style={{ width: '100%', position: 'relative' }}>
      
      {/* LAPIS 1: TOPBAR MODERN */}
      <div className="top-bar" style={{ backgroundColor: '#fff', borderBottom: '1px solid #eee', padding: '8px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
          
          {/* KIRI: MENU TOGGLE */}
          <div className="top-left-menu" style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <div className="menu-circle-icon" style={{ backgroundColor: 'var(--abah-blue)', color: '#fff', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>☰</div>
            <span className="menu-label" style={{ fontWeight: '800', fontSize: '12px', color: '#444' }}>MENU</span>
          </div>

          {/* TENGAH: SEARCH PILL */}
          <div className="top-center-search">
            <div className="search-pill-container" style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '30px', padding: '2px 2px 2px 15px', backgroundColor: '#fff', width: '300px' }}>
              <input type="text" placeholder="Cari informasi..." className="search-pill-input" style={{ border: 'none', outline: 'none', width: '100%', fontSize: '13px' }} />
              <button className="search-pill-button" style={{ backgroundColor: 'var(--abah-blue)', border: 'none', width: '30px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* KANAN: DONASI & MASUK */}
          <div className="top-right-group" style={{ display: 'flex', gap: '10px' }}>
            <Link href="https://sociabuzz.com/pcmkembaran/tribe" target="_blank" className="btn-blue-pill" style={{ backgroundColor: 'var(--abah-blue)', color: '#fff', padding: '6px 15px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', textDecoration: 'none' }}>
              DONASI
            </Link>
            <Link href="https://abahsaif.sanity.studio" target="_blank" className="btn-outline-pill" style={{ border: '1.5px solid var(--abah-blue)', color: 'var(--abah-blue)', padding: '5px 15px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', textDecoration: 'none' }}>
              Masuk
            </Link>
          </div>
        </div>
      </div>

      {/* LAPIS 2: LOGO SECTION */}
      <div className="logo-section" style={{ backgroundColor: '#fff', padding: '20px 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
          <Link href="/" className="logo-flex-wrapper" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px', width: 'fit-content' }}>
            <Image src="/logo-md.png" alt="Logo PCM Kembaran" width={55} height={55} className="logo-rounded" style={{ borderRadius: '50%' }} />
            <div className="logo-text-box">
              <h1 className="main-logo-title" style={{ color: 'var(--abah-blue)', margin: 0, display: 'flex', alignItems: 'baseline', fontSize: '32px', fontWeight: '900', fontStyle: 'italic', letterSpacing: '-1.5px', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)' }}>
                PCM
                <span style={{ color: 'var(--abah-gold)', fontWeight: '900', textShadow: '2px 2px 4px rgba(0, 74, 142, 0.4)', WebkitTextStroke: '0.5px var(--abah-blue)' }}>
                  KEMBARAN
                </span>
                <span style={{ color: '#ccc', fontWeight: '300', fontSize: '18px', marginLeft: '2px' }}>.COM</span>
              </h1>
              <p className="tagline" style={{ fontSize: '13px', color: '#666', fontWeight: '500', margin: '2px 0 0 0', textTransform: 'uppercase', letterSpacing: '1px' }}>Menggali Ilmu, Membuka Cahaya</p>
            </div>
          </Link>
        </div>
      </div>

      {/* LAPIS 3: MAIN NAV (NAVBAR BIRU: KATEGORI) */}
      <nav className="main-nav" style={{ backgroundColor: 'var(--abah-blue)', borderBottom: '2px solid var(--abah-gold)', position: 'sticky', top: 0, zIndex: 1000 }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <ul className="nav-menu-list" style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0, overflowX: 'auto' }}>
            <li className="nav-item home-box" style={{ backgroundColor: 'var(--abah-gold)' }}>
              <Link href="/" className="nav-anchor" style={{ display: 'flex', alignItems: 'center', height: '48px', padding: '0 20px', color: 'var(--abah-blue)', fontWeight: '800', fontSize: '13px', textDecoration: 'none' }}>HOME</Link>
            </li>
            {categoryMenus.map((m) => (
              <li key={m.slug} className="nav-item">
                <Link href={`/${m.slug}`} className="nav-anchor" style={{ display: 'flex', alignItems: 'center', height: '48px', padding: '0 20px', color: '#fff', fontWeight: '700', fontSize: '12px', textDecoration: 'none', whiteSpace: 'nowrap', textTransform: 'uppercase', transition: '0.3s' }}>
                  {m.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* LAPIS 4: SUB-NAV (LAPIS TERAKHIR - MENU ORGANISASI) */}
      <nav className="sub-nav" style={{ backgroundColor: '#fdfdfd', borderBottom: '1px solid #eee' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <ul style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0, overflowX: 'auto' }}>
            {orgMenus.map((m) => (
              <li key={m.slug}>
                <Link href={`/${m.slug}`} style={{ display: 'block', padding: '10px 20px', fontSize: '12px', fontWeight: '600', color: '#666', textDecoration: 'none', whiteSpace: 'nowrap', borderRight: '1px solid #f0f0f0' }}>
                  {m.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

    </header>
  );
}