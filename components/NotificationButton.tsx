"use client";
import { useState, useEffect } from "react";

export default function NotificationButton() {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // 1. Deteksi layar HP (Breakpoint 992px)
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // 2. Tangkap event "Ready to Install"
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsSupported(true);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // 3. Cek apakah sudah terinstal
    window.addEventListener("appinstalled", () => {
      setDeferredPrompt(null);
      setIsSubscribed(true);
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleAction = async () => {
    if (!deferredPrompt) {
      handlePushSubscription();
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
    }
  };

  const handlePushSubscription = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const permission = await Notification.requestPermission();
      
      if (permission === "granted") {
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY, //
        });

        await fetch("/api/subscribe", {
          method: "POST",
          body: JSON.stringify(subscription),
          headers: { "Content-Type": "application/json" },
        });

        setIsSubscribed(true);
        // UPDATE: Pesan konfirmasi mencakup seluruh postingan
        alert("Alhamdulillah! Notifikasi aktif. Anda akan menerima kabar dan informasi terbaru dari PCM Kembaran.");
      }
    } catch (err) {
      console.error("Gagal mendaftarkan notifikasi:", err);
    }
  };

  if (!isMobile) return null;

  return (
    <button
      onClick={handleAction}
      disabled={isSubscribed}
      style={{
        backgroundColor: isSubscribed ? "#28a745" : "#004a8e", // Biru PCM
        color: "#fff",
        padding: "12px 24px",
        borderRadius: "30px",
        border: "none",
        fontWeight: "800",
        cursor: isSubscribed ? "default" : "pointer",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "14px",
        boxShadow: "0 6px 20px rgba(0,74,142,0.3)"
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
      </svg>
      {isSubscribed ? "SUDAH TERPASANG" : "INSTALL PCM KEMBARAN"}
    </button>
  );
}