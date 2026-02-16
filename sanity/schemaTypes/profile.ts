import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'profile',
  title: 'Profil Cabang',
  type: 'document',
  fields: [
    defineField({
      name: 'history',
      title: 'Sejarah Singkat',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'vision',
      title: 'Visi',
      type: 'text',
      description: 'Visi PCM Kembaran',
    }),
    defineField({
      name: 'mission',
      title: 'Misi',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Daftar poin-poin misi',
    }),
    defineField({
      name: 'address',
      title: 'Alamat Kantor PCM',
      type: 'text',
    }),
    defineField({
      name: 'location',
      title: 'Titik Koordinat (Gmaps URL)',
      type: 'url',
    }),
    defineField({
      name: 'logo',
      title: 'Foto Kantor / Logo Khusus',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})