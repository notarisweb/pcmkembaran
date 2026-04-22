import { defineType, defineField } from 'sanity'
import { CalendarIcon } from '@sanity/icons'

export default defineType({
  name: 'jadwalKajian',
  title: 'Jadwal Kajian Rutin',
  type: 'document',
  icon: CalendarIcon,
  groups: [
    { name: 'utama', title: 'Info Kajian' },
    { name: 'lokasi', title: 'Lokasi & Waktu' },
  ],
  fields: [
    defineField({
      name: 'masjid',
      title: 'Pilih Masjid',
      type: 'reference',
      to: [{ type: 'masjid' }],
      group: 'lokasi',
      validation: (Rule) => Rule.required().error('Masjid harus dipilih untuk lokasi kajian.'),
    }),
    defineField({
      name: 'hari',
      title: 'Hari Kajian',
      type: 'string',
      group: 'utama',
      options: {
        list: [
          { title: 'Senin', value: 'Senin' },
          { title: 'Selasa', value: 'Selasa' },
          { title: 'Rabu', value: 'Rabu' },
          { title: 'Kamis', value: 'Kamis' },
          { title: 'Jumat', value: 'Jumat' },
          { title: 'Sabtu', value: 'Sabtu' },
          { title: 'Ahad', value: 'Ahad' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ustadz',
      title: 'Nama Ustadz / Pembimbing',
      type: 'string',
      group: 'utama',
      placeholder: 'Contoh: Ustadz Fulan bin Fulan',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'waktu',
      title: 'Waktu Kajian',
      type: 'string',
      group: 'lokasi',
      placeholder: 'Contoh: Ba\'da Maghrib - Selesai',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tema',
      title: 'Tema / Nama Kitab',
      type: 'string',
      group: 'utama',
      placeholder: 'Contoh: Kitab Riyadhus Shalihin',
    }),
    defineField({
      name: 'keterangan',
      title: 'Keterangan Tambahan',
      type: 'text',
      group: 'utama',
      description: 'Misal: Khusus Muslimah, atau Terbuka untuk Umum',
    }),
  ],
  preview: {
    select: {
      title: 'tema',
      subtitle: 'hari',
      ustadz: 'ustadz',
      masjid: 'masjid.name',
    },
    prepare({ title, subtitle, ustadz, masjid }) {
      return {
        title: title || `Kajian Bersama ${ustadz}`,
        subtitle: `${subtitle} | ${masjid || 'Masjid Belum Dipilih'}`,
      }
    },
  },
})