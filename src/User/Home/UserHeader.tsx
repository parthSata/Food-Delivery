import { useState } from 'react'
import Sidebar from '../../Components/Dashboard/Sidebar';
import { Link, useLocation } from 'react-router-dom';
import { Logo, menu } from '../../Components/Config/images';


function UserHeader() {
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
        <div className="h-full w-full mt-4 flex  flex-wrap">
            <Sidebar />
            <nav
                className="flex w-full flex-wrap  justify-evenly "
                style={{ boxShadow: "  2px 2px 30px 2px #FFF3E5" }}
            >
                <div className="flex items-center flex-row">
                    <img src={Logo} className="ml-2 mr-2 h-10 w-10" alt="" />
                    <Link to="/">
                        <span className="text-xl sm:text-2xl md:text-lg font-bold">
                            Food Delivery
                        </span>
                    </Link>
                </div>
                <div
                    className={`md:flex item-center   text-[14px]  ${showSideMenu ? "" : "hidden"
                        }`}
                    style={{ fontFamily: "Bai Jamjuree" }}
                >
                    <ul className={`flex items-center   font-semibold text-[16px] gap-8 px-5`} >
                        <li
                            className={`py-6  items-center hover:text-red-500 hover:underline-offset-8 ${pathname === "/homepage"
                                ? "text-white  bg-[#DF201F] w-full"
                                : ""
                                } `}
                        >
                            <Link to="/homepage">Home</Link>
                        </li>
                        <li
                            className={` py-6 items-center hover:text-red-500 hover:underline-offset-8 ${pathname === "/category"
                                ? "text-white  bg-[#DF201F] w-full"
                                : ""
                                } `}
                        >
                            <Link to="/category">Category</Link>
                        </li>
                        <li
                            className={`py-6 hover:text-red-500 hover:underline-offset-8 ${pathname === "/about"
                                ? "text-white  bg-[#DF201F] w-full"
                                : ""
                                } `}
                        >
                            <Link to="/about">About</Link>
                        </li>
                        <li
                            className={`py-6 hover:text-red-500 hover:underline-offset-8 ${pathname === "/dishes"
                                ? "text-white  bg-[#DF201F] w-full"
                                : ""
                                } `}
                        >
                            <Link to="/dishes">Dishes</Link>
                        </li>
                        <li
                            className={`py-6 hover:text-red-500 hover:underline-offset-8 ${pathname === "/gallary"
                                ? "text-white  bg-[#DF201F] w-full"
                                : ""
                                } `}
                        >
                            <Link to="/gallary">Gallary</Link>
                        </li>
                        <li
                            className={`py-6 hover:text-red-500 hover:underline-offset-8 ${pathname === "/team"
                                ? "text-white  bg-[#DF201F] w-full"
                                : ""
                                } `}
                        >
                            <Link to="/team">Team</Link>
                        </li>
                        <li
                            className={`py-6 hover:text-red-500 hover:underline-offset-8 ${pathname === "/testimonials"
                                ? "text-white  bg-[#DF201F] w-full"
                                : ""
                                } `}
                        >
                            <Link to="/testimonials">Testimonials</Link>
                        </li>
                        <li
                            className={`py-6 hover:text-red-500 hover:underline-offset-8 ${pathname === "/team"
                                ? "text-white  bg-[#DF201F] w-full"
                                : ""
                                } `}
                        >
                            <Link to="/news">News</Link>
                        </li>
                        <li
                            className={`py-6  hover:text-red-500 hover:underline-offset-8 ${pathname === "/contactUs"
                                ? "text-white  bg-[#DF201F] w-full"
                                : ""
                                } `}
                        >
                            <Link to="/contactUs">Contact Us</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="flex mt-4  md:hidden lg:hidden xl:hidden w-[95%] items-center p-2 mr-4">
                <div className="flex items-center w-[95%] p-4 border-2 gap-6 bg-[#DF201F]">
                    <span className="">
                        <img src={menu} alt="" className="" onClick={toggleSideMenu} />
                    </span>
                    <span className="text-lg text-white ">Menu</span>
                </div>
            </div>
        </div>
    )

}

export default UserHeader
