'use client'

/**
 * Komponen ini berfungsi untuk merender interface Sanity Studio.
 * Jalur import telah diperbarui ke 'next-sanity/studio' untuk 
 * mendukung Next.js 15 dan versi terbaru library.
 */
import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

export default function StudioPage() {
  return (
    // Memastikan dashboard tampil satu layar penuh tanpa scroll bar ganda
    <div style={{ height: '100vh', margin: 0, padding: 0 }}>
      <NextStudio config={config} />
    </div>
  )
}