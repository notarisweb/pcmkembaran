import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ranting',
  title: 'Data Ranting (PRM)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Ranting',
      type: 'string',
      placeholder: 'Contoh: PRM Kembaran',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
    }),
    defineField({
      name: 'address',
      title: 'Alamat Kantor',
      type: 'text',
    }),
    defineField({
      name: 'phone',
      title: 'Nomor HP/WA Pengurus',
      type: 'string',
    }),
    defineField({
      name: 'boardMembers',
      title: 'Susunan Pengurus Ranting',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Nama Lengkap', type: 'string' },
            { 
              name: 'position', 
              title: 'Jabatan', 
              type: 'string', 
              options: { list: ['Ketua', 'Sekretaris', 'Bendahara', 'Anggota'] } 
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'aumList',
      title: 'Daftar AUM',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'aumName', title: 'Nama AUM', type: 'string' },
            { 
              name: 'aumCategory', 
              title: 'Jenis AUM', 
              type: 'string', 
              options: { list: ['Pendidikan', 'Kesehatan', 'Sosial', 'Ekonomi'] } 
            },
          ],
        },
      ],
    }),
  ],
})