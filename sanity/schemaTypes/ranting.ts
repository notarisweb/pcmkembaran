import { defineField, defineType } from 'sanity'
import { PinIcon } from '@sanity/icons'

export default defineType({
  name: 'ranting',
  title: 'Data Ranting (PRM)',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Ranting (PRM)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'establishedYear',
      title: 'Tahun Berdiri',
      type: 'string',
      description: 'Tahun peresmian atau berdirinya ranting (Contoh: 1975)',
    }),
    
    // --- STRUKTUR PIMPINAN ---
    defineField({
      name: 'leader',
      title: 'Ketua Ranting',
      type: 'string',
    }),
    defineField({
      name: 'nbm',
      title: 'NBM Ketua',
      type: 'string',
      description: 'Nomor Baku Muhammadiyah Ketua Ranting',
    }),
    defineField({
      name: 'secretary',
      title: 'Sekretaris Ranting',
      type: 'string',
    }),
    defineField({
      name: 'nbmSecretary',
      title: 'NBM Sekretaris',
      type: 'string',
    }),
    defineField({
      name: 'treasurer',
      title: 'Bendahara Ranting',
      type: 'string',
    }),
    defineField({
      name: 'nbmTreasurer',
      title: 'NBM Bendahara',
      type: 'string',
    }),

    // --- LOKASI & KONTAK ---
    defineField({
      name: 'latitude',
      title: 'Latitude',
      type: 'string',
      description: 'Contoh: -7.425678',
    }),
    defineField({
      name: 'longitude',
      title: 'Longitude',
      type: 'string',
      description: 'Contoh: 109.289123',
    }),
    defineField({
      name: 'address',
      title: 'Alamat / Wilayah',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'image',
      title: 'Foto Ranting',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Urutan Tampilan',
      type: 'number',
    }),
  ],
  preview: {
    select: { 
      title: 'name', 
      subtitle: 'leader', 
      media: 'image' 
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title,
        subtitle: subtitle ? `Ketua: ${subtitle}` : 'Ketua belum diisi',
        media: media,
      }
    },
  },
})