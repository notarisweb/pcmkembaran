"use client";
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
    <header className="header-container">
      {/* LAPIS 1: TOPBAR */}
      <div className="top-bar">
        <div className="container flex-row-center">
          <div className="menu-btn">☰ MENU</div>
          <div className="search-wrapper">
            <input type="text" placeholder="Cari berita dan artikel..." className="search-input" />
          </div>
          <Link href="/login" className="login-link">Masuk</Link>
        </div>
      </div>

      {/* LAPIS 2: LOGO SECTION */}
      <div className="logo-section">
        <div className="container">
          <Link href="/" className="logo-flex-wrapper">
            <Image 
              src="/abah-saif.jpeg" 
              alt="Logo" 
              width={50} 
              height={50} 
              className="logo-rounded" 
            />
            <div className="logo-text-box">
              <h1 className="main-logo-title">
                ABAH<span className="green">SAIF</span><span className="gray">.WEB.ID</span>
              </h1>
              <p className="tagline">Menggali Ilmu, Membuka Cahaya</p>
            </div>
          </Link>
        </div>
      </div>

      {/* LAPIS 3: NAVBAR BIRU */}
      <nav className="main-nav">
        <div className="container">
          <ul className="nav-menu-list">
            <li className="nav-item home-box">
              <Link href="/" className="nav-anchor">HOME</Link>
            </li>
            {menus.map((m) => (
              <li key={m.slug} className="nav-item">
                <Link href={`/${m.slug}`} className="nav-anchor">
                  {m.name.toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}