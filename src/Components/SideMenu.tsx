import { useRef, useEffect } from "react";
import Dashboard from "../assets/HomePage/Dashboard.png";
import Orders from "../assets/HomePage/Orders.png";
import Restaurant from "../assets/HomePage/Restaurant.png";
import Menu from "../assets/HomePage/Menu.png";
import Logo from "../assets/Login/Logo1.png";

function SideMenu() {
  const sideMenuRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      sideMenuRef.current &&
      !sideMenuRef.current.contains(event.target as Node)
    ) {
      // Click occurred outside of side menu, close it
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

  return (
    <div>
      <div
        ref={sideMenuRef}
        id="side-menu"
        className="fixed top-0 left-0 h-screen sm:h-full w-[210px] md:hidden bg-white border-2 border-gray-600 z-50 transition duration-400 ease-in-out transform hidden"
      >
        <div className="flex flex-col m-6 font-bold gap- justify-center items-center">
          <img
            src={Logo}
            alt=""
            className="h-12 w-12 hover:border-2 p-[4px] rounded-lg"
          />
          <span className="text-[20px]"> Food Delivery</span>
        </div>
        <ul
          className={`flex font-medium text-[16px] mt-16 gap-10 w-full flex-col items-center justify-center overflow-x-scroll`}
          style={{ fontFamily: "Bai Jamjuree" }}
        >
          <li className="hover:text-red-600 flex justify-center items-center text-[18px] hover:underline-offset-8 w-full">
            <span className="flex flex-row gap-4 hover:bg-red-200 rounded-lg p-4">
              Dashboard
              <img src={Dashboard} className="h-6 w-6" alt="" />
            </span>
          </li>
          <li className="hover:text-red-600 flex justify-center items-center text-[18px] hover:underline-offset-8 w-full">
            <span className="flex flex-row gap-10 hover:bg-red-200 rounded-lg p-4">
              Menus
              <img src={Menu} className="h-8 w-10" alt="" />
            </span>
          </li>
          <li className="hover:text-red-600 flex justify-center items-center text-[18px] hover:underline-offset-8 w-full">
            <span className="flex flex-row gap-12 hover:bg-red-200 rounded-lg p-4">
              Orders
              <img src={Orders} className="h-6 w-6" alt="" />
            </span>
          </li>
          <li className="hover:text-red-600 flex justify-center items-center text-[18px] hover:underline-offset-8 w-full">
            <span className="flex flex-row gap-2 hover:bg-red-200 rounded-lg p-4">
              Restaurant List
              <img src={Restaurant} className="h-10 w-10" alt="" />
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideMenu;
