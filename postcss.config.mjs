/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // PERBAIKAN: Gunakan paket baru untuk Tailwind v4
    '@tailwindcss/postcss': {}, 
    autoprefixer: {},
  },
};

export default config;