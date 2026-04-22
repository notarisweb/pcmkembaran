import { client } from "@/lib/sanity.client";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, User, ArrowLeft, CalendarDays, Info, CheckCircle2, ArrowRight, Users, Check, Phone, ImageIcon, Calendar, HeartHandshake, Wallet, Landmark } from "lucide-react";

// 1. FUNGSI AMBIL DATA
async function getSingleMasjid(slug: string) {
  const query = `*[_type == "masjid" && slug.current == $slug][0] {
    name,
    address,
    locationUrl,
    kapasitas,
    fasilitas,
    takmirContact,
    "imageUrl": image.asset->url,
    "jadwalKajian": *[_type == "jadwalKajian" && references(^._id)] | order(tipe desc, tanggal desc, hari asc) {
      _id,
      tipe,
      hari,
      tanggal,
      ustadz,
      waktu,
      tema,
      keterangan,
      "flyerImageUrl": flyerImage.asset->url
    }
  }`;
  return await client.fetch(query, { slug }, { cache: 'no-store' });
}

// 2. DINAMIS METADATA
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const masjid = await getSingleMasjid(slug);
  const ogImage = masjid?.imageUrl || "https://www.pcmkembaran.com/logo-md.png";

  return {
    title: masjid?.name || 'Profil Masjid', 
    description: `Layanan dan jadwal kegiatan keumatan di ${masjid?.name}.`,
    openGraph: {
      title: masjid?.name,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  };
}

export default async function MasjidDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const masjid = await getSingleMasjid(slug);

  if (!masjid) return <div className="py-20 text-center font-bold text-slate-400 uppercase tracking-widest">DATA TIDAK DITEMUKAN.</div>;

  return (
    <main className="min-h-screen bg-[#fcfdfe] font-sans text-slate-900">
      
      {/* 1. HERO SECTION (High End) */}
      <section className="relative h-[350px] md:h-[450px] bg-slate-900 flex items-end pb-12">
        <Image src={masjid.imageUrl || "/logo-md.png"} alt={masjid.name} fill className="object-cover opacity-40" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-black/10"></div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 text-center md:text-left">
          <Link href="/masjid" className="inline-flex items-center gap-2 text-white/50 font-black text-[9px] uppercase tracking-[0.3em] mb-4 hover:text-[#ffc107] transition-all">
            <ArrowLeft size={14} /> Kembali ke Daftar
          </Link>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none mb-6 bg-gradient-to-r from-[#ffc107] via-[#fff1b3] to-[#ff9800] bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            {masjid.name}
          </h1>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
             <div className="flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white text-[10px] font-bold shadow-xl uppercase tracking-widest">
                <MapPin className="text-[#ffc107]" size={14} /> {masjid.address}
             </div>
             {masjid.kapasitas && (
               <div className="bg-white text-[#004a8e] px-5 py-2 rounded-lg text-[10px] font-black flex items-center gap-2 shadow-xl uppercase tracking-widest">
                  <Users size={16} /> Kapasitas: {masjid.kapasitas}
               </div>
             )}
          </div>
        </div>
      </section>

      {/* 2. CONTENT GRID */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        <div className="lg:col-span-8 space-y-20">
          
          {/* FASILITAS SECTION */}
          {masjid.fasilitas && (
            <div className="bg-white p-8 md:p-10 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden group">
               <h3 className="text-[11px] font-black text-[#004a8e] mb-10 tracking-[0.4em] uppercase flex items-center gap-3 text-center md:text-left">
                  <div className="w-1.5 h-6 bg-[#ffc107] rounded-full"></div>
                  Fasilitas & Sarana Masjid
               </h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {masjid.fasilitas.map((f: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 text-slate-500 font-bold text-[11px] uppercase tracking-tight">
                       <div className="w-6 h-6 bg-green-50 text-green-600 rounded-md flex items-center justify-center shrink-0 border border-green-100 shadow-sm"><Check size={14} /></div>
                       {f}
                    </div>
                  ))}
               </div>
            </div>
          )}

          {/* JADWAL PENGAJIAN (Rombak Arsitektur: 2x2 Grid) */}
          <div>
            <div className="flex items-center justify-between mb-12 border-b border-slate-100 pb-8">
               <h2 className="text-3xl font-black text-slate-900 flex items-center gap-4 tracking-tighter uppercase">
                 <CalendarDays size={32} className="text-[#004a8e]" /> Agenda Majelis Ilmu
               </h2>
            </div>
            
            <div className="space-y-12">
              {masjid.jadwalKajian && masjid.jadwalKajian.length > 0 ? (
                masjid.jadwalKajian.map((kj: any) => {
                  const isIncidental = kj.tipe === 'insidental';
                  const formattedDate = kj.tanggal 
                    ? new Date(kj.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
                    : null;
                  
                  return (
                    <div key={kj._id} className="group bg-white rounded-xl border border-slate-200 hover:border-[#004a8e] hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col md:flex-row shadow-sm min-h-[300px]">
                      
                      {/* AREA FLYER (Dikecilkan: 200px agar konten lega & tidak terlalu tinggi) */}
                      <div className="relative w-full md:w-[200px] shrink-0 bg-slate-50 overflow-hidden border-b md:border-b-0 md:border-r border-slate-100">
                         <Image 
                           src={kj.flyerImageUrl || "/logo-md.png"} 
                           alt={kj.tema} 
                           fill
                           className={`object-cover transition-transform duration-1000 group-hover:scale-110 ${!kj.flyerImageUrl ? 'p-16 opacity-10 grayscale' : ''}`} 
                         />
                      </div>

                      {/* AREA KONTEN (Sangat Longgar & Elegant) */}
                      <div className="p-8 md:p-10 flex-1 flex flex-col">
                         
                         {/* LABEL TIPE */}
                         <div className="flex items-center gap-3 mb-4">
                            <div className={`h-1.5 w-1.5 rounded-full ${isIncidental ? 'bg-red-500 animate-pulse' : 'bg-[#ffc107]'}`}></div>
                            <span className={`text-[9px] font-black uppercase tracking-[0.3em] ${isIncidental ? 'text-red-600' : 'text-slate-400'}`}>
                               {isIncidental ? 'Agenda Khusus' : 'Agenda Rutin Pekanan'}
                            </span>
                         </div>
                         
                         {/* JUDUL TEMA */}
                         <h3 className="text-2xl md:text-3xl font-black text-slate-800 mb-8 leading-[1.1] group-hover:text-[#004a8e] transition-colors italic tracking-tighter uppercase">
                           "{kj.tema || 'Kajian Umum'}"
                         </h3>

                         {/* GRID INFO 2x2 (Solusi Sempit) */}
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-12 border-t border-slate-50 pt-10 mt-auto">
                            
                            {/* GRUP A: HARI & TANGGAL */}
                            <div className="flex items-center gap-4">
                               <div className="w-12 h-12 bg-blue-50 text-[#004a8e] rounded-xl flex items-center justify-center border border-blue-100 shadow-sm"><Calendar size={22} /></div>
                               <div>
                                  <p className="text-[9px] font-black text-slate-400 uppercase mb-1 tracking-widest">Hari Pelaksanaan</p>
                                  <p className="text-sm font-black text-slate-700 uppercase leading-none">{kj.hari || 'Ahad'}</p>
                               </div>
                            </div>
                            
                            <div className={`flex items-center gap-4 ${!formattedDate ? 'opacity-20' : ''}`}>
                               <div className="w-12 h-12 bg-yellow-50 text-yellow-700 rounded-xl flex items-center justify-center border border-yellow-100 shadow-sm"><CalendarDays size={22} /></div>
                               <div>
                                  <p className="text-[9px] font-black text-slate-400 uppercase mb-1 tracking-widest">Tanggal</p>
                                  <p className="text-sm font-black text-slate-700 leading-none uppercase">{formattedDate || 'Agenda Rutin'}</p>
                               </div>
                            </div>

                            {/* GRUP B: NARASUMBER & WAKTU */}
                            <div className="flex items-center gap-4">
                               <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center border border-slate-100 shadow-sm"><User size={22} /></div>
                               <div>
                                  <p className="text-[9px] font-black text-slate-400 uppercase mb-1 tracking-widest">Narasumber</p>
                                  <p className="text-sm font-black text-slate-700 leading-none">{kj.ustadz}</p>
                               </div>
                            </div>

                            <div className="flex items-center gap-4">
                               <div className="w-12 h-12 bg-green-50 text-green-700 rounded-xl flex items-center justify-center border border-green-100 shadow-sm"><Clock size={22} /></div>
                               <div>
                                  <p className="text-[9px] font-black text-slate-400 uppercase mb-1 tracking-widest">Waktu</p>
                                  <p className="text-sm font-black text-slate-700 leading-none">{kj.waktu}</p>
                               </div>
                            </div>
                         </div>

                         {kj.keterangan && (
                           <div className="mt-10 p-6 bg-[#f8fafc] rounded-xl border border-slate-100 relative shadow-inner">
                              <p className="text-[13px] text-slate-500 leading-relaxed font-medium italic opacity-80">
                                 {kj.keterangan}
                              </p>
                           </div>
                         )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-24 border-2 border-dashed border-slate-100 rounded-xl text-center bg-slate-50/30">
                   <Landmark size={48} className="mx-auto text-slate-200 mb-4" />
                   <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">Basis data sedang diperbarui</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SIDEBAR SECTION */}
        <div className="lg:col-span-4 space-y-8">
          
          <div className="bg-[#004a8e] text-white p-10 rounded-xl shadow-2xl relative overflow-hidden border-b-[6px] border-[#ffc107]">
            <h3 className="text-lg font-black mb-6 tracking-widest uppercase italic">Akses Navigasi</h3>
            <p className="text-blue-100 text-sm leading-relaxed mb-10 font-medium">Informasi rute navigasi terbaik menuju lokasi {masjid.name}.</p>
            {masjid.locationUrl && (
              <a href={masjid.locationUrl} target="_blank" className="block w-full bg-white text-[#004a8e] text-center py-4 rounded-lg font-black hover:bg-[#ffc107] transition-all uppercase text-[10px] tracking-[0.2em] shadow-lg active:scale-95">
                Buka Peta Lokasi
              </a>
            )}
          </div>

          {/* INTEGRASI INFAQ & TAKMIR (Unified Card) */}
          <div className="bg-[#fffbeb] border-2 border-[#fef3c7] p-10 rounded-xl shadow-sm group">
             <div className="w-16 h-16 bg-[#ffc107] text-[#854d0e] rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-transform">
                <HeartHandshake size={32} />
             </div>
             <h3 className="text-lg font-black text-slate-800 mb-4 tracking-tight uppercase text-center">Infaq & Dukungan Dakwah</h3>
             <p className="text-slate-600 text-[11px] leading-relaxed mb-10 font-medium italic text-center">
                Dukung operasional dakwah dan pemeliharaan {masjid.name} melalui infaq terbaik Anda. Untuk konfirmasi donasi & informasi, silakan hubungi pengurus takmir melalui WhatsApp:
             </p>
             
             {masjid.takmirContact ? (
               <a 
                 href={`https://wa.me/${masjid.takmirContact.replace(/\D/g,'')}`} 
                 target="_blank" 
                 className="flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 rounded-lg font-black shadow-lg hover:brightness-110 transition-all text-[11px] uppercase tracking-widest w-full"
               >
                 <Phone size={18} /> WhatsApp Takmir
               </a>
             ) : (
               <Link href="/kontak" className="flex items-center justify-center gap-2 bg-[#004a8e] text-white py-4 rounded-lg font-black text-[10px] uppercase tracking-widest w-full hover:bg-slate-900 shadow-xl transition-all">
                  Pusat Informasi <ArrowRight size={16} />
               </Link>
             )}
             
             <div className="mt-8 flex items-center justify-center gap-2 text-slate-300 font-bold text-[9px] uppercase tracking-widest">
                <Wallet size={12} /> Sektor ZISWAF PCM Kembaran
             </div>
          </div>

        </div>

      </section>

      <footer className="py-24 text-center border-t border-slate-100 bg-white">
          <div className="flex items-center justify-center gap-4 text-slate-300 font-black text-[9px] uppercase tracking-[0.5em]">
             <CheckCircle2 size={14} className="text-green-500/40" /> Sistem Informasi Terpadu PCM Kembaran
          </div>
      </footer>
    </main>
  );
}