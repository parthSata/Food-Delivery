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
        addNew: "2px 2px 20px 2px #FFE9D066",
        couponAdd: "2px 2px 20px 2px #DF201F66",
        dashboard: "2px 2px 30px 2px #FFF3E5",
        Order: "2px 2px 30px 2px # ",
        Size: "2px 2px 15px 2px #FFE5E5",
        div: "1.49px 1.49px 22.33px 1.49px #FFF3E5",
        cloud: "0px 4px 14px 0px #00000024",
        About: "5px 5px 40px 5px #FFEFDDCC",
        Play: "2px 2px 25px 2px #DF201F6E",
        testimonials: "2px 2px 50px 2px #0000001A",
      },
      fontFamily: {
        montserrat: ["Montserrat Alternates", "sans-serif"],
        baiJamjuree: ["Bai Jamjuree", "sans-serif"],
        fallinLove: ["Fall in love", "sans-serif"],
        popins: ["Poppins", "sans-serif"],
        kozuka: ["Kozuka Gothic", "sans-serif"],
      },
      colors: {
        fontGray: "#8f9194",
        productBtn: "#d4d9de",
        addNew: "#e8eaed",
        direction: "#DF201F",
        addProd: "#111213",
      },
      // background: {
      //   Category: "269.88deg, #83B018 0.09%, #C2C965 99.89%",
      // },
    },
  },
  plugins: [],
};
