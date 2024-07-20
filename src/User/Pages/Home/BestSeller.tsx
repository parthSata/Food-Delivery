import Button from "../../../Components/ReusableComponent/Button";
import { Burgger } from "@/assets";
import { useLanguageContext } from "../../../context/LanguageContext";

function BestSeller() {
  const { t } = useLanguageContext();

  return (
    <div>
      <div className="h-full flex flex-col flex-wrap w-full mt-12">
        <div className="text-2xl flex justify-between flex-wrap font-semibold m-2">
          <span className=" rounded-[0px, 60px, 60px, 0px] p-4  mb-4">
            <span className="border-b-4 pb-3 rounded-r border-[#DF201F]">
              Ou
            </span>
            r Best Sellers
          </span>
          <Button
            className="w-[180px] font-bold text-lg text-white rounded-full self-center uppercase bg-[#94CD00] h-[50px]"
            style={{
              fontFamily: "Bai Jamjuree",
              boxShadow: "2px 2px 25px 2px #94CD0099",
            }}
          >
            {t("bestSeller.viewAll")}
          </Button>
        </div>
        <div className="mt-6 w-full flex gap-4 flex-wrap">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="sm:w-1/6 m-3 w-full flex mb-10">
              <div className="flex justify-center font-semibold flex-col text-md items-center bg-[#FFF3E5] h-[200px] w-full rounded-[20px]">
                <img src={Burgger} alt="burger" className="h-20" />
                <p className="" style={{ fontFamily: "Bai Jamjuree" }}>
                  {t("bestSeller.name")}
                </p>
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
    </div>
  );
}

export default BestSeller;
