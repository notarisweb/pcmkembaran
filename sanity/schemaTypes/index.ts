import { type SchemaTypeDefinition } from 'sanity'
import post from './post' // Mengambil schema post yang sudah kita tambah kategori Khutbah & Dzikir

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    post, // Mendaftarkan schema post agar muncul sebagai menu di dashboard
  ],
}