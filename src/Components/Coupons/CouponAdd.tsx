import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { db } from '../../Firebase/firebase'; // Ensure this points to your Firebase initialization
import { ref, set, onValue } from 'firebase/database';
import Loader from "../ReusableComponent/Loader";
import Strings from "../Config/Strings";
import Input from "../ReusableComponent/Input";
import { useLanguageContext } from "../LanguageContext";

export interface Coupon {
  id: string;
  offerCode: string;
  discount: string | number;
  offerPrice: string | number;
  expiryDate: string;
  discription: string;
}

interface AddProps {
  onClose: () => void;
  isOpen: boolean;
}

const CouponAdd: React.FC<AddProps> = ({ onClose, isOpen }) => {
  const { t } = useLanguageContext();
  const navigate = useNavigate();
  const { updateId } = useParams();
  const [errors, setErrors] = useState<Partial<Coupon>>({});
  const [coupon, setCoupon] = useState<Coupon>({
    id: "",
    offerCode: "",
    discount: 0,
    offerPrice: 0,
    expiryDate: "",
    discription: "",
  });
  const [isLoading, setisLoading] = useState(false)

  if (!isOpen) return null;

  const isFieldEmpty = (value: string | number) => {
    return value === "" || value === null || value === undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCoupon(prevCoupon => ({
      ...prevCoupon,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (updateId) {
      fetchCouponData();
    }
  }, [updateId]);

  const fetchCouponData = () => {
    setisLoading(true)
    const couponRef = ref(db, `coupons/${updateId}`);
    onValue(couponRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCoupon(data);
      } else {
        console.error("No data available");
      }
    }, (error) => {
      console.error("Error fetching coupon data:", error);
    });
    setisLoading(false)
  };

  const handleUpdateCoupon = async (e: React.FormEvent) => {
    setisLoading(true)

    e.preventDefault();

    const newErrors: Partial<Coupon> = {};
    if (isFieldEmpty(coupon.offerCode)) newErrors.offerCode = "Offer Code is required";
    if (isFieldEmpty(coupon.discount)) newErrors.discount = "Discount is required";
    if (isFieldEmpty(coupon.offerPrice)) newErrors.offerPrice = "Offer Price is required";
    if (isFieldEmpty(coupon.expiryDate)) newErrors.expiryDate = "Expiry Date is required";
    if (isFieldEmpty(coupon.discription)) newErrors.discription = "Description is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    const updatedCoupon = { ...coupon };

    try {
      const couponRef = ref(db, `coupons/${updateId}`);
      await set(couponRef, updatedCoupon);
      toast.success("Coupon successfully updated");
      navigate(`/seller/coupons`);
    } catch (error) {
      toast.error("Error updating Coupon.");
    }
    setisLoading(false)
  };

  const handleAddCoupon = async (e: React.FormEvent) => {
    setisLoading(true)

    e.preventDefault();

    const newErrors: Partial<Coupon> = {};
    if (isFieldEmpty(coupon.offerCode)) newErrors.offerCode = "Offer Code is required";
    if (isFieldEmpty(coupon.discount)) newErrors.discount = "Discount is required";
    if (isFieldEmpty(coupon.offerPrice)) newErrors.offerPrice = "Offer Price is required";
    if (isFieldEmpty(coupon.expiryDate)) newErrors.expiryDate = "Expiry Date is required";
    if (isFieldEmpty(coupon.discription)) newErrors.discription = "Description is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    const newCoupon: Coupon = {
      ...coupon,
      id: uuidv4(),
    };

    try {
      const newCouponRef = ref(db, `coupons/${newCoupon.id}`);
      await set(newCouponRef, newCoupon);
      toast.success("Coupon added successfully");
      navigate(`/seller/coupons`);
    } catch (error) {
      toast.error("Error adding coupon.");
    }
    setCoupon({
      id: "",
      offerCode: "",
      discount: "",
      offerPrice: "",
      expiryDate: "",
      discription: "",
    });
    onClose();
    setisLoading(false)
  };


  return (
    <div className="fixed  inset-0 flex  items-center justify-center bg-black bg-opacity-70">
      <Loader isLoading={isLoading}>
        <div className="bg-white w-[400px] h-[570px] sm:w-[500px] sm:h-auto md:w-[500px] md:h-[] lg:w-[] lg:h-[]  xl:w-[500px] xl:h-[560px] gap-2 rounded-[30px] shadow-lg p-6 relative">
          <button
            className="absolute -top-8 right-[14px]  text-white bg-red-500 rounded-full w-10 h-6 flex items-center justify-center"
            onClick={onClose}
          >
            <svg
              className="h-[26px] w-[26px] p-[4px]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <form className="space-y-4 ">
            <div className="flex flex-col  font-semibold gap-1">
              <label className="self-start">{t(Strings.couponAdd.offerCode)}</label>
              <Input
                type="text"
                placeholder="Offer Code Here.."
                onChange={handleChange}
                value={coupon?.offerCode}
                name="offerCode"
                className="w-full  p-3 border rounded-[10px] text-md placeholder:text-[#A2A3A5] focus:outline-none border-gray-300 "
              />
              {errors.offerCode && (
                <span
                  className={`text-red-600 text-sm ${coupon?.offerCode ? "" : "hidden"
                    }}`}
                >
                  {errors.offerCode}
                </span>
              )}
            </div>
            <div className="flex flex-col  font-semibold gap-1">
              <label className="self-start">{t(Strings.couponAdd.discount)}</label>
              <Input
                type="number"
                placeholder="Discount Here.."
                name="discount"
                onChange={handleChange}
                value={coupon?.discount}
                className="w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  p-3 border rounded-[10px] text-md placeholder:text-[#A2A3A5] focus:outline-none border-gray-300 "
              />
              {errors.discount && (
                <span
                  className={`text-red-600 text-sm ${coupon?.discount ? "" : "hidden"
                    }}`}
                >
                  {errors.discount}
                </span>
              )}
            </div>
            <div className="flex flex-col  font-semibold gap-1">
              <label className="self-start">{t(Strings.couponAdd.offerPrice)}</label>
              <Input
                type="number"
                placeholder="Offer Price Here.."
                name="offerPrice"
                onChange={handleChange}
                value={coupon?.offerPrice}
                className="w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  p-3 border rounded-[10px] text-md placeholder:text-[#A2A3A5] focus:outline-none border-gray-300 "
              />
              {errors.offerPrice && (
                <span
                  className={`text-red-600 text-sm ${coupon?.offerPrice ? "" : "hidden"
                    }}`}
                >
                  {errors.offerPrice}
                </span>
              )}
            </div>
            <div className="flex flex-col  font-semibold gap-1">
              <label className="self-start">{t(Strings.couponAdd.expiryDate)}</label>
              <Input
                type="date"
                placeholder="Date Here.."
                name="expiryDate"
                onChange={handleChange}
                value={coupon?.expiryDate}
                className="w-full  p-3 border rounded-[10px] text-md placeholder:text-[#A2A3A5] placeholder:text- focus:outline-none border-gray-300 "
              />
              {errors.expiryDate && (
                <span
                  className={`text-red-600 text-sm ${coupon?.expiryDate ? "" : "hidden"
                    }}`}
                >
                  {errors.expiryDate}
                </span>
              )}
            </div>
            <div className="flex flex-col  font-semibold gap-1">
              <label className="self-start">{t(Strings.couponAdd.description)}</label>
              <textarea
                placeholder="Type Here.."
                name="discription"
                rows={2}
                onChange={handleChange}
                value={coupon?.discription}
                className="appearance-none block w-full text-[#A2A3A5] border border-[2px solid #E8E8E8]  py-3 px-4 leading-tight hover:border-[#9ad219] focus:outline-[#99c928] bg-white resize-none w-full  p-3 border rounded-[10px] text-md placeholder:text-[#A2A3A5] focus:outline-none border-gray-300 "
              />
              {errors.discription && (
                <span
                  className={`text-red-600 text-sm ${coupon?.discription ? "" : "hidden"
                    }}`}
                >
                  {errors.discription}
                </span>
              )}
            </div>
            {updateId ? (
              <button
                type="submit"
                className="w-full text-xl bg-[#DF201F] h-full shadow-couponAdd text-white py-2 rounded-[60px] "
                onClick={handleUpdateCoupon}
              >
                {t(Strings.couponAdd.updateButton)}
              </button>
            ) : (
              <button
                type="submit"
                className="w-full text-xl bg-[#DF201F] h-full text-white shadow-couponAdd py-2 rounded-[60px] "
                onClick={handleAddCoupon}
              >
                {t(Strings.couponAdd.saveButton)}
              </button>

            )}
            <ToastContainer
              position="top-right"
              autoClose={1000}
              pauseOnFocusLoss={false}
              limit={1}
            />
          </form>
        </div>
      </Loader>
    </div>
  );
};

export default CouponAdd;
