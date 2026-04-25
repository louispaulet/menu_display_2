import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#252019',
        parchment: '#f7f1e8',
        linen: '#fffaf3',
        clay: '#a95638',
        saffron: '#c4903f',
        olive: '#5f6a4a',
      },
      boxShadow: {
        editorial: '0 22px 60px rgba(55, 38, 19, 0.12)',
        card: '0 12px 32px rgba(55, 38, 19, 0.08)',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        playfair: ['Playfair', 'serif'],
      },
    },
  },
  plugins: [
    typography,
  ],
}
