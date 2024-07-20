import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Notification, Profile, Logo, menu } from "@/assets";
import Sidebar from "./Sidebar";
import { useAuth } from "../../context/AuthContext";

const routes = {
  admin: [
    { path: "/admin/categoryPage", label: "Category" },
    { path: "/admin/dashboard", label: "Dashboard" },
    { path: "/admin/products", label: "Products" },
    { path: "/admin/productsAdd", label: "ProductsAdd" },
    { path: "/admin/addRestaurants", label: "AddRestaurants" },
    { path: "/admin/restaurants", label: "Restaurants" },
    { path: "/admin/team", label: "Our Team" },
  ],
  seller: [
    { path: "/seller/", label: "Category" },
    { path: "/seller/dashboard", label: "Dashboard" },
    { path: "/seller/businessDetail", label: "BusinessDetail" },
    { path: "/seller/orders", label: "Orders" },
    { path: "/seller/products", label: "Products" },
    { path: "/seller/coupons", label: "Coupons" },
  ],
};

const DashboardHeader = () => {
  const [showSideMenu] = useState<boolean>(false);

  const toggleSideMenu = () => {
    const sideMenu = document.getElementById("side-menu");
    if (sideMenu) {
      sideMenu.classList.toggle("hidden");
    }
  };

  const { user } = useAuth();
  const location = useLocation();
  const { pathname } = location;

  const getRoutes = () => {
    if (!user) return [];
    if (user.role === "admin") return routes.admin;
    if (user.role === "seller") return routes.seller;
    return [];
  };

  const routeLinks = getRoutes().map((route) => (
    <li
      key={route.path}
      className={`py-6 items-center hover:text-red-500 hover:underline-offset-8 ${
        pathname === route.path
          ? "text-red-500 border-b-2 border-[#DF201F]"
          : ""
      } `}
    >
      <Link to={route.path}>{route.label}</Link>
    </li>
  ));

  return (
    <div className="h-full w-full mt-4">
      <Sidebar />
      <nav className="flex flex-wrap justify-between px-4 shadow-dashboard">
        <div className="flex items-center flex-row">
          <img src={Logo} className="ml-2 mr-2 h-10 w-10" alt="" />
          <Link to="/">
            <span className="text-xl sm:text-2xl md:text-lg font-bold">
              Food Delivery
            </span>
          </Link>
        </div>
        <div
          className={`md:flex items-center text-[14px] ${
            showSideMenu ? "" : "hidden"
          }`}
          style={{ fontFamily: "Bai Jamjuree" }}
        >
          <ul className={`flex items-center font-semibold text-[16px] gap-8`}>
            {routeLinks}
          </ul>
        </div>
        <div className="flex items-center">
          <img
            src={Profile}
            alt="Profile"
            className="h-[40px] w-[40px] border-r"
          />
          <div className="relative items-center justify-center ml-6 hidden md:flex">
            <img
              src={Notification}
              alt="Notification icon"
              className="h-[38px] w-[38px]"
            />
            <div className="absolute -top-1 right-0 left-[15px] rounded-full bg-[#DF201F] text-white text-center text-[14px] h-[20px] w-[26px]">
              10+
            </div>
          </div>
        </div>
      </nav>
      <div className="flex mt-4 md:hidden lg:hidden xl:hidden w-[95%] items-center p-2 mr-4">
        <div className="flex items-center w-[95%] p-4 border-2 gap-6 bg-[#DF201F]">
          <span className="">
            <img src={menu} alt="" className="" onClick={toggleSideMenu} />
          </span>
          <span className="text-lg text-white">Menu</span>
        </div>
        <div className="relative flex w-[15%] items-center justify-center bg-white">
          <img
            src={Notification}
            alt="Notification icon"
            className="absolute ml-4 h-[45px] w-[45px] top-[-10px]"
          />
          <div className="relative -top-2 left-[16px] rounded-full bg-[#DF201F] text-white text-center text-[14px] h-[20px] w-[26px]">
            10+
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
