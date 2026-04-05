/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0b1326',
        surface: '#0b1326',
        'surface-dim': '#0b1326',
        'surface-container-lowest': '#060e20',
        'surface-container-low': '#131b2e',
        'surface-container': '#171f33',
        'surface-container-high': '#222a3d',
        'surface-container-highest': '#2d3449',
        primary: '#c0c1ff',
        'primary-container': '#8083ff',
        'on-primary-fixed': '#07006c',
        'secondary-container': '#00a572',
        'on-secondary-fixed': '#002113',
        'tertiary-container': '#ff516a',
        'on-tertiary-fixed': '#40000d',
        'outline-variant': '#464554',
        'on-surface': '#dae2fd',
        'on-surface-variant': '#c7c4d7',
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 20px 40px -10px rgba(99, 102, 241, 0.2)',
      }
    },
  },
  plugins: [],
}
