import { defineField, defineType } from 'sanity'
import { InfoOutlineIcon } from '@sanity/icons'

export default defineType({
  name: 'profile',
  title: 'Profil Cabang',
  type: 'document',
  icon: InfoOutlineIcon,
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
      fieldset: 'identity',
    }),
    defineField({
      name: 'vision',
      title: 'Visi',
      type: 'text',
      rows: 3,
      fieldset: 'visionMission',
    }),
    defineField({
      name: 'mission',
      title: 'Misi',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Daftar poin misi (Klik "Add item")',
      fieldset: 'visionMission',
    }),
    defineField({
      name: 'address',
      title: 'Alamat Kantor PCM',
      type: 'text',
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
})