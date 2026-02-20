import { type SchemaTypeDefinition } from 'sanity'
import post from './post'
import download from './download'
import gallery from './gallery'
import ranting from './ranting'
import masjid from './masjid'
import profile from './profile'
// 1. Impor skema pimpinan sebagai pengganti board
import pimpinan from './pimpinan' 
import installations from './installations' 

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    post,          // Artikel/Berita
    profile,       // Profil PCM
    pimpinan,      // Struktur Pengurus (Pengganti board)
    ranting,       // Data Ranting
    masjid,        // Data Masjid
    gallery,       // Galeri Foto
    download,      // File Download
    
    // 2. Registrasi data aplikasi
    installations, 
  ],
}