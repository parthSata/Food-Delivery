import { useState } from "react";
import Notification from "../assets/HomePage/Notification.png";
import Profile from "../assets/HomePage/Profile.png";
import Logo from "../assets/Login/Logo1.png";
import { Link, useLocation } from "react-router-dom";

function Header(): JSX.Element {
  const [showSideMenu] = useState<boolean>(false);

  const toggleSideMenu = () => {
    const sideMenu = document.getElementById("side-menu");
    if (sideMenu) {
      sideMenu.classList.toggle("hidden");
    }
  };

  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="h-full w-full">
      <nav
        className=" bg-[#FFFFFF] flex-1 flex justify-between "
        style={{ boxShadow: "  2px 2px 30px 2px #FFF3E5" }}
      >
        <div className="flex items-center">
          <img src={Logo} className="ml-2 mr-2 h-10 w-10" alt="" />
          <span className="text-[24px] font-bold">Food Delivery</span>
        </div>
        <div
          className={`  md:flex item-center text-[14px] ${
            showSideMenu ? "" : "hidden"
          }`}
          style={{ fontFamily: "Bai Jamjuree" }}
          id="navbar-default"
        >
          <ul className={`flex items-center  font-semibold text-[16px] gap-8`}>
            <li
              className={` hover:text-red-500 hover:underline-offset-8 ${
                pathname === "/dashboard" ? "bg-red-500" : ""
              } `}
            >
              <Link to="/#">Dashboard</Link>
            </li>
            <li
              className={` hover:text-red-500 hover:underline-offset-8 ${
                pathname === "/menus" ? "bg-red-500" : ""
              } `}
            >
              <Link to="/#">Menus</Link>
            </li>
            <li
              className={` hover:text-red-500 hover:underline-offset-8 ${
                pathname === "/orders" ? "bg-red-500" : ""
              } `}
            >
              <Link to="/#">Orders</Link>
            </li>
            <li
              className={` hover:text-red-500 hover:underline-offset-8 ${
                pathname === "/restaurant-list" ? "bg-red-500" : ""
              } `}
            >
              <Link to="/#">Restaurant List</Link>
            </li>
          </ul>
        </div>
        <div className="flex justify-between ">
          <img src={Profile} alt="" className="h-[40px] w-[40px] border-r " />
          <div className="relative flex items-center justify-center mr-6">
            <img
              src={Notification}
              alt="Notification icon"
              className="absolute ml-4 h-[37.74px] w-[37.74px] top-0 "
            />
            <div className="relative rounded-full p-[2px] left-[14px] top-[-10px] ml-2 h-[22px] w-[24px] text-[12px] bg-[#DF201F] text-white text-center z-[1]">
              10+
            </div>
          </div>
          {/* Menu icon */}
          <button
            type="button"
            className="block md:hidden p-2 mr-4"
            onClick={toggleSideMenu}
          >
            <svg
              className="w-6 h-6 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Header;
