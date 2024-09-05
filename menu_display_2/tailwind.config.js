/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        playfair: ['Playfair', 'serif'],
      },
    },
  },
  plugins: [
      require('@tailwindcss/typography'),
  ],
}

