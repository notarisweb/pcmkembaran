import { client } from "./sanity.client";
import { groq } from "next-sanity";

// 1. Ambil SEMUA jenis postingan terbaru (Untuk komponen LatestPosts)
// Fungsi ini memastikan kategori Artikel, Khutbah, dll ikut muncul
export async function getAllPosts() {
  return client.fetch(
    groq`*[_type == "post"] | order(publishedAt desc)[0...10] {
      _id,
      title,
      "slug": slug.current,
      "image": mainImage.asset->url,
      publishedAt,
      category
    }`
  );
}

// 2. Ambil Berita Khusus untuk Kolom Kiri (Headline)
export async function getNewsPosts() {
  return client.fetch(
    groq`*[_type == "post" && category == "berita"] | order(publishedAt desc)[0...6] {
      _id,
      title,
      "slug": slug.current,
      "image": mainImage.asset->url,
      publishedAt,
      category
    }`
  );
}

// 3. Ambil Artikel Khusus untuk Sidebar Kanan
export async function getArticlePosts() {
  return client.fetch(
    groq`*[_type == "post" && category == "artikel"] | order(publishedAt desc)[0...5] {
      _id,
      title,
      "slug": slug.current,
      publishedAt
    }`
  );
}

// 4. Fungsi DINAMIS untuk Halaman Kategori (Tafsir, Hadits, Fiqih, Hikmah, dll)
export async function getPostsByCategory(category: string) {
  return client.fetch(
    groq`*[_type == "post" && category == $category] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      "image": mainImage.asset->url,
      publishedAt,
      category,
      "excerpt": pt::text(body)
    }`,
    { category }
  ).then(posts => posts.map((post: any) => ({
    ...post,
    // Memotong teks secara aman di sisi aplikasi agar tidak error di GROQ
    excerpt: post.excerpt ? post.excerpt.substring(0, 150) + "..." : ""
  })));
}

// 5. Ambil Detail Satu Konten (Untuk halaman baca artikel)
export async function getSinglePost(slug: string) {
  return client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      "image": mainImage.asset->url,
      publishedAt,
      category,
      body
    }`,
    { slug }
  );
}