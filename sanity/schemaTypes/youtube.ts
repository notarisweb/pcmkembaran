import { defineType, defineField } from 'sanity'
import { PlayIcon } from '@sanity/icons'

export default defineType({
  name: 'youtube',
  type: 'object',
  title: 'YouTube Video',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'URL Video YouTube',
      description: 'Tempel link video dari browser (misal: https://www.youtube.com/watch?v=...)',
      validation: (Rule) => Rule.required().uri({
        scheme: ['http', 'https']
      })
    }),
    // Penambahan kolom caption agar label video tidak kaku (hardcoded)
    defineField({
      name: 'caption',
      type: 'string',
      title: 'Keterangan Video',
      description: 'Contoh: Video Dokumentasi Kegiatan PCM Kembaran',
      initialValue: 'Video Dokumentasi PCM Kembaran'
    })
  ],
  preview: {
    select: {
      url: 'url',
      caption: 'caption'
    },
    prepare(selection) {
      const { url, caption } = selection
      return {
        title: caption || 'Video YouTube', // Menampilkan caption sebagai judul di editor
        subtitle: url || 'Belum ada URL video',
        media: PlayIcon
      }
    },
  },
})