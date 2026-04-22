import { type SchemaTypeDefinition } from 'sanity'
import post from './post'
import download from './download'
import gallery from './gallery'
import ranting from './ranting'
import masjid from './masjid'
import profile from './profile'
import pimpinan from './pimpinan' 
import installations from './installations' 
import youtube from './youtube'
// 1. Impor skema jadwalKajian yang baru
import jadwalKajian from './jadwalKajian' // <-- TAMBAHKAN INI

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
    youtube,       // Objek Youtube
    
    // 2. Registrasi skema Jadwal Kajian agar aktif
    jadwalKajian,  // <-- TAMBAHKAN DI SINI
  ],
}