export default {
  name: 'post',
  title: 'Konten Utama',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Judul Konten',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Kategori Konten',
      type: 'string',
      options: {
        list: [
          { title: 'Berita', value: 'berita' },
          { title: 'Artikel', value: 'artikel' },
          { title: "Tafsir Al-Qur'an", value: 'tafsir' },
          { title: 'Hadits Pilihan', value: 'hadits' },
          { title: 'Fiqih Praktis', value: 'fiqih' },
          { title: 'Mutiara Hikmah', value: 'hikmah' },
          // Tambahan Rubrik Baru
          { title: 'Khutbah', value: 'khutbah' },
          { title: 'Dzikir & Doa', value: 'dzikir-doa' },
        ],
        layout: 'dropdown', 
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'mainImage',
      title: 'Gambar Utama',
      type: 'image',
      options: {
        hotspot: true, 
      },
    },
    {
      name: 'publishedAt',
      title: 'Tanggal Terbit',
      type: 'datetime',
      initialValue: (new Date()).toISOString(),
    },
    {
      name: 'body',
      title: 'Isi Konten',
      type: 'array',
      of: [{ type: 'block' }], 
    },
  ],
}