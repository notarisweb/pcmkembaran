'use client'

import { useEffect } from 'react'

export default function InstallationTracker() {
  useEffect(() => {
    const handleAppInstalled = async () => {
      console.log('Aplikasi PCM Kembaran berhasil diinstall!')
      
      try {
        // Memanggil API yang tadi kita tes manual
        await fetch('/api/track-install', {
          method: 'POST',
        })
      } catch (error) {
        console.error('Gagal mencatat instalasi otomatis:', error)
      }
    }

    // Mendengarkan sinyal instalasi dari browser/Android
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => window.removeEventListener('appinstalled', handleAppInstalled)
  }, [])

  return null // Komponen ini bekerja di balik layar, tidak muncul di tampilan
}