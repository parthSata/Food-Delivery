/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "2px 2px 30px 2px #FFF3E5",
        adminbtn: "2px 2px 25px 2px #DF201F80",
        registerBtn: "2px 2px 25px 2px #94CD0099",
        addCategory: "2px 2px 25px 2px #94CD0066",
      },
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
        BaiJamjuree: ["BaiJamjuree", "sans"],
      },
      colors: {
        fontGray: "#8f9194",
      },
    },
  },
  plugins: [],
};
