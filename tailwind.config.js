/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        palette: {
          ivory: '#F3F1EC',
          moss: '#B6B8A8',
          smoke: '#9FA3AD',
          garden: '#E0DFD2',
          midnight: '#3C3E4A',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        pixel: ['"Press Start 2P"', '"Silkscreen"', 'monospace'],
        gothic: ['"Cinzel Decorative"', '"UnifrakturMaguntia"', 'serif'],
        script: ['"Playball"', 'cursive'],
        mono: ['"Space Mono"', '"JetBrains Mono"', 'monospace'],
        outfit: ['"Outfit"', 'sans-serif'],
        korean: ['"Noto Sans KR"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
