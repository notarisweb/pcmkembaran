// sanity.config.ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

/** * PERBAIKAN: Nama folder kamu adalah 'schemaTypes', bukan 'schema'.
 * Pastikan path ini benar (gunakan './sanity/schemaTypes' jika file ini di luar folder sanity)
 */
import { schema } from './sanity/schemaTypes' 

export default defineConfig({
  name: 'default',
  title: 'PCM Kembaran Studio',

  // Ganti dengan Project ID asli dari dashboard sanity.io kamu
  projectId: 'deyoeizv', 
  dataset: 'production',

  /**
   * WAJIB: Harus '/studio' agar sinkron dengan folder app/studio di Next.js.
   * Ini akan menghilangkan error "Tool not found" yang muncul sebelumnya.
   */
  basePath: '/studio', 

  plugins: [structureTool()],

  schema: {
    // Mengambil array 'types' yang sudah kita ekspor di index.ts
    types: schema.types,
  },
})