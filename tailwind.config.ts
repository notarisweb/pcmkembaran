import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Wajib agar Bento Grid tidak polos
    "./sanity/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'pcm-blue': '#004a8e', // Biru PCM resmi
        'pcm-gold': '#ffc107', // Kuning Matahari PCM
      },
    },
  },
  plugins: [],
};
export default config;