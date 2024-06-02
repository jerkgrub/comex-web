/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'gradient-bg': "linear-gradient(rgba(24, 29, 63, 0.8), rgba(65, 62, 205, 0.8)), url('https://i.ytimg.com/vi/H-SEbyzIMYo/maxresdefault.jpg')",
        'gradient-bg2': "linear-gradient(to right, #5fa2ff4d, #ffc47163)" ,
        'gradient-bg3': "linear-gradient(rgba(155, 168, 255, 0.8), rgba(255, 250, 182, 0.55)), url('https://i.imgur.com/QAFH7gb.jpeg')",
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
        // 'sm': '1263px',
      }
    }
  },
  plugins: [
    require('daisyui'),
  ],
}