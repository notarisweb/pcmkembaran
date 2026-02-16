export default {
  name: 'post',
  title: 'Konten Utama',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Judul Konten',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Kategori Konten',
      type: 'string',
      options: {
        list: [
          { title: 'Berita', value: 'berita' },
          { title: 'Artikel', value: 'artikel' },
          { title: 'Liputan Dakwah', value: 'liputan-dakwah' },
          { title: 'Pendidikan', value: 'pendidikan' },
          { title: 'Video', value: 'video' },
          { title: 'Bisnis', value: 'bisnis' },
          { title: 'Tokoh & Inspirasi', value: 'tokoh-inspirasi' },
          { title: 'Teknologi', value: 'teknologi' },
          { title: 'Kesehatan', value: 'kesehatan' },
          { title: 'Unduhan', value: 'unduhan' },
          { title: "Tafsir Al-Qur'an", value: 'tafsir' },
          { title: 'Hadits Pilihan', value: 'hadits' },
          { title: 'Fiqih Praktis', value: 'fiqih' },
        ],
        layout: 'dropdown', 
      },
      validation: (Rule) => Rule.required(),
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
      initialValue: () => (new Date()).toISOString(),
    },
    /* --- FITUR TAMBAHAN: JUMLAH PEMBACA (EDITABLE) --- */
    {
      name: 'views',
      title: 'Jumlah Pembaca (Views)',
      type: 'number',
      description: 'Admin bisa mengisi atau mengubah angka ini agar tampilan views terlihat keren di website.',
      initialValue: 0,
    },
    /* ------------------------------------------------ */
    {
      name: 'body',
      title: 'Isi Konten',
      type: 'array',
      of: [
        { 
          type: 'block' 
        },
        {
          type: 'image',
          options: { hotspot: true },
        }
      ], 
    },
  ],
}