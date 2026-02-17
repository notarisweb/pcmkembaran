// sanity.config.ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { dashboardTool } from '@sanity/dashboard' 
import { projectInfoWidget } from '@sanity/dashboard-widget-project-info'
import { schema } from './sanity/schemaTypes'

// Impor semua widget kustom mencerahkan yang telah kita buat
import InstallCountWidget from './sanity/widgets/InstallCountWidget'
import LatestInstallsWidget from './sanity/widgets/LatestInstallsWidget'
import TopArticlesWidget from './sanity/widgets/TopArticlesWidget'

export default defineConfig({
  name: 'default',
  title: 'PCM Kembaran Studio',

  // Project ID PCM Kembaran resmi
  projectId: 'deyoeizv', 
  dataset: 'production',

  /**
   * basePath '/studio' wajib agar sinkron dengan routing Next.js.
   */
  basePath: '/studio', 

  plugins: [
    structureTool(), 
    
    dashboardTool({
      widgets: [
        /**
         * BARIS 1: Fokus pada Angka & Popularitas
         * Kita gunakan kombinasi 1/3 (small) dan 2/3 (medium) agar pas memenuhi satu baris.
         */
        {
          name: 'install-count',
          component: InstallCountWidget,
          layout: { width: 'small' } // Menempati 1/3 lebar layar
        },
        {
          name: 'top-articles',
          component: TopArticlesWidget,
          layout: { width: 'medium' } // Menempati 2/3 lebar layar agar judul artikel leluasa
        },

        /**
         * BARIS 2: Aktivitas Real-Time
         * Menggunakan lebar penuh agar daftar perangkat terlihat sangat jelas.
         */
        {
          name: 'latest-installs',
          component: LatestInstallsWidget,
          layout: { width: 'full' } // Lebar penuh untuk detail aktivitas jamaah
        },

        /**
         * BARIS 3: Informasi Teknis
         * Diletakkan di paling bawah sebagai referensi teknis proyek.
         */
        projectInfoWidget({ 
          layout: { width: 'full' } 
        }),
      ]
    })
  ],

  schema: {
    // Mengambil definisi konten (post, category, installations, dll)
    types: schema.types,
  },
})