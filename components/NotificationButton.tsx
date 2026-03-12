"use client";

import { useState, useEffect } from "react";

export default function NotificationButton() {
  const [isMobile, setIsMobile] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // 1. Deteksi Layar HP (Breakpoint konsisten dengan layout utama)
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // 2. Cek apakah sudah terinstal (PWA Mode)
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsInstalled(true);
    }

    // 3. Tangkap event install
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setIsInstalled(true);
    }
  };

  // Logika Tampilan: Muncul jika di HP, Belum Terinstal, dan Browser Mendukung
  if (!isMobile || isInstalled || !deferredPrompt) return null;

  return (
    <>
      <button
        onClick={handleInstallClick}
        className="pcm-install-btn"
        aria-label="Install Aplikasi PCM Kembaran"
      >
        <div className="btn-content">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          <span>INSTALL APLIKASI</span>
        </div>
      </button>

      <style jsx>{`
        .pcm-install-btn {
          background-color: #ffc107; /* Emas PCM */
          color: #004a8e; /* Biru PCM */
          padding: 14px 28px;
          border-radius: 50px;
          border: none;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(0, 74, 142, 0.3);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          animation: pcmPulse 2s infinite;
        }

        .pcm-install-btn:hover {
          transform: scale(1.1);
          background-color: #ffffff;
          box-shadow: 0 15px 35px rgba(0, 74, 142, 0.4);
        }

        .btn-content {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13px;
          letter-spacing: 1px;
        }

        @keyframes pcmPulse {
          0% { transform: scale(1); box-shadow: 0 10px 30px rgba(0, 74, 142, 0.3); }
          50% { transform: scale(1.05); box-shadow: 0 15px 40px rgba(0, 74, 142, 0.5); }
          100% { transform: scale(1); box-shadow: 0 10px 30px rgba(0, 74, 142, 0.3); }
        }

        @media (max-width: 640px) {
          .pcm-install-btn {
            padding: 12px 20px;
          }
          .btn-content span {
            font-size: 11px;
          }
        }
      `}</style>
    </>
  );
}