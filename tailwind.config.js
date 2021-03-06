/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Noto Sans', 'Noto Sans KR', ...defaultTheme.fontFamily.sans],
        'localsans': [...defaultTheme.fontFamily.sans],
      },
    }
  },
  plugins: [],
}
