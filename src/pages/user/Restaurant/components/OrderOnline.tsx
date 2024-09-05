import { useState, useEffect } from "react";
import { Burger, Close, Manchurian, Pasta } from "@/assets";
import { Input } from "@/Components";
import CategoryMenu from "./CategoryMenu";
import { t } from "i18next";
import ProductCard from "./ProductCard";

function OrderOnline() {
    const products = [
        { imageSrc: Manchurian, price: "₹200", title: "Butter Bhaji Pulao [250 Grams]", rating: 5, altText: "Manchurian" },
        { imageSrc: Burger, price: "₹200", title: "Burger", rating: 4, altText: "Burger" },
        { imageSrc: Pasta, price: "₹200", title: "Pasta", rating: 4, altText: "Pasta" },
    ];

    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        const filtered = products.filter(product =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchQuery, products]);

    return (
        <div className="flex  flex-col gap-10">
            <div className="flex flex-row h-screen">
                {/* Sidebar */}
                <div className="w-1/4 sticky top-0 h-full overflow-y-auto">
                    <CategoryMenu />
                </div>

                {/* Products */}
                <div className="w-3/4 overflow-y-auto p-6 flex flex-col gap-4 h-screen">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row justify-between flex-wrap gap-4">
                            <div className="text-left flex flex-col gap-4">
                                <span className="text-2xl font-semibold">{t("orderOnline.title")}</span>
                                <div className="flex items-center gap-4 flex-wrap justify-center">
                                    <span className=""><i className="fa-regular fa-compass fa-lg"></i></span>
                                    <span className="text-gray-600 border-r-2 pr-4">{t("orderOnline.trackOrder")}</span>
                                    <span className="text-gray-600">• 22 min</span>
                                </div>
                            </div>
                            <div className="relative w-full max-w-md ">
                                <div className="flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 absolute left-3 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Search within menu"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full max-w-[300px] rounded py-2 pl-10 pr-10 border-2 focus:outline-none text-gray-600"
                                    />
                                    <button onClick={() => setSearchQuery("")} className="absolute right-[160px] text-gray-400 hover:text-gray-600">
                                        <img src={Close} alt="Close" className="h-4 w-6" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Example Product */}
                        <div className="flex justify-start flex-col">
                            <div className="flex gap-4">
                                {[0, 1].map((index) => (
                                    <div key={index} className="flex gap-2 justify-start items-center">
                                        <Input
                                            type="checkbox"
                                            className="accent-[#DF201F] h-4 w-4"
                                            name="Bakery"
                                            id=""
                                        />
                                        <span className="">{t("restaurantTypes.bakery")}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product, index) => (
                                <div key={index} className="flex flex-col text-left gap-4 border-b pb-4">
                                    <span className="text-xl font-semibold">Meal</span>
                                    <ProductCard
                                        imageSrc={product.imageSrc}
                                        price={product.price}
                                        title={product.title}
                                        rating={product.rating}
                                        altText={product.altText}
                                    />
                                    <ProductCard
                                        imageSrc={product.imageSrc}
                                        price={product.price}
                                        title={product.title}
                                        rating={product.rating}
                                        altText={product.altText}
                                    />
                                    <ProductCard
                                        imageSrc={product.imageSrc}
                                        price={product.price}
                                        title={product.title}
                                        rating={product.rating}
                                        altText={product.altText}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-600">
                                No products found
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Additional content */}
            <div className="flex gap-4 flex-col">
                <div className="font-baiJamjuree text-left flex flex-col gap-2">
                    <span className="font-semibold text-lg uppercase">Related to Gajanan Resort, Depaliya Rajkot - Jamnagar Highway</span>
                    <p className="font-extralight font-montserrat text-md text-[#B5B5B5] ">
                        Restaurants in Rajkot, Rajkot Restaurants, Junction Plot restaurants, Best Junction Plot restaurants, Rajkot City restaurants, Quick Bites in Rajkot, Quick Bites near me, Quick Bites in Junction Plot, in Rajkot, near me, in Junction Plot, in Rajkot, near me, in Junction Plot, Order food online in Junction Plot, Order food online in Rajkot
                    </p>
                </div>
                {/* Repeated content */}
            </div>
        </div>
    );
}

export default OrderOnline;
