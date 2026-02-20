import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { dashboardTool } from '@sanity/dashboard' 
import { schema } from './sanity/schemaTypes'

// Impor widget kustom (Tetap dipertahankan sesuai kebutuhan Anda)
import InstallCountWidget from './sanity/widgets/InstallCountWidget'
import LatestInstallsWidget from './sanity/widgets/LatestInstallsWidget'
import TopArticlesWidget from './sanity/widgets/TopArticlesWidget'
import ProjectDetailsWidget from './sanity/widgets/ProjectDetailsWidget'

export default defineConfig({
  name: 'default',
  title: 'PCM Kembaran Studio',

  projectId: 'deyoeizv', 
  dataset: 'production',
  basePath: '/studio', 

  plugins: [
    // 1. KONFIGURASI STRUKTUR MENU (Membasmi sisa-sisa 'board')
    structureTool({
      structure: (S) =>
        S.list()
          .title('Konten Utama')
          .items([
            // Menu Berita & Artikel
            S.documentTypeListItem('post').title('Berita & Artikel'),
            
            // Menu Profil
            S.documentTypeListItem('profile').title('Profil Cabang'),
            
            // PENGGANTI BOARD: Sekarang menggunakan 'pimpinan'
            S.documentTypeListItem('pimpinan').title('Pimpinan Cabang (PCM)'),
            
            S.divider(), // Garis pemisah agar rapi
            
            // Menu Ranting & Fasilitas
            S.documentTypeListItem('ranting').title('Data Ranting (PRM)'),
            S.documentTypeListItem('masjid').title('Daftar Masjid'),
            
            S.divider(),
            
            // Menu Media & File
            S.documentTypeListItem('gallery').title('Galeri Foto'),
            S.documentTypeListItem('download').title('Manajemen Unduhan'),
            
            // Otomatis memunculkan tipe lain yang mungkin ada (seperti installations)
            ...S.documentTypeListItems().filter(
              (listItem) => !['post', 'profile', 'pimpinan', 'ranting', 'masjid', 'gallery', 'download'].includes(listItem.getId() as string)
            ),
          ]),
    }),
    
    // 2. KONFIGURASI DASHBOARD WIDGETS
    dashboardTool({
      widgets: [
        {
          name: 'install-count',
          component: InstallCountWidget,
          layout: { width: 'small' } 
        },
        {
          name: 'top-articles',
          component: TopArticlesWidget,
          layout: { width: 'medium' } 
        },
        {
          name: 'latest-installs',
          component: LatestInstallsWidget,
          layout: { width: 'full' } 
        },
        {
          name: 'project-details',
          component: ProjectDetailsWidget,
          layout: { width: 'full' }
        }
      ]
    })
  ],

  schema: {
    // Mengambil tipe dari index.ts yang sudah Anda update (tanpa board)
    types: schema.types,
  },
})