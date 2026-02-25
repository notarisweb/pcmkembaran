import { defineType, defineField } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export default defineType({
  name: 'post',
  title: 'Konten Utama',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Konten',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori Konten',
      type: 'string',
      options: {
        list: [
          { title: 'Berita', value: 'berita' },
          { title: 'Artikel', value: 'artikel' },
          { title: 'Liputan Dakwah', value: 'liputan-dakwah' },
          { title: 'Pendidikan', value: 'pendidikan' },
          { title: 'Video', value: 'video' },
          { title: 'Bisnis', value: 'bisnis' },
          { title: 'Tokoh & Inspirasi', value: 'tokoh-inspirasi' },
          { title: 'Teknologi', value: 'teknologi' },
          { title: 'Kesehatan', value: 'kesehatan' },
          { title: 'Unduhan', value: 'unduhan' },
          { title: "Tafsir Al-Qur'an", value: 'tafsir' },
          { title: 'Hadits Pilihan', value: 'hadits' },
          { title: 'Fiqih Praktis', value: 'fiqih' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),

    /* --- KOLOM KHUSUS UNDUHAN (Muncul Otomatis jika Kategori 'unduhan' dipilih) --- */
    defineField({
      name: 'fileSource',
      title: 'Upload File Langsung',
      type: 'file',
      description: 'Gunakan ini untuk mengunggah file PDF/Dokumen langsung ke Sanity.',
      options: {
        accept: '.pdf,.doc,.docx,.zip'
      },
      hidden: ({ document }) => document?.category !== 'unduhan',
    }),
    defineField({
      name: 'downloadLink',
      title: 'Link Unduhan (Luar)',
      type: 'url',
      description: 'Masukkan link Google Drive/Dropbox jika file sudah ada di sana.',
      hidden: ({ document }) => document?.category !== 'unduhan',
    }),
    defineField({
      name: 'fileSize',
      title: 'Keterangan File',
      type: 'string',
      description: 'Contoh: PDF, 2.5 MB, atau Versi 1.0',
      hidden: ({ document }) => document?.category !== 'unduhan',
    }),

    /* --- KOLOM MEDIA & META --- */
    defineField({
      name: 'mainImage',
      title: 'Gambar Utama',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Tanggal Terbit',
      type: 'datetime',
      initialValue: () => (new Date()).toISOString(),
    }),
    defineField({
      name: 'views',
      title: 'Jumlah Pembaca (Views)',
      type: 'number',
      description: 'Admin bisa mengisi atau mengubah angka ini agar tampilan views terlihat keren di website.',
      initialValue: 0,
    }),

    /* --- EDITOR KONTEN (Portable Text) --- */
    defineField({
      name: 'body',
      title: 'Isi Konten / Deskripsi',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
        },
        // OBJEK YOUTUBE AKTIF DI SINI
        { type: 'youtube' } 
      ],
    }),
  ],
})