"use client";
import { useState, useEffect } from "react";

export default function NotificationButton() {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // Memastikan fitur didukung oleh browser & Service Worker sudah aktif
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      checkSubscription();
    }
  }, []);

  const checkSubscription = async () => {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    setIsSubscribed(!!subscription);
  };

  const handleSubscribe = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      
      // Meminta izin ke jamaah
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        alert("Izin notifikasi ditolak. Anda tidak akan menerima info khutbah.");
        return;
      }

      // Mendaftarkan perangkat ke Push Service
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY, // Menggunakan Public Key kamu
      });

      // Kirim data langganan ke server untuk disimpan (Database/Sanity)
      await fetch("/api/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: { "Content-Type": "application/json" },
      });

      setIsSubscribed(true);
      alert("Alhamdulillah! Anda akan menerima notifikasi naskah khutbah terbaru.");
    } catch (error) {
      console.error("Gagal berlangganan:", error);
    }
  };

  if (!isSupported) return null;

  return (
    <button
      onClick={handleSubscribe}
      disabled={isSubscribed}
      style={{
        backgroundColor: isSubscribed ? "#28a745" : "var(--abah-blue)",
        color: "#fff",
        padding: "10px 20px",
        borderRadius: "30px",
        border: "none",
        fontWeight: "700",
        cursor: isSubscribed ? "default" : "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "14px"
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
      </svg>
      {isSubscribed ? "AKTIF: INFO KHUTBAH" : "TERIMA INFO KHUTBAH"}
    </button>
  );
}