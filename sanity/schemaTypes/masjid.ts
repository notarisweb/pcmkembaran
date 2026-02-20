import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export default defineType({
  name: 'masjid',
  title: 'Data Masjid',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Masjid',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Alamat Lengkap',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Foto Masjid',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'locationUrl',
      title: 'Link Google Maps',
      type: 'url',
      description: 'Tempelkan link "Share" dari Google Maps di sini',
    }),
    defineField({
      name: 'order',
      title: 'Urutan Tampil',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'address', media: 'image' },
  },
})