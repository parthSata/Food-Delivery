import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useLanguageContext } from "@/context/LanguageContext";
import { Burgger } from "@/assets";
import Button from "@/Components/ReusableComponent/Button";

const ProductView: React.FC = () => {
    const { t } = useLanguageContext();
    // const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number>(1);

    const incrementQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    return (
        <div className="">
            {/* <Loader isLoading={isLoading}> */}
            <div className="flex p-4 flex-wrap lg:flex-nowrap xl:flex-nowrap flex-row ">
                <div className="flex   flex-wrap-reverse sm:flex-wrap-reverse md:flex-nowrap lg:flex-nowrap xl:flex-nowrap mt-4 ">
                    <div className="flex  flex-wrap">
                        <div
                            className="flex -order-1 justify-center flex-wrap sm:flex-row md:flex-col xl:flex-row w-auto flex-row mb-10 font-semibold"
                            style={{ fontFamily: "Bai Jamjuree" }}
                        >
                            {[0, 1, 2, 3].map((index) => (
                                <div
                                    key={index}
                                    className={` rounded-[15px] border-2  h-[120px] m-6 flex-col gap-2 text-md w-[180px] flex justify-center items-center 
                                            ? "border-[3px] border-[#DF201F]"
                                            : " outline-none border-[#161A1D]"
                                            }`}

                                >
                                    {/* {productImages[index] && ( */}
                                    <div
                                        className="relative h-full w-full flex justify-center items-center rounded-[15px] overflow-hidden cursor-pointer"
                                    // onClick={() => setPreviewImage(productImages[index])}
                                    >
                                        <img
                                            src={Burgger}
                                            alt={`Preview ${index}`}
                                            className="h-auto w-auto object-cover"
                                        />
                                    </div>
                                    {/* )} */}
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Preview Image */}
                    <div
                        className="flex items-start w-full  order-1"
                        style={{ fontFamily: "Bai Jamjuree" }}
                    >
                        <div className="flex justify-center  font-semibold flex-col text-md items-center m-4 h-[500px] w-[429px] shadow-addNew">
                            <div className=" bg-[#F5F5F5]  border-none rounded-[15px]  h-[480px] flex-col gap-2 text-md w-full flex justify-center items-center border-[border: 2px solid #161A1D]">
                                {/* {previewImage ? ( */}
                                <img
                                    src={Burgger}
                                    alt="Preview"
                                    className="h-[240px] w-auto object-cover"
                                />
                                {/* ) : (
                                        <p>{t("productAdd.noImageUploaded")}</p>
                                    )} */}
                                <p className="text-[#A4A1A1] text-[16px] font-semibold">
                                    {t("productAdd.supportedFiles")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Details */}
                <div
                    className="w-full flex flex-col mt-[50px] gap-12 flex-wrap  font-semibold"
                    style={{ fontFamily: "Bai Jamjuree" }}
                >
                    <div className="flex flex-col gap-2 ">
                        <p className="text-2xl self-start">Burger</p>
                        <p
                            className="text-[#DF201F] flex gap-1"
                            style={{ fontFamily: "Montserrat Alternates" }}
                        >
                            <span className="">₹200</span>
                            <span className="line-through">₹180</span>
                        </p>
                    </div>
                    <div className="flex gap-28 flex-row">
                        <div className="flex items-start gap-2 flex-col">
                            <span className="">Size</span>
                            <ul className="flex items-end justify-around gap-2 w-[80px] top-[]">
                                {["S", "M", "L"].map((size) => (
                                    <li key={size} className="page flex flex-grow text-xl">
                                        <a
                                            href="#"
                                            className={`h-[42px] w-[40px] border-none rounded-sm shadow-Size p-1 focus:text-white focus:border-black-8 focus:bg-[#DF201F]`}
                                        >
                                            {size}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex items-start gap-2 flex-col">
                            <span className="">Quantity</span>
                            <div className="flex  gap-1 shadow-Size">
                                <button
                                    className=" w-[40px] h-[42px]  border-r   border-gray"
                                    onClick={decrementQuantity}
                                >
                                    <i className="fa-solid fa-minus"></i>
                                </button>
                                <div className=" w-[40px] p-2.5 h-[42px]  border-r  border-gray">
                                    {quantity}
                                </div>
                                <button
                                    className=" w-[40px] h-[42px]  border-r  border-gray"
                                    onClick={incrementQuantity}
                                >
                                    <i className="fa-solid fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2  font-semibold">
                        <span className="self-start">Description</span>
                        <div className="" style={{ fontFamily: "Montserrat Alternates" }}>
                            <span className="text-[#A2A3A5] text-sm text-pretty">
                                If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay for the hosting
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-6 justify-around">
                        <Button className="bg-[#DF201F] rounded-[60px] text-white w-full h-10">Add To Cart +</Button>
                    </div>
                </div>
            </div>
            {/* </Loader> */}
        </div>
    );
};

export default ProductView;
