import { useState } from "react";
import { FlashBurger } from "../User/Config/images"
import { Delete, Edit, RightArrow } from "./images";
import Strings from "../Components/Config/Strings";
import Button from "../Components/ReusableComponent/Button";
import Input from "../Components/ReusableComponent/Input";





function CheckoutPage() {
    const [quantity, setQuantity] = useState(0)
    const incrementQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };
    return (
        <div className="h-full w-full">

            <div className="flex  h-full w-full  gap-10 ">
                {/* Total */}
                <div className="flex flex-row order-1 p-10">
                    <div className="flex flex-col h-full w-full gap-4 font-semibold justify-center items-center">
                        <div className="flex justify-center h-full flex-wrap items-center rounded-[15px] w-full " style={{ boxShadow: "2px 2px 30px 2px #FFF3E5" }}>
                            <div className=" flex flex-row  w-[300px] h-[126px] ">
                                <div className="flex justify-center items-center w-full">
                                    <img src={FlashBurger} alt="" className=" w-28 " />
                                </div>
                                <div className="h-full items-center justify-center w-full flex flex-col gap-2">
                                    <span className="">{Strings.orders.hamburger}</span>
                                    <span className="flex gap-2 items-center text-[#DF201F]">{Strings.checkOut.discountPrice}<span className="line-through text-xs">{Strings.checkOut.price}</span></span>
                                    <div className="flex justify-center items-center flex-row gap-4 bg-[#FFE5E5]  rounded-[5px]">
                                        <div className="cursor-pointer"><i className="fa-solid fa-minus p-2 "></i></div>
                                        <div className="border-[#000000] border py-2 px-2 border-opacity-[0.08] text-black">01</div>
                                        <div className="cursor-pointer"><i className="fa-solid fa-plus  p-2 " ></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center h-full flex-wrap items-center rounded-[15px] w-full " style={{ boxShadow: "2px 2px 30px 2px #FFF3E5" }}>
                            <div className=" flex flex-row  w-[300px] h-[126px] ">
                                <div className="flex justify-center items-center w-full">
                                    <img src={FlashBurger} alt="" className=" w-28 " />
                                </div>
                                <div className="h-full items-center justify-center w-full flex flex-col gap-2">
                                    <span className="">{Strings.orders.hamburger}</span>
                                    <span className="flex gap-2 items-center text-[#DF201F]">{Strings.checkOut.discountPrice}<span className="line-through text-xs">{Strings.checkOut.price}</span></span>
                                    <div className="flex justify-center items-center flex-row gap-4 bg-[#FFE5E5]  rounded-[5px]">
                                        <div className="cursor-pointer" onClick={decrementQuantity}><i className="fa-solid fa-minus p-2 "></i></div>
                                        <div className="border-[#000000] border py-2 px-2 border-opacity-[0.08] text-black">{quantity}</div>
                                        <div className="cursor-pointer" onClick={incrementQuantity}><i className="fa-solid fa-plus  p-2 " ></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center h-full flex-wrap items-center rounded-[15px] w-full " style={{ boxShadow: "2px 2px 30px 2px #FFF3E5" }}>
                            <div className=" flex flex-row  w-[300px] h-[126px] ">
                                <div className="flex justify-center items-center w-full">
                                    <img src={FlashBurger} alt="" className=" w-28 " />
                                </div>
                                <div className="h-full items-center justify-center w-full flex flex-col gap-2">
                                    <span className="">{Strings.orders.hamburger}</span>
                                    <span className="flex gap-2 items-center text-[#DF201F]">{Strings.checkOut.discountPrice}<span className="line-through text-xs">{Strings.checkOut.price}</span></span>
                                    <div className="flex justify-center items-center flex-row gap-4 bg-[#FFE5E5]  rounded-[5px]">
                                        <div className="cursor-pointer"><i className="fa-solid fa-minus p-2 "></i></div>
                                        <div className="border-[#000000] border py-2 px-2 border-opacity-[0.08] text-black">01</div>
                                        <div className="cursor-pointer"><i className="fa-solid fa-plus  p-2 " ></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="h-full order-2 w-full p-10">
                    <div className="" style={{ fontFamily: "Bai Jamjuree" }}>
                        {/* input */}
                        <div className="">
                            <label className="flex self-start pl-4 text-lg tracking-wide text-gray-700  font-bold mb-2">
                                {Strings.checkOut.couponOnCode}
                            </label>
                            <div className="w-full relative flex-row font-semibold  flex justify-center items-center px-3 mb-6" style={{ fontFamily: "Montserrat Alternates" }}>
                                <Input
                                    className="appearance-none focus:outline-none  uppercase w-full h-[60px] text-[#161A1D] border border-[2px solid #E8E8E8] border-dashed border-[#DF201F] border-2  py-3 px-4  rounded-[10px] bg-white"
                                    type="text"
                                    placeholder="Coupon Code"
                                    name="CouponCode"
                                />
                                <div className="absolute flex  items-center cursor-pointer right-8 h-8 w-8 justify-center rounded-full bg-[#DF201F]">
                                    <img src={RightArrow} alt="" className="" />
                                </div>
                            </div>
                        </div>
                        {/* Bill */}

                        <div className="flex flex-col px-5 gap-4">
                            <div className="border-b-2 flex justify-between items-center pb-4  border-dashed border-[#C4C4C4]">
                                <span className="text-lg">{Strings.checkOut.totalBill}</span>
                                <span className="">{Strings.checkOut.price}</span>
                            </div>
                            <div className="border-b flex justify-between items-center pb-4  border-[#C4C4C4]">
                                <span className="text-[#A2A3A5] text-lg">{Strings.checkOut.deliveryCharge}</span>
                                <span className="text-[#A2A3A5] text-lg">₹0.00</span>
                            </div>
                            <div className="border-b flex justify-between items-center pb-4  border-[#C4C4C4]">
                                <span className="text-[#A2A3A5] text-lg">{Strings.checkOut.packagingCharge}</span>
                                <span className="text-[#A2A3A5] text-lg">₹9</span>
                            </div>
                            <div className="border-b flex justify-between items-center pb-4  border-[#C4C4C4]">
                                <span className="text-[#A2A3A5] text-lg">{Strings.checkOut.taxAmount}</span>
                                <span className="text-[#A2A3A5] text-lg">₹15</span>
                            </div>
                            <div className="border-b flex justify-between items-center pb-4  border-[#C4C4C4]">
                                <span className="text-[#A2A3A5] text-lg">{Strings.checkOut.totalDiscount}</span>
                                <span className="text-[#A2A3A5] text-lg">₹0.00</span>
                            </div>
                            <div className="border-b-2 flex justify-between items-center pb-4 border-dashed border-[#C4C4C4]">
                                <span className="text-[#A2A3A5] text-lg">{Strings.checkOut.couponDiscount}</span>
                                <span className="text-[#A2A3A5] text-lg">₹0.00</span>
                            </div>
                            <div className=" flex justify-between items-center ">
                                <span className=" text-lg">{Strings.checkOut.grandTotal}</span>
                                <span className=" text-lg text-[#DF201F]">₹324</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




            {/* Address */}
            <div className="sm:flex sm:flex-wrap flex-row h-full w-full ">
                {/* Add New Address */}
                <div className="h-full w-full -order-1">
                    <div className="flex flex-col gap-4 p-10" style={{ fontFamily: "Bai Jamjuree" }}>
                        <label className="pl-3 self-start">{Strings.checkOut.addNewAddress}</label>
                        <div className="flex flex-row justify-around">
                            <div className="w-full md:w-1/2 px-3 ">
                                <select
                                    name="status"
                                    className=" w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded-[10px] py-3 px-4 border-[#E8E8E8]    bg-white ">
                                    <option className="" value="India" >
                                        India
                                    </option>
                                    <option className="" value="US">
                                        US
                                    </option>
                                </select>
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <Input
                                    className={` w-full h-full border-[#E8E8E8] text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded-[10px] py-3 px-4  bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                                    type="number"
                                    placeholder="Pincode"
                                    name="Pincode"
                                />
                            </div>
                        </div>
                        <div className="">
                            <textarea rows={4} className="resize-none p-2 border-[#E8E8E8] border-2 rounded-[10px] text-[#A2A3A5]  w-full h-[60px]" placeholder="Address" />
                        </div>
                        <div className="">
                            <Input
                                className={` w-full h-[60px] border-[#E8E8E8] text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded-[10px] py-3 px-4  bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                                type="number"
                                placeholder="Mobile Number"
                                name="mobilenumber"
                            />
                        </div>
                        <p className=" underline text-[#DF201F] text-sm">{Strings.checkOut.saveNewAddress}</p>
                    </div>
                </div>




                {/* View Address */}
                <div className="h-full w-full order-2">
                    <div className="flex font-semibold flex-col gap-6 p-10" style={{ fontFamily: "Bai Jamjuree" }}>
                        <label className="pl-3 self-start">{Strings.checkOut.orderItemDetails}</label>
                        <div className="flex gap-2 bg-[#FFF3E5] rounded-[10px] border-[#FFE3C1] border-2 p-6 h-full ">
                            <Input type="radio" radioGroup="address" className="accent-[#DF201F] h-6 w-6" />
                            <div className="">
                                <p className="text-justify text-[#161A1D] ">near Hocky building, raj royal,House no 13, lakadganj
                                    nagpur Maharashtra 441001
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-end gap-6">
                            <img src={Edit} alt="" className="border-r-2 cursor-pointer pr-6 " />
                            <img src={Delete} alt="" className="cursor-pointer" />
                        </div>
                        <div className="flex gap-2 bg-[#FFF3E5] rounded-[10px] border-[#FFE3C1] border-2 p-6 h-full ">
                            <Input type="radio" radioGroup="address" className="accent-[#DF201F] h-6 w-6" />
                            <div className="">
                                <p className="text-justify text-[#161A1D] ">near Hocky building, raj royal,House no 13, lakadganj
                                    nagpur Maharashtra 441001
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-end gap-6">
                            <img src={Edit} alt="" className="border-r-2 cursor-pointer pr-6 " />
                            <img src={Delete} alt="" className="cursor-pointer" />
                        </div>

                        <div className="w-full h-full">
                            <Button className="uppercase text-white text-xl bg-[#94CD00] w-full rounded-[60px] h-[60px]" style={{ boxShadow: "2px 2px 25px 2px #94CD0099" }}>{Strings.checkOut.continueButton}</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage