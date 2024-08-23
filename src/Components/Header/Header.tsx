import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Notification, Profile, Logo, menu, Cart } from "@/assets";
import Sidebar from "./Sidebar";
import UserSidebar from "@/pages/user/header/PageSidebar";
import { useAuth } from "../../context/AuthContext";
import ProfileDialog from "../Profile/ProfileDialog";
import CartDialog from "../ReusableComponent/CartDialog";

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
  customer: [
    { path: "/customer/", label: "Home" },
    { path: "/customer/category", label: "Category" },
    { path: "/customer/about", label: "About" },
    { path: "/customer/dishes", label: "Dishes" },
    { path: "/customer/restaurantNearBy", label: "Restaurant" },
    { path: "/customer/gallary", label: "Gallary" },
  ]
};

const Header = () => {
  const [showSideMenu] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCartDialog, setIsCartDialog] = useState(false)


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
    if (user.role === "customer") return routes.customer;
    if (user.role === "seller") return routes.seller;
    return [];
  };

  const routeLinks = getRoutes().map((route) => (
    <li
      key={route.path}
      className={`py-6 items-center hover:text-red-500 hover:underline-offset-8 ${pathname === route.path
        ? "text-red-500 border-b-2 border-[#DF201F]"
        : ""
        } `}
    >
      <Link to={route.path}>{route.label}</Link>
    </li>
  ));
  const openDialog = () => {
    setIsDialogOpen(true)
  };
  const closeDialog = () => setIsDialogOpen(false);

  const openCartDialog = () => setIsCartDialog(true);
  const closeCartDialog = () => setIsCartDialog(false);

  return (
    <div className="h-full w-full ">
      {user?.role == 'seller' ? <Sidebar /> : <UserSidebar />}

      <nav className="flex flex-wrap justify-between  w-full px-4 shadow-dashboard">
        <div className="flex items-center flex-row">
          <img src={Logo} className="ml-2 mr-2 h-10 w-10" alt="" />
          <Link to="/">
            <span className="text-xl sm:text-2xl md:text-lg font-bold">
              Food Delivery
            </span>
          </Link>
        </div>
        <div
          className={`md:flex items-center text-[14px] ${showSideMenu ? "" : "hidden"
            }`}
          style={{ fontFamily: "Bai Jamjuree" }}
        >
          <ul className={`flex items-center font-semibold text-[16px] gap-8`}>
            {routeLinks}
          </ul>
        </div>
        <div className="flex flex-row  gap-4">
          <div className="flex items-center gap-4 justify-center  px-6">
            <img src={Profile} alt="" className=" h-12 w-12 cursor-pointer" onClick={openDialog} />
            {user?.role == 'customer' ? (
              <div className="relative items-center justify-center ml-6 hidden md:flex " >
                <img src={Cart} alt="" className=" h-[30px] w-[30px] cursor-pointer " onClick={openCartDialog} />
                <div className="absolute -top-1 left-4 right-0  rounded-full bg-[#DF201F] text-white text-center text-[14px] h-[20px] w-[26px]">
                  10+
                </div>
              </div>
            ) : ""}
            <div className="relative  items-center justify-center ml-6 hidden md:flex">
              <img src={Notification} alt="" className=" h-10 w-10 cursor-pointer" />
              <div className="absolute top-0 left-4 right-0  rounded-full bg-[#DF201F] text-white text-center text-[14px] h-[20px] w-[26px]">
                10+
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex mt-4 md:hidden bg-[#F5F5F5]  lg:hidden xl:hidden w-full items-center  ">
        <div className="flex items-center w-[70%]  p-4 border-2 gap-6 bg-[#DF201F]">
          <span className="">
            <img src={menu} alt="" className="cursor-pointer" onClick={toggleSideMenu} />
          </span>
          <span className="text-lg text-white">Menu</span>
        </div>
        {user?.role == 'customer' ? (
          <div className="relative flex w-[15%]  items-center justify-center  h-full">
            <img
              src={Cart}
              alt="Cart"
              className="absolute  h-8 w-8  cursor-pointer"
              onClick={openCartDialog}
            />
            <div className="relative -top-3  left-[10px] rounded-full bg-[#DF201F] text-white text-center text-[14px] h-[20px] flex justify-center items-center w-auto p-1">
              10+
            </div>
          </div>
        ) : ""}

        <div className={`relative flex  ${user?.role == 'customer' ? 'w-[15%]' : 'w-[25%]'}  items-center  justify-center  h-full`}>
          <img
            src={Notification}
            alt="Notification icon"
            className="absolute  h-[45px] w-[45px] cursor-pointer"
          />
          <div className="relative -top-3 left-[10px] rounded-full bg-[#DF201F] text-white text-center text-[14px] h-[20px] flex justify-center items-center w-auto p-1">
            10+
          </div>
        </div>
      </div>
      {isDialogOpen && (
        <ProfileDialog isOpen={isDialogOpen} onClose={closeDialog} />
      )}
      {isCartDialog && (
        <CartDialog isOpen={isCartDialog} onClose={closeCartDialog} />
      )}

    </div>
  );
};

export default Header;