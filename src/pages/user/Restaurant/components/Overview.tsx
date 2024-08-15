import { Button } from "@/Components"
import { t } from "i18next"

function Overview() {
    return (
        <div className="">
            <div className="flex justify-between p-8 flex-wrap gap-6 md:flex-nowrap lg:flex-nowrap xl:flex-nowrap">
                {/* Overview */}
                <div className="flex gap-4 flex-col ">
                    <div className="text-left font-semibold">
                        <span className="text-2xl">About This Page</span>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="font-popins flex flex-col text-left gap-1">
                            <span className="text-xl">Popular Dishes</span>
                            <span className="text-lg ">Raj Bhog, Rajkachori, Kaju Katli, Raj Kachori, Rasgulla, Noodles</span>
                        </div>
                        <div className="font-popins flex flex-col text-left gap-1">
                            <span className="text-xl">People Say This Place Is Known For</span>
                            <span className="text-lg ">Unlimited Refills, Bang for the Buck, Elegantly Decorated, Cute Little Place, Seating Capacity, Fantastic Place</span>
                        </div>
                    </div>
                </div>

                {/* Contact Us */}
                <div className="font-montserrat flex flex-col  gap-4 outline-none p-4 shadow-addNew">
                    <div className="flex flex-col gap-2">
                        <div className="text-left text-xl">
                            <span className="">Call</span>
                        </div>
                        <div className="flex text-lg flex-col text-left   text-[#DF201F]">
                            <span className="">+91 7874986845</span>
                            <span className="">+91 7874986845</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-left text-xl">
                            <span className="text-xl">Direcction</span>
                        </div>
                        <div className="">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.3535633613064!2d70.79481697413262!3d22.30246437968508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959ca1d793be827%3A0x2b185cbf417bb34b!2sSargam%20Food!5e0!3m2!1sen!2sin!4v1723379545458!5m2!1sen!2sin" className="rounded-md w-auto" style={{ "border": 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                        <span className="text-left ">
                            Shop 9, Ground Floor, Bilkha Plaza, Kasturba Road, Junction Plot, Rajkot
                        </span>

                    </div>
                    <div className="flex">
                        <Button className="border border-[#DF201F] rounded-lg text-[#DF201F] p-1.5">
                            <i className="fa-solid fa-location-dot  fa-md text-direction"></i>{" "}
                            {t("restaurant.directionsButton")}
                        </Button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Overview