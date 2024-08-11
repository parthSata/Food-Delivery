import { useAuth } from "@/context/AuthContext";
import { Link, useLocation } from "react-router-dom";

const routes = {
    restaurantView: [
        { path: "overView", label: "Overview" },
        // { path: "", label: "Order Online" },
        { path: "reviews", label: "Reviews" },
        // { path: "#", label: "Photos" },
    ],
};

function RestaurantHeader() {
    const { user } = useAuth();
    const location = useLocation();
    const { pathname } = location;

    const getRoutes = () => {
        if (!user) return [];
        if (user.role === "customer") return routes.restaurantView;
        return [];
    };

    const routeLinks = getRoutes().map((route) => (
        <li
            key={route.path}
            className={`items-center hover:text-red-500 hover:underline-offset-8 ${pathname.endsWith(route.path) ? "text-red-500 border-b-2 border-[#DF201F]" : ""
                }`}
        >
            <Link to={route.path} className="cursor-pointer">{route.label}</Link>
        </li>
    ));

    return (
        <div>
            <div className="">
                <nav className="px-4">
                    <ul className="flex justify-around flex-wrap gap-4 font-popins w-full h-full p-4 text-[#A2A3A5] text-xl border-b border-b-[#A2A3A5]">
                        {routeLinks}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default RestaurantHeader;
