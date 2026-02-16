"use client"; // Wajib untuk logika pengacakan di browser

import { useEffect, useState } from "react";
import Link from "next/link";

interface Post {
  _id: string;
  title: string;
  slug: string;
  image: string;
  category: string;
  views: number;
}

export default function RecommendationSection({ allData }: { allData: Post[] }) {
  const [recommended, setRecommended] = useState<Post[]>([]);

  // Logika pengacakan hanya dijalankan di browser (Client-side)
  useEffect(() => {
    if (allData && allData.length > 0) {
      const shuffled = [...allData]
        .sort(() => Math.random() - 0.5)
        .slice(0, 6);
      setRecommended(shuffled);
    }
  }, [allData]);

  // Mencegah tampilan berantakan saat data belum siap di client
  if (recommended.length === 0) return null;

  return (
    <div>
      {/* HEADER REKOMENDASI */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <h2 style={{ fontSize: '22px', color: 'var(--abah-blue)', fontWeight: '900', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
          Rekomendasi <span style={{ color: 'var(--abah-gold)' }}>Untuk Anda</span>
        </h2>
        <Link href="/berita" style={{ fontSize: '13px', color: '#888', textDecoration: 'none', fontWeight: '600' }}>
          LIHAT SEMUA ❯
        </Link>
      </div>

      {/* GRID 3 KOLOM */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px' }}>
        {recommended.map((item) => (
          <Link 
            href={`/${item.category}/${item.slug}`} 
            key={item._id} 
            style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
          >
            <div style={{ 
              width: '100%', 
              height: '150px', 
              borderRadius: '10px', 
              overflow: 'hidden', 
              marginBottom: '12px',
              backgroundColor: '#f9f9f9',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}>
              <img 
                src={item.image || "/logo-md.png"} 
                alt={item.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>

            <span style={{ 
              fontSize: '11px', 
              color: item.category === 'berita' ? '#e64d31' : 'var(--abah-gold)', 
              fontWeight: '800', 
              display: 'block', 
              marginBottom: '6px',
              textTransform: 'uppercase'
            }}>
              {item.category}
            </span>

            <h3 style={{ 
              fontSize: '15px', 
              fontWeight: '700', 
              lineHeight: '1.4', 
              margin: '0 0 8px 0', 
              color: '#1a1a1a',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {item.title}
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#aaa' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <span style={{ fontWeight: '600' }}>{item.views || 0} Kali Dibaca</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}