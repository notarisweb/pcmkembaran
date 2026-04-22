'use client'

import { useState, useEffect } from 'react'
import { getKajianHariIni } from '@/lib/sanity.query'
import { toPng } from 'html-to-image'
import { Download, Calendar, Clock, MapPin, User, Share2 } from 'lucide-react'

export default function KajianHariIniPage() {
  const [kajianList, setKajianList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // 1. DETEKSI HARI & TANGGAL REAL-TIME
  const days = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
  const today = days[new Date().getDay()]
  
  // Format Tanggal Indonesia (Contoh: 22 April 2026)
  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getKajianHariIni(today)
        setKajianList(data)
      } catch (error) {
        console.error("Gagal mengambil jadwal:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [today])

  // 2. FUNGSI GENERATE GAMBAR
  const downloadFlyer = async (id: string, tema: string) => {
    const node = document.getElementById(id);
    if (!node) return;

    try {
      const dataUrl = await toPng(node, { 
        quality: 1.0, 
        pixelRatio: 3, // Ditingkatkan ke 3 agar hasil download Super HD
        cacheBust: true 
      });
      const link = document.createElement('a');
      link.download = `Flyer-Kajian-${tema}-${currentDate}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Gagal generate gambar:', err);
    }
  };

  if (loading) return <div className="py-20 text-center font-black animate-pulse text-[#004a8e]">MENSINKRONKAN RADAR DAKWAH...</div>

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER HALAMAN DENGAN TANGGAL */}
        <header className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-[#004a8e] rounded-full text-xs font-black tracking-widest uppercase">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-ping"></div>
            Live Update: {currentDate}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
            KAJIAN HARI <span className="text-[#004a8e]">{today.toUpperCase()}</span>
          </h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-sm italic">
            PCM KEMBARAN — Mencerahkan Semesta
          </p>
        </header>

        {kajianList.length === 0 ? (
          <div className="bg-white p-12 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center">
            <Calendar className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Tidak ada jadwal kajian rutin untuk hari {today}.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-20">
            {kajianList.map((kajian) => (
              <div key={kajian._id} className="flex flex-col lg:flex-row items-center gap-12 bg-white p-8 rounded-[3rem] shadow-xl border border-slate-100">
                
                {/* 🎨 FLYER GENERATOR AREA (1:1 Ratio) */}
                <div 
                  id={`flyer-${kajian._id}`}
                  className="w-[450px] h-[450px] shrink-0 bg-white relative overflow-hidden flex flex-col p-10 border-[12px] border-[#004a8e] shadow-2xl"
                  style={{ fontFamily: 'sans-serif' }}
                >
                  {/* Ornamen Atas */}
                  <div className="absolute top-[-60px] right-[-60px] w-48 h-48 bg-yellow-400/30 rounded-full blur-3xl"></div>
                  
                  {/* Brand Header */}
                  <div className="flex items-center gap-3 mb-8 relative z-10">
                    <img src="/logo-md.png" className="w-12 h-12" alt="Logo" />
                    <div>
                      <h2 className="text-base font-black text-[#004a8e] leading-none">PCM KEMBARAN</h2>
                      <p className="text-[8px] font-bold text-yellow-600 tracking-widest uppercase">Majelis Tabligh & Dakwah Khusus</p>
                    </div>
                  </div>

                  {/* Konten Utama */}
                  <div className="relative z-10 flex-1 flex flex-col justify-center border-l-4 border-yellow-400 pl-6">
                    <div className="mb-2 flex items-center gap-2">
                       <span className="px-2 py-1 bg-red-600 text-white text-[9px] font-black rounded uppercase">{today}</span>
                       <span className="text-[10px] font-bold text-slate-400">{currentDate}</span>
                    </div>
                    
                    <h2 className="text-3xl font-black text-slate-800 leading-[1.1] mb-6 uppercase italic tracking-tighter">
                      {kajian.tema || "Kajian Islam Rutin"}
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-9 h-9 bg-[#004a8e] rounded-xl flex items-center justify-center text-white shadow-lg">
                          <User size={18} />
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase leading-none mb-1">Bersama Ustadz:</p>
                          <p className="text-base font-black text-slate-800">{kajian.ustadz}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-9 h-9 bg-yellow-400 rounded-xl flex items-center justify-center text-[#004a8e] shadow-lg">
                          <Clock size={18} />
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase leading-none mb-1">Waktu Pelaksanaan:</p>
                          <p className="text-base font-black text-slate-800">{kajian.waktu}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Lokasi (Highlight Biru) */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-[#004a8e] text-white flex items-center gap-4">
                     <div className="shrink-0 p-2.5 bg-white/15 rounded-2xl">
                        <MapPin size={28} className="text-yellow-400" />
                     </div>
                     <div className="min-w-0">
                        <p className="text-[9px] font-bold text-white/50 uppercase tracking-widest mb-1">Lokasi Kajian:</p>
                        <p className="text-lg font-black truncate uppercase tracking-tighter leading-none">{kajian.namaMasjid}</p>
                     </div>
                  </div>
                </div>

                {/* 📄 PANEL KONTROL */}
                <div className="flex-1 space-y-6 w-full">
                  <div className="space-y-2 text-center lg:text-left">
                    <h2 className="text-3xl font-black text-slate-800 uppercase italic">"{kajian.tema}"</h2>
                    <p className="text-slate-500 font-medium italic">Klik tombol di bawah untuk mendownload flyer HD atau bagikan ke grup WhatsApp Jamaah.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 bg-blue-50 rounded-3xl border border-blue-100 flex items-center gap-4">
                       <User className="text-[#004a8e]" size={28} />
                       <div>
                          <p className="text-[10px] font-black text-blue-400 uppercase">Pemateri</p>
                          <p className="font-black text-slate-800">{kajian.ustadz}</p>
                       </div>
                    </div>
                    <div className="p-5 bg-yellow-50 rounded-3xl border border-yellow-100 flex items-center gap-4">
                       <MapPin className="text-yellow-600" size={28} />
                       <div>
                          <p className="text-[10px] font-black text-yellow-600 uppercase">Lokasi</p>
                          <p className="font-black text-slate-800 leading-tight">{kajian.namaMasjid}</p>
                       </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button 
                      onClick={() => downloadFlyer(`flyer-${kajian._id}`, kajian.tema)}
                      className="flex-1 flex items-center justify-center gap-3 bg-[#004a8e] text-white px-8 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl active:scale-95"
                    >
                      <Download size={20} /> Download Flyer HD
                    </button>
                    <a 
                      href={`https://wa.me/?text=Hadirilah Kajian ${today} ini: *${kajian.tema}* bersama ${kajian.ustadz} pukul ${kajian.waktu} di ${kajian.namaMasjid}. Download flyer di: ${window.location.href}`}
                      target="_blank"
                      className="flex items-center justify-center gap-3 bg-green-500 text-white px-10 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-green-600 transition-all shadow-xl"
                    >
                      <Share2 size={20} /> Share WA
                    </a>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  )
}