/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': "#01B7F7",
        'more':"#C6F0FE",
      },
      gridTemplateColumns:{
        'auto':'repeat(auto-fill, minmax(200px, 1fr))'
      },
      transitionDuration: {
        '30000': '30000ms',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-35px)' },
        },
        waveOut: {
          '0%': { transform: 'translateY(-35px)' },
          '100%': { transform: 'translateY(0px)' },
        },
      },
      animation: {
        wave: 'wave 3s infinite ease-in-out',
        waveOut: 'waveOut 1.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}
