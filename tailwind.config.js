/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': '#35408e',
        'lightyellow': '#f5e293',
        'yellow': '#d8b638',
        'weakred': '#79251c',
        'dark1': '#131a25',
        'dark2': '#1e2a47',
        'dark22': '#2f3e60',
        'dark3': '#141e35',
        'whitey': '#e6eaeb',
        "nucolor1" : "#35408e",
        "nucolor2" : "#f5e293",
        "nucolor3" : "#d8b638",
        "nucolor4" : "#222a62",
      }
    }
  },
  plugins: [],
}