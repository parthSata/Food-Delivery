/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "2px 2px 30px 2px #FFF3E5",
      },
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
        BaiJamjuree: ["BaiJamjuree", "sans"],
      },
    },
  },
  plugins: [],
};
