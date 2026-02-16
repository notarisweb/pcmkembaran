"use client";
import { useState, useEffect } from "react";

export default function NotificationButton() {
  const [isMobile, setIsMobile] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // 1. Deteksi Layar HP (992px)
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // 2. Cek apakah sudah terinstal (PWA Mode)
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsInstalled(true);
    }

    // 3. Tangkap event install hanya jika belum terpasang
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

  // Logika Muncul: Harus di HP DAN Belum Terinstal
  if (!isMobile || isInstalled || !deferredPrompt) return null;

  return (
    <button
      onClick={handleInstallClick}
      style={{
        backgroundColor: "#ffc107", // Kuning Tua (Amber)
        color: "#000000", // Tulisan Hitam
        padding: "12px 24px",
        borderRadius: "30px",
        border: "none",
        fontWeight: "900",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "14px",
        boxShadow: "0 6px 25px rgba(0,0,0,0.2)", // Bayangan agar lebih melayang
        textTransform: "uppercase",
        letterSpacing: "0.5px"
      }}
    >
      {/* Ikon Lonceng/Install */}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
      INSTALL PCM KEMBARAN
    </button>
  );
}