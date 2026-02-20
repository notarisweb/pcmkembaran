'use client'

import ViewCounter from "./ViewCounter"
import ShareButtons from "./ShareButtons"

interface PostClientProps {
  slug: string;
  shareUrl: string;
  title: string;
}

/**
 * Komponen Client Utama PCM Kembaran
 * Fitur: Tracker View & Premium Share Dashboard (Modern Tooltip)
 */
export default function PostDetailClient({ slug, shareUrl, title }: PostClientProps) {
  // Mencegah error 'undefined reading slug'
  if (!slug) return null;

  return (
    <div className="pcm-premium-client-root">
      {/* 1. TRACKER VIEW */}
      <ViewCounter slug={slug} />

      {/* 2. DASHBOARD BAGIKAN PREMIUM (Gaya image_241fe2.png) */}
      <div className="pcm-premium-share-dashboard">
        
        {/* Label Tooltip Putih dengan Panah */}
        <div className="pcm-share-tooltip-label">
           <svg 
             width="16" height="16" viewBox="0 0 24 24" fill="none" 
             stroke="currentColor" strokeWidth="3" style={{marginRight:'8px'}}
           >
             <circle cx="18" cy="5" r="3"></circle>
             <circle cx="6" cy="12" r="3"></circle>
             <circle cx="18" cy="19" r="3"></circle>
             <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
             <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
           </svg>
           Bagikan
        </div>
        
        {/* Kontainer Ikon dengan Proteksi Baris Horizontal (Nuclear Override) */}
        <div className="pcm-share-icons-horizontal-force">
          <ShareButtons shareUrl={shareUrl} postTitle={title} />
        </div>
      </div>

      <style jsx>{`
        .pcm-premium-share-dashboard {
          display: flex !important;
          flex-direction: row !important;
          align-items: center !important;
          gap: 15px !important;
          margin: 10px 0;
        }

        /* GAYA TOOLTIP BAGIKAN PREMIUM */
        .pcm-share-tooltip-label {
          background: #ffffff !important;
          color: #1a1a1a !important;
          border: 1.5px solid #e5e7eb !important;
          padding: 8px 18px !important;
          border-radius: 10px !important;
          font-weight: 800 !important;
          font-size: 13.5px !important;
          position: relative !important;
          display: flex !important;
          align-items: center !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03) !important;
          white-space: nowrap !important;
          line-height: 1 !important;
          z-index: 5;
        }

        /* Panah Penunjuk Tooltip */
        .pcm-share-tooltip-label::after {
          content: '' !important;
          position: absolute !important;
          right: -8px !important;
          top: 50% !important;
          transform: translateY(-50%) rotate(45deg) !important;
          width: 12px !important;
          height: 12px !important;
          background: #ffffff !important;
          border-top: 1.5px solid #e5e7eb !important;
          border-right: 1.5px solid #e5e7eb !important;
        }

        /* FORCE ROW LOCK: Menghentikan tumpukan vertikal ikon */
        .pcm-share-icons-horizontal-force {
          display: flex !important;
          flex-direction: row !important;
          align-items: center !important;
        }

        /* Target elemen di dalam ShareButtons tanpa merusak komponen asli */
        :global(.pcm-share-icons-horizontal-force > div) {
          display: flex !important;
          flex-direction: row !important;
          align-items: center !important;
          gap: 10px !important;
          width: auto !important;
        }

        /* Gaya Ikon Solid Premium (Cegah ikon transparan/bolong) */
        :global(.pcm-share-icon-btn), :global(.pcm-icon-btn) {
          width: 42px !important;
          height: 42px !important;
          border-radius: 10px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          color: #ffffff !important;
          transition: all 0.3s ease !important;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05) !important;
        }

        /* Warna Brand Premium */
        :global(.bg-fb) { background-color: #3b5998 !important; }
        :global(.bg-wa) { background-color: #25D366 !important; }
        :global(.bg-ig) { background-color: #E4405F !important; }
        :global(.bg-x)  { background-color: #000000 !important; }
        :global(.bg-tg) { background-color: #0088cc !important; }
        :global(.bg-link) { background-color: #4b5563 !important; }

        @media (max-width: 768px) {
          .pcm-premium-share-dashboard { gap: 10px !important; }
          .pcm-share-tooltip-label { padding: 6px 14px !important; font-size: 12px !important; }
        }
      `}</style>
    </div>
  )
}