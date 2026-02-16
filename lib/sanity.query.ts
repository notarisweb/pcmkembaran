// lib/sanity.query.ts
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
      publishedAt,
      category,
      views
    }`
  );
}

/**
 * 2. Ambil Berita Terbaru (Headline)
 */
export async function getNewsPosts() {
  return client.fetch(
    groq`*[_type == "post" && category == "berita"] | order(publishedAt desc)[0...6] {
      _id,
      title,
      "slug": slug.current,
      "image": mainImage.asset->url,
      publishedAt,
      category,
      views
    }`
  );
}

/**
 * 3. Ambil Artikel Terbaru (Sidebar)
 */
export async function getArticlePosts() {
  return client.fetch(
    groq`*[_type == "post" && category == "artikel"] | order(publishedAt desc)[0...5] {
      _id,
      title,
      "slug": slug.current,
      "image": mainImage.asset->url,
      publishedAt,
      category,
      views
    }`
  );
}

/**
 * 4. Fungsi DINAMIS untuk Halaman Rubrik
 */
export async function getPostsByCategory(categoryName: string) {
  return client.fetch(
    groq`*[_type == "post" && category == $categoryName] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      "image": mainImage.asset->url,
      publishedAt,
      category,
      views,
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
      category,
      views,
      body,
      "author": author->name
    }`,
    { slug }
  );
}

/**
 * 6. PERBAIKAN: Ambil Khutbah Terbaru (Missing Export)
 */
export async function getKhutbahPosts() {
  return client.fetch(
    groq`*[_type == "post" && category == "khutbah"] | order(publishedAt desc)[0...5] {
      _id,
      title,
      "slug": slug.current,
      "image": mainImage.asset->url,
      publishedAt,
      category,
      views
    }`
  );
}

/**
 * 7. Postingan Terkait
 */
export async function getRelatedPosts(category: string, currentSlug: string) {
  return client.fetch(
    groq`*[_type == "post" && category == $category && slug.current != $currentSlug][0...3] {
      _id,
      title,
      "slug": slug.current,
      "image": mainImage.asset->url,
      category
    }`,
    { category, currentSlug }
  );
}