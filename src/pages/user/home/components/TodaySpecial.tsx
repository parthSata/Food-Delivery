import { useLanguageContext } from "../../../../context/LanguageContext";
import Button from "../../../../Components/ReusableComponent/Button";
import { Manchurian } from "@/assets";

function TodaySpecial() {
  const { t } = useLanguageContext();

  return (
    <div className="h-full w-full">
      <div className="text-2xl flex justify-between flex-wrap font-semibold m-2">
        <span className=" rounded-[0px, 60px, 60px, 0px] p-4  mb-4">
          <span className="border-b-4 pb-3 rounded-r  border-[#DF201F]">
            To
          </span>
          day Special
        </span>
        <Button
          className="w-[180px] text-white shadow-registerBtn rounded-full font-bold text-lg self-center uppercase bg-[#94CD00] h-[50px]"
          style={{ fontFamily: "Bai Jamjuree" }}
        >
          {t("todaySpecial.viewAll")}
        </Button>
      </div>

      <div className="mt-6 w-full flex gap-2 justify-around flex-wrap">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="sm:w-1/5 w-full mb-10 font-semibold shadow-dashboard"
            style={{ fontFamily: "Bai Jamjuree" }}
          >
            <img
              src={Manchurian}
              alt=""
              className="h-[190px] w-full max-w-[340px] rounded-2xl"
            />
            <div className="flex flex-col gap-1 p-3">
              <span className="self-start">{t("todaySpecial.name")}</span>
              <p
                className="flex gap-2 items-center text-[#DF201F]"
                style={{ fontFamily: "Montserrat Alternates" }}
              >
                {t("bestSeller.price")}
                <span className="text-xs line-through">
                  {t("bestSeller.originalPrice")}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodaySpecial;
