const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto-slab': ['"roboto-slab"', 'serif'],
      },
      boxShadow: {
        'right-thick': '5px 0 5px -3px rgba(0, 0, 0, 0.1), 5px 0 20px -5px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: theme => ({
        'gradient-bg': "linear-gradient(rgba(24, 29, 63, 0.8), rgba(56 55 47 / 0.87)), url('https://i.ytimg.com/vi/H-SEbyzIMYo/maxresdefault.jpg')",
        'gradient-bg2': "linear-gradient(to right, #5fa2ff4d, #ffc47163)" ,
        'gradient-bg3': "linear-gradient(rgba(155, 168, 255, 0.8), rgba(255, 250, 182, 0.55)), url('https://i.imgur.com/QAFH7gb.jpeg')",
        'card': "linear-gradient(rgba(255 255 255 / 0.92), rgba(186 186 222 / 0.55)), url('/public/images/card.png')",
        // 'card': "linear-gradient(rgba(255 255 255 / 0.92), rgba(208 208 230 / 0.55)), url('/public/images/card.png')",
      }),
      backgroundSize: {
        'cover': 'cover',
      },
      backgroundRepeat: {
        'no-repeat': 'no-repeat',
      },
      colors: {
        'blue': '#426f8c',
        'white2': '#e8e8e8',
        'white3': '#828282',
        'lightyellow': '#f5e293',
        'yellow': '#d8b638',
        'weakred': '#79251c',
        'dark1': '#202020',
        'dark2': '#1e2a47',
        'dark22': '#2f3e60',
        'dark3': '#141e35',
        'whitey': '#e6eaebe0',
        "nucolor1" : "#35408e",
        "nucolor2" : "#f5e293",
        "nucolor3" : "#d8b638",
        "nucolor4" : "#222a62",
        "nucolor5" : "#29337d",
        "nucolor6" : "#424c9b",
        "nucolor7" : "#525db3",
      },
      screens: {
        'sm': '646px',
      },
      keyframes: {
        shine: {
          '0%': { transform: 'translateX(-100%)', opacity: '0.5' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
      },
      animation: {
        shine: 'shine 1s linear',
      },
    }
  },
  plugins: [
    require('daisyui'),
    flowbite.plugin(),
  ],
}