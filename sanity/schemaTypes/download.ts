import { defineField, defineType } from 'sanity'
import { DownloadIcon } from '@sanity/icons'

export default defineType({
  name: 'download',
  title: 'Manajemen Unduhan',
  type: 'document',
  icon: DownloadIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Nama Dokumen',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori Dokumen',
      type: 'string',
      options: {
        list: [
          { title: 'Surat Keputusan (SK)', value: 'sk' },
          { title: 'Formulir Pendaftaran', value: 'formulir' },
          { title: 'Panduan & Edukasi', value: 'panduan' },
          { title: 'Laporan Organisasi', value: 'laporan' },
          { title: 'Lain-lain', value: 'lainnya' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'file',
      title: 'Unggah File',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx,.xls,.xlsx'
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Keterangan Singkat',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'order',
      title: 'Urutan',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category' },
  },
})