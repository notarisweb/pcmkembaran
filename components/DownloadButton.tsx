'use client'

import { motion } from 'framer-motion'

export default function DownloadButton({ post }: { post: any }) {
  // 1. Tentukan Link Akhir (Prioritas: Upload Langsung > Link Luar)
  const finalLink = post.fileUrl || post.downloadLink

  // Jika tidak ada link sama sekali, jangan tampilkan tombol
  if (!finalLink) return null

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="mt-4"
    >
      <a 
        href={finalLink}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-indeks" // Menggunakan class yang sudah kita buat di globals.css
        style={{ 
          display: 'inline-flex', 
          backgroundColor: 'var(--abah-gold)', 
          color: 'var(--abah-blue)',
          padding: '12px 25px',
          borderRadius: '30px',
          fontWeight: 'bold',
          textDecoration: 'none',
          boxShadow: '0 4px 15px rgba(255, 193, 7, 0.3)'
        }}
      >
        <svg 
          width="20" height="20" viewBox="0 0 24 24" fill="none" 
          stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          style={{ marginRight: '10px' }}
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        UNDUH {post.fileSize ? `(${post.fileSize})` : 'FILE'}
      </a>
    </motion.div>
  )
}