// app/radio/page.tsx
import MainPlayer from '@/components/MainPlayer';
import BottomPlayer from '@/components/BottomPlayer';

export default function RadioPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Header Section */}
        <header className="text-center mb-16 space-y-2">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Radio Berkemajuan
          </h1>
          <p className="text-slate-400 font-medium tracking-wide uppercase text-sm">
            PCM Kembaran • Live Broadcast
          </p>
        </header>

        {/* Main Content Area */}
        <section className="flex flex-col items-center">
          <MainPlayer />
        </section>

        {/* Optional: Additional Content Section */}
        <section className="mt-20 max-w-2xl mx-auto text-center border-t border-white/5 pt-10">
          <p className="text-slate-500 text-sm italic">
            "Mencerahkan, Menggerakkan, dan Memajukan Umat"
          </p>
        </section>

        {/* Bottom Player (tetap fixed di komponennya) */}
        <BottomPlayer />
      </div>
    </main>
  );
}