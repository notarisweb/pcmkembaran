'use client';

import { useState, useEffect } from 'react';

interface GalleryTriggerProps {
  imageUrl: string;
  title: string;
  children: React.ReactNode; // Ini untuk membungkus tampilan kartu di halaman utama
}

export default function GalleryTrigger({ imageUrl, title, children }: GalleryTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Fungsi untuk menutup dengan tombol ESC
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      {/* 1. TRIGGER: Bagian ini yang membuat kartu bisa diklik */}
      <div 
        onClick={() => setIsOpen(true)} 
        className="pcm-gallery-trigger-box"
        role="button"
        tabIndex={0}
        aria-label={`Lihat foto ${title}`}
      >
        {children}
      </div>

      {/* 2. LIGHTBOX POPUP MODAL */}
      {isOpen && (
        <div className="pcm-lightbox-overlay" onClick={() => setIsOpen(false)}>
          <div className="pcm-lightbox-content" onClick={(e) => e.stopPropagation()}>
            {/* Tombol Close X */}
            <button className="pcm-close-btn" onClick={() => setIsOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            
            {/* Foto Full Size */}
            <img src={imageUrl} alt={title} className="pcm-lightbox-img" />
            
            {/* Judul di bawah foto */}
            <div className="pcm-lightbox-caption">
              <h3>{title}</h3>
            </div>
          </div>
        </div>
      )}

      {/* CSS KHUSUS LIGHTBOX */}
      <style jsx global>{`
        .pcm-gallery-trigger-box { cursor: pointer; height: 100%; }
        
        /* Overlay Gelap */
        .pcm-lightbox-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          padding: 20px; animation: fadeIn 0.3s ease;
        }

        /* Konten Tengah */
        .pcm-lightbox-content {
          position: relative; max-width: 90vw; max-height: 90vh;
          border-radius: 15px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          background: #000; animation: zoomIn 0.3s ease;
        }

        /* Foto Full */
        .pcm-lightbox-img {
          width: auto; height: auto; max-width: 100%; max-height: 80vh;
          display: block; object-fit: contain;
        }

        /* Caption & Close Btn */
        .pcm-lightbox-caption { padding: 15px 20px; background: #fff; }
        .pcm-lightbox-caption h3 { margin: 0; color: #004a8e; font-weight: 800; font-size: 16px; }

        .pcm-close-btn {
          position: absolute; top: 15px; right: 15px;
          background: rgba(255,255,255,0.2); border: none; color: #fff;
          width: 40px; height: 40px; border-radius: 50%; cursor: pointer;
          display: flex; align-items: center; justify-content: center; transition: 0.3s;
        }
        .pcm-close-btn:hover { background: rgba(255,255,255,0.9); color: #000; transform: rotate(90deg); }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes zoomIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </>
  );
}