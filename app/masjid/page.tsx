import { client } from "@/lib/sanity.client";
import Link from "next/link";
import { Metadata } from "next";
import { MapPin, ArrowRight, Bell, Home, Users, CheckCircle2, Navigation, Landmark } from "lucide-react";

async function getMasidData() {
  const query = `*[_type == "masjid"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    address,
    locationUrl,
    kapasitas,
    fasilitas,
    "imageUrl": image.asset->url,
    "jadwalKajian": *[_type == "jadwalKajian" && references(^._id)] | order(hari asc) {
      _id,
      hari,
      tema
    }
  }`;
  try {
    return await client.fetch(query, {}, { cache: 'no-store' });
  } catch (error) {
    console.error("Gagal sinkronisasi data:", error);
    return [];
  }
}

export const metadata: Metadata = {
  title: "Daftar Masjid & Pusat Keumatan | PCM Kembaran",
  description: "Informasi lengkap masjid, mushola, dan pusat dakwah di bawah naungan Pimpinan Cabang Muhammadiyah Kembaran.",
};

export default async function MasjidPage() {
  const dataMasjid = await getMasidData();

  return (
    <main className="min-h-screen bg-[#fcfdfe] font-sans text-slate-900 pb-24">
      <header className="bg-white border-b border-slate-100 py-16 md:py-24 mb-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-[#004a8e] rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <Landmark size={14} /> Sektor Keumatan & Dakwah
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 mb-6 uppercase">
            MASJID & <span className="text-[#004a8e]">PUSAT PERADABAN</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-500 font-medium leading-relaxed">
            Mengelola dan membina pusat peribadatan serta persemaian ilmu dakwah Islam yang berkemajuan di seluruh wilayah Kembaran.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[#004a8e] rounded-xl p-8 md:p-12 mb-16 flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl shadow-blue-900/20 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-700">
              <CheckCircle2 size={120} />
           </div>
           
           <div className="flex items-center gap-6 relative z-10">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center shrink-0">
                 <Bell className="text-[#ffc107] animate-pulse" size={32} />
              </div>
              <div>
                 <h4 className="text-white text-xl font-black uppercase tracking-tight mb-1">Informasi Kajian Terkini</h4>
                 <p className="text-blue-100/70 text-sm font-medium">Dapatkan update jadwal dan flyer kajian harian melalui sistem otomatis kami.</p>
              </div>
           </div>
           <Link href="/kajian-hari-ini" className="relative z-10 bg-[#ffc107] text-[#004a8e] px-8 py-4 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-white transition-all shadow-xl active:scale-95 flex items-center gap-3">
              Lihat Agenda Hari Ini <ArrowRight size={18} />
           </Link>
        </div>

        {dataMasjid.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {dataMasjid.map((masjid: any) => {
              const hasSlug = !!masjid.slug;
              return (
                <article key={masjid._id} className="bg-white rounded-xl border border-slate-200 flex flex-col overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-[#004a8e]/30 group">
                  <Link href={hasSlug ? `/masjid/${masjid.slug}` : '#'} className="block relative aspect-[16/10] overflow-hidden bg-slate-100 border-b border-slate-100">
                    <img 
                      src={masjid.imageUrl || "/logo-md.png"} 
                      alt={masjid.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                       <span className="text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                          Lihat Detail Masjid <ArrowRight size={14} className="text-[#ffc107]" />
                       </span>
                    </div>
                  </Link>

                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-3">
                      {masjid.name}
                    </h3>
                    <div className="flex items-start gap-2 text-slate-400 mb-8">
                       <MapPin size={16} className="shrink-0 text-[#004a8e]" />
                       <p className="text-xs font-bold line-clamp-2 uppercase tracking-wide">{masjid.address}</p>
                    </div>
                    <div className="mt-auto pt-6 border-t border-slate-50">
                       <Link href={hasSlug ? `/masjid/${masjid.slug}` : '#'} className="w-full bg-slate-50 py-3 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-[#004a8e] group-hover:text-white transition-all">
                          <span className="text-[10px] font-black uppercase tracking-widest mr-2">Selengkapnya</span>
                          <ArrowRight size={16} />
                       </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="py-32 text-center">
            <Home size={64} className="mx-auto mb-6 text-slate-200" />
            <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Menyinkronkan Basis Data Masjid...</p>
          </div>
        )}
      </div>

      <footer className="mt-32 text-center">
          <div className="flex items-center justify-center gap-4 text-slate-300 font-black text-[9px] uppercase tracking-[0.5em]">
             <CheckCircle2 size={16} className="text-green-500/40" /> Portal Khidmat PCM Kembaran
          </div>
      </footer>
    </main>
  );
}