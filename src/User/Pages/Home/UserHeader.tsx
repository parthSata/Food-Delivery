import { useState } from 'react';
import Sidebar from '../../../Components/Dashboard/Sidebar';
import { Link, useLocation } from 'react-router-dom';
import { Logo, menu } from '../../../Components/Config/images';
import { useAuth } from '../../../Components/AuthContext';

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

function UserHeader() {
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
    if (user.role === 'customer') return routes.customer;
    return [];
  };

  const routeLinks = getRoutes().map((route) => (
    <li
      key={route.path}
      className={`py-6 items-center hover:text-red-500 hover:underline-offset-8 ${pathname === route.path ? "text-white bg-[#DF201F] w-full" : ""}`}
    >
      <Link to={route.path}>{route.label}</Link>
    </li>
  ));

  return (
    <div className="h-full w-full mt-4 flex flex-wrap">
      <Sidebar />
      <nav className="flex w-full flex-wrap justify-evenly shadow-dashboard" >
        <div className="flex items-center flex-row">
          <img src={Logo} className="ml-2 mr-2 h-10 w-10" alt="Logo" />
          <Link to="/">
            <span className="text-xl sm:text-2xl md:text-lg font-bold">Food Delivery</span>
          </Link>
        </div>
        <div className={`md:flex item-center text-[14px] ${showSideMenu ? "" : "hidden"}`} style={{ fontFamily: "Bai Jamjuree" }}>
          <ul className="flex items-center font-semibold w-full text-[16px] gap-8">
            {routeLinks}
          </ul>
        </div>
      </nav>
      <div className="flex mt-4 md:hidden lg:hidden xl:hidden w-[95%] items-center p-2 mr-4">
        <div className="flex items-center w-[95%] p-4 border-2 gap-6 bg-[#DF201F]">
          <span className="">
            <img src={menu} alt="Menu" className="" onClick={toggleSideMenu} />
          </span>
          <span className="text-lg text-white">Menu</span>
        </div>
      </div>
    </div>
  );
}

export default UserHeader;
