'use client';

import { useState, useEffect } from 'react';

interface GalleryTriggerProps {
  imageUrl: string;
  title: string;
  children: React.ReactNode;
}

export default function GalleryTrigger({ imageUrl, title, children }: GalleryTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);

  // 1. SCROLL LOCK & ESCAPE KEY
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      // Mencegah scroll pada body saat modal terbuka
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // 2. AKSESIBILITAS KEYBOARD (Enter/Space)
  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  return (
    <>
      {/* TRIGGER BOX */}
      <div 
        onClick={() => setIsOpen(true)} 
        onKeyDown={handleTriggerKeyDown}
        className="pcm-gallery-trigger-box"
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={`Lihat foto ${title}`}
      >
        {children}
      </div>

      {/* LIGHTBOX MODAL */}
      {isOpen && (
        <div 
          className="pcm-lightbox-overlay" 
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="pcm-lightbox-content" onClick={(e) => e.stopPropagation()}>
            {/* CLOSE BUTTON */}
            <button 
              className="pcm-close-btn" 
              onClick={() => setIsOpen(false)}
              aria-label="Tutup galeri"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            
            <div className="pcm-img-wrapper">
              <img src={imageUrl} alt={title} className="pcm-lightbox-img" />
            </div>
            
            <div className="pcm-lightbox-footer">
              <div className="pcm-footer-accent"></div>
              <h3>{title}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Image of typical lightbox modal structure with overlay and centered content */}
      

      <style jsx global>{`
        .pcm-gallery-trigger-box { cursor: pointer; height: 100%; outline: none; }
        .pcm-gallery-trigger-box:focus-visible { ring: 3px solid #ffc107; border-radius: 20px; }
        
        .pcm-lightbox-overlay {
          position: fixed; inset: 0; z-index: 99999;
          background: rgba(15, 23, 42, 0.9); backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center;
          padding: 20px; animation: pcmFadeIn 0.3s ease;
        }

        .pcm-lightbox-content {
          position: relative; max-width: 1000px; width: 100%;
          background: #000; border-radius: 24px; overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          animation: pcmZoomIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pcm-img-wrapper { display: flex; justify-content: center; background: #000; }
        .pcm-lightbox-img {
          max-width: 100%; max-height: 75vh;
          display: block; object-fit: contain;
        }

        .pcm-lightbox-footer { 
          padding: 25px; background: #fff; position: relative;
        }
        .pcm-footer-accent {
          position: absolute; top: 0; left: 0; width: 100%; height: 4px;
          background: linear-gradient(90deg, #004a8e, #ffc107);
        }
        .pcm-lightbox-footer h3 { 
          margin: 0; color: #1e293b; font-weight: 800; font-size: 18px; line-height: 1.4;
        }

        .pcm-close-btn {
          position: absolute; top: 20px; right: 20px; z-index: 10;
          background: rgba(255,255,255,0.15); border: none; color: #fff;
          width: 48px; height: 48px; border-radius: 50%; cursor: pointer;
          display: flex; align-items: center; justify-content: center; 
          transition: 0.3s; backdrop-filter: blur(4px);
        }
        .pcm-close-btn:hover { background: #fff; color: #000; transform: scale(1.1) rotate(90deg); }

        @keyframes pcmFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pcmZoomIn { from { transform: scale(0.9) translateY(20px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }

        @media (max-width: 640px) {
          .pcm-lightbox-content { border-radius: 0; max-width: 100vw; }
          .pcm-lightbox-footer h3 { font-size: 15px; }
        }
      `}</style>
    </>
  );
}