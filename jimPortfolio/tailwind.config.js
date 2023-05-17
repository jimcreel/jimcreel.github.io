/** @type {import('tailwindcss').Config} */

  

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#cc2a49',
        secondary: '#f36f38',
        accent: '#f99e4c',
        black: '#582841',
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

