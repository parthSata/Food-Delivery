import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { EditProfile, Favorites, Order, PrivacyPolicy, ProfilePicture, TearmsAndCondition } from "@/assets";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/Components/index";
interface AddProps {
    onClose: () => void;
    isOpen: boolean;
}

const ProfileDialog: React.FC<AddProps> = ({ isOpen, onClose }) => {
    const sideMenuRef = useRef<HTMLDivElement>(null);
    const { logout, user } = useAuth()


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
            <div className="absolute right-20 bg-white shadow-lg rounded-lg h-auto overflow-y-auto w-72">
                <div className="relative p-4 border-gray-200 flex justify-between items-center">
                    <span className="text-md font-baiJamjuree font-semibold">Profile</span>
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
                    </Button>''
                </div>
                <div className=" text-center">
                    <img
                        src={ProfilePicture}
                        alt="User Avatar"
                        className="w-16 h-16 rounded-full mx-auto"
                    />
                    <p className=" text-md font-semibold">Hi, Bharrat</p>
                </div>
                <div className=" border-gray-200 font-semibold">
                    {user?.role == "customer" && "seller" ? (
                        <Link to="#" className="flex p-4 border-b border-[#C4C4C4] items-center gap-4">

                            <div className="flex h-8 w-8 justify-center items-center text-sm bg-[#FFE5E5] rounded-full text-gray-700 hover:bg-gray-100  ">
                                <span className=""><img src={Order} alt="" className="w-4 h-4" /></span>
                            </div>
                            <span className="">Orders</span>
                        </Link>) : (
                        <Link to="#" className="flex p-4 border-b border-[#C4C4C4] items-center gap-4">

                            <div className="flex h-8 w-8 justify-center items-center text-sm bg-[#FFE5E5] rounded-full text-gray-700 hover:bg-gray-100  ">
                                <span className=""><img src={Favorites} alt="" className="w-4 h-4" /></span>
                            </div>
                            <span className="">Favorites</span>
                        </Link>
                    )}
                    <Link to="#" className="flex p-4 border-b border-[#C4C4C4] items-center gap-4">

                        <div className="flex h-8 w-8 justify-center items-center text-sm bg-[#FFE5E5] rounded-full text-gray-700 hover:bg-gray-100  ">
                            <span className=""><img src={EditProfile} alt="" className="w-4 h-4" /></span>
                        </div>
                        <span className="">Edit Profile</span>
                    </Link>
                    <Link to="#" className="flex p-4 border-b border-[#C4C4C4] items-center gap-4">
                        <div className="flex h-8 w-8 justify-center items-center text-sm bg-[#FFE5E5] rounded-full text-gray-700 hover:bg-gray-100  ">
                            <span className=""><img src={PrivacyPolicy} alt="" className="w-4 h-4" /></span>
                        </div>
                        <span className="">Privacy Policy</span>
                    </Link>
                    <Link to="#" className="flex p-4 border-b border-[#C4C4C4] items-center gap-4">
                        <div className="flex h-8 w-8 justify-center items-center text-sm bg-[#FFE5E5] rounded-full text-gray-700 hover:bg-gray-100  ">
                            <span className=""><img src={TearmsAndCondition} alt="" className="w-4 h-4" /></span>
                        </div>
                        <span className="">Tearms And Condition</span>
                    </Link>
                    <Button onClick={logout} className="flex p-4 border-b border-[#C4C4C4] items-center gap-4">
                        <div className="flex h-8 w-8 justify-center items-center text-sm bg-[#FFE5E5] rounded-full text-gray-700 hover:bg-gray-100  ">
                            <span className=""><img src={EditProfile} alt="" className="w-4 h-4" /></span>
                        </div>
                        <span className="">LogOut</span>
                    </Button>

                </div>
            </div>
        </div>
    );
};

export default ProfileDialog;
