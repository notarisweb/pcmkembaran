'use client'

import { motion } from 'framer-motion'
import { Text, Heading, Flex, Badge, ThemeProvider, studioTheme } from '@sanity/ui'
import Link from 'next/link'

export default function BentoDashboard({ data }: { data: any }) {
  // Data ditarik dari bentoQuery di app/page.tsx
  const { latestPost, installCount, leader, profile, rantingCount, masjidCount } = data

  // LOGIKA DOWNLOAD: Cek kategori 'unduhan'
  const isDownload = latestPost?.category === 'unduhan'
  const downloadUrl = latestPost?.fileUrl || latestPost?.downloadLink
  const buttonLink = isDownload ? downloadUrl : `/${latestPost?.category || 'berita'}/${latestPost?.slug?.current || ''}`

  return (
    <ThemeProvider theme={studioTheme}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 max-w-7xl mx-auto">
        
        {/* 1. KARTU UTAMA: POSTINGAN/UNDUHAN TERBARU */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="md:col-span-2 md:row-span-2 bg-[#004a8e] text-white p-8 rounded-2xl flex flex-col justify-between shadow-xl relative overflow-hidden"
        >
          <div className="relative z-10">
            <Badge 
              tone={isDownload ? "positive" : "caution"} 
              style={{ 
                marginBottom: '1rem', 
                display: 'inline-block', 
                textTransform: 'uppercase',
                fontWeight: '800',
                borderRadius: '4px'
              }}
            >
              {latestPost?.category ? `${latestPost.category} TERBARU` : 'KONTEN TERBARU'}
            </Badge>

            <Heading size={3} style={{ lineHeight: '1.2', marginBottom: '1.5rem', color: 'white', fontWeight: '800' }}>
              {latestPost?.title || 'Menanti Konten Terkini'}
            </Heading>

            <Text size={1} style={{ color: '#cbd5e1', fontWeight: '600' }}>
              {latestPost?.publishedAt 
                ? new Date(latestPost.publishedAt).toLocaleDateString('id-ID', { dateStyle: 'long' }) 
                : 'Tanggal belum tersedia'}
            </Text>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <a 
              href={buttonLink}
              target={isDownload ? "_blank" : "_self"}
              rel={isDownload ? "noopener noreferrer" : ""}
              className="relative z-10 mt-8 inline-flex items-center gap-3 bg-[#ffc107] text-[#004a8e] font-bold px-8 py-4 rounded-xl w-fit hover:bg-white transition-all shadow-lg"
            >
              {isDownload ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  UNDUH {latestPost?.fileSize ? `(${latestPost.fileSize})` : '(Foto)'}
                </>
              ) : (
                "Baca Selengkapnya"
              )}
            </a>
          </motion.div>

          {/* Efek Gradasi Halus */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#ffc107] opacity-10 rounded-full blur-3xl"></div>
        </motion.div>

        {/* 2. KARTU STATISTIK: APP & CABANG */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="md:col-span-2 bg-white border border-[#e2e8f0] p-6 rounded-2xl flex items-center justify-between shadow-sm"
        >
          <div>
            <Text size={1} weight="bold" style={{ color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Jamaah Terhubung
            </Text>
            <Heading size={4} style={{ color: '#004a8e', fontSize: '3rem', marginTop: '0.5rem', fontWeight: '900' }}>
              {installCount || 0}
            </Heading>
          </div>
          <div className="text-right">
            <Flex align="center" gap={2} justify="flex-end" style={{ marginBottom: '0.5rem' }}>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <Text size={0} style={{ color: '#166534', fontWeight: 'bold' }}>Sistem Aktif</Text>
            </Flex>
            <Text size={0} weight="bold" style={{ color: '#64748b' }}>
              {rantingCount} Ranting | {masjidCount} Masjid
            </Text>
          </div>
        </motion.div>

        {/* 3. KARTU PIMPINAN: KETUA & NBM (FIX NUMPUK) */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-[#ffc107] p-6 rounded-2xl flex flex-col justify-between shadow-md relative overflow-hidden min-h-[160px]"
        >
          <div className="relative z-10">
            <Text size={0} weight="bold" style={{ color: '#004a8e', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' }}>
              Ketua PCM
            </Text>
            <Heading size={2} style={{ color: '#004a8e', fontWeight: '800', lineHeight: '1.2' }}>
              {leader?.name || 'Pimpinan Cabang'}
            </Heading>
          </div>

          {/* Container NBM dengan padding atas agar tidak menempel */}
          <div className="relative z-10 mt-4">
            <div className="inline-block bg-[#004a8e] text-white px-3 py-1.5 rounded-lg shadow-sm">
              <Text size={0} weight="bold" style={{ letterSpacing: '0.5px' }}>
                NBM: {leader?.nbm || '-'}
              </Text>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-white opacity-20 rounded-full"></div>
        </motion.div>

        {/* 4. KARTU KONTAK: LOKASI KANTOR */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white border border-[#e2e8f0] p-6 rounded-2xl flex flex-col justify-center shadow-sm"
        >
          <Text size={1} weight="bold" style={{ color: '#004a8e', textTransform: 'uppercase' }}>Sekretariat</Text>
          <Text size={1} style={{ marginTop: '0.8rem', lineHeight: '1.5', color: '#475569', fontWeight: '600' }}>
            {profile?.address || 'Dukuhwaluh, Kembaran, Banyumas'}
          </Text>
          <Link href="/ranting" className="mt-4 text-[#004a8e] font-bold flex items-center gap-2 hover:underline group">
            <span>📍 Peta Dakwah</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>

      </div>
    </ThemeProvider>
  )
}