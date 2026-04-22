import { defineType, defineField } from 'sanity'
import { CalendarIcon } from '@sanity/icons'

export default defineType({
  name: 'jadwalKajian',
  title: 'Pusat Jadwal Kajian',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'tipe',
      title: 'Tipe Kajian',
      type: 'string',
      options: {
        list: [
          { title: 'Rutin (Mingguan)', value: 'rutin' },
          { title: 'Insidental (Tabligh Akbar/Selapanan)', value: 'insidental' },
        ],
        layout: 'radio',
      },
      initialValue: 'rutin',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hari',
      title: 'Hari Kajian (Untuk Rutin)',
      type: 'string',
      options: {
        list: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Ahad'],
      },
      hidden: ({ document }) => document?.tipe !== 'rutin', // Sembunyi jika bukan rutin
    }),
    defineField({
      name: 'tanggal',
      title: 'Tanggal Pelaksanaan (Untuk Insidental)',
      type: 'date',
      hidden: ({ document }) => document?.tipe !== 'insidental', // Sembunyi jika bukan insidental
    }),
    // ... field lainnya tetap sama (masjid, ustadz, waktu, tema, dll)
    defineField({
      name: 'masjid',
      title: 'Lokasi Masjid',
      type: 'reference',
      to: [{ type: 'masjid' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ustadz',
      title: 'Ustadz / Pemateri',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'waktu',
      title: 'Waktu (Contoh: 08.00 - Selesai)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tema',
      title: 'Tema Kajian',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
})