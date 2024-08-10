import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { t } from "i18next";
import { AttachFile, Burgger, Pasta, ReviewProfile, Star } from "@/assets";
import { Button } from "@/Components/index";

const ProductView: React.FC = () => {
    // const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number>(1);

    const incrementQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    return (
        <div className="h-full w-full ">
            {/* <Loader isLoading={isLoading}> */}
            <div className="flex p-4 flex-wrap lg:flex-nowrap xl:flex-nowrap flex-row ">
                <div className="flex   flex-wrap-reverse sm:flex-wrap-reverse md:flex-nowrap lg:flex-nowrap xl:flex-nowrap mt-4 ">
                    <div className="flex  flex-wrap">
                        <div
                            className="flex -order-1 justify-center flex-wrap sm:flex-row md:flex-col xl:flex-row w-auto flex-row mb-10 font-semibold font-baiJamjuree"

                        >
                            {[0, 1, 2, 3].map((index) => (
                                <div
                                    key={index}
                                    className={` rounded-[15px] border-2  h-[120px] m-6 flex-col gap-2 text-md w-[160px] flex justify-center items-center 
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
                    <div className="flex items-start w-full  order-1" style={{ fontFamily: "Bai Jamjuree" }}>
                        <div className="flex justify-center  font-semibold flex-col text-md items-center m-4 h-[500px] w-full md:w-[500px] lg:w-[350px] xl:w-[429px] shadow-addNew">
                            <div className=" bg-[#F5F5F5]  border-none rounded-[15px]  h-[480px] flex-col gap-2 text-md w-full flex justify-center items-center border-[border: 2px solid #161A1D]">
                                {/* {previewImage ? ( */}
                                <img
                                    src={Burgger}
                                    alt="Preview"
                                    className="h-auto w-auto object-cover"
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
                    className="w-full flex flex-col mt-[50px] gap-12 flex-wrap  font-semibold font-baiJamjuree"
                >
                    <div className="flex flex-col gap-2 ">
                        <p className="text-2xl self-start">Burger</p>
                        <p
                            className="text-[#DF201F] flex gap-1 font-montserrat"
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
                    <div className="flex flex-col gap-8  font-semibold w-full">
                        <span className="self-start">{t("userProductView.descriptionLabel")}</span>
                        <div className="w-full  font-montserrat flex-wrap font-semibold" >
                            <p className="text-[#A2A3A5] text-sm  w-full ">
                                If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay for the hosting
                            </p>
                        </div>
                        <div className="h-full w-full">
                            <Button className="bg-[#DF201F] text-xl rounded-[60px] text-white   w-full h-14">{t("userProductView.addToCartBtn")}</Button>
                        </div>
                    </div>

                </div>
            </div>

            <div className="flex flex-col gap-6 p-4">
                <div className=" flex  flex-col gap-4">
                    <span className="flex  justify-start pl-10 rounded-[0px, 60px, 60px, 0px] text-xl font-semibold  font-baiJamjuree" >
                        <span className="border-b-4 pb-3 rounded-r border-[#DF201F]">
                            Re
                        </span>
                        lated Products
                    </span>

                    <div className="flex flex-row flex-wrap">
                        {[0, 1, 2, 3].map((index) => (
                            <div className="sm:w-1/4 mb-10 w-full cursor-pointer px-8" key={index}>
                                <div className="flex justify-center font-semibold flex-col text-md items-center bg-[#FFF3E5] h-[200px] w-full rounded-[20px]">
                                    <img src={Burgger} alt="" className="h-20" />
                                    <p className="font-baiJamjuree font-semibold">Burger</p>
                                    <p className="flex gap-2 items-center text-[#DF201F] font-montserrat font-semibold ">
                                        ₹180
                                        <span className="text-xs line-through">₹200</span>
                                    </p>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
                <div className="flex flex-col gap-6">
                    <span className="flex  justify-start pl-10 rounded-[0px, 60px, 60px, 0px] text-xl font-semibold font-baiJamjuree ">
                        <span className="border-b-4 pb-3 rounded-r border-[#DF201F]">
                            Re
                        </span>
                        views
                    </span>
                    <div className="justify-start flex pl-10 flex-col gap-10">
                        {[0, 1, 2, 3].map((index) => (

                            <div className="flex flex-col  gap-4 " key={index}>
                                <div className="flex flex-row gap-2 ">
                                    <img src={ReviewProfile} alt="" className="" />
                                    <div className="flex flex-col">
                                        <span className="">Rajesh Singh</span>
                                        <div className="flex gap-2">
                                            <img src={Star} alt="" className="h-6" />
                                            <span className="text-lg">5</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="font-semibold text-sm font-montserrat text-[#99959E] ">
                                    <p className="text-pretty">
                                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more or less normal distribution
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-4 w-full">
                                    <img src={Pasta} alt="" className="h-24 w-auto" />
                                    <img src={Pasta} alt="" className="h-24 w-auto" />
                                    <img src={Pasta} alt="" className="h-24 w-auto" />
                                    <img src={Pasta} alt="" className="h-24 w-auto" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-6">
                    <span className="flex  justify-start pl-10 rounded-[0px, 60px, 60px, 0px] text-xl font-semibold  font-baiJamjuree" >
                        <span className="border-b-4 pb-3 rounded-r border-[#DF201F]">
                            Re
                        </span>
                        view Here
                    </span>
                    <div className="pl-10">
                        <div className="flex justify-start flex-col gap-4">
                            <textarea className="text-[#A2A3A5] resize-none border-1 rounded-[20px] opacity-[0.2] shadow-3xl font-semibold w-full h-full p-6" rows={6} placeholder="Comment Type Here...."></textarea>
                            <div className="flex flex-wrap flex-row justify-center font-baiJamjuree gap-4 h-full w-full">
                                <Button className="shadow-3xl flex  gap-2 p-4 font-semibold rounded-[15px] items-center w-[200px]  h-[50px]">
                                    <img src={AttachFile} alt="" className=" font-baiJamjuree font-semibold h-6 w-6" />
                                    {t("userProductView.chooseFiles")}
                                </Button>
                                <Button className="uppercase text-white w-[350px] font-semibold rounded-[60px] h-[50px] bg-[#94CD00] shadow-registerBtn">{t("userProductView.sendDocuments")}</Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* </Loader> */}
        </div>
    );
};

export default ProductView;
