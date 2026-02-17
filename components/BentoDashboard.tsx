'use client'

import { motion } from 'framer-motion'
import { Text, Heading, Flex, Badge, ThemeProvider, studioTheme } from '@sanity/ui'
import Link from 'next/link'

export default function BentoDashboard({ data }: { data: any }) {
  // latestPost ditarik dari bentoQuery di app/page.tsx
  const { latestPost, installCount, leader, profile } = data

  // LOGIKA CERDAS: Cek apakah konten ini adalah unduhan
  const isDownload = latestPost?.category === 'unduhan'
  const downloadUrl = latestPost?.fileUrl || latestPost?.downloadLink
  const buttonLink = isDownload ? downloadUrl : `/${latestPost?.category || 'berita'}/${latestPost?.slug?.current || ''}`

  return (
    <ThemeProvider theme={studioTheme}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 max-w-7xl mx-auto">
        
        {/* 1. KARTU UTAMA: POSTINGAN/UNDUHAN TERBARU */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="md:col-span-2 md:row-span-2 bg-[#004a8e] text-white p-8 rounded-[2rem] flex flex-col justify-between shadow-xl relative overflow-hidden"
        >
          <div className="relative z-10">
            {/* Badge Dinamis sesuai kategori */}
            <Badge 
              tone={isDownload ? "positive" : "caution"} 
              style={{ 
                marginBottom: '1rem', 
                display: 'inline-block', 
                textTransform: 'uppercase',
                fontWeight: '800'
              }}
            >
              {latestPost?.category ? `${latestPost.category} TERBARU` : 'KONTEN TERBARU'}
            </Badge>

            <Heading size={3} style={{ lineHeight: '1.2', marginBottom: '1rem', color: 'white' }}>
              {latestPost?.title || 'Menanti Konten Terkini'}
            </Heading>

            <Text size={1} style={{ color: '#e0e0e0' }}>
              {latestPost?.publishedAt 
                ? new Date(latestPost.publishedAt).toLocaleDateString('id-ID', { dateStyle: 'long' }) 
                : 'Tanggal belum tersedia'}
            </Text>
          </div>

          {/* TOMBOL ADAPTIF: Berubah fungsi jika kategori 'Unduhan' */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a 
              href={buttonLink}
              target={isDownload ? "_blank" : "_self"}
              rel={isDownload ? "noopener noreferrer" : ""}
              className="relative z-10 mt-8 inline-flex items-center gap-2 bg-[#ffc107] text-[#004a8e] font-bold px-8 py-4 rounded-full w-fit hover:bg-white transition-colors shadow-lg"
            >
              {isDownload ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  UNDUH SEKARANG {latestPost?.fileSize ? `(${latestPost.fileSize})` : ''}
                </>
              ) : (
                "Baca Selengkapnya"
              )}
            </a>
          </motion.div>

          {/* Dekorasi mencerahkan */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#ffc107] opacity-10 rounded-full blur-3xl"></div>
        </motion.div>

        {/* 2. KARTU STATISTIK: JAMAAH TERHUBUNG */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="md:col-span-2 bg-white border-2 border-[#f0f0f0] p-6 rounded-[2rem] flex items-center justify-between shadow-sm"
        >
          <div>
            <Text size={1} weight="bold" muted style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Aplikasi Terinstall
            </Text>
            <Heading size={4} style={{ color: '#004a8e', fontSize: '3.5rem', marginTop: '0.5rem', fontWeight: '900' }}>
              {installCount || 0}
            </Heading>
          </div>
          <div className="text-right">
            <Text size={0} muted>Jamaah PCM Kembaran</Text>
            <Flex align="center" gap={1} justify="flex-end" style={{ marginTop: '0.5rem' }}>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <Text size={0} style={{ color: '#22863a', fontWeight: 'bold' }}>Real-time</Text>
            </Flex>
          </div>
        </motion.div>

        {/* 3. KARTU PIMPINAN: PROFIL KETUA */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-[#ffc107] p-6 rounded-[2rem] flex flex-col justify-center items-center text-center shadow-md"
        >
          <Text size={0} weight="bold" style={{ color: '#004a8e', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Ketua PCM
          </Text>
          <Heading size={2} style={{ color: '#004a8e', fontWeight: '800' }}>
            {leader?.name || 'Pimpinan Cabang'}
          </Heading>
          <Text size={0} style={{ marginTop: '0.5rem', color: '#004a8e', opacity: 0.8, fontWeight: 'bold' }}>
            NBM: {leader?.nbm || '-'}
          </Text>
        </motion.div>

        {/* 4. KARTU KONTAK: ALAMAT & LOKASI */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white border-2 border-[#f0f0f0] p-6 rounded-[2rem] flex flex-col justify-center shadow-sm"
        >
          <Text size={1} weight="bold" style={{ color: '#004a8e', textTransform: 'uppercase' }}>Kantor PCM</Text>
          <Text size={1} muted style={{ marginTop: '0.5rem', lineHeight: '1.4' }}>
            {profile?.address || 'Kecamatan Kembaran, Banyumas'}
          </Text>
          <Link href={profile?.location || '#'} className="mt-4 text-[#004a8e] font-bold flex items-center gap-2 hover:underline">
            <span>📍 Buka Maps</span>
          </Link>
        </motion.div>

      </div>
    </ThemeProvider>
  )
}