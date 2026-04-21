import { defineType, defineField } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export default defineType({
  name: 'post',
  title: 'Konten Utama',
  type: 'document',
  icon: DocumentIcon,
  // Menambahkan Group agar UI Sanity Studio lebih rapi
  groups: [
    { name: 'konten', title: 'Isi Konten' },
    { name: 'unduhan', title: 'Sektor Unduhan' },
    { name: 'meta', title: 'Meta & Statistik' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Konten',
      type: 'string',
      group: 'konten',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'konten',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori Konten',
      type: 'string',
      group: 'konten',
      options: {
        list: [
          { title: 'Berita', value: 'berita' },
          { title: 'Artikel', value: 'artikel' },
          { title: 'Unduhan', value: 'unduhan' },
          { title: 'Liputan Dakwah', value: 'liputan-dakwah' },
          { title: 'Pendidikan', value: 'pendidikan' },
          { title: 'Video', value: 'video' },
          { title: 'Bisnis', value: 'bisnis' },
          { title: 'Tokoh & Inspirasi', value: 'tokoh-inspirasi' },
          { title: 'Teknologi', value: 'teknologi' },
          { title: 'Kesehatan', value: 'kesehatan' },
          { title: "Tafsir Al-Qur'an", value: 'tafsir' },
          { title: 'Hadits Pilihan', value: 'hadits' },
          { title: 'Fiqih Praktis', value: 'fiqih' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),

    /* --- SEKTOR UNDUHAN (OPSIONAL & DINAMIS) --- */
    defineField({
      name: 'downloadLink',
      title: 'Link Unduhan (Eksternal)',
      type: 'url',
      group: 'unduhan',
      description: 'Tempel link Google Drive/Dropbox di sini.',
      // Hanya muncul jika kategori 'unduhan' dipilih
      hidden: ({ document }) => document?.category !== 'unduhan',
    }),
    defineField({
      name: 'fileSize',
      title: 'Keterangan File',
      type: 'string',
      group: 'unduhan',
      description: 'Contoh: PDF, 2.5 MB',
      hidden: ({ document }) => document?.category !== 'unduhan',
    }),

    /* --- MEDIA & META --- */
    defineField({
      name: 'mainImage',
      title: 'Gambar Utama',
      type: 'image',
      group: 'konten',
      options: { hotspot: true },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Tanggal Terbit',
      type: 'datetime',
      group: 'meta',
      initialValue: () => (new Date()).toISOString(),
    }),
    defineField({
      name: 'views',
      title: 'Jumlah Pembaca (Views)',
      type: 'number',
      group: 'meta',
      initialValue: 0,
    }),

    /* --- EDITOR KONTEN --- */
    defineField({
      name: 'body',
      title: 'Isi Konten / Deskripsi',
      type: 'array',
      group: 'konten',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
        { type: 'youtube' } 
      ],
    }),
  ],
})