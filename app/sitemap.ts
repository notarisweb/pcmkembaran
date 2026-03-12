import { MetadataRoute } from 'next'
import { client } from "@/lib/sanity.client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://pcmkembaran.com';

  // 1. AMBIL SEMUA SLUG DARI SANITY (Berita, Artikel, Khutbah)
  const query = `*[_type == "post"] {
    "slug": slug,
    "category": category,
    "_updatedAt": _updatedAt
  }`;
  
  const posts = await client.fetch(query);

  // 2. PETAKAN DATA DARI SANITY KE FORMAT SITEMAP
  const dynamicRoutes = posts.map((post: any) => {
    const categoryPath = post.category?.toLowerCase().replace(/\s+/g, '-') || "berita";
    return {
      url: `${baseUrl}/${categoryPath}/${post.slug}`,
      lastModified: new Date(post._updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    };
  });

  // 3. DAFTAR HALAMAN STATIS UTAMA
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/ranting`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/berita`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/khutbah`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  return [...staticRoutes, ...dynamicRoutes];
}