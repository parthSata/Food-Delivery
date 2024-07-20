import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo, menu, Notification, Profile, Cart } from "@/assets";
import { useAuth } from "../../../Components/AuthContext";
import PageSidebar from "./PageSidebar";

const routes = {
  customer: [
    { path: "/customer/", label: "Home" },
    { path: "/customer/category", label: "Category" },
    { path: "/customer/about", label: "About" },
    { path: "/customer/dishes", label: "Dishes" },
    { path: "/customer/gallery", label: "Gallery" },
    { path: "/customer/team", label: "Team" },
    { path: "/customer/testimonials", label: "Testimonials" },
    { path: "/customer/news", label: "News" },
    { path: "/customer/contactUs", label: "Contact Us" },
  ],
};

function PageHeader() {
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
    if (user.role === "customer") return routes.customer;
    return [];
  };

  const routeLinks = getRoutes().map((route) => (
    <li
      key={route.path}
      className={`py-6 items-center hover:text-red-500 hover:underline-offset-8 ${
        pathname === route.path ? "text-white bg-[#DF201F] w-full" : ""
      }`}
    >
      <Link to={route.path}>{route.label}</Link>
    </li>
  ));

  return (
    <div>
      <div className="h-full w-full mt-4 flex flex-wrap px-">
        <PageSidebar />
        <nav className="flex w-full flex-wrap justify-between px-4 shadow-dashboard">
          <div className="flex items-center flex-row">
            <img src={Logo} className="ml-2 mr-2 h-10 w-10" alt="Logo" />
            <Link to="/">
              <span className="text-xl sm:text-2xl md:text-lg font-bold">
                Food Delivery
              </span>
            </Link>
          </div>
          <div
            className={`md:flex item-center text-[14px] ${
              showSideMenu ? "" : "hidden"
            }`}
            style={{ fontFamily: "Bai Jamjuree" }}
          >
            <ul className="flex items-center font-semibold w-full text-[16px] gap-8">
              {routeLinks}
            </ul>
          </div>
          <div className="flex flex-row  gap-4">
            <div className="flex items-center gap-4 justify-center  px-6">
              <img src={Profile} alt="" className=" h-12 w-12" />
              <div className="relative items-center justify-center ml-6 hidden md:flex">
                <img src={Cart} alt="" className=" h-8 w-8" />
                <div className="absolute -top-1 left-4 right-0  rounded-full bg-[#DF201F] text-white text-center text-[14px] h-[20px] w-[26px]">
                  10+
                </div>
              </div>
              <div className="relative items-center justify-center ml-6 hidden md:flex">
                <img src={Notification} alt="" className=" h-10 w-10" />
                <div className="absolute top-0 left-4 right-0  rounded-full bg-[#DF201F] text-white text-center text-[14px] h-[20px] w-[26px]">
                  10+
                </div>
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
          <div className="relative flex w-[20%] items-center justify-center bg-white">
            <img
              src={Cart}
              alt="Cart"
              className="absolute ml-4 h-8 w-8 top-[-10px]"
            />
            <div className="relative -top-4  left-8 rounded-full bg-[#DF201F] text-white text-center text-[14px] h-[20px] w-[26px]">
              10+
            </div>
          </div>
          <div className="relative flex w-[15%] items-center justify-center bg-white">
            <img
              src={Notification}
              alt="Notification icon"
              className="absolute  h-[45px] w-[45px] "
            />
            <div className="relative -top-2 left-[16px] rounded-full bg-[#DF201F] text-white text-center text-[14px] h-[20px] w-[26px]">
              10+
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageHeader;
