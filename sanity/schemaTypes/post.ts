import { defineType, defineField } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export default defineType({
  name: 'post',
  title: 'Konten Utama',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    { name: 'konten', title: 'Isi Konten' },
    { name: 'unduhan', title: 'Sektor Unduhan' },
    { name: 'kajian', title: 'Info Tabligh Akbar' }, // Group khusus acara
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
          { title: 'Tabligh Akbar (Insidental)', value: 'tabligh-akbar' },
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

    /* ========================================================================
       SECTION: TABLIGH AKBAR FIELDS (HANYA MUNCUL JIKA KATEGORI TERPILIH)
       ======================================================================== */
    defineField({
      name: 'eventTheme',
      title: 'Tema Tabligh Akbar',
      type: 'string',
      group: 'kajian',
      description: 'Tema utama acara (Contoh: Meneladani Akhlak Rasulullah di Era Digital)',
      hidden: ({ document }) => document?.category !== 'tabligh-akbar',
    }),
    defineField({
      name: 'eventDate',
      title: 'Tanggal & Waktu Acara',
      type: 'datetime',
      group: 'kajian',
      description: 'Tentukan kapan acara akan dilaksanakan.',
      hidden: ({ document }) => document?.category !== 'tabligh-akbar',
    }),
    defineField({
      name: 'eventLocation',
      title: 'Lokasi Spesifik',
      type: 'string',
      group: 'kajian',
      placeholder: 'Contoh: Halaman Masjid Al-Falah / Aula PCM',
      hidden: ({ document }) => document?.category !== 'tabligh-akbar',
    }),
    defineField({
      name: 'eventSpeaker',
      title: 'Ustadz / Pembicara Utama',
      type: 'string',
      group: 'kajian',
      placeholder: 'Contoh: Ustadz Dr. Adi Hidayat, Lc., M.A.',
      hidden: ({ document }) => document?.category !== 'tabligh-akbar',
    }),

    /* --- SEKTOR UNDUHAN --- */
    defineField({
      name: 'downloadLink',
      title: 'Link Unduhan (Eksternal)',
      type: 'url',
      group: 'unduhan',
      hidden: ({ document }) => document?.category !== 'unduhan',
    }),
    defineField({
      name: 'fileSize',
      title: 'Keterangan File',
      type: 'string',
      group: 'unduhan',
      hidden: ({ document }) => document?.category !== 'unduhan',
    }),

    /* --- MEDIA & META --- */
    defineField({
      name: 'mainImage',
      title: 'Gambar Utama / Poster',
      type: 'image',
      group: 'konten',
      options: { hotspot: true },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Tanggal Posting',
      type: 'datetime',
      group: 'meta',
      initialValue: () => (new Date()).toISOString(),
    }),
    defineField({
      name: 'views',
      title: 'Views',
      type: 'number',
      group: 'meta',
      initialValue: 0,
    }),

    /* --- EDITOR KONTEN --- */
    defineField({
      name: 'body',
      title: 'Deskripsi / Detail Acara',
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