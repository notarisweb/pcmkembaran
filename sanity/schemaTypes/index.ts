import { type SchemaTypeDefinition } from 'sanity'
import post from './post'
import download from './download'
import gallery from './gallery'
import ranting from './ranting'
import masjid from './masjid'
// Import skema baru
import profile from './profile'
import board from './board'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    post,
    profile, // Tambahkan ini
    board,   // Tambahkan ini
    ranting,
    masjid,
    gallery,
    download,
  ],
}