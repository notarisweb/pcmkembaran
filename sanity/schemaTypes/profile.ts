import { defineField, defineType } from 'sanity'
import { InfoOutlineIcon } from '@sanity/icons'

export default defineType({
  name: 'profile',
  title: 'Profil Cabang',
  type: 'document',
  icon: InfoOutlineIcon,
  // Mengelompokkan bidang agar Studio lebih rapi
  fieldsets: [
    { name: 'identity', title: 'Identitas & Sejarah' },
    { name: 'visionMission', title: 'Visi & Misi' },
    { name: 'contact', title: 'Kontak & Lokasi' },
  ],
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo / Foto Kantor',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'identity',
    }),
    defineField({
      name: 'history',
      title: 'Sejarah Singkat',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Tuliskan sejarah berdirinya PCM Kembaran',
      fieldset: 'identity',
    }),
    defineField({
      name: 'vision',
      title: 'Visi',
      type: 'text',
      rows: 3,
      description: 'Visi utama PCM Kembaran',
      fieldset: 'visionMission',
    }),
    defineField({
      name: 'mission',
      title: 'Misi',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Daftar poin-poin misi (Klik "Add item" untuk menambah poin)',
      fieldset: 'visionMission',
    }),
    defineField({
      name: 'address',
      title: 'Alamat Kantor PCM',
      type: 'text',
      rows: 2,
      fieldset: 'contact',
    }),
    defineField({
      name: 'location',
      title: 'Titik Koordinat (Gmaps URL)',
      type: 'url',
      description: 'Tempelkan link berbagi dari Google Maps',
      fieldset: 'contact',
    }),
    defineField({
      name: 'phone',
      title: 'Nomor Telepon / WhatsApp',
      type: 'string',
      fieldset: 'contact',
    }),
    defineField({
      name: 'email',
      title: 'Email Resmi',
      type: 'string',
      fieldset: 'contact',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Pengaturan Profil Cabang',
        subtitle: 'Visi, Misi, dan Kontak PCM',
      }
    },
  },
})