/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        secondaryColor: '#FBC7C7',
        tertiaryColor: '#B4B4B4',
        mainColor: '#ED1E1E',
        innerBackground: '#888',
      },
      boxShadow: {
        cardHomeShadow: '0px 2px 4px rgba(186, 186, 186, 0.4)',
      },
    },
  },
  plugins: [],
}

