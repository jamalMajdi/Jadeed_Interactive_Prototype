/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        jadeed: {
          purple: '#5002c9',
          'purple-light': '#7d22ff',
          'purple-deep': '#43029f',
          tint: '#F1E9FF',
          orange: '#ff5715',
          'orange-light': '#ff872e',
          'orange-tint': '#FDECE5',
          yellow: '#ff911a',
          'yellow-dark': '#D97406',
          'yellow-tint': '#FFF3E0',
          red: '#E23A10',
          'red-tint': '#FDECE5',
          black: '#1d1a26',
          muted: '#6B677A',
          ghost: '#A6A1B3',
          line: '#E4E2EA',
          bg: '#F3F4F6',
          gray: '#EBEBEB',
        },
      },
      fontFamily: {
        tajawal: ['Tajawal', 'Cairo', 'IBM Plex Sans Arabic', 'Segoe UI', 'Tahoma', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 12px rgba(29,26,38,.06)',
        card: '0 6px 22px rgba(29,26,38,.10)',
        pop: '0 10px 26px rgba(80,2,201,.14)',
        phone: '0 42px 90px -28px rgba(80,2,201,.45), 0 14px 34px rgba(29,26,38,.16)',
      },
    },
  },
  plugins: [],
}
