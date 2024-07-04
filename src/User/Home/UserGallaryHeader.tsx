import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function UserGallaryHeader() {
    const sideMenuRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        setIsMenuOpen(false);
    };
    return (
        <div className='bg-[#D9D9D9]'>
            <nav className="flex flex-row  justify-between gap-4 flex-wrap items-center mt-4 p-4 " style={{ fontFamily: "Bai Jamjuree" }}>
                <div className="text-2xl flex justify-between flex-wrap font-semibold m-2">
                    <span className=" rounded-[0px, 60px, 60px, 0px] p-4  mb-4"><span className="border-b-4 pb-3 rounded-r border-[#DF201F]">Ga</span>llary</span>
                </div>

                {/* @ts-ignore */}
                <ul className={`lg:flex gap-10 items-center text-lg ${isMenuOpen ? 'block' : 'hidden'} lg:block`} ref={sideMenuRef}>
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
                <div className="lg:hidden relative">
                    <select
                        onChange={(e) => {
                            const selectedPath = e.target.value;
                            if (selectedPath) {
                                window.location.href = selectedPath;
                            }
                        }}
                        className="block  w-full bg-blue-600 text-white border border-gray-400 hover:border-gray-500 px-2 py-2 pr-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select a category</option>
                        <option value="/">All</option>
                        <option value="/veg">Veg</option>
                        <option value="/non-veg">Non Veg</option>
                        <option value="/dishes">Dishes</option>
                        <option value="/restaurant">Restaurant</option>
                        <option value="/chinese">Chinese</option>
                    </select>


                </div>
            </nav>
        </div>
    )
}

export default UserGallaryHeader