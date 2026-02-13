import { client } from "./sanity.client";
import { groq } from "next-sanity";

/**
 * 1. Ambil SEMUA postingan terbaru (Berita, Artikel, Khutbah, dll)
 * Untuk komponen LatestPosts di Homepage.
 */
export async function getAllPosts() {
  return client.fetch(
    groq`*[_type == "post"] | order(publishedAt desc)[0...10] {
      _id,
      title,
      "slug": slug.current,
      "image": mainImage.asset->url,
      publishedAt,
      "category": coalesce(categories[0]->title, category, "Umum")
    }`
  );
}

/**
 * 2. Ambil Berita Terbaru (Headline).
 */
export async function getNewsPosts() {
  return client.fetch(
    groq`*[_type == "post" && (categories[]->title match "Berita" || category match "berita")] | order(publishedAt desc)[0...6] {
      _id,
      title,
      "slug": slug.current,
      "image": mainImage.asset->url,
      publishedAt,
      "category": "Berita"
    }`
  );
}

/**
 * 3. Ambil Artikel Terbaru untuk Sidebar.
 */
export async function getArticlePosts() {
  return client.fetch(
    groq`*[_type == "post" && (categories[]->title match "Artikel" || category match "artikel")] | order(publishedAt desc)[0...5] {
      _id,
      title,
      "slug": slug.current,
      "image": mainImage.asset->url,
      publishedAt,
      "category": "Artikel"
    }`
  );
}

/**
 * 4. Fungsi DINAMIS untuk Halaman Rubrik (Tafsir, Fiqih, dll).
 */
export async function getPostsByCategory(categoryName: string) {
  return client.fetch(
    groq`*[_type == "post" && (categories[]->title match $categoryName || category match $categoryName)] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      "image": mainImage.asset->url,
      publishedAt,
      "category": coalesce(categories[0]->title, category, $categoryName),
      "excerpt": array::join(string::split(pt::text(body), "")[0...150], "") + "..."
    }`,
    { categoryName: `${categoryName}` }
  );
}

/**
 * 5. Ambil Detail Konten (Untuk halaman baca).
 */
export async function getSinglePost(slug: string) {
  if (!slug) return null;
  return client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      "image": mainImage.asset->url,
      publishedAt,
      "category": coalesce(categories[0]->title, category, "Artikel"),
      body,
      "author": author->name
    }`,
    { slug }
  );
}

/**
 * 6. Ambil Khutbah Terbaru (Sidebar Khutbah).
 */
export async function getKhutbahPosts() {
  return client.fetch(
    groq`*[_type == "post" && (categories[]->title match "Khutbah" || category match "khutbah")] | order(publishedAt desc)[0...5] {
      _id,
      title,
      "slug": slug.current,
      "image": mainImage.asset->url,
      publishedAt,
      "category": "Khutbah"
    }`
  );
}

/**
 * 7. Ambil Postingan Terkait (Bawah Artikel).
 */
export async function getRelatedPosts(category: string, currentSlug: string) {
  return client.fetch(
    groq`*[_type == "post" && (categories[]->title match $category || category match $category) && slug.current != $currentSlug][0...3] {
      _id,
      title,
      "slug": slug.current,
      "image": mainImage.asset->url
    }`,
    { category, currentSlug }
  );
}