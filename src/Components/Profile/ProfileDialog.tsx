import React, { useEffect, useRef } from "react";
import Button from "../ReusableComponent/Button";
import { Link } from "react-router-dom";
import { EditProfile, Favorites, PrivacyPolicy, ProfilePicture, TearmsAndCondition } from "@/assets";
import { useAuth } from "@/context/AuthContext";
interface AddProps {
    onClose: () => void;
    isOpen: boolean;
}

const ProfileDialog: React.FC<AddProps> = ({ isOpen, onClose }) => {
    const sideMenuRef = useRef<HTMLDivElement>(null);
    const { logout } = useAuth()
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
        <div ref={sideMenuRef} className="relative right-24 inset-0 flex z-50 justify-end p-4 ">
            <div className="absolute right-20 bg-white shadow-lg rounded-lg h-[500px] overflow-y-auto w-80">
                <div className="relative p-4 border-gray-200 flex justify-between items-center">
                    <span className="text-lg font-semibold">Profile</span>
                    <Button
                        className="absolute right-[14px]  text-white bg-red-500 rounded-full w-10 h-6 flex items-center justify-center"
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
                <div className="p-4 text-center">
                    <img
                        src={ProfilePicture}
                        alt="User Avatar"
                        className="w-28 h-28 rounded-full mx-auto"
                    />
                    <p className="mt-2 text-xl font-semibold">Hi, Bharrat</p>
                </div>
                <div className=" border-gray-200 ">
                    <Link to="#" className="flex p-4 border-b border-[#C4C4C4] items-center gap-4">

                        <div className="flex h-10 w-10 justify-center items-center text-sm bg-[#FFE5E5] rounded-full text-gray-700 hover:bg-gray-100  ">
                            <span className=""><img src={Favorites} alt="" className="" /></span>
                        </div>
                        <span className="">Favorites</span>
                    </Link>
                    <Link to="#" className="flex p-4 border-b border-[#C4C4C4] items-center gap-4">

                        <div className="flex h-10 w-10 justify-center items-center text-sm bg-[#FFE5E5] rounded-full text-gray-700 hover:bg-gray-100  ">
                            <span className=""><img src={EditProfile} alt="" className="" /></span>
                        </div>
                        <span className="">Edit Profile</span>
                    </Link>
                    <Link to="#" className="flex p-4 border-b border-[#C4C4C4] items-center gap-4">
                        <div className="flex h-10 w-10 justify-center items-center text-sm bg-[#FFE5E5] rounded-full text-gray-700 hover:bg-gray-100  ">
                            <span className=""><img src={PrivacyPolicy} alt="" className="" /></span>
                        </div>
                        <span className="">Privacy Policy</span>
                    </Link>
                    <Link to="#" className="flex p-4 border-b border-[#C4C4C4] items-center gap-4">
                        <div className="flex h-10 w-10 justify-center items-center text-sm bg-[#FFE5E5] rounded-full text-gray-700 hover:bg-gray-100  ">
                            <span className=""><img src={TearmsAndCondition} alt="" className="" /></span>
                        </div>
                        <span className="">Tearms And Condition</span>
                    </Link>
                    <Button onClick={logout} className="flex p-4 border-b border-[#C4C4C4] items-center gap-4">
                        <div className="flex h-10 w-10 justify-center items-center text-sm bg-[#FFE5E5] rounded-full text-gray-700 hover:bg-gray-100  ">
                            <span className=""><img src={EditProfile} alt="" className="" /></span>
                        </div>
                        <span className="">LogOut</span>
                    </Button>

                </div>
            </div>
        </div>
    );
};

export default ProfileDialog;
