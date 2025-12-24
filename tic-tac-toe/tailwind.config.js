/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#38444d",
          200: "#8899a6",
        },
        pink: "#F231A5",
        blue: {
          100: "#0a0c21",
          200: "#000010",
        },
      },
    },
  },
  plugins: [],
};
