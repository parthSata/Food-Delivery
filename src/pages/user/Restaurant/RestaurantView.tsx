import { Location, RestaurantImage1, Star } from "@/assets"
import { Button } from "@/Components"
import { t } from "i18next"
import RestaurantHeader from "./RestaurantHeader"
import { Outlet } from "react-router-dom"


function RestaurantView() {
    return (
        <div>
            <div className="p-8 flex gap-10 flex-wrap md:flex-nowrap lg:flex-nowrap xl:flex-nowrap">
                <img src={RestaurantImage1} alt="" className="h-[300px] rounded-lg sm:w-full xl:w-[450px]" />
                <div className="flex flex-col items-center justify-center gap-4">
                    <span className="self-start text-xl font-semibold font-baiJamjuree">Gajanan Restaurant</span>
                    <div className="flex flex-col gap-4 border-2 rounded-[20px] shadow-addNew h-auto w-full p-4">
                        <div className="flex gap-6 font-semibold">
                            <div className="flex">
                                <img src={Location} alt="" className="" />
                                <span className="">2.5Km</span>
                            </div>
                            <div className="flex gap-2">
                                {[0, 1, 2, 3, 4].map((index) => (
                                    <img src={Star} alt="" className="h-5" key={index} />
                                ))}
                            </div>
                        </div>
                        <div className="font-montserrat">
                            <p className="text-left text-sm font-semibold text-[#A2A3A5]"> North Indian, South Indian, Street Food
                                Mavdi, RajkotNorth Indian, South Indian, Street Food
                                Mavdi, RajkotNorth Indian, South Indian, Street Food
                                Mavdi, Rajkot
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button className="border border-[#DF201F] rounded-lg text-[#DF201F] p-1.5">
                                <i className="fa-solid fa-location-dot  fa-md text-direction"></i>{" "}
                                {t("restaurant.directionsButton")}
                            </Button>
                            <Button className="border border-[#DF201F] rounded-lg text-[#DF201F] p-1.5">
                                <i className="fa-solid fa-share  fa-md text-direction"></i>{" "}
                                {t("restaurant.shareBtn")}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-8">
                <RestaurantHeader />
                <Outlet />
            </div>
        </div>
    )
}

export default RestaurantView