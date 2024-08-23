import { Burger, Manchurian, Pasta, search } from "@/assets";
import { Input } from "@/Components";
import CategoryMenu from "./CategoryMenu";
import { t } from "i18next";
import ProductCard from "./ProductCard";

function OrderOnline() {
    return (
        <div className="flex flex-row h-screen">
            {/* Sidebar */}
            <div className="w-1/4 sticky top-0">
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
                        <div>
                            <div className="flex relative items-center gap-8">
                                <img src={search} alt="" className="absolute pl-1" />
                                <Input type="text" placeholder="Search Within Menu" className="border-2 rounded pl-8 py-4" />
                            </div>
                        </div>
                    </div>

                    {/* Example Product */}
                    <div className="flex justify-start flex-col">
                        <div className="flex gap-4">
                            {[0, 1].map((index) => (
                                <div key={index} className="flex flr gap-2 justify-start items-center">
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
                    <div className="flex flex-col text-left gap-4 border-b pb-4">
                        <span className="text-xl font-semibold">Meal</span>
                        <div>
                            <ProductCard imageSrc={Manchurian} price="200" title="Butter Bhaji Pulao [250 Grams]" rating={3} altText="Burger" />
                            <ProductCard imageSrc={Burger} price="200" title="Butter Bhaji Pulao [250 Grams]" rating={3} altText="Burger" />
                            <ProductCard imageSrc={Pasta} price="200" title="Butter Bhaji Pulao [250 Grams]" rating={3} altText="Burger" />
                        </div>
                    </div>
                    <div className="flex flex-col text-left gap-4 border-b pb-4">
                        <span className="text-xl font-semibold">Meal</span>
                        <div>
                            <ProductCard imageSrc={Manchurian} price="200" title="Butter Bhaji Pulao [250 Grams]" rating={3} altText="Burger" />
                            <ProductCard imageSrc={Burger} price="200" title="Butter Bhaji Pulao [250 Grams]" rating={3} altText="Burger" />
                            <ProductCard imageSrc={Pasta} price="200" title="Butter Bhaji Pulao [250 Grams]" rating={3} altText="Burger" />
                        </div>
                    </div>
                    <div className="flex flex-col text-left gap-4 border-b pb-4">
                        <span className="text-xl font-semibold">Meal</span>
                        <div>
                            <ProductCard imageSrc={Manchurian} price="200" title="Butter Bhaji Pulao [250 Grams]" rating={3} altText="Burger" />
                            <ProductCard imageSrc={Burger} price="200" title="Butter Bhaji Pulao [250 Grams]" rating={3} altText="Burger" />
                            <ProductCard imageSrc={Pasta} price="200" title="Butter Bhaji Pulao [250 Grams]" rating={3} altText="Burger" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderOnline;
