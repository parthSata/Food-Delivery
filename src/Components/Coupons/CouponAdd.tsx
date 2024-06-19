import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import firebaseDatabaseURL from "../Config/apiUrl";

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

const Add: React.FC<AddProps> = ({ onClose, isOpen }) => {
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

  const fetchCouponData = async () => {
    try {
      const response = await fetch(`${firebaseDatabaseURL}/coupons/${updateId}.json`);
      if (response.ok) {
        const data = await response.json();
        setCoupon(data);
      } else {
        console.error("Failed to fetch coupon data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching coupon data:", error);
    }
  };

  const handleUpdateCoupon = async (e: React.FormEvent) => {
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
      const response = await fetch(
        `${firebaseDatabaseURL}/coupons/${updateId}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCoupon),
        }
      );

      if (response.ok) {
        toast.success("Coupon successfully updated");
        navigate(`/coupons`);
      } else {
        toast.warn("Failed to update!");
      }
    } catch (error) {
      toast.error("Error updating Coupon.");
    }
  };

  const handleAddCoupon = async (e: React.FormEvent) => {
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
      const response = await fetch(`${firebaseDatabaseURL}/coupons.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCoupon),
      });

      if (response.ok) {
        toast.success("Coupon added successfully");
        navigate(`/coupons`);
      } else {
        toast.warn("Failed to add coupon!");
      }
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
  };


  return (
    <div className="fixed  inset-0 flex  items-center justify-center bg-black bg-opacity-70">
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
            <label className="self-start">Offer Code</label>
            <input
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
            <label className="self-start">Discount </label>
            <input
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
            <label className="self-start">Offer Price</label>
            <input
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
            <label className="self-start">Expiry Date</label>
            <input
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
            <label className="self-start">Description</label>
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
              className="w-full text-xl bg-[#DF201F] h-full text-white py-2 rounded-[60px] "
              style={{ boxShadow: "2px 2px 20px 2px #DF201F66" }}
              onClick={handleUpdateCoupon}
            >
              Update
            </button>
          ) : (
            <button
              type="submit"
              className="w-full text-xl bg-[#DF201F] h-full text-white py-2 rounded-[60px] "
              style={{ boxShadow: "2px 2px 20px 2px #DF201F66" }}
              onClick={handleAddCoupon}
            >
              Save
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
    </div>
  );
};

export default Add;
