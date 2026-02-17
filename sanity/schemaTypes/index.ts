import { type SchemaTypeDefinition } from 'sanity'
import post from './post'
import download from './download'
import gallery from './gallery'
import ranting from './ranting'
import masjid from './masjid'
import profile from './profile'
import board from './board'
// 1. Impor skema installations yang baru dibuat
import installations from './installations' 

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    post,
    profile,
    board,
    ranting,
    masjid,
    gallery,
    download,
    // 2. Daftarkan skema installations di sini
    installations, 
  ],
}