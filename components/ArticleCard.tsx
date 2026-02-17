'use client'
import { motion } from 'framer-motion'

export default function ArticleCard({ title, date }: { title: string, date: string }) {
  return (
    <motion.div
      whileHover={{ 
        y: -5, 
        boxShadow: "0px 10px 20px rgba(0, 74, 142, 0.1)" // Biru PCM transparan
      }}
      transition={{ type: "spring", stiffness: 300 }}
      className="p-4 bg-white border-t-4 border-yellow-400 rounded-lg shadow-sm"
    >
      <h3 className="text-blue-900 font-bold">{title}</h3>
      <p className="text-gray-500 text-sm">{date}</p>
    </motion.div>
  )
}