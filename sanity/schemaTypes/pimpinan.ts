import { defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export default defineType({
  name: 'pimpinan',
  title: 'Pimpinan Cabang',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Lengkap',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nbm',
      title: 'NBM (Nomor Baku Muhammadiyah)',
      type: 'string',
      description: 'Masukkan nomor NBM resmi pimpinan (boleh dikosongkan jika belum ada)',
    }),
    defineField({
      name: 'position',
      title: 'Jabatan',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori Struktur',
      type: 'string',
      options: {
        list: [
          { title: 'Pimpinan Harian (PH)', value: 'harian' },
          { title: 'Majelis Tabligh', value: 'tabligh' },
          { title: 'Majelis Tarjih dan Tajdid', value: 'tarjih' },
          { title: 'Majelis Dikdasmen', value: 'dikdasmen' },
          { title: 'Majelis Ekonomi Kewirausahaan & UMKM', value: 'ekonomi' },
          { title: 'Majelis Pendayagunaan Wakaf & Kehartabendaan', value: 'wakaf' },
          { title: 'Majelis Kesehatan & Kesejahteraan Masyarakat (MKKM)', value: 'mkkm' },
          { title: 'Majelis Pemberdayaan Masyarakat (MPM)', value: 'mpm' },
          { title: 'Majelis Pembinaan Kader & Sumber Daya Insani', value: 'mpksdi' },
          { title: 'Lembaga Pengembangan & Pemberdayaan Ranting', value: 'lppr' },
          { title: 'Majelis Pustaka dan Informasi (MPI)', value: 'mpi' },
          { title: 'LAZISMU', value: 'lazismu' },
          { title: 'Lembaga Persaudaraan Haji Muhammadiyah (LPHM)', value: 'lphm' },
          { title: 'Lembaga Seni Budaya dan Olah Raga', value: 'lsbo' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Foto Pimpinan',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'whatsapp',
      title: 'Nomor WhatsApp',
      type: 'string',
      description: 'Format: 62812xxx',
    }),
    defineField({
      name: 'order',
      title: 'Urutan Tampil',
      type: 'number',
      description: 'Gunakan angka (1, 2, 3...) untuk mengatur urutan jabatan',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'position', media: 'photo' },
  },
})