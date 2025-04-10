/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        'primary': '#ECEEFE',
        'purple1': '#444DF2',
        'purple2': '#797EF3',
        'purple3': '#535AF1',
        'error': '#797EF3',
        'online': '#92c83e',
        'textgray': '#686868',
        'lightpurple': '#adb0d9',
        'linkblue': '#1381FF'
      },
    },
  },
  plugins: [],
}

