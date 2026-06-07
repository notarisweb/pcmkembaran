'use client'

import { Play, Square } from 'lucide-react' // Tambahkan Square untuk ikon stop
import { motion } from 'framer-motion'
import { useAudio } from '../context/AudioContext'

export default function MainPlayer() {
  const {
    isPlaying,
    metadata,
    toggleLivePlayback,
    isYouTubeLive,
  } = useAudio()

  const handleClick = () => {
    toggleLivePlayback()
  }

  // Gunakan isPlaying langsung sebagai sumber kebenaran utama
  const isOnAir = isPlaying

  return (
    <div className="relative max-w-5xl mx-auto p-6">

      {/* Glow Background */}
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-[160px] z-0" />
      <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-blue-500/20 blur-[160px] z-0" />

      {/* Player Panel */}
      <div className="relative z-10 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-black shadow-2xl p-8 flex flex-col md:flex-row items-center gap-8">

        {/* Logo */}
        <div className="relative flex-shrink-0">
          {isOnAir && (
            <div className="absolute inset-0 rounded-full bg-cyan-400/50 blur-3xl animate-pulse" />
          )}

          <motion.div
            animate={isOnAir ? { rotate: 360 } : { rotate: 0 }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="h-44 w-44 rounded-full border border-cyan-400/50 p-1 shadow-[0_0_50px_rgba(6,255,255,0.7)] flex items-center justify-center bg-black"
          >
            <img
              src="/logo-md-putih.png"
              alt="Muhammadiyah"
              className="h-28 w-28 object-contain"
            />
          </motion.div>
        </div>

        {/* Track Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold text-white">
            PCM KEMBARAN
          </h1>

          <p className="mt-2 text-slate-400 text-lg truncate">
            {metadata.title}
          </p>

          <p className="text-sm text-slate-500 truncate">
            {metadata.artist}
          </p>

          {/* ON AIR Indicator */}
          {isOnAir && (
            <motion.div
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="mt-4 inline-block px-4 py-1 text-xs font-bold uppercase tracking-widest text-red-500 bg-black/50 rounded-lg"
            >
              {isYouTubeLive ? 'LIVE YOUTUBE' : 'ON AIR'}
            </motion.div>
          )}

          <div className="mt-4 inline-flex items-center gap-2 text-xs text-cyan-300 uppercase tracking-[0.25em]">
            PCM Kembaran • Muhammadiyah Islamic Broadcast
          </div>
        </div>

        {/* Play/Stop Button */}
        <div className="flex-shrink-0 mt-4 md:mt-0">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            className={`h-16 w-16 rounded-full flex items-center justify-center
              shadow-[0_0_30px_rgba(6,182,212,0.6)]
              transition
              ${isOnAir ? 'bg-red-500' : 'bg-cyan-500'}
            `}
          >
            {isOnAir ? (
              <Square size={28} className="text-white" fill="white" />
            ) : (
              <Play size={28} className="text-white" fill="white" />
            )}
          </motion.button>
        </div>

      </div>
    </div>
  )
}