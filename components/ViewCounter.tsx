"use client";
import { useEffect } from "react";

export default function ViewCounter({ slug }: { slug: string }) {
  useEffect(() => {
    // Pemicu update views saat halaman berhasil dimuat di HP/Laptop jamaah
    fetch(`/api/views/${slug}`, { method: 'POST' })
      .catch(err => console.error("Gagal update views:", err));
  }, [slug]);

  return null; // Komponen ini tidak terlihat, hanya bekerja di balik layar
}