import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Coupon } from "./CouponAdd";
import { db } from "@/config/Firebase/firebase";
import { ref, onValue, remove } from "firebase/database";
import { t } from "i18next";
import { Button, Loader } from "@/Components/index";

function CouponView() {
  const { couponId } = useParams();
  const navigate = useNavigate();
  const [couponDetail, setCouponDetail] = useState<Coupon>({
    id: "",
    offerCode: "",
    discount: "",
    offerPrice: "",
    expiryDate: "",
    discription: "",
  });
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    fetchCouponData();
  }, [couponId]);

  const handleUpdateCoupons = (id: string) => {
    navigate(`/seller/couponAdd/${id}`);
  };

  const handleDeleteCoupons = async (id: string) => {
    setisLoading(true);

    try {
      const couponRef = ref(db, `coupons/${id}`);
      await remove(couponRef);
      navigate(`/seller/coupons`);
    } catch (error) {
      console.error("Error deleting coupon:", error);
    }
    setisLoading(false);
  };

  const fetchCouponData = () => {
    setisLoading(true);
    const couponRef = ref(db, `coupons/${couponId}`);
    onValue(
      couponRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setCouponDetail({ id: couponId, ...data });
        } else {
          console.error("No data available");
        }
      },
      (error) => {
        console.error("Error fetching coupon data:", error);
      }
    );
    setisLoading(false);
  };

  return (
    <div>
      <div
        className="flex justify-center mt-28 items-center px-6 h-full w-full"
        style={{ fontFamily: "Montserrat Alternates" }}
      >
        <Loader isLoading={isLoading}>
          <div className="flex flex-col gap-1 p-8 font-semibold bg-[#FFF3E5] rounded-[15px] h-auto w-full  ">
            <div className="flex flex-row  pl-4 gap-8 text-lg">
              <span className="font-bold text-[#A2A3A5]">
                {t("couponAdd.offerCode")}{" "}
              </span>
              <span className="text-[#161A1D] ">{couponDetail.offerCode}</span>
            </div>
            <div className="flex flex-row  pl-4 gap-[85px] text-lg">
              <span className="font-bold text-[hsl(220,2%,64%)]">
                {t("couponAdd.OfferLable")}
              </span>
              <span className="text-[#DF201F]">{couponDetail.discount}%</span>
            </div>
            <div className="flex flex-row  pl-4 gap-8 text-lg">
              <span className="font-bold text-[#A2A3A5]">
                {t("couponAdd.description")}{" "}
              </span>
              <span className="text-[#938D8E] text-justify">
                {couponDetail.discription}
              </span>
            </div>
            <div className="relative flex justify-center w-full gap-2  top-14   ">
              <div
                className="bg-[#DF201F]  h-12 w-12 flex justify-center rounded-3xl "
                onClick={() => handleDeleteCoupons(couponDetail.id)}
              >
                <Button className="">
                  <i className="fa-solid fa-trash fa-lg text-productBtn"></i>
                </Button>
              </div>
              <div
                className="bg-[#94CD00]  h-12 w-12 flex justify-center rounded-3xl"
                onClick={() => handleUpdateCoupons(couponDetail.id)}
              >
                <Button className="">
                  <i className="fa-solid fa-pen fa-lg text-productBtn"></i>
                </Button>
              </div>
            </div>
          </div>
        </Loader>
      </div>
    </div>
  );
}

export default CouponView;
