/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
<<<<<<< HEAD
        'header': "rgba(236, 238, 254, 0.8)",

        'primary': '#ECEEFE',
        'purple1': '#444DF2',
        'purple2': '#797EF3',
        'purple3': '#535AF1',
        'error': '#797EF3',
        'online': '#92c83e',
        'offline': '#686868',
        'lightpurple': '#adb0d9',
        'linkblue': '#1381FF',
        'hovergray': '#E6E6E6',
        'btnBg': "#eff1fe"
=======
        header: "rgba(236, 238, 254, 0.8)",

        primary: "#ECEEFE",
        purple1: "#444DF2",
        purple2: "#797EF3",
        purple3: "#535AF1",
        error: "#797EF3",
        online: "#92c83e",
        textgray: "#686868",
        lightpurple: "#adb0d9",
        linkblue: "#1381FF",
        hovergray: "#E6E6E6",
        btnBg: "#eff1fe",
>>>>>>> pondy
      },
      screens: {
        xxs: "320px",
        xs: "400px",
      },
      backgroundImage: {
        "icon-arrow-back": "url('/assets/icons/arrow_back.svg')",
        "icon-arrow-back-hover": "url('/assets/icons/arrow_back_hover.svg')",
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
      fontWeight: {
        800: 800,
      },
    },
  },
  plugins: [],
};
