import { type SchemaTypeDefinition } from 'sanity'
import post from './post'
import download from './download'
import gallery from './gallery'
import ranting from './ranting'
import masjid from './masjid'
import profile from './profile'
import pimpinan from './pimpinan' 
import installations from './installations' 
// 1. Impor skema youtube yang baru kita buat
import youtube from './youtube' // <-- TAMBAHKAN BARIS INI

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    post,          // Artikel/Berita
    profile,       // Profil PCM
    pimpinan,      // Struktur Pengurus
    ranting,       // Data Ranting
    masjid,        // Data Masjid
    gallery,       // Galeri Foto
    download,      // File Download
    installations, // Registrasi data aplikasi
    
    // 2. Registrasi objek youtube agar aktif di editor
    youtube,       // <-- TAMBAHKAN DI SINI
  ],
}