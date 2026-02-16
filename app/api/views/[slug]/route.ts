import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';

const client = createClient({
  projectId: "deyoeizv", // Project ID Anda
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN, // Menggunakan token dengan akses Editor
  useCdn: false,
});

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    // 1. Cari ID dokumen berdasarkan slug
    const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]._id`, { slug });

    if (!post) return NextResponse.json({ error: "Post tidak ditemukan" }, { status: 404 });

    // 2. Tambahkan jumlah views (+1) secara atomik di Sanity
    await client
      .patch(post)
      .setIfMissing({ views: 0 })
      .inc({ views: 1 })
      .commit();

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}