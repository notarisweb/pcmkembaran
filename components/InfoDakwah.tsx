"use client"; // WAJIB: Agar styled-jsx bisa jalan di Next.js App Router

export default function InfoDakwah() {
  return (
    <div className="sidebar-card info-dakwah-card">
      <h3 className="sidebar-heading centered-title">INFO DAKWAH</h3>
      
      <div className="info-body">
        <p>
          Dukung operasional dakwah digital <strong>PCM Kembaran</strong> dengan menjadi donatur atau mitra kerjasama.
        </p>
        
        {/* TOMBOL DONASI SOCIABUZZ */}
        <a 
          href="https://sociabuzz.com/pcmkembaran/tribe" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn-donasi"
        >
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          Donasi Sekarang
        </a>
      </div>

      <style jsx>{`
        .info-dakwah-card {
          background: #fff;
          padding: 25px;
          border-radius: 15px;
          border: 1px solid #efefef;
          margin-bottom: 30px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
          transition: all 0.3s ease;
        }
        .info-dakwah-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.06);
        }
        .centered-title {
          text-align: center;
          font-size: 16px;
          font-weight: 900;
          color: #004a8e;
          margin-bottom: 15px;
          letter-spacing: 1px;
        }
        .info-body {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
        .info-body p {
          text-align: center;
          color: #555;
          font-size: 14px;
          line-height: 1.7;
          margin: 0;
        }
        .info-body strong {
          color: #004a8e;
        }

        /* STYLING TOMBOL PREMIUM */
        .btn-donasi {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          background: #004a8e;
          color: #fff;
          text-decoration: none;
          padding: 12px 20px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 800;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(0, 74, 142, 0.2);
        }
        .btn-donasi:hover {
          background: #ffc107;
          color: #004a8e;
          transform: scale(1.03);
          box-shadow: 0 6px 15px rgba(255, 193, 7, 0.3);
        }
        .btn-donasi svg {
          transition: transform 0.3s ease;
        }
        .btn-donasi:hover svg {
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
}