import { client } from "./sanity.client";
import { groq } from "next-sanity";

/**
 * Snippet Reusable - Kalibrasi Gambar (Anti-Hilang)
 * Mengambil flyerImage jika mainImage kosong, dan sebaliknya.
 */
const imageFields = groq`
  "image": coalesce(mainImage.asset->url, flyerImage.asset->url),
  "imageAlt": coalesce(mainImage.alt, flyerImage.alt, title, tema, "Gambar PCM Kembaran"),
  "imageCaption": coalesce(mainImage.caption, flyerImage.caption)
`;

export async function getAllPosts() {
  return client.fetch(
    groq`*[_type in ["post", "jadwalKajian"]] | order(publishedAt desc)[0...10] {
      _id,
      _type,
      tipe,
      hari,
      tanggal,
      "title": coalesce(title, tema), 
      "slug": slug.current,
      ${imageFields},
      "publishedAt": publishedAt,
      "category": coalesce(category, categories[0]->title, "Jadwal Kajian"),
      "views": coalesce(views, 0)
    }`,
    {},
    { cache: 'no-store' }
  );
}

export async function getNewsPosts() {
  return client.fetch(
    groq`*[_type == "post" && (category match "berita" || categories[0]->title match "Berita")] | order(publishedAt desc)[0...6] {
      _id,
      title,
      "slug": slug.current,
      ${imageFields},
      "publishedAt": publishedAt,
      "category": "Berita",
      "views": coalesce(views, 0)
    }`,
    {},
    { cache: 'no-store' }
  );
}

export async function getArticlePosts() {
  return client.fetch(
    groq`*[_type == "post" && (category match "artikel" || categories[0]->title match "Artikel")] | order(publishedAt desc)[0...5] {
      _id,
      title,
      "slug": slug.current,
      ${imageFields},
      "publishedAt": publishedAt,
      "category": "Artikel",
      "views": coalesce(views, 0)
    }`,
    {},
    { cache: 'no-store' }
  );
}

export async function getPostsByCategory(categoryName: string) {
  return client.fetch(
    groq`*[(_type == "post" || _type == "jadwalKajian") && (category match $categoryName || categories[0]->title match $categoryName || "Jadwal Kajian" match $categoryName)] | order(publishedAt desc) {
      _id,
      _type,
      tipe,
      hari,
      tanggal,
      pekan,
      "title": coalesce(title, tema),
      "slug": slug.current,
      ${imageFields},
      "publishedAt": publishedAt,
      "category": coalesce(category, categories[0]->title, "Jadwal Kajian"),
      "views": coalesce(views, 0),
      "downloadLink": downloadLink,
      "fileSize": fileSize,
      "excerpt": array::join(string::split(pt::text(body), "")[0...200], "") + "..."
    }`,
    { categoryName },
    { cache: 'no-store' }
  );
}

export async function getSinglePost(slug: string) {
  if (!slug) return null;
  return client.fetch(
    groq`*[_type in ["post", "jadwalKajian"] && slug.current == $slug][0] {
      _id,
      _type,
      tipe,        
      hari,        
      tanggal,     
      pekan,       
      "title": coalesce(title, tema),
      "slug": slug.current,
      ${imageFields},
      publishedAt,
      "category": coalesce(category, categories[0]->title, "Jadwal Kajian"),
      "views": coalesce(views, 0),
      "downloadLink": downloadLink,
      "fileSize": fileSize,
      eventTheme,
      eventDate,
      eventLocation,
      eventSpeaker,
      body, // Kembali ke default agar rendering PortableText tidak pecah
      "author": author->name,
      ustadz,
      waktu,
      keterangan,
      "namaMasjid": masjid->name,
      "alamatMasjid": masjid->address
    }`,
    { slug },
    { cache: 'no-store' }
  );
}

export async function getKhutbahPosts() {
  return client.fetch(
    groq`*[_type == "post" && (category match "khutbah" || categories[0]->title match "Khutbah")] | order(publishedAt desc)[0...5] {
      _id,
      title,
      "slug": slug.current,
      ${imageFields},
      "publishedAt": publishedAt,
      "category": "Khutbah",
      "views": coalesce(views, 0)
    }`,
    {},
    { cache: 'no-store' }
  );
}

export async function getRelatedPosts(category: string, currentSlug: string) {
  return client.fetch(
    groq`*[_type in ["post", "jadwalKajian"] && (category match $category || categories[0]->title match $category || "Jadwal Kajian" match $category) && slug.current != $currentSlug] | order(publishedAt desc) [0...8] {
      _id,
      tipe,
      hari,
      tanggal,
      "title": coalesce(title, tema),
      "slug": slug.current,
      ${imageFields},
      "publishedAt": publishedAt,
      "category": coalesce(category, categories[0]->title, "Jadwal Kajian"),
      "views": coalesce(views, 0)
    }`,
    { category, currentSlug },
    { cache: 'no-store' }
  );
}

export async function getPopularPosts() {
  return client.fetch(
    groq`*[_type in ["post", "jadwalKajian"]] | order(views desc)[0...5] {
      _id,
      "title": coalesce(title, tema),
      "slug": slug.current,
      "publishedAt": publishedAt,
      "category": coalesce(category, categories[0]->title, "Jadwal Kajian"),
      "views": coalesce(views, 0)
    }`,
    {},
    { cache: 'no-store' }
  );
}

export async function getSearchedPosts(searchQuery: string) {
  if (!searchQuery) return [];
  try {
    return await client.fetch(
      groq`*[_type in ["post", "jadwalKajian"] && (title match $searchQuery || tema match $searchQuery || pt::text(body) match $searchQuery)] | order(publishedAt desc) {
        _id,
        tipe,
        hari,
        tanggal,
        "title": coalesce(title, tema),
        "slug": slug.current,
        ${imageFields},
        "category": coalesce(category, categories[0]->title, "Jadwal Kajian"),
        "publishedAt": publishedAt,
        "views": coalesce(views, 0)
      }`,
      { searchQuery: `*${searchQuery}*` },
      { cache: 'no-store' }
    );
  } catch (error) {
    console.error("Gagal melakukan pencarian:", error);
    return [];
  }
}

export async function getKajianHariIni(hari: string, tanggal: string, pekanKe: string) {
  return client.fetch(
    groq`*[_type == "jadwalKajian" && (
      (tipe == "insidental" && tanggal == $tanggal) || 
      (tipe == "rutin" && hari == $hari && (count(pekan) == 0 || !defined(pekan) || $pekanKe in pekan))
    )] | order(tipe desc) {
      _id,
      tipe,
      hari,
      pekan,
      tanggal,
      ustadz,
      waktu,
      tema,
      keterangan,
      "namaMasjid": masjid->name,
      "alamatMasjid": masjid->address,
      "logoMasjid": masjid->logo.asset->url,
      "flyerImageUrl": flyerImage.asset->url
    }`,
    { hari, tanggal, pekanKe },
    { cache: 'no-store' }
  );
}