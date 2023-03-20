/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          25: "#4B4453",
          100: "#101010",
        },
        secondary: {
          mid: "#06BA6B",
          darkGray: "#e3e3e3",
        },
      },
    },
  },
  plugins: [],
};
