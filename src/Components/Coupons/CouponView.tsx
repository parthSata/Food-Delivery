import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Coupon } from "./CouponAdd";
import apiUrl from "../Config/apiUrl";
import Container from "../Container";

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

  useEffect(() => {
    fetchCouponData();
  }, []);

  const handleUpdateCoupons = (id: any) => {
    navigate(`/couponAdd/${id}`);
  };

  const handleDeleteCoupons = async (id: any) => {
    try {
      const response = await fetch(`${apiUrl}/coupons/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchCouponData();
      } else {
        console.error("Failed to delete Coupons:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting Coupons:", error);
    }
    navigate(`/coupons`);
  };

  const fetchCouponData = async () => {
    try {
      const response = await fetch(`${apiUrl}/${couponId}`);
      if (response.ok) {
        const data = await response.json();
        setCouponDetail(data);
      }
    } catch (error) { }
  };
  return (
    <div>
      <Container>
        <div
          className="flex justify-center mt-28 items-center"
          style={{ fontFamily: "Montserrat Alternates" }}
        >
          <div className="flex flex-col gap-1 p-8 font-semibold bg-[#FFF3E5] rounded-[15px] h-auto w-[816px]  ">
            <div className="flex flex-row  pl-4 gap-8 text-lg">
              <span className="font-bold text-[#A2A3A5]">Offer Code </span>
              <span className="text-[#161A1D] ">{couponDetail.offerCode}</span>
            </div>
            <div className="flex flex-row  pl-4 gap-[85px] text-lg">
              <span className="font-bold text-[hsl(220,2%,64%)]">Offer </span>
              <span className="text-[#DF201F]">{couponDetail.discount}%</span>
            </div>
            <div className="flex flex-row  pl-4 gap-8 text-lg">
              <span className="font-bold text-[#A2A3A5]">Description </span>
              <span className="text-[#938D8E] text-justify">
                {couponDetail.discription}
              </span>
            </div>

            <div className="relative flex justify-center w-full gap-2  top-14   ">
              <div
                className="bg-[#DF201F]  h-12 w-12 flex justify-center rounded-3xl "
                onClick={() => handleDeleteCoupons(couponDetail.id)}
              >
                <button className="">
                  <i
                    className="fa-solid fa-trash fa-lg"
                    style={{ color: "#d4d9de" }}
                  ></i>
                </button>
              </div>
              <div
                className="bg-[#94CD00]  h-12 w-12 flex justify-center rounded-3xl"
                onClick={() => handleUpdateCoupons(couponDetail.id)}
              >
                <button className="">
                  <i
                    className="fa-solid fa-pen fa-lg"
                    style={{ color: "#d4d9de" }}
                  ></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default CouponView;
