/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      colors : {
        "magic-color" : "#d61000",
        "magic-color2" : "#4c2c1e",
      },
      fontFamily: {
        inter: ['Inter var', 'sans-serif'],
      },
      boxShadow: {
        card: '0 0 1px 0 rgba(189,192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.2)',
        cardhover: '0 0 1px 0 rgba(189,192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.4)',
      },
    },
  },
  plugins: [],
};