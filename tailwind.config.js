/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"], // Angular kompatibel
  theme: {
    extend: {
      colors: {
        header: "rgba(236, 238, 254, 0.8)",
        primary: "#ECEEFE",
        purple1: "#444DF2",
        purple2: "#797EF3",
        purple3: "#535AF1",
        error: "#797EF3",
        online: "#92c83e",
        offline: "#686868",
        textgray: "#686868",
        lightpurple: "#adb0d9",
        linkblue: "#1381FF",
        hovergray: "#E6E6E6",
        btnBg: "#eff1fe",
        pwConfirm: "rgba(104, 104, 104, 1)",
      },
      screens: {
        xxs: "320px",
        xs: "400px",
        s: "470px",
        "md+": "810px",
        "3xl": "1920px",
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
      keyframes: {
        moveIn: {
          "0%": {
            opacity: "0",
            transform: "translateX(-100%)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(10%)",
          },
        },
        containerMoveMobile: {
          "0%": {
            opacity: "1",
            transform: "translate(0, 0)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(0, -35vh) scale(0.8)",
          },
        },
        containerMoveDesktop: {
          "0%": {
            opacity: "1",
            transform: "translate(0, 0)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(-40vw, -43vh) scale(0.8)",
          },
        },
      },
      animation: {
        moveIn: "moveIn 1s ease-in forwards",
        containerMoveMobile: "containerMoveMobile 1s ease-in forwards",
        containerMoveDesktop: "containerMoveDesktop 1s ease-in forwards",
      },
    },
  },
  plugins: [],
};
