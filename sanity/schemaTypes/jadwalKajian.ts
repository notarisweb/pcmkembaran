import { defineType, defineField } from 'sanity'
import { CalendarIcon, ImageIcon } from '@sanity/icons'

export default defineType({
  name: 'jadwalKajian',
  title: 'Pusat Jadwal Kajian',
  type: 'document',
  icon: CalendarIcon,
  // Mengelompokkan field agar UI rapi dan intuitif
  groups: [
    { name: 'waktu', title: 'Konfigurasi Waktu' },
    { name: 'detail', title: 'Detail Kajian' },
    { name: 'meta', title: 'Media & Publikasi' },
  ],
  fields: [
    /* --- 1. IDENTITAS UTAMA --- */
    defineField({
      name: 'tema',
      title: 'Tema Kajian (Judul)',
      type: 'string',
      group: 'detail',
      placeholder: 'Contoh: Hati Yang Terbelenggu',
      validation: (Rule) => Rule.required().error('Tema wajib diisi untuk judul postingan.'),
    }),

    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'meta',
      options: { 
        source: 'tema', 
        maxLength: 96 
      },
      validation: (Rule) => Rule.required(),
    }),

    /* --- 2. PENGATURAN WAKTU & TIPE --- */
    defineField({
      name: 'tipe',
      title: 'Tipe Kajian',
      type: 'string',
      group: 'waktu',
      options: {
        list: [
          { title: 'Rutin (Mingguan/Bulanan)', value: 'rutin' },
          { title: 'Insidental (Tabligh Akbar/Selapanan)', value: 'insidental' },
        ],
        layout: 'radio',
      },
      initialValue: 'rutin',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'hari',
      title: 'Hari Kajian',
      type: 'string',
      group: 'waktu',
      options: {
        list: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Ahad'],
      },
      hidden: ({ document }) => document?.tipe !== 'rutin',
    }),

    defineField({
      name: 'pekan',
      title: 'Pekan Ke-',
      description: 'Kosongkan jika SETIAP PEKAN. Pilih angka untuk ustadz bergilir.',
      type: 'array',
      group: 'waktu',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Pekan 1', value: '1' },
          { title: 'Pekan 2', value: '2' },
          { title: 'Pekan 3', value: '3' },
          { title: 'Pekan 4', value: '4' },
          { title: 'Pekan 5', value: '5' },
        ],
        layout: 'grid',
      },
      hidden: ({ document }) => document?.tipe !== 'rutin',
    }),

    defineField({
      name: 'tanggal',
      title: 'Tanggal Pelaksanaan',
      type: 'date',
      group: 'waktu',
      description: 'Khusus untuk Tabligh Akbar / Acara Sekali Jalan.',
      hidden: ({ document }) => document?.tipe !== 'insidental',
    }),

    /* --- 3. DETAIL PEMATERI & LOKASI --- */
    defineField({
      name: 'ustadz',
      title: 'Ustadz / Pemateri',
      type: 'string',
      group: 'detail',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'masjid',
      title: 'Lokasi Masjid',
      type: 'reference',
      group: 'detail',
      to: [{ type: 'masjid' }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'waktu',
      title: 'Waktu / Jam',
      type: 'string',
      group: 'detail',
      placeholder: 'Ba\'da Maghrib - Selesai',
      validation: (Rule) => Rule.required(),
    }),

    /* --- 4. MEDIA (DUAL-MODE FLYER) --- */
    defineField({
      name: 'flyerImage',
      title: 'Upload Flyer Resmi (Custom)',
      type: 'image',
      group: 'meta',
      description: 'Jika ada flyer desain sendiri, upload di sini. Ini akan menggantikan flyer otomatis.',
      options: { hotspot: true },
    }),

    defineField({
      name: 'mainImage',
      title: 'Thumbnail / Cover Berita',
      type: 'image',
      group: 'meta',
      description: 'Gambar ini muncul di daftar berita homepage jika Flyer Resmi kosong.',
      options: { hotspot: true },
    }),

    defineField({
      name: 'publishedAt',
      title: 'Tanggal Publikasi',
      type: 'datetime',
      group: 'meta',
      initialValue: () => (new Date()).toISOString(),
    }),

    defineField({
      name: 'keterangan',
      title: 'Keterangan Tambahan',
      type: 'text',
      group: 'detail',
      rows: 3,
    }),
  ],

  /* --- 🚀 PREVIEW LOGIC (SINKRONISASI SIDEBAR) --- */
  preview: {
    select: {
      title: 'tema',
      ustadz: 'ustadz',
      tipe: 'tipe',
      hari: 'hari',
      tanggal: 'tanggal',
      flyer: 'flyerImage',
      thumb: 'mainImage'
    },
    prepare(selection) {
      const { title, ustadz, tipe, hari, tanggal, flyer, thumb } = selection
      const detailWaktu = tipe === 'rutin' ? `Rutin: ${hari}` : `Insidental: ${tanggal}`
      
      return {
        title: title || 'Untitled Tema',
        subtitle: `${ustadz} | ${detailWaktu}`,
        // Menampilkan thumbnail flyer di sidebar jika ada
        media: flyer || thumb || CalendarIcon
      }
    }
  }
})