import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

const routes = {
    restaurantView: [
        { path: "overView", label: "Overview" },
        { path: "orderOnline", label: "Order Online" },
        { path: "reviews", label: "Reviews" },
        { path: "photos", label: "Photos" },
    ],
};

function RestaurantHeader() {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const { pathname } = location;

    // Function to get routes based on user role
    const getRoutes = () => {
        if (!user) return [];
        if (user.role === "customer") return routes.restaurantView;
        return [];
    };

    // Set "Overview" as the default route
    useEffect(() => {
        const baseRoute = "/customer/restaurantView"; // Adjust this to your base route
        const overviewPath = `${baseRoute}/overView`;
        if (pathname === baseRoute || pathname === `${baseRoute}/`) {
            navigate(overviewPath);
        }
    }, [pathname, navigate]);

    const routeLinks = getRoutes().map((route) => (
        <li
            key={route.path}
            className={`items-center hover:text-red-500 pb-4 hover:underline-offset-8 ${pathname.endsWith(route.path) ? "text-red-500 border-b-2 border-[#DF201F]" : ""
                }`}
        >
            <Link to={route.path} className="cursor-pointer">
                {route.label}
            </Link>
        </li>
    ));

    return (
        <div>
            <div className="">
                <nav className="px-4">
                    <ul className="flex justify-around flex-wrap gap-4 font-popins w-full h-full text-[#A2A3A5] text-xl border-b border-b-[#A2A3A5]">
                        {routeLinks}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default RestaurantHeader;
