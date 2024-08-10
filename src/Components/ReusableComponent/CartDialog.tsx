import React, { useEffect, useRef } from "react";
import { Burger, DeletePng } from "@/assets";
import { Button } from "@/Components/index";

interface AddProps {
    onClose: () => void;
    isOpen: boolean;
}

const CartDialog: React.FC<AddProps> = ({ isOpen, onClose }) => {
    const sideMenuRef = useRef<HTMLDivElement>(null);


    if (!isOpen) return null;

    const handleOutsideClick = (event: MouseEvent) => {
        if (
            sideMenuRef.current &&
            !sideMenuRef.current.contains(event.target as Node)
        ) {
            onClose();
        }
    };


    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);


    return (
        <div ref={sideMenuRef} className="relative right-24 inset-0 flex z-50 justify-end  ">
            <div className="absolute right-20 bg-white shadow-lg rounded-lg h-auto overflow-y-auto w-[360px]">
                <div className="relative p-4 border-gray-200 flex justify-between items-center">
                    <span className="text-md font-baiJamjuree font-semibold">Cart</span>
                    <Button
                        className="absolute right-[14px]  text-white bg-red-500 rounded-full w-8 h-5 flex items-center justify-center"
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
                    </Button>
                </div>

                <div className="flex flex-col gap-4 overflow-y-auto  h-[300px]">
                    {[0, 1, 2, 3].map((index) => (
                        <div className="flex gap-4 p-4 items-center" key={index}>
                            <img src={Burger} alt="" className="w-auto " />
                            <div className="flex flex-col gap-1 font-semibold font-baiJamjuree">
                                <span className="text-md self-start">HamBurger</span>
                                <span className="text-xs self-start flex gap-2 text-[#DF201F] font-montserrat">
                                    ₹100<span className="line-through">₹200</span>
                                </span>
                                <div className="flex gap-2 items-center">
                                    <div className="flex justify-center items-center flex-row gap-4 bg-[#FFE5E5] rounded-[5px]">
                                        <div className="cursor-pointer">
                                            <i className="fa-solid p-2 fa-minus"></i>
                                        </div>
                                        <div className="border-[#000000] p-2 border-x border-opacity-[0.08] text-black">
                                            01
                                        </div>
                                        <div className="cursor-pointer">
                                            <i className="fa-solid p-2 fa-plus"></i>
                                        </div>
                                    </div>
                                    <div className="bg-[#DF201F] h-8 flex rounded justify-center items-center w-8">
                                        <img src={DeletePng} alt="" className="h-4 w-3" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4">
                    <Button className="uppercase rounded-[60px]  text-white font-semibold font-baiJamjuree text-md shadow-registerBtn  bg-[#94CD00] h-14 w-full">Checkout</Button>
                </div>
            </div>
        </div>
    );
};

export default CartDialog;
