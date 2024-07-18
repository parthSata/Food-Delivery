import { DummyImg } from "../Config/images";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CouponAdd, { Coupon } from "./CouponAdd";
import { db } from '../../Firebase/firebase';
import { ref, onValue, remove } from 'firebase/database';
import Loader from "../ReusableComponent/Loader";
import Strings from "../Config/Strings";
import Button from "../ReusableComponent/Button";

function Coupons() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  // @ts-ignore
  const { updateId } = useParams();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setisLoading] = useState(false)

  const handleUpdateCoupons = (id: any) => {
    navigate(`/seller/couponAdd/${id}`);
  };

  const handleCouponView = (id: string) => {
    navigate(`/seller/couponView/${id}`, { state: { couponId: id } });
  };
  const handleDeleteCoupons = async (id: string) => {
    setisLoading(true)

    try {
      const couponRef = ref(db, `coupons/${id}`);
      await remove(couponRef);
      fetchCoupons(); // Optionally, update state directly instead of re-fetching
    } catch (error) {
      console.error("Error deleting Coupons:", error);
    }
    setisLoading(false)
    navigate(`/seller/coupons`);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = () => {
    setisLoading(true)

    const couponsRef = ref(db, 'coupons');
    onValue(couponsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const couponsArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setCoupons(couponsArray);
      } else {
        setCoupons([]);
      }
    }, (error) => {
      console.error("Error fetching Coupons:", error);
    });
    setisLoading(false)

  };

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  return (
    <div>
      <div className="relative mt-4 bg-black opacity-90 w-full">
        <img src={DummyImg} alt="" className=" h-[205px] w-full  " />
        <div className=" flex justify-start pl-16 ">
          <span
            className="absolute bottom-20 text-white text-2xl " style={{
              fontFamily: "Bai Jamjuree",
            }}
          >
            {Strings.couponAdd.couponTitle}
          </span>
        </div>
      </div>

      {/* Coupons */}

      <Loader isLoading={isLoading}>
        <div className="mt-6 w-full  flex gap-2 justify-around flex-wrap  ">
          {coupons.map((item) => (
            <div
              className="sm:w-1/5  mb-10 flex-col  w-full cursor-pointer" style={{ fontFamily: "Montserrat Alternates" }}
              onClick={() => handleCouponView(item.id)}
              key={item.id}
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
                  <Button className="">
                    <i
                      className="fa-solid fa-trash fa-lg text-productBtn"
                    ></i>
                  </Button>
                </div>
                <div
                  className="bg-[#94CD00]  h-12 w-12 flex justify-center rounded-3xl"
                  onClick={() => handleUpdateCoupons(item.id)}
                >
                  <Button className="">
                    <i
                      className="fa-solid fa-pen fa-lg text-productBtn"
                    ></i>
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <div className=" sm:w-1/5  mb-10 w-full">
            <div
              className="flex justify-center w-full font-semibold flex-col text-md items-center  h-[200px] shadow-addNew"
            >
              <div className="border-dotted rounded-[15px] border-4 h-[160px] flex-col gap-2 text-md w-[220px] flex justify-center items-center border-[border: 2px solid #161A1D]">
                <div className="relative   bg-[#DF201F] h-12  w-12 flex justify-center  rounded-full">
                  <Button className="flex self-center">
                    <i
                      className="fa-duotone fa-plus fa-2xl "
                      style={{ color: "#e8eaed" }}
                      onClick={openDialog}
                    ></i>
                  </Button>
                </div>
                <p className="">{Strings.category.addNewButton}</p>
              </div>
            </div>
          </div>
        </div>
      </Loader>

      {isDialogOpen && (
        <CouponAdd isOpen={isDialogOpen} onClose={closeDialog} />
      )}
    </div>
  );
}

export default Coupons;
