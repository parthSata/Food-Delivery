import { GallaryFood } from "@/assets";
import UserGallaryHeader from "../../../../User/Pages/Home/UserGallaryHeader";
import { useLanguageContext } from "../../../../context/LanguageContext";

function ProductGallary() {
  const { t } = useLanguageContext();

  return (
    <div>
      <div className="">
        <UserGallaryHeader />
        <div className="bg-[#D9D9D9] flex flex-row flex-wrap h-full w-full">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="relative sm:w-1/4 p-4 h-full w-full">
              <div className="">
                <img
                  src={GallaryFood}
                  alt={t("gallery.imageAlt")}
                  className="w-[300px] h-[260px] object-cover rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductGallary;
