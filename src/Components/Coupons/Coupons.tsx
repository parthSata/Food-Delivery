import DashboardHeader from "../Dashboard/Menu";
import { DummyImg } from "../Config/images";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CouponAdd, { Coupon } from "./CouponAdd";
import apiUrl from "../Config/apiUrl";

function Coupons() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  // @ts-ignore
  const { updateId } = useParams();
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  const handleUpdateCoupons = (id: any) => {
    navigate(`/couponAdd/${id}`);
  };

  const handleDeleteCoupons = async (id: any) => {
    try {
      const response = await fetch(`${apiUrl}/coupons/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchCoupons();
      } else {
        console.error("Failed to delete Coupons:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting Coupons:", error);
    }
    navigate(`/coupons`);
  };

  const handleCouponView = (id: string) => {
    navigate(`/couponView/${id}`, { state: { couponId: id } });
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await fetch(`${apiUrl}/coupons`);
      if (response.ok) {
        const data = await response.json();
        setCoupons(data);
      }
    } catch (error) {
      console.error("Error fetching Coupons:", error);
    }
  };

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  return (
    <div>
      <DashboardHeader />
      <div className="relative mt-4 bg-black opacity-90 w-full">
        <img src={DummyImg} alt="" className=" h-[205px] w-full  " />
        <div className=" flex justify-start pl-16 ">
          <span
            className="absolute bottom-20 text-white text-2xl"
            style={{ fontFamily: "Bai Jamjuree" }}
          >
            Coupons
          </span>
        </div>
      </div>

      {/* Coupons */}

      <div className="">
        <div className="mt-6 w-full  flex gap-2 justify-around flex-wrap  ">
          {coupons.map((item) => (
            <div
              className="sm:w-1/5  mb-10 flex-col  w-full cursor-pointer"
              onClick={() => handleCouponView(item.id)}
              key={item.id}
              style={{ fontFamily: "Montserrat Alternates" }}
            >
              <div className="flex justify-center font-semibold flex-col gap-2   items-center bg-[#FFF3E5] h-full w-full rounded-[20px]">
                <div className="flex flex-col p-4">
                  <span className="text-[16px] text-[#A2A3A5] ">New Offer</span>
                  <span className="text-[16px]  text-[#161A1D]">
                    {item.offerCode.toUpperCase()}
                  </span>
                </div>
                <div className="flex gap-4 flex-col mb-4">
                  <span className=" text-[#DF201F] text-sm">
                    {item.discount}%
                  </span>
                  <p className="text-justify text-sm pl-6 pr-6 text-[#938D8E]  ">
                    {item.discription}
                  </p>
                </div>
              </div>
              <div className="relative flex justify-center w-full gap-2  -top-6">
                <div
                  className="bg-[#DF201F]  h-12 w-12 flex justify-center rounded-3xl "
                  onClick={() => handleDeleteCoupons(item.id)}
                >
                  <button className="">
                    <i
                      className="fa-solid fa-trash fa-lg"
                      onClick={() => handleDeleteCoupons(item.id)}
                      style={{ color: "#d4d9de" }}
                    ></i>
                  </button>
                </div>
                <div
                  className="bg-[#94CD00]  h-12 w-12 flex justify-center rounded-3xl"
                  onClick={() => handleUpdateCoupons(item.id)}
                >
                  <button className="">
                    <i
                      className="fa-solid fa-pen fa-lg"
                      onClick={() => handleUpdateCoupons(item.id)}
                      style={{ color: "#d4d9de" }}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className=" sm:w-1/5  mb-10 w-full">
            <div
              className="flex justify-center w-full font-semibold flex-col text-md items-center  h-[200px] "
              style={{ boxShadow: " 2px 2px 20px 2px #FFE9D066" }}
            >
              <div className="border-dotted rounded-[15px] border-4 h-[160px] flex-col gap-2 text-md w-[220px] flex justify-center items-center border-[border: 2px solid #161A1D]">
                <div className="relative   bg-[#DF201F] h-12  w-12 flex justify-center  rounded-full">
                  <button className="flex self-center">
                    <i
                      className="fa-duotone fa-plus fa-2xl "
                      style={{ color: "#e8eaed" }}
                      onClick={openDialog}
                    ></i>
                  </button>
                </div>
                <p className="">Add New</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isDialogOpen && (
        <CouponAdd isOpen={isDialogOpen} onClose={closeDialog} />
      )}
    </div>
  );
}

export default Coupons;
