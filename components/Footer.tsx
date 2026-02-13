import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ 
      backgroundColor: '#fff', 
      borderTop: '4px solid #004a8e', 
      padding: '50px 0 0 0', 
      fontFamily: 'Arial, sans-serif',
      marginTop: '60px' 
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 20px', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '40px' 
      }}>
        {/* KOLOM 1: BRAND & LOGO */}
        <div>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            {/* Menggunakan logo yang sama dengan header */}
            <Image src="/abah-saif.jpeg" alt="Logo" width={40} height={40} style={{ borderRadius: '5px' }} />
            <h2 style={{ fontSize: '24px', fontWeight: '900', fontStyle: 'italic', color: '#004a8e', margin: 0, letterSpacing: '-1px' }}>
              ABAH<span style={{ color: '#28a745' }}>SAIF</span>
            </h2>
          </Link>
          <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.8', textAlign: 'justify' }}>
            Wadah edukasi dan literasi Islam yang berkomitmen menyajikan konten murni, menyejukkan, dan mencerahkan. Menggali kedalaman ilmu untuk membuka cahaya kebaikan bagi umat.
          </p>
        </div>

        {/* KOLOM 2: RUBRIK POPULER */}
        <div>
          <h4 style={{ color: '#333', marginBottom: '20px', fontSize: '16px', borderLeft: '4px solid #28a745', paddingLeft: '10px' }}>Kategori Utama</h4>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px' }}>
            {['Berita', 'Artikel', 'Tafsir Al-Qur\'an', 'Khutbah', 'Dzikir & Doa'].map((item) => (
              <li key={item} style={{ marginBottom: '12px' }}>
                <Link href={`/${item.toLowerCase().replace(/ /g, '-').replace('&', 'dan')}`} style={{ textDecoration: 'none', color: '#666', transition: '0.3s' }}>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* KOLOM 3: PERUSAHAAN */}
        <div>
          <h4 style={{ color: '#333', marginBottom: '20px', fontSize: '16px', borderLeft: '4px solid #004a8e', paddingLeft: '10px' }}>Informasi</h4>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px' }}>
            <li style={{ marginBottom: '12px' }}><Link href="/tentang-kami" style={{ textDecoration: 'none', color: '#666' }}>Tentang Kami</Link></li>
            <li style={{ marginBottom: '12px' }}><Link href="/redaksi" style={{ textDecoration: 'none', color: '#666' }}>Redaksi & Manajemen</Link></li>
            <li style={{ marginBottom: '12px' }}><Link href="/kontak" style={{ textDecoration: 'none', color: '#666' }}>Hubungi Kami</Link></li>
            <li style={{ marginBottom: '12px' }}><Link href="/pedoman-media" style={{ textDecoration: 'none', color: '#666' }}>Pedoman Media Siber</Link></li>
          </ul>
        </div>

        {/* KOLOM 4: SINERGI JARINGAN */}
        <div>
          <h4 style={{ color: '#333', marginBottom: '20px', fontSize: '16px', borderLeft: '4px solid #ce1111', paddingLeft: '10px' }}>Jaringan Media</h4>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px' }}>
            <li style={{ marginBottom: '12px' }}>
                <Link href="https://onislam.web.id" target="_blank" style={{ textDecoration: 'none', color: '#666' }}>Media Islam Online</Link>
            </li>
            <li style={{ marginBottom: '12px' }}>
                <Link href="https://youtube.com/@ilham-tv" target="_blank" style={{ textDecoration: 'none', color: '#666' }}>Ilham TV (YouTube)</Link>
            </li>
            <li style={{ marginBottom: '12px' }}>
                <Link href="/pasang-iklan" style={{ textDecoration: 'none', color: '#004a8e', fontWeight: 'bold' }}>Pasang Iklan / Kerjasama</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* COPYRIGHT AREA */}
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        marginTop: '50px', 
        padding: '25px 0', 
        textAlign: 'center', 
        fontSize: '13px', 
        color: '#888',
        borderTop: '1px solid #eee'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <p style={{ margin: 0 }}>
            © {currentYear} <strong>ABAHSAIF.WEB.ID</strong> — Media Dakwah Digital. Terus Menggali Ilmu, Membuka Cahaya.
          </p>
        </div>
      </div>
    </footer>
  );
}