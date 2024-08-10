import { useLanguageContext } from "@/context/LanguageContext";
import { PlayArrow, Shafe } from "@/assets";
import { Button } from "@/Components/index";

function AboutUs() {
  const { t } = useLanguageContext();

  return (
    <div>
      <div className="flex h-full border-2 w-full shadow-About">
        <div className="m-14 flex flex-col flex-wrap gap-10">
          <div className="flex flex-col font-semibold gap-1">
            <span
              className="self-start text-[#161A1D] text-3xl"
              style={{ fontFamily: "Bai Jamjuree" }}
            >
              {t("AboutUs.title")}
            </span>
            <span
              className="self-start text-[#DF201F] text-2xl"
              style={{ fontFamily: "fall in love" }}
            >
              {t("AboutUs.subtitle")}
            </span>
          </div>
          <div className="font-semibold text-[17px] text-balance">
            <p className="text-[#A2A3A5]">{t("AboutUs.description")}</p>
          </div>
          <div className="flex flex-row gap-4">
            <Button
              className="w-[180px] text-white rounded-full self-center uppercase bg-[#94CD00] h-[50px]"
              style={{
                fontFamily: "Bai Jamjuree",
                boxShadow: "2px 2px 25px 2px #94CD0099",
              }}
            >
              {t("AboutUs.readMore")}
            </Button>
            <Button className="bg-[#DF201F] rounded-[60px] shadow-Play">
              <img src={PlayArrow} alt="" />
            </Button>
          </div>
        </div>
        <div className="flex items-end">
          <img src={Shafe} alt="" className="h-[360px] w-[650px]" />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
