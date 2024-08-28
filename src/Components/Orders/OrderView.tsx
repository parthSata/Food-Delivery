import { t } from "i18next"
import { Button } from ".."
import { Burger, Location, RestaurantImage1, Star } from "@/assets"
import { useNavigate } from "react-router-dom"

function OrderView() {

    const navigate = useNavigate()

    const handleMoreInfo = () => {
        navigate('/customer/restaurantNearBy')
    }

    return (
        <div>
            <div className="p-10 flex flex-col gap-4">
                <div className="flex justify-between flex-wrap  items-center gap-4">
                    <div className="">
                        <span className="" style={{ fontFamily: "Bai Jamjuree" }}>
                            {t("orders.orderNumber")}
                        </span>
                        <p
                            className="text-[#A2A3A5] text-xs "
                            style={{ fontFamily: "Montserrat Alternates" }}
                        >
                            {t("orderView.orderDateTime")}
                        </p>
                    </div>
                    <div className="">
                        <Button className="uppercase shadow-registerBtn w-[300px] bg-[#94CD00] h-12 text-white font-baiJamjuree sm:w-[200px] md:w-[200px] rounded-[60px]">
                            Track Order
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col font-baiJamjuree gap-6">
                    <div className="flex flex-col flex-wrap gap-2">
                        <span className="self-start font-semibold">Order Items</span>
                        <div className="flex gap-2 flex-wrap sm:flex-nowrap md:flex-nowrap ">
                            {[0, 1, 2, 3].map((index) => (
                                <div
                                    className="flex flex-row gap-2 w-full p-4 flex-wrap h-auto justify-center border-2  rounded-[10px]  items-center font-baiJamjuree"
                                    key={index}
                                >
                                    <img src={Burger} alt="" className="h-[50px]" />
                                    <div className="flex flex-col ">
                                        <span className="">Hamburger</span>
                                        <span className="text-[#DF201F] self-start text-sm">
                                            ₹100
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col px-16 gap-4">
                        <div className="border-b-2 flex justify-between items-center pb-4  border-dashed border-[#C4C4C4]">
                            <span className="text-lg">{t("checkOut.totalBill")}</span>
                            <span className="">{t("checkOut.price")}</span>
                        </div>
                        <div className="border-b flex justify-between items-center pb-4  border-[#C4C4C4]">
                            <span className="text-[#A2A3A5] text-lg">
                                {t("checkOut.deliveryCharge")}
                            </span>
                            <span className="text-[#A2A3A5] text-lg">₹0.00</span>
                        </div>
                        <div className="border-b flex justify-between items-center pb-4  border-[#C4C4C4]">
                            <span className="text-[#A2A3A5] text-lg">
                                {t("checkOut.packagingCharge")}
                            </span>
                            <span className="text-[#A2A3A5] text-lg">₹9</span>
                        </div>
                        <div className="border-b flex justify-between items-center pb-4  border-[#C4C4C4]">
                            <span className="text-[#A2A3A5] text-lg">
                                {t("checkOut.taxAmount")}
                            </span>
                            <span className="text-[#A2A3A5] text-lg">₹15</span>
                        </div>
                        <div className="border-b flex justify-between items-center pb-4  border-[#C4C4C4]">
                            <span className="text-[#A2A3A5] text-lg">
                                {t("checkOut.totalDiscount")}
                            </span>
                            <span className="text-[#A2A3A5] text-lg">₹0.00</span>
                        </div>
                        <div className="border-b-2 flex justify-between items-center pb-4 border-dashed border-[#C4C4C4]">
                            <span className="text-[#A2A3A5] text-lg">
                                {t("checkOut.couponDiscount")}
                            </span>
                            <span className="text-[#A2A3A5] text-lg">₹0.00</span>
                        </div>
                        <div className=" flex justify-between items-center ">
                            <span className=" text-lg">{t("checkOut.grandTotal")}</span>
                            <span className=" text-lg text-[#DF201F]">₹324</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center flex-wrap gap-4">
                            <span className="self-start">Restaurant Details</span>
                            <Button className="uppercase shadow-registerBtn  bg-[#94CD00] sm:w-[200px] md:w-[200px]  h-12 text-white font-baiJamjuree w-[300px] rounded-[60px]" onClick={handleMoreInfo}>More Info</Button>
                        </div>
                        <div className="flex gap-10 flex-wrap md:flex-nowrap lg:flex-nowrap xl:flex-nowrap">
                            <img src={RestaurantImage1} alt="" className="h-[200px] rounded-lg sm:w-full xl:w-[450px]" />
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderView