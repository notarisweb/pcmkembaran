"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
// 1. IMPOR IMAGE UNTUK OPTIMASI PERFORMA
import Image from "next/image";

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

  useEffect(() => {
    if (allData && allData.length > 0) {
      // Mengambil 6 postingan secara acak di sisi Client
      const shuffled = [...allData]
        .sort(() => Math.random() - 0.5)
        .slice(0, 6);
      setRecommended(shuffled);
    }
  }, [allData]);

  if (recommended.length === 0) return null;

  return (
    <div className="recommendation-container">
      {/* HEADER REKOMENDASI */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <h2 style={{ fontSize: '22px', color: '#004a8e', fontWeight: '900', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
          Rekomendasi <span style={{ color: '#ffc107' }}>Untuk Anda</span>
        </h2>
        <Link href="/berita" style={{ fontSize: '12px', color: '#94a3b8', textDecoration: 'none', fontWeight: '800' }}>
          LIHAT SEMUA ❯
        </Link>
      </div>

      {/* GRID 3 KOLOM */}
      <div className="recommend-grid">
        {recommended.map((item) => {
          // Logika pembersihan URL Kategori
          const categoryPath = item.category?.toLowerCase().replace(/\s+/g, '-') || "artikel";
          
          return (
            <Link 
              href={`/${categoryPath}/${item.slug}`} 
              key={item._id} 
              className="recommend-card"
            >
              {/* THUMBNAIL OPTIMIZED */}
              <div className="recommend-thumb-wrapper">
                <Image 
                  src={item.image || "/logo-md.png"} 
                  alt={item.title} 
                  fill
                  // Hanya download gambar selebar 33% layar pada desktop
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  className="recommend-img"
                />
              </div>

              <span className="recommend-cat" style={{ 
                color: item.category?.toLowerCase() === 'berita' ? '#e64d31' : '#ffc107' 
              }}>
                {item.category}
              </span>

              <h3 className="recommend-title">
                {item.title}
              </h3>

              <div className="recommend-meta">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <span suppressHydrationWarning>{item.views || 0} Kali Dibaca</span>
              </div>
            </Link>
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .recommend-grid { 
          display: grid; 
          grid-template-columns: repeat(3, 1fr); 
          gap: 25px; 
        }
        .recommend-card { text-decoration: none; color: inherit; transition: 0.3s; }
        .recommend-card:hover { opacity: 0.8; }
        
        .recommend-thumb-wrapper { 
          width: 100%; height: 160px; border-radius: 12px; overflow: hidden; 
          margin-bottom: 12px; background: #f1f5f9; position: relative;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }
        .recommend-img { transition: transform 0.5s ease; }
        .recommend-card:hover .recommend-img { transform: scale(1.1); }

        .recommend-cat { 
          font-size: 10px; font-weight: 800; display: block; 
          margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;
        }
        .recommend-title { 
          font-size: 15px; font-weight: 800; lineHeight: 1.5; 
          margin: 0 0 10px 0; color: #1e293b;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
          height: 44px;
        }
        .recommend-meta { display: flex; align-items: center; gap: 6px; font-size: 11px; color: #94a3b8; font-weight: 600; }

        @media (max-width: 992px) {
          .recommend-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .recommend-grid { grid-template-columns: 1fr; }
          .recommend-thumb-wrapper { height: 200px; }
        }
      `}} />
    </div>
  );
}