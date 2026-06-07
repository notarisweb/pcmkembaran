'use client'

import { ReactNode } from 'react'
import BottomPlayer from '@/components/BottomPlayer'
import InstallationTracker from '@/components/InstallationTracker'

interface RootClientProps {
  children: ReactNode
}

export default function RootClient({ children }: RootClientProps) {
  return (
    <>
      {/* PWA Installation Tracker */}
      <div className="fixed top-4 right-4 z-50">
        <InstallationTracker />
      </div>

      {/* Konten utama */}
      {children}

      {/* Bottom Player */}
      <BottomPlayer />
    </>
  )
}