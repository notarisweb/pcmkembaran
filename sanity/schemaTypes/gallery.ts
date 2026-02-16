import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Galeri Foto',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Kegiatan',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Foto Utama',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'date',
      title: 'Tanggal Kegiatan',
      type: 'date',
    }),
    defineField({
      name: 'caption',
      title: 'Keterangan Foto',
      type: 'text',
    }),
  ],
})