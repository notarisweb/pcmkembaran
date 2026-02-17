"use client";
import { useState } from "react"; 
import { useRouter } from "next/navigation"; 
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const categoryMenus = [
    { name: "Berita", slug: "berita" },
    { name: "Artikel", slug: "artikel" },
    { name: "Liputan Dakwah", slug: "liputan-dakwah" },
    { name: "Pendidikan", slug: "pendidikan" },
    { name: "Video", slug: "video" },
    { name: "Tokoh & Inspirasi", slug: "tokoh-inspirasi" },
    { name: "Teknologi", slug: "teknologi" },
    { name: "Kesehatan", slug: "kesehatan" },
    { name: "Unduhan", slug: "unduhan" },
  ];

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
      
      <style dangerouslySetInnerHTML={{ __html: `
        .nav-link-item {
          color: #ffffff !important; 
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .nav-link-item:hover {
          background-color: var(--abah-gold) !important;
          color: #000000 !important;
        }
        .nav-menu-list::-webkit-scrollbar { display: none; }
        .nav-menu-list { -ms-overflow-style: none; scrollbar-width: none; }
        
        @media (max-width: 992px) {
          .top-center-search { display: none !important; }
        }
      `}} />

      {/* LAPIS 1: TOPBAR (TRUE CENTER SEARCH) */}
      <div className="top-bar" style={{ backgroundColor: '#fff', borderBottom: '1px solid #eee', padding: '8px 0' }}>
        <div className="container" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 15px' 
        }}>
          
          {/* KIRI: WRAPPER HAMBURGER (flex: 1) */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
            <div 
              className="hamburger-toggle" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ display: 'flex', flexDirection: 'column', gap: '4px', cursor: 'pointer', zIndex: 1100 }}
            >
              <span style={{ width: '25px', height: '3px', backgroundColor: 'var(--abah-blue)', borderRadius: '2px', transition: '0.3s', transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
              <span style={{ width: '25px', height: '3px', backgroundColor: 'var(--abah-blue)', borderRadius: '2px', opacity: isMenuOpen ? 0 : 1 }}></span>
              <span style={{ width: '25px', height: '3px', backgroundColor: 'var(--abah-blue)', borderRadius: '2px', transition: '0.3s', transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></span>
            </div>
          </div>

          {/* TENGAH: SEARCH PILL (flex: 1 & True Center) */}
          <div className="top-center-search" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <form onSubmit={handleSearch} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              border: '1px solid #ddd', 
              borderRadius: '30px', 
              padding: '2px 2px 2px 15px', 
              backgroundColor: '#fff', 
              width: '100%', 
              maxWidth: '380px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.03)'
            }}>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari naskah khutbah atau berita..." 
                style={{ border: 'none', outline: 'none', width: '100%', fontSize: '13px', color: '#444' }} 
              />
              <button type="submit" style={{ 
                backgroundColor: 'var(--abah-blue)', 
                border: 'none', 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </button>
            </form>
          </div>

          {/* KANAN: TOMBOL DONASI & MASUK (flex: 1) */}
          <div className="top-right-group" style={{ flex: 1, display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <Link href="https://sociabuzz.com/pcmkembaran/tribe" style={{ 
              backgroundColor: 'var(--abah-blue)', 
              color: '#ffffff !important', // Tulisan Donasi Putih
              padding: '6px 15px', 
              borderRadius: '20px', 
              fontSize: '11px', 
              fontWeight: '800', 
              textDecoration: 'none', 
              textTransform: 'uppercase' 
            }}>
              DONASI
            </Link>
            <Link href="https://pcmkembaran.com/studio" target="_blank" style={{ 
              backgroundColor: 'var(--abah-gold)', 
              color: '#000', 
              padding: '6px 15px', 
              borderRadius: '20px', 
              fontSize: '11px', 
              fontWeight: '800', 
              textDecoration: 'none', 
              textTransform: 'uppercase' 
            }}>
              MASUK
            </Link>
          </div>
        </div>
      </div>

      {/* SIDE DRAWER */}
      <div style={{
        position: 'fixed', top: 0, left: isMenuOpen ? 0 : '-100%',
        width: '280px', height: '100vh', backgroundColor: '#fff',
        zIndex: 2000, transition: '0.4s ease', boxShadow: '5px 0 15px rgba(0,0,0,0.1)',
        padding: '30px 20px', overflowY: 'auto'
      }}>
        <h3 style={{ color: 'var(--abah-blue)', fontSize: '18px', fontWeight: '900', borderBottom: '2px solid var(--abah-gold)', paddingBottom: '10px', marginBottom: '20px' }}>NAVIGASI</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {orgMenus.map((m) => (
            <li key={m.slug} style={{ marginBottom: '15px' }}>
              <Link href={`/${m.slug}`} onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none', color: '#444', fontWeight: '700', fontSize: '14px' }}>{m.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      {isMenuOpen && <div onClick={() => setIsMenuOpen(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1900 }}></div>}

      {/* LAPIS 2: LOGO */}
      <div className="logo-section" style={{ backgroundColor: '#fff', padding: '20px 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Image src="/logo-md.png" alt="Logo" width={55} height={55} style={{ borderRadius: '50%' }} />
            <div className="logo-text-box">
              <h1 style={{ color: 'var(--abah-blue)', margin: 0, fontSize: '32px', fontWeight: '900', fontStyle: 'italic', letterSpacing: '-1.5px' }}>
                PCM <span style={{ color: 'var(--abah-gold)' }}>KEMBARAN</span>
              </h1>
              <p style={{ fontSize: '13px', color: '#666', fontWeight: '500', textTransform: 'uppercase' }}>Dakwah Berkemajuan, Mencerahkan Kehidupan</p>
            </div>
          </Link>
        </div>
      </div>

      {/* LAPIS 3: MENU BAR BIRU */}
      <nav className="main-nav" style={{ backgroundColor: 'var(--abah-blue)', borderBottom: '2px solid var(--abah-gold)', position: 'sticky', top: 0, zIndex: 1000 }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <ul className="nav-menu-list" style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0, overflowX: 'auto' }}>
            <li style={{ backgroundColor: 'var(--abah-gold)' }}>
              <Link href="/" style={{ display: 'flex', alignItems: 'center', height: '48px', padding: '0 20px', color: '#000', fontWeight: '800', textDecoration: 'none' }}>HOME</Link>
            </li>
            {categoryMenus.map((m) => (
              <li key={m.slug}>
                <Link 
                  href={`/${m.slug}`} 
                  className="nav-link-item"
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    height: '48px', 
                    padding: '0 20px', 
                    fontWeight: '700', 
                    fontSize: '12px', 
                    whiteSpace: 'nowrap', 
                    textTransform: 'uppercase' 
                  }}
                >
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