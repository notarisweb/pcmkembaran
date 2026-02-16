import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'masjid',
  title: 'Daftar Masjid',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Masjid',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Alamat Lengkap',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Foto Masjid',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Link Google Maps',
      type: 'url',
    }),
    defineField({
      name: 'facilities',
      title: 'Fasilitas Masjid',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Area Parkir', value: 'parkir' },
          { title: 'AC', value: 'ac' },
          { title: 'Perpustakaan', value: 'perpustakaan' },
        ],
      },
    }),
  ],
})