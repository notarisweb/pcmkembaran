// sanity/schemaTypes/installations.ts

export default {
  name: 'installations',
  type: 'document',
  title: 'Data Penginstall App',
  // Properti readOnly memastikan data hanya bisa diisi lewat sistem (API), bukan diketik manual
  readOnly: true, 
  fields: [
    {
      name: 'deviceName',
      type: 'string',
      title: 'Nama Perangkat',
      description: 'Model HP atau browser yang digunakan jamaah'
    },
    {
      name: 'installedAt',
      type: 'datetime',
      title: 'Waktu Install',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'platform',
      type: 'string',
      title: 'Platform',
      options: {
        list: [
          { title: 'Android (TWA)', value: 'Android' },
          { title: 'PWA (Web)', value: 'PWA' },
        ],
      },
    },
  ],
}