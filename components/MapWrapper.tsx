'use client'

import dynamic from 'next/dynamic'

// Kita panggil MissionaryMap asli dengan ssr: false agar tidak error di server-side
const MissionaryMap = dynamic(() => import("./MissionaryMap"), { 
  ssr: false,
  loading: () => (
    <div style={{ 
      height: '700px', // Konsisten dengan tinggi peta
      width: '100%',
      background: '#f8fafc', // Warna dasar Slate 50 (Terang & Bersih)
      borderRadius: '24px', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      border: '2px solid #e2e8f0', // Border abu-abu muda halus
      gap: '20px'
    }}>
      {/* Animasi Loading PCM Blue */}
      <div style={{
        width: '45px',
        height: '45px',
        border: '4px solid #e2e8f0',
        borderTop: '4px solid #004a8e', // Menggunakan Biru Utama PCM
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
      
      <div style={{ 
        color: '#004a8e', 
        fontFamily: 'sans-serif', 
        fontSize: '13px',
        letterSpacing: '1px',
        fontWeight: '900',
        textTransform: 'uppercase'
      }}>
        Menginisialisasi Peta Dakwah...
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
});

export default function MapWrapper({ rantings }: { rantings: any[] }) {
  // Wrapper ini memastikan Leaflet tidak dipanggil saat Pre-rendering di Server
  return (
    <div className="map-container-shadow" style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.05))' }}>
      <MissionaryMap rantings={rantings} />
    </div>
  );
}