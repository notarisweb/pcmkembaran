import { type SchemaTypeDefinition } from 'sanity'
import post from './post'
import download from './download'
import gallery from './gallery'
import ranting from './ranting'
import masjid from './masjid'
import profile from './profile'
import board from './board'
// 1. Impor skema installations yang mencatat data aplikasi
import installations from './installations' 

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    post,        // Artikel/Berita
    profile,     // Profil PCM
    board,       // Struktur Pengurus
    ranting,     // Data Ranting
    masjid,      // Data Masjid
    gallery,     // Galeri Foto
    download,    // File Download
    
    // 2. Daftarkan skema installations agar data terbaca di Dashboard
    installations, 
  ],
}