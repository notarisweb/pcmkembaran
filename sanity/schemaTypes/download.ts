import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'download',
  title: 'Manajemen Unduhan',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nama File / Judul',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Keterangan Singkat',
      type: 'text',
    }),
    defineField({
      name: 'file',
      title: 'Upload File',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx,.xls,.xlsx',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori Unduhan',
      type: 'string',
      options: {
        list: [
          { title: 'Edaran Organisasi', value: 'edaran' },
          { title: 'Materi Pengajian', value: 'materi' },
          { title: 'Buku Saku', value: 'buku-saku' },
        ],
      },
    }),
  ],
})