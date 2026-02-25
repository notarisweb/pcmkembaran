import { client } from "./sanity.client";
import { groq } from "next-sanity";

/**
 * 1. Ambil SEMUA postingan terbaru (Homepage)
 */
export async function getAllPosts() {
  return client.fetch(
    groq`*[_type == "post"] | order(publishedAt desc)[0...10] {
      _id,
      title,
      "slug": slug.current,
      "image": mainImage.asset->url,
      "publishedAt": publishedAt,
      "category": coalesce(categories[0]->title, category, "Umum"),
      "views": coalesce(views, 0)
    }`
  );
}

/**
 * 2. Ambil Berita Terbaru (Headline & Top News)
 */
export async function getNewsPosts() {
  return client.fetch(
    groq`*[_type == "post" && (categories[0]->title match "Berita" || category match "berita")] | order(publishedAt desc)[0...6] {
      _id,
      title,
      "slug": slug.current,
      "image": mainImage.asset->url,
      "publishedAt": publishedAt,
      "category": "Berita",
      "views": coalesce(views, 0)
    }`
  );
}

/**
 * 3. Ambil Artikel Terbaru (Sidebar Pilihan)
 */
export async function getArticlePosts() {
  return client.fetch(
    groq`*[_type == "post" && (categories[0]->title match "Artikel" || category match "artikel")] | order(publishedAt desc)[0...5] {
      _id,
      title,
      "slug": slug.current,
      "image": mainImage.asset->url,
      "publishedAt": publishedAt,
      "category": "Artikel",
      "views": coalesce(views, 0)
    }`
  );
}

/**
 * 4. Fungsi Dinamis Rubrik (Halaman Kategori)
 */
export async function getPostsByCategory(categoryName: string) {
  return client.fetch(
    groq`*[_type == "post" && (categories[0]->title match $categoryName || category match $categoryName)] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      "image": mainImage.asset->url,
      "publishedAt": publishedAt,
      "category": coalesce(categories[0]->title, category, $categoryName),
      "views": coalesce(views, 0),
      "excerpt": array::join(string::split(pt::text(body), "")[0...150], "") + "..."
    }`,
    { categoryName }
  );
}

/**
 * 5. Detail Konten (Halaman Baca)
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
      "category": coalesce(categories[0]->title, category, "Umum"),
      "views": coalesce(views, 0),
      body,
      "author": author->name
    }`,
    { slug }
  );
}

/**
 * 6. Postingan Terkait (BAWAH ARTIKEL)
 * PERBAIKAN: Memastikan slug yang diambil adalah string murni
 */
export async function getRelatedPosts(category: string, currentSlug: string) {
  return client.fetch(
    groq`*[_type == "post" && (categories[0]->title match $category || category match $category) && slug.current != $currentSlug] | order(publishedAt desc) [0...3] {
      _id,
      title,
      "slug": slug.current, 
      "image": mainImage.asset->url,
      "category": coalesce(categories[0]->title, category, $category)
    }`,
    { category, currentSlug }
  );
}

/**
 * 7. Ambil Postingan Terpopuler (SIDEBAR)
 * Berdasarkan jumlah views tertinggi
 */
export async function getPopularPosts() {
  return client.fetch(
    groq`*[_type == "post"] | order(views desc)[0...5] {
      _id,
      title,
      "slug": slug.current,
      "category": coalesce(categories[0]->title, category, "Berita")
    }`
  );
}

/**
 * 8. Fungsi Pencarian Global
 */
export async function getSearchedPosts(searchQuery: string) {
  if (!searchQuery) return [];
  try {
    return await client.fetch(
      groq`*[_type == "post" && (title match $searchQuery || pt::text(body) match $searchQuery)] | order(publishedAt desc) {
        _id,
        title,
        "slug": slug.current,
        "image": mainImage.asset->url,
        "category": coalesce(categories[0]->title, category, "Umum"),
        "publishedAt": publishedAt,
        "views": coalesce(views, 0)
      }`,
      { searchQuery: `*${searchQuery}*` }
    );
  } catch (error) {
    console.error("Gagal melakukan pencarian:", error);
    return [];
  }
}