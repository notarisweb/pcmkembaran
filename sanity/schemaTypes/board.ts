import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'board',
  title: 'Pimpinan Cabang (PCM)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Lengkap',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Jabatan',
      type: 'string',
      options: {
        list: [
          { title: 'Ketua', value: 'ketua' },
          { title: 'Wakil Ketua', value: 'wakil-ketua' },
          { title: 'Sekretaris', value: 'sekretaris' },
          { title: 'Wakil Sekretaris', value: 'wakil-sekretaris' },
          { title: 'Bendahara', value: 'bendahara' },
          { title: 'Wakil Bendahara', value: 'wakil-bendahara' },
          { title: 'Anggota Pimpinan', value: 'anggota' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Foto Profil',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'period',
      title: 'Masa Jabatan / Periode',
      type: 'string',
      initialValue: '2022 - 2027',
      placeholder: 'Contoh: 2022 - 2027',
    }),
    defineField({
      name: 'order',
      title: 'Urutan Tampilan',
      type: 'number',
      description: 'Angka kecil akan tampil lebih dulu (misal: Ketua = 1)',
    }),
  ],
})