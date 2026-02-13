"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Pengunci ukuran ikon agar tetap proporsional
  const iconCircleStyle = (bgColor: string) => ({
    width: '36px',
    height: '36px',
    minWidth: '36px',
    maxWidth: '36px',
    borderRadius: '50%',
    backgroundColor: bgColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
  });

  return (
    <footer style={{ backgroundColor: '#fff', borderTop: '4px solid #004a8e', padding: '60px 0 0 0', marginTop: '60px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* KOLOM 1: BRAND & SOSIAL MEDIA */}
        <div>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', marginBottom: '20px' }}>
            <Image src="/abah-saif.jpeg" alt="Logo" width={50} height={50} style={{ borderRadius: '50%' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '24px', fontWeight: '900', color: '#004a8e', lineHeight: '1' }}>
                ABAH<span style={{ color: '#2ca44f' }}>SAIF</span><span style={{ color: '#aaa', fontWeight: '400', fontSize: '18px' }}>.WEB.ID</span>
              </span>
              <span style={{ fontSize: '11px', color: '#555', fontWeight: '600', marginTop: '4px' }}>Menggali Ilmu, Membuka Cahaya</span>
            </div>
          </Link>
          <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.8', marginBottom: '25px', textAlign: 'justify' }}>
            Wadah edukasi dan literasi Islam yang berkomitmen menyajikan konten murni, menyejukkan, dan mencerahkan. Menggali kedalaman ilmu untuk membuka cahaya kebaikan bagi umat.
          </p>
          
          {/* SOSIAL MEDIA SVG */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link href="#" style={iconCircleStyle('#1877F2')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </Link>
            <Link href="#" style={iconCircleStyle('#000000')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </Link>
            <Link href="#" style={{ ...iconCircleStyle(''), background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </Link>
            <Link href="#" style={iconCircleStyle('#ff0000')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </Link>
          </div>
        </div>

        {/* KOLOM 2: KATEGORI UTAMA */}
        <div>
          <h4 style={{ fontSize: '16px', fontWeight: 'bold', borderLeft: '4px solid #2ca44f', paddingLeft: '10px', marginBottom: '20px', color: '#333' }}>Kategori Utama</h4>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', color: '#666', lineHeight: '2.2' }}>
            <li><Link href="/berita" style={{ textDecoration: 'none', color: 'inherit' }}>Berita</Link></li>
            <li><Link href="/artikel" style={{ textDecoration: 'none', color: 'inherit' }}>Artikel</Link></li>
            <li><Link href="/tafsir" style={{ textDecoration: 'none', color: 'inherit' }}>Tafsir Al-Qur'an</Link></li>
            <li><Link href="/khutbah" style={{ textDecoration: 'none', color: 'inherit' }}>Khutbah</Link></li>
            <li><Link href="/dzikir-doa" style={{ textDecoration: 'none', color: 'inherit' }}>Dzikir & Doa</Link></li>
          </ul>
        </div>

        {/* KOLOM 3: INFORMASI */}
        <div>
          <h4 style={{ fontSize: '16px', fontWeight: 'bold', borderLeft: '4px solid #004a8e', paddingLeft: '10px', marginBottom: '20px', color: '#333' }}>Informasi</h4>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', color: '#666', lineHeight: '2.2' }}>
            <li><Link href="/tentang" style={{ textDecoration: 'none', color: 'inherit' }}>Tentang Kami</Link></li>
            <li><Link href="/redaksi" style={{ textDecoration: 'none', color: 'inherit' }}>Redaksi & Manajemen</Link></li>
            <li><Link href="/kontak" style={{ textDecoration: 'none', color: 'inherit' }}>Hubungi Kami</Link></li>
            <li><Link href="/pedoman" style={{ textDecoration: 'none', color: 'inherit' }}>Pedoman Media Siber</Link></li>
          </ul>
        </div>

        {/* KOLOM 4: JARINGAN MEDIA */}
        <div>
          <h4 style={{ fontSize: '16px', fontWeight: 'bold', borderLeft: '4px solid #ce1111', paddingLeft: '10px', marginBottom: '20px', color: '#333' }}>Jaringan Media</h4>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', color: '#666', lineHeight: '2.2' }}>
            <li><Link href="https://onislam.web.id" target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>Media Islam Online</Link></li>
            <li><Link href="https://youtube.com/@ilham-tv" target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>Ilham TV (YouTube)</Link></li>
            <li style={{ marginTop: '10px' }}>
              <Link href="/pasang-iklan" style={{ color: '#004a8e', fontWeight: 'bold', textDecoration: 'none' }}>Pasang Iklan / Kerjasama</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* COPYRIGHT AREA */}
      <div style={{ backgroundColor: '#f8f9fa', marginTop: '50px', padding: '25px 0', borderTop: '1px solid #eee', textAlign: 'center', fontSize: '13px', color: '#888' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <p style={{ margin: 0 }}>
            © {currentYear} <strong>ABAHSAIF.WEB.ID</strong> — Media Dakwah Digital. Terus Menggali Ilmu, Membuka Cahaya.
          </p>
        </div>
      </div>
    </footer>
  );
}