import { useRef, useEffect } from "react";
import { Orders, Logo } from "@/assets";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const routes = {
  customer: [
    { path: "/customer/", label: "Home", image: Orders },
    { path: "/customer/category", label: "Category", image: Orders },
    { path: "/customer/about", label: "About", image: Orders },
    { path: "/customer/dishes", label: "Dishes", image: Orders },
    { path: "/customer/restaurantNearBy", label: "Restaurant Nearby", image: Orders },
  ],
};

function Sidebar() {
  const sideMenuRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      sideMenuRef.current &&
      !sideMenuRef.current.contains(event.target as Node)
    ) {
      closeSideMenu();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const closeSideMenu = () => {
    if (sideMenuRef.current) {
      sideMenuRef.current.classList.add("hidden");
    }
  };

  const { user } = useAuth();

  const getRoutes = () => {
    if (!user) return [];
    if (user.role === "customer") return routes.customer;
    return [];
  };

  const routeLinks = getRoutes().map((route: any) => (
    <li
      key={route.path}
      className={`hover:text-red-600 flex justify-center items-center text-[18px] hover:underline-offset-8 w-full} `}
    >
      <span className="flex flex-row gap-4 hover:bg-red-200 rounded-lg p-4">
        <img src={route.image} className="h-6 w-6" alt="" />
        <Link to={route.path}>{route.label}</Link>
      </span>
    </li>
  ));

  return (
    <>
      <div
        ref={sideMenuRef}
        id="side-menu"
        className="fixed top-0 left-0 h-full sm:h-full w-[210px] md:hidden overflow-y-auto bg-white border-2 border-gray-600 z-50 transition duration-400 ease-in-out transform hidden"
      >
        <div className="flex flex-col m-6 font-bold gap- justify-center items-center">
          <img
            src={Logo}
            alt=""
            className="h-12 w-12 hover:border-2 p-[4px] rounded-lg"
          />
          <span className="text-[20px]">Food Delivery</span>
        </div>
        <ul
          className={`flex font-medium text-[16px] mt-16 gap-10 w-full flex-col items-center justify-center overflow-x-scroll`}
          style={{ fontFamily: "Bai Jamjuree" }}
        >
          {routeLinks}
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
