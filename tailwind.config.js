/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slide: {
          "0%": { transform: "translateX(-100px)" },
          "100%": { transform: "translateX(0px)" },
        },
      },
      animation: {
        slide: "slide 1s ease-in-out",
      },
    },
  },
  plugins: [require("daisyui")],
};
