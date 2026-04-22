import { client } from "@/lib/sanity.client";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, User, ArrowLeft, Calendar, Info, CheckCircle2, ArrowRight, Users, Check, Phone, ImageIcon } from "lucide-react";

// 1. FUNGSI AMBIL DATA (Query Ditingkatkan untuk menarik Flyer Jadwal)
async function getSingleMasjid(slug: string) {
  const query = `*[_type == "masjid" && slug.current == $slug][0] {
    name,
    address,
    locationUrl,
    kapasitas,
    fasilitas,
    takmirContact,
    "imageUrl": image.asset->url,
    "jadwalKajian": *[_type == "jadwalKajian" && references(^._id)] | order(hari asc) {
      _id,
      hari,
      ustadz,
      waktu,
      tema,
      keterangan,
      "flyerImageUrl": flyerImage.asset->url
    }
  }`;
  return await client.fetch(query, { slug }, { cache: 'no-store' });
}

// 2. DINAMIS METADATA (Thumbnail Medsos)
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const masjid = await getSingleMasjid(slug);
  const ogImage = masjid?.imageUrl || "https://www.pcmkembaran.com/logo-md.png";

  return {
    title: `${masjid?.name || 'Profil Masjid'} | PCM Kembaran`,
    description: `Pelayanan jamaah dan informasi jadwal pengajian di ${masjid?.name}.`,
    openGraph: {
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  };
}

export default async function MasjidDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const masjid = await getSingleMasjid(slug);

  if (!masjid) return <div className="py-20 text-center font-bold text-slate-400">DATA TIDAK DITEMUKAN.</div>;

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* 1. HERO SECTION (Yellow Gradient Title) */}
      <section className="relative h-[350px] md:h-[500px] bg-slate-900 flex items-end pb-12">
        <Image src={masjid.imageUrl || "/logo-md.png"} alt={masjid.name} fill className="object-cover opacity-40" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
          <Link href="/masjid" className="inline-flex items-center gap-2 text-white/70 font-bold text-[10px] uppercase tracking-[0.2em] mb-4 hover:text-[#ffc107] transition-colors">
            <ArrowLeft size={14} /> Kembali ke Daftar
          </Link>
          
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none mb-6 bg-gradient-to-r from-[#ffc107] via-[#fff1b3] to-[#ffb300] bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]">
            {masjid.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4">
             <div className="flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white text-xs font-bold shadow-xl">
                <MapPin className="text-[#ffc107]" size={14} /> {masjid.address}
             </div>
             {masjid.kapasitas && (
               <div className="bg-white text-[#004a8e] px-5 py-2.5 rounded-lg text-xs font-black flex items-center gap-2 shadow-xl uppercase tracking-wider">
                  <Users size={16} /> {masjid.kapasitas} Jemaah
               </div>
             )}
          </div>
        </div>
      </section>

      {/* 2. CONTENT GRID */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* LEFT COLUMN: FASILITAS & JADWAL */}
        <div className="lg:col-span-2 space-y-20">
          
          {/* FASILITAS */}
          {masjid.fasilitas && (
            <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5"><ImageIcon size={80} /></div>
               <h3 className="text-base font-black text-[#004a8e] mb-8 tracking-[0.2em] uppercase flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-[#ffc107] rounded-full"></div>
                  Fasilitas Pusat Dakwah
               </h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-8">
                  {masjid.fasilitas.map((f: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 text-slate-600 font-bold text-xs uppercase tracking-wide">
                       <CheckCircle2 size={16} className="text-green-600 shrink-0" />
                       {f}
                    </div>
                  ))}
               </div>
            </div>
          )}

          {/* JADWAL PENGAJIAN DENGAN THUMBNAIL (Upgrade!) */}
          <div>
            <div className="flex items-center justify-between mb-10 border-b-2 border-slate-100 pb-6">
               <h2 className="text-2xl font-black text-slate-900 flex items-center gap-4 tracking-tighter uppercase">
                 <Calendar size={28} className="text-[#004a8e]" /> Jadwal Majelis Ilmu
               </h2>
               <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-3 py-1 rounded-full uppercase tracking-widest">Update Terkini</span>
            </div>
            
            <div className="space-y-6">
              {masjid.jadwalKajian && masjid.jadwalKajian.length > 0 ? (
                masjid.jadwalKajian.map((kj: any) => (
                  <div key={kj._id} className="group bg-white rounded-xl border border-slate-200 hover:border-[#004a8e] hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col md:flex-row shadow-sm">
                    
                    {/* TAMPILAN FLYER / THUMBNAIL */}
                    <div className="relative w-full md:w-[220px] aspect-square md:aspect-auto shrink-0 bg-slate-100 overflow-hidden border-b md:border-b-0 md:border-r border-slate-200">
                       <Image 
                         src={kj.flyerImageUrl || "/logo-md.png"} 
                         alt={kj.tema} 
                         fill 
                         className={`object-cover transition-transform duration-700 group-hover:scale-110 ${!kj.flyerImageUrl ? 'p-10 opacity-20 grayscale' : ''}`} 
                       />
                       <div className="absolute top-4 left-4 bg-[#004a8e] text-white px-4 py-2 rounded-lg text-xs font-black shadow-lg uppercase group-hover:bg-slate-900 transition-colors">
                          {kj.hari}
                       </div>
                    </div>

                    {/* DETAIL INFO JADWAL */}
                    <div className="p-8 flex-1 flex flex-col justify-center">
                       <div className="flex items-center gap-2 mb-3">
                          <div className="h-0.5 w-8 bg-[#ffc107]"></div>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Agenda Rutin</span>
                       </div>
                       
                       <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-4 leading-tight group-hover:text-[#004a8e] transition-colors italic">
                         "{kj.tema || 'Kajian Umum'}"
                       </h3>

                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-50 pt-6">
                          <div className="flex items-center gap-3">
                             <div className="p-2 bg-blue-50 text-[#004a8e] rounded-lg"><User size={18} /></div>
                             <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1">Ustadz / Pemateri</p>
                                <p className="text-sm font-black text-slate-700">{kj.ustadz}</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-3">
                             <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg"><Clock size={18} /></div>
                             <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1">Waktu Pelaksanaan</p>
                                <p className="text-sm font-black text-slate-700">{kj.waktu}</p>
                             </div>
                          </div>
                       </div>

                       {kj.keterangan && (
                         <div className="mt-6 p-4 bg-slate-50 rounded-lg border-l-4 border-[#004a8e]">
                            <p className="text-xs text-slate-500 leading-relaxed font-medium">
                               <Info size={12} className="inline mr-1 mb-1" /> {kj.keterangan}
                            </p>
                         </div>
                       )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 border-2 border-dashed border-slate-100 rounded-xl text-center bg-slate-50/50">
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Informasi jadwal pengajian belum tersedia.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SIDEBAR */}
        <div className="space-y-6">
          <div className="bg-[#004a8e] text-white p-8 rounded-xl shadow-xl relative overflow-hidden border-b-4 border-yellow-500">
            <h3 className="text-lg font-black mb-4 tracking-widest uppercase italic">Peta Lokasi</h3>
            <p className="text-blue-100 text-sm leading-relaxed mb-8 font-medium">Dapatkan rute navigasi terbaik menuju lokasi {masjid.name}.</p>
            {masjid.locationUrl ? (
              <a href={masjid.locationUrl} target="_blank" className="block w-full bg-white text-[#004a8e] text-center py-4 rounded-lg font-black hover:bg-yellow-400 transition-all uppercase text-xs tracking-[0.2em] shadow-lg">
                Buka Navigasi
              </a>
            ) : (
              <p className="text-[10px] font-bold opacity-40 italic">Link belum diatur.</p>
            )}
          </div>

          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-black text-slate-800 mb-4 tracking-widest uppercase">Layanan Takmir</h3>
            <p className="text-slate-500 text-xs mb-8 leading-relaxed font-medium">Hubungi pengurus untuk informasi infaq, wakaf, atau kegiatan sosial di lingkungan masjid.</p>
            {masjid.takmirContact ? (
              <a href={`https://wa.me/${masjid.takmirContact.replace(/\D/g,'')}`} target="_blank" className="flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 rounded-lg font-black shadow-lg hover:brightness-110 transition-all text-xs uppercase tracking-widest">
                <Phone size={16} /> Hubungi via WhatsApp
              </a>
            ) : (
              <Link href="/kontak" className="flex items-center justify-center gap-2 text-[#004a8e] font-black text-xs uppercase tracking-widest border-2 border-[#004a8e] py-4 rounded-lg hover:bg-[#004a8e] hover:text-white transition-all">
                Sekretariat Pusat <ArrowRight size={16} />
              </Link>
            )}
          </div>
        </div>

      </section>

      <footer className="py-16 text-center border-t border-slate-100 bg-slate-50/20">
          <div className="flex items-center justify-center gap-4 text-slate-300 font-black text-[9px] uppercase tracking-[0.4em]">
             <CheckCircle2 size={14} className="text-green-500/40" /> Dokumen Resmi PCM Kembaran
          </div>
      </footer>
    </main>
  );
}