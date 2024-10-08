import { useNavigate } from "react-router-dom";
import { AllFood, HomeImg, Left, Pizza, Right, texture } from "@/assets";
import { auth } from "@/config/Firebase/firebase";
import { BestSeller, AboutUs, TodaySpecial, ProductGallary, Team, Button } from "@/Components/index";
import { t } from "i18next";

function HomePage() {
  const navigate = useNavigate();



  const handleSubmit = () => {
    navigate("/login");
  };

  return (
    <div>
      <div className="h-full w-full mb-20 ">
        <div className="relative  bg-opacity-85 mt-0">
          <img src={HomeImg} alt="" className="h-[400px] w-full" />
          <div
            className="absolute  font-semibold w-full   flex-col justify-center top-28"
            style={{
              fontFamily: "Bai Jamjuree",
            }}
          >
            <div className="flex flex-col gap-2">
              <span
                className="text-[red] text-xl font-normal"
                style={{ fontFamily: "Fall in love" }}
              >
                {t("home.welcome")}
              </span>
              <span className="text-white text-5xl    font-bold">
                {t("home.slogan")}
              </span>
              <p
                className="text-[#FFFFFF] text-sm font-semibold"
                style={{ fontFamily: "Montserrat Alternates" }}
              >
                {t("home.description")}
              </p>
              {!auth.currentUser && (
                <Button
                  className="w-[120px] text-white z-10 cursor-pointer rounded-full self-center bg-[#94CD00] h-[50px]"
                  onClick={handleSubmit}
                >
                  {t("home.login")}
                </Button>
              )}
            </div>
          </div>
          <div
            className="relative bg-[#DF201F] h-[210px] flex justify-center items-center "
            style={{ fontFamily: "Bai Jamjuree" }}
          >
            <img src={texture} alt="" className="h-full w-full" />
            <div className=" absolute  flex-col flex -top-24">
              <img src={AllFood} alt="" className="h-[240px] w-full " />
              <div className="flex justify-between items-center text-white text-2xl font-semibold">
                <img src={Left} className="h-12 w-12 " />
                <span className="">{t("home.bestCategory")}</span>
                <img src={Right} className="h-12 w-12" />
              </div>
            </div>
          </div>
          <div className="mt-10 mb-10">
            <div className="flex  flex-row flex-wrap justify-center gap-8">
              <div className="flex flex-col justify-center">
                <img
                  src={Pizza}
                  alt=""
                  className="self-center h-[100px] w-[100px] "
                />
                <span className="">{t("dashboard.pizza")}</span>
              </div>
              <div className="flex flex-col justify-center">
                <img
                  src={Pizza}
                  alt=""
                  className="self-center h-[100px] w-[100px] "
                />
                <span className="">{t("dashboard.pizza")}</span>
              </div>
              <div className="flex flex-col justify-center">
                <img
                  src={Pizza}
                  alt=""
                  className="self-center h-[100px] w-[100px] "
                />
                <span className="">{t("dashboard.pizza")}</span>
              </div>
              <div className="flex flex-col justify-center">
                <img
                  src={Pizza}
                  alt=""
                  className="self-center h-[100px] w-[100px] "
                />
                <span className="">{t("dashboard.pizza")}</span>
              </div>
              <div className="flex flex-col justify-center">
                <img
                  src={Pizza}
                  alt=""
                  className="self-center h-[100px] w-[100px] "
                />
                <span className="">{t("dashboard.pizza")}</span>
              </div>
            </div>
          </div>
          <div className="mb-4 flex  bottom-0   space-x-2 justify-center rtl:space-x-reverse">
            <Button
              className="w-3 h-3 border-2 border-[#94CD00] accent-[#DF201F]  rounded-full"
            ></Button>
            <Button
              className="w-3 h-3 border-2 border-[#94CD00]  rounded-full"
            ></Button>
            <Button
              className="w-3 h-3 border-2 border-[#94CD00]  rounded-full"
            ></Button>
            <Button
              className="w-3 h-3 border-2 border-[#94CD00]  rounded-full"
            ></Button>
          </div>

          <div className="">
            <AboutUs />
          </div>

          <div className="">
            <BestSeller />
          </div>

          <div className="">
            <TodaySpecial />
          </div>
          <div className="">
            <ProductGallary />
          </div>

          <div className="">
            <Team />
          </div>

        </div>
      </div>
    </div>
  );
}

export default HomePage;
