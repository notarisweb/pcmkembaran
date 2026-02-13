import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schema } from './sanity/schemaTypes'; // Mengarah ke index.ts di schemaTypes

export default defineConfig({
  name: 'default',
  title: 'Abah Saif Studio', // Nama yang akan muncul di dashboard

  projectId: 'v9y48nrd', // Project ID Anda
  dataset: 'production',    // Nama dataset Anda

  basePath: '/studio',      // URL akses dashboard (abahsaif.web.id/studio)

  plugins: [
    structureTool(),        // Untuk mengatur struktur menu di kiri
    visionTool(),           // Tool untuk ngetes query GROQ langsung di dashboard
  ],

  schema: {
    types: schema.types,    // Mengambil daftar schema (post.ts) yang sudah didaftarkan
  },
});