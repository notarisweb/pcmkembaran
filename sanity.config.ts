// sanity.config.ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { dashboardTool } from '@sanity/dashboard' 
import { schema } from './sanity/schemaTypes'

// Impor widget kustom buatan kita (Lebih aman dari error NPM)
import InstallCountWidget from './sanity/widgets/InstallCountWidget'
import LatestInstallsWidget from './sanity/widgets/LatestInstallsWidget'
import TopArticlesWidget from './sanity/widgets/TopArticlesWidget'
import ProjectDetailsWidget from './sanity/widgets/ProjectDetailsWidget' // Widget pengganti yang error

export default defineConfig({
  name: 'default',
  title: 'PCM Kembaran Studio',

  projectId: 'deyoeizv', 
  dataset: 'production',
  basePath: '/studio', 

  plugins: [
    structureTool(), 
    
    dashboardTool({
      widgets: [
        /**
         * BARIS 1: Angka Statistik & Artikel Populer
         */
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

        /**
         * BARIS 2: Daftar Instalasi Terbaru (Lebar Penuh)
         */
        {
          name: 'latest-installs',
          component: LatestInstallsWidget,
          layout: { width: 'full' } 
        },

        /**
         * BARIS 3: Info Proyek Kustom (Pengganti projectInfoWidget)
         */
        {
          name: 'project-details',
          component: ProjectDetailsWidget,
          layout: { width: 'full' }
        }
      ]
    })
  ],

  schema: {
    types: schema.types,
  },
})