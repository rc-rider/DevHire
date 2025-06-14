/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary': "#01B7F7",
        'more':"#C6F0FE"
      }
    },
  },
  plugins: [],
}