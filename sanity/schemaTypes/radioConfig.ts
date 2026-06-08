import { Rule } from 'sanity'

export default {
  name: 'radioConfig',
  title: 'Konfigurasi Radio & Live',
  type: 'document',
  icon: () => '📻',
  fieldsets: [
    {
      name: 'stationMetadata',
      title: 'Metadata Stasiun Utama',
      options: { collapsible: true, collapsed: false }
    },
    {
      name: 'broadcastingManagement',
      title: 'Sistem Otomatisasi Jadwal & Acara',
      options: { collapsible: false }
    }
  ],
  fields: [
    // =========================================================================
    // FIELDSET 1: METADATA UTAMA STASIUN
    // =========================================================================
    {
      name: 'radioName',
      title: 'Nama Stasiun Radio',
      type: 'string',
      fieldset: 'stationMetadata',
      initialValue: 'Radio Suara Berkemajuan',
      validation: (rule: Rule) => rule.required().min(3).max(50),
    },
    {
      name: 'stationTagline',
      title: 'Slogan / Tagline Radio',
      type: 'string',
      fieldset: 'stationMetadata',
      initialValue: 'Muhammadiyah Islamic Broadcast',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'fallbackThumbnail',
      title: 'Cover Art Default (Fallback)',
      description: 'Gambar banner yang muncul di player jika acara tidak memiliki thumbnail khusus.',
      type: 'image',
      fieldset: 'stationMetadata',
      options: { hotspot: true },
    },

    // =========================================================================
    // FIELDSET 2: SISTEM JADWAL TUNGGAL 24 JAM & MINGGUAN
    // =========================================================================
    {
      name: 'schedules',
      title: 'Rangkaian Jadwal Siaran 24 Jam',
      description: 'Susun daftar rangkaian acara harian berdasarkan alokasi waktu jam aktif di bawah ini.',
      fieldset: 'broadcastingManagement',
      type: 'array',
      validation: (rule: Rule) => rule.required().min(1).error('Minimal harus ada 1 jadwal siaran aktif.'),
      of: [
        {
          type: 'object',
          name: 'radioSchedule',
          title: 'Blok Jadwal Siaran',
          icon: () => '🕒',
          fields: [
            {
              name: 'day',
              title: 'Hari Siaran',
              type: 'string',
              description: 'Pilih hari spesifik untuk jadwal ini. Pilih "Setiap Hari" jika rutin tayang tiap hari.',
              options: {
                list: [
                  { title: '🔄 Setiap Hari', value: 'everyday' },
                  { title: 'Senin', value: 'Monday' },
                  { title: 'Selasa', value: 'Tuesday' },
                  { title: 'Rabu', value: 'Wednesday' },
                  { title: 'Kamis', value: 'Thursday' },
                  { title: 'Jumat', value: 'Friday' },
                  { title: 'Sabtu', value: 'Saturday' },
                  { title: 'Minggu', value: 'Sunday' },
                ],
              },
              initialValue: 'everyday',
              validation: (rule: Rule) => rule.required().error('Hari siaran wajib ditentukan.'),
            },
            {
              name: 'eventName',
              title: 'Nama Acara / Kajian',
              type: 'string',
              validation: (rule: Rule) => rule.required(),
            },
            {
              name: 'startTime',
              title: 'Jam Mulai (Format HH:MM)',
              type: 'string',
              description: 'Contoh: 04:30, 09:00, 18:15',
              validation: (rule: Rule) => rule.required().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { name: 'HH:MM format' }),
            },
            {
              name: 'endTime',
              title: 'Jam Selesai (Format HH:MM)',
              type: 'string',
              description: 'Contoh: 06:00, 11:30, 19:30',
              validation: (rule: Rule) => rule.required().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { name: 'HH:MM format' }),
            },
            {
              name: 'broadcastMode',
              title: 'Mode Siaran Jam Ini',
              type: 'string',
              options: {
                list: [
                  { title: '🎥 Live YouTube', value: 'youtube_live' },
                  { title: '🎵 Playlist MP3 Internal', value: 'playlist_mp3' },
                ],
                layout: 'radio',
              },
              validation: (rule: Rule) => rule.required(),
            },
            {
              name: 'youtubeVideoId',
              title: 'YouTube Video ID',
              type: 'string',
              description: 'Masukkan ID video saja (Contoh: dQw4w9WgXcQ)',
              hidden: ({ parent }: any) => parent?.broadcastMode !== 'youtube_live',
            },
            {
              name: 'playlist',
              title: 'Daftar File MP3 (Playlist)',
              type: 'array',
              hidden: ({ parent }: any) => parent?.broadcastMode !== 'playlist_mp3',
              of: [
                {
                  type: 'object',
                  name: 'track',
                  title: 'Track Audio',
                  icon: () => '🎵',
                  fields: [
                    { name: 'trackTitle', title: 'Judul Audio', type: 'string', validation: (rule: Rule) => rule.required() },
                    { name: 'speaker', title: 'Narasumber / Pengisi', type: 'string' },
                    { 
                      name: 'audioFile', 
                      title: 'Upload File MP3', 
                      type: 'file',
                      options: { accept: 'audio/mp3, audio/mpeg' },
                      validation: (rule: Rule) => rule.required()
                    },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'eventName',
              start: 'startTime',
              end: 'endTime',
              mode: 'broadcastMode',
              daySelected: 'day',
            },
            prepare(selection: any) {
              const { title, start, end, mode, daySelected } = selection
              const modeLabel = mode === 'youtube_live' ? '🎥 YT Live' : '🎵 MP3 Playlist'
              
              const dayLabels: Record<string, string> = {
                everyday: 'Setiap Hari',
                Monday: 'Senin',
                Tuesday: 'Selasa',
                Wednesday: 'Rabu',
                Thursday: 'Kamis',
                Friday: 'Jumat',
                Saturday: 'Sabtu',
                Sunday: 'Minggu'
              }
              const activeDay = dayLabels[daySelected || 'everyday'] || 'Setiap Hari'

              return {
                title: title || 'Acara Tanpa Nama',
                subtitle: `📅 [${activeDay}] 🕒 ${start || '00:00'} - ${end || '00:00'} | ${modeLabel}`,
              }
            },
          },
        },
      ],
    },
  ],
}