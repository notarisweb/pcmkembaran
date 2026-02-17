'use client'

import { motion } from 'framer-motion'
import { Text, Heading, Flex, Badge, ThemeProvider, studioTheme } from '@sanity/ui'
import Link from 'next/link'

export default function BentoDashboard({ data }: { data: any }) {
  const { latestKhutbah, installCount, leader, profile } = data

  return (
    <ThemeProvider theme={studioTheme}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 max-w-7xl mx-auto">
        
        {/* 1. KARTU UTAMA: POSTINGAN TERBARU (DINAMIS) */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="md:col-span-2 md:row-span-2 bg-[#004a8e] text-white p-8 rounded-[2rem] flex flex-col justify-between shadow-xl relative overflow-hidden"
        >
          <div className="relative z-10">
            {/* PERBAIKAN: Label Badge mengikuti kategori dari data Sanity */}
            <Badge 
              tone="caution" 
              style={{ 
                marginBottom: '1rem', 
                display: 'inline-block', 
                textTransform: 'uppercase',
                fontWeight: '800'
              }}
            >
              {latestKhutbah?.category ? `${latestKhutbah.category} TERBARU` : 'KONTEN TERBARU'}
            </Badge>

            <Heading size={3} style={{ lineHeight: '1.2', marginBottom: '1rem', color: 'white' }}>
              {latestKhutbah?.title || 'Menanti Konten Terkini'}
            </Heading>

            <Text size={1} style={{ color: '#e0e0e0' }}>
              {latestKhutbah?.publishedAt 
                ? new Date(latestKhutbah.publishedAt).toLocaleDateString('id-ID', { dateStyle: 'long' }) 
                : 'Tanggal belum tersedia'}
            </Text>
          </div>

          {/* PERBAIKAN: Link href dinamis berdasarkan kategori (misal: /artikel/judul atau /khutbah/judul) */}
          <Link 
            href={`/${latestKhutbah?.category || 'berita'}/${latestKhutbah?.slug?.current || ''}`} 
            className="relative z-10 mt-8 inline-block bg-[#ffc107] text-[#004a8e] font-bold px-6 py-3 rounded-full w-fit hover:bg-white transition-colors"
          >
            Baca Selengkapnya
          </Link>

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