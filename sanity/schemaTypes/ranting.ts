import { defineField, defineType } from 'sanity'
import { MapIcon } from '@sanity/icons'

export default defineType({
  name: 'ranting',
  title: 'Data Ranting (PRM)',
  type: 'document',
  icon: MapIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Ranting (PRM)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'leader',
      title: 'Ketua Ranting',
      type: 'string',
    }),
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
      title: 'Urutan',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'leader', media: 'image' },
  },
})