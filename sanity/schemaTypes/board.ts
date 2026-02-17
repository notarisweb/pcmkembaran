import { defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export default defineType({
  name: 'board',
  title: 'Pimpinan Cabang (PCM)',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Lengkap',
      type: 'string',
      validation: (Rule) => Rule.required().error('Nama harus diisi'),
    }),
    // PENAMBAHAN FIELD NBM
    defineField({
      name: 'nbm',
      title: 'NBM (Nomor Baku Muhammadiyah)',
      type: 'string',
      description: 'Masukkan nomor kartu anggota Muhammadiyah',
      placeholder: 'Contoh: 1234567',
    }),
    defineField({
      name: 'position',
      title: 'Jabatan',
      type: 'string',
      options: {
        list: [
          { title: 'Ketua', value: 'Ketua' },
          { title: 'Wakil Ketua', value: 'Wakil Ketua' },
          { title: 'Sekretaris', value: 'Sekretaris' },
          { title: 'Wakil Sekretaris', value: 'Wakil Sekretaris' },
          { title: 'Bendahara', value: 'Bendahara' },
          { title: 'Wakil Bendahara', value: 'Wakil Bendahara' },
          { title: 'Anggota Pimpinan', value: 'Anggota Pimpinan' },
          { title: 'Penasehat', value: 'Penasehat' },
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
    }),
    defineField({
      name: 'order',
      title: 'Urutan Tampilan',
      type: 'number',
      description: 'Ketua = 1, Sekretaris = 2, dst',
      initialValue: 10,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      nbm: 'nbm', // Tambahkan nbm ke preview
      media: 'photo',
    },
    prepare(selection) {
      const { title, subtitle, nbm, media } = selection
      return {
        title: title,
        // Menampilkan Jabatan dan NBM di sidebar Studio
        subtitle: `${subtitle} ${nbm ? `| NBM: ${nbm}` : ''}`,
        media: media,
      }
    },
  },
})