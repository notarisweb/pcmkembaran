'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Maximize2, Download, X } from 'lucide-react'

export default function InteractiveFlyer({ imageUrl, tema }: { imageUrl: string, tema: string }) {
  const [isOpen, setIsOpen] = useState(false)

  // Fungsi download paksa file asli
  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `KAJIAN-PCM-${tema.toUpperCase().replace(/\s+/g, '-')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) { 
      console.error("Gagal mendownload amunisi gambar:", err); 
    }
  };

  return (
    <>
      <div className="relative group">
        {/* Thumbnail Gambar yang bisa diklik zoom */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="relative aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl border-[12px] border-white cursor-zoom-in bg-slate-100"
          onClick={() => setIsOpen(true)}
        >
          <Image 
            src={imageUrl} 
            alt={tema} 
            fill 
            className="object-contain"
          />
          {/* Overlay Hover Icon */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <div className="p-4 bg-white/20 backdrop-blur-xl rounded-full text-white shadow-2xl">
                <Maximize2 size={32} />
             </div>
          </div>
        </motion.div>

        {/* Tombol Download Utama */}
        <button 
          onClick={handleDownload}
          className="w-full mt-6 flex items-center justify-center gap-3 bg-white hover:bg-[#004a8e] hover:text-white text-[#004a8e] font-black py-5 rounded-[1.5rem] border-2 border-[#004a8e] transition-all shadow-xl active:scale-95 text-sm uppercase tracking-widest"
        >
          <Download size={20} /> Simpan Flyer Ke Galeri
        </button>
      </div>

      {/* MODAL ZOOM (LIGHTBOX) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-10"
            onClick={() => setIsOpen(false)}
          >
            {/* Tombol Close */}
            <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
              <X size={40} />
            </button>

            {/* Gambar Besar */}
            <motion.div
              initial={{ scale: 0.9 }} 
              animate={{ scale: 1 }} 
              exit={{ scale: 0.9 }}
              className="relative w-full h-full max-w-4xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()} // Supaya klik gambar tidak nutup modal
            >
              <img 
                src={imageUrl} 
                alt="Zoomed Flyer" 
                className="max-w-full max-h-full rounded-lg shadow-2xl object-contain" 
              />
            </motion.div>

            {/* Tombol Download di dalam Modal */}
            <div className="mt-8">
               <button 
                 onClick={handleDownload} 
                 className="bg-white text-[#004a8e] px-10 py-4 rounded-full font-black flex items-center gap-3 hover:bg-yellow-400 transition-colors shadow-2xl"
               >
                  <Download size={24} /> DOWNLOAD SEKARANG
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}