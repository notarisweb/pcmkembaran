'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function BentoDashboard({ data }: { data: any }) {
  const latestPost = data?.latestPost
  const installCount = data?.installCount || 0
  const leader = data?.leader
  const profile = data?.profile
  const rantingCount = data?.rantingCount || 0
  const masjidCount = data?.masjidCount || 0

  const postSlug = typeof latestPost?.slug === 'string' 
    ? latestPost.slug 
    : latestPost?.slug?.current || '';

  const category = latestPost?.category?.toLowerCase() || 'berita';
  const isDownload = category === 'unduhan';
  const downloadUrl = latestPost?.fileUrl || latestPost?.downloadLink || '#';
  const buttonLink = isDownload ? downloadUrl : `/${category}/${postSlug}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 max-w-7xl mx-auto bento-container">
      
      {/* 1. KARTU UTAMA: POSTINGAN TERBARU */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="md:col-span-2 md:row-span-2 bg-[#004a8e] text-white p-8 rounded-[2rem] flex flex-col justify-between shadow-xl relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className={`badge ${isDownload ? 'bg-green-500' : 'bg-[#ffc107] text-[#004a8e]'}`}>
            {latestPost?.category ? `${latestPost.category.toUpperCase()} TERBARU` : 'KONTEN TERBARU'}
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold leading-tight mb-6 mt-4 drop-shadow-sm">
            {latestPost?.title || 'Menanti Konten Terkini'}
          </h2>
          <p className="text-blue-100 font-semibold text-sm opacity-80" suppressHydrationWarning>
            {latestPost?.publishedAt 
              ? new Date(latestPost.publishedAt).toLocaleDateString('id-ID', { dateStyle: 'long' }) 
              : 'Terbit Baru Saja'}
          </p>
        </div>

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Link 
            href={buttonLink}
            target={isDownload ? "_blank" : "_self"}
            className="relative z-10 mt-8 inline-flex items-center gap-3 bg-[#ffc107] text-[#004a8e] font-black px-8 py-4 rounded-2xl w-fit hover:bg-white transition-all shadow-lg text-sm uppercase tracking-wider"
          >
            {isDownload ? "Unduh File" : "Baca Selengkapnya"}
            <span className="text-lg">➔</span>
          </Link>
        </motion.div>
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
      </motion.div>

      {/* 2. KARTU STATISTIK: JAMAAH TERHUBUNG */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="md:col-span-2 bg-white border border-slate-100 p-8 rounded-[2rem] flex items-center justify-between shadow-sm"
      >
        <div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">
            Jamaah Terhubung
          </span>
          <h3 className="text-5xl md:text-6xl font-black text-[#004a8e]" suppressHydrationWarning>
            {installCount}
          </h3>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 justify-end mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping"></span>
            <span className="text-xs font-bold text-green-700">Live Status</span>
          </div>
          <p className="text-xs font-extrabold text-slate-500 uppercase tracking-tighter">
            {rantingCount} Ranting — {masjidCount} Masjid
          </p>
        </div>
      </motion.div>

      {/* 🎯 3. KARTU PIMPINAN: KETUA PCM (UPGRADED) */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="md:col-span-1 bg-[#ffc107] p-6 rounded-[2rem] flex items-center gap-5 shadow-md relative overflow-hidden min-h-[160px]"
      >
        {/* FOTO DI KIRI */}
        <div className="relative z-10 w-20 h-24 rounded-2xl overflow-hidden border-2 border-[#004a8e]/20 shadow-inner shrink-0 bg-white/30">
          {leader?.photoUrl ? (
             <Image src={leader.photoUrl} alt={leader.name || 'Ketua'} fill sizes="80px" className="object-cover" />
          ) : (
             <div className="w-full h-full flex items-center justify-center text-[#004a8e]/50 font-black text-2xl">PCM</div>
          )}
        </div>

        {/* TULISAN DI KANAN */}
        <div className="relative z-10 flex flex-col justify-center gap-1">
          <span className="text-[9px] font-black text-[#004a8e] uppercase tracking-widest opacity-70">Ketua PCM</span>
          <h4 className="text-sm md:text-base font-black text-[#004a8e] leading-tight mb-1">
            {leader?.name || 'Ir. H. Sugiyatno, M.M.'}
          </h4>
          <div className="bg-[#004a8e] text-[#ffc107] px-2 py-1 rounded-lg w-fit">
            <span className="text-[9px] font-black tracking-tighter uppercase">NBM: {leader?.nbm || '1114297'}</span>
          </div>
        </div>

        {/* ORNAMEN DEKORATIF */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
        <div className="absolute bottom-0 right-4 w-12 h-12 bg-[#004a8e]/5 rounded-full blur-md"></div>
      </motion.div>

      {/* 4. KARTU KONTAK: SEKRETARIAT */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="md:col-span-1 bg-white border border-slate-100 p-6 rounded-[2rem] flex flex-col justify-between shadow-sm relative overflow-hidden"
      >
        <div className="relative z-10">
          <span className="text-[10px] font-black text-[#004a8e] uppercase block mb-3 tracking-widest">Sekretariat</span>
          <p className="text-xs font-bold text-slate-500 leading-relaxed mb-4">
            {profile?.address || 'Dukuhwaluh, Kembaran, Banyumas, Jawa Tengah'}
          </p>
        </div>
        <Link href="/ranting" className="relative z-10 text-[10px] font-black text-[#004a8e] flex items-center gap-2 hover:gap-4 transition-all uppercase tracking-widest">
          🗺️ Peta Dakwah <span>➔</span>
        </Link>
        <div className="absolute bottom-[-20px] right-[-20px] w-20 h-20 bg-slate-50 rounded-full"></div>
      </motion.div>

      <style jsx>{`
        .badge {
          display: inline-block;
          padding: 6px 14px;
          font-size: 10px;
          font-weight: 900;
          border-radius: 10px;
          letter-spacing: 1px;
        }
        @media (max-width: 768px) {
           .bento-container { gap: 12px; padding: 12px; }
        }
      `}</style>
    </div>
  )
}