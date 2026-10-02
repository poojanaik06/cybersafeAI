/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        panel: '#0d172a',
        deep: '#071421',
        cyanish: '#67e8f9',
        greenish: '#34d399',
        warning: '#fbbf24',
        danger: '#f87171',
        primary: '#38bdf8'
      },
      boxShadow: {
        glow: '0 0 25px rgba(34,211,238,0.25)',
        panel: '0 20px 50px rgba(2,6,23,0.7)'
      }
    }
  },
  plugins: []
};
