/** @type {import('tailwindcss').Config} */

  

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#562b08',
        secondary: '#647e68',
        accent: '#d8d8d8',
        black: '#182747',
        },
      fontFamily: {
        'bold': ['Roboto Slab', 'serif'],
        'serif': ['Merriweather', 'serif'],
        'sans': ['Open Sans', 'sans-serif'],
    },
  },
  plugins: [],
}
}

