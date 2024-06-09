import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'

function GallaryHeader() {
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
    return (
        <div className='bg-[#D9D9D9]'>
            <nav className="flex flex-row  justify-between flex-wrap items-center mt-4 p-4 " style={{ fontFamily: "Bai Jamjuree" }}>
                <div className="text-2xl">
                    <span className="border-b-4 rounded-[0px, 60px, 60px, 0px] pb-4 border-[#DF201F] mb-4">Gallary</span>
                </div>
                <ul className="flex gap-10    items-center text-lg ">
                    <li className="text-[#fefefe] items-center flex justify-center h-14 w-28  rounded-[60px] bg-[#94CD00] ">
                        <Link to="/">All</Link>
                    </li>
                    <li className="text-[#161A1D]">
                        <Link to="/">Veg</Link>
                    </li>
                    <li className="text-[#161A1D]">
                        <Link to="/">Non Veg</Link>
                    </li>
                    <li className="text-[#161A1D]">
                        <Link to="/">Dishes</Link>
                    </li>
                    <li className="text-[#161A1D]">
                        <Link to="/">Restaurant</Link>
                    </li>
                    <li className="text-[#161A1D]">
                        <Link to="/">Chinese</Link>
                    </li>
                </ul>
                <div className="md:hidden ">
                    <button className=""><i className="fa-solid fa-bars hover:fa-shake fa-lg" style={{ color: "#232424" }}></i></button>
                </div>
            </nav>
        </div>
    )
}

export default GallaryHeader
