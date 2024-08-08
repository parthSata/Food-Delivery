import { BhelPuri, Burgger, Date, DummyImg, Location, NewsImage1, Pizzza } from "@/assets"
import Button from "@/Components/ReusableComponent/Button"
import Input from "@/Components/ReusableComponent/Input"
import { BestSeller, ProductGallary, Team, TodaySpecial } from "@/navigation"
import { t } from "i18next"

function Home() {
    return (
        <div>
            <div className="">
                <div className="relative mt-4 bg-black opacity-90 font-baiJamjuree">
                    <img src={DummyImg} alt="" className="h-[205px] w-full" />
                    <div className="absolute flex flex-col gap-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4">
                        <label className="font-montserrat self-start font-semibold text-md text-white">Search Your Product</label>
                        <div className="flex flex-row h-full w-full">
                            <div className="rounded-l-[15px] items-center border-r flex flex-row p-2 gap-2 bg-white w-full h-full">
                                <img src={Location} alt="" className="h-6 w-6" />
                                <div className="flex flex-col">
                                    <label className="text-[#A2A3A5] self-start font-semibold font-montserrat">Location</label>
                                    <Input type="text" className="border-none placeholder:text-[#161A1D] outline-none h-full w-full text-black font-semibold" placeholder="ex. Rajkot , Gujrat"></Input>
                                </div>
                            </div>
                            <div className="rounded-r-[15px] items-center flex flex-row p-5 gap-2 bg-white w-full h-full">
                                <Input type="text" className="h-full w-full border-none outline-none" placeholder="Search..."></Input>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative flex justify-center gap-8 mt-[-40px] px-10 z-10">
                    <div className="rounded-[15px] h-auto gap-2 w-auto flex-wrap bg-[#A90F27] flex items-center justify-center p-4">
                        <div className="flex gap-1 flex-col text-white">
                            <span className="self-start font-montserrat text-xs font-medium">Get 30% OFF</span>
                            <span className="text-justify text-white font-semibold text-sm font-baiJamjuree">Super Veg Delicious Dish</span>
                        </div>
                        <img src={Pizzza} alt="" className="h-20 w-20" />
                    </div>
                    <div className="rounded-[15px] h-auto gap-2 w-auto flex-wrap bg-[#96C039] flex items-center justify-center p-4">
                        <div className="flex gap-1 flex-col text-white">
                            <span className="self-start font-montserrat text-xs font-medium">Get 30% OFF</span>
                            <span className="self-start text-justify text-white font-semibold text-sm font-baiJamjuree">Best Veg Hamburger</span>
                        </div>
                        <img src={Burgger} alt="" className="h-20 w-20 " />
                    </div>
                    <div className="rounded-[15px] h-auto gap-2 w-auto flex-wrap bg-[#E18F06] flex items-center justify-center p-4">
                        <div className="flex gap-1 flex-col text-white">
                            <span className="self-start font-montserrat text-xs font-medium">Get 30% OFF</span>
                            <span className="self-start text-justify text-white font-semibold text-sm font-baiJamjuree">Cheese Bhel Puri</span>
                        </div>
                        <img src={BhelPuri} alt="" className="h-20 w-20 " />
                    </div>
                </div>

                <div className="p-6">
                    <span className="font-semibold text-xl font-baiJamjuree rounded-[0px, 60px, 60px, 0px] p-4  mb-4">
                        Our C
                        <span className="border-b-4 pb-3 rounded-r border-[#DF201F]">
                            at
                        </span>
                        egory
                    </span>
                    <div className="mt-10 mb-10">
                        <div className="flex  flex-row flex-wrap justify-center gap-16">
                            {[0, 1, 2, 3, 4, 5].map((index) => (
                                <div key={index} className="flex flex-col  justify-center">
                                    <img
                                        src={Pizzza}
                                        alt=""
                                        className="self-center h-[100px] w-[100px] "
                                    />
                                    <span className="">{t("dashboard.pizza")}</span>
                                </div>
                            ))}
                        </div>
                        <div className=" flex mt-10   space-x-2 justify-center rtl:space-x-reverse">
                            <Button
                                className="w-3 h-3 border-2 border-[#94CD00] hover:accent-[#DF201F]  rounded-full"
                            ></Button>
                            <Button
                                className="w-3 h-3 border-2 border-[#94CD00] hover:accent-[#DF201F]  rounded-full"
                            ></Button>
                            <Button
                                className="w-3 h-3 border-2 border-[#94CD00] hover:accent-[#DF201F]  rounded-full"
                            ></Button>
                            <Button
                                className="w-3 h-3 border-2 border-[#94CD00] hover:accent-[#DF201F]  rounded-full"
                            ></Button>
                        </div>
                    </div>
                    <div className="">
                        <BestSeller />
                    </div>
                    <div className="">
                        <TodaySpecial />
                    </div>
                    <div className="">
                        <ProductGallary />
                    </div>
                    <div className="">
                        <Team />
                    </div>
                    <div className="flex flex-col gap-8">
                        <span className="font-semibold text-xl font-baiJamjuree rounded-[0px, 60px, 60px, 0px] p-4  ">
                            Late
                            <span className="border-b-4 pb-3 rounded-r border-[#DF201F]">
                                st
                            </span>
                            News
                        </span>
                        <div className="flex flex-row  flex-wrap justify-center items-center gap-8">
                            {[0, 1, 2, 3].map((index) => (
                                <div
                                    key={index}
                                    className="sm:w-1/5  flex flex-col flex-wrap font-semibold shadow-3xl"
                                    style={{
                                        fontFamily: "Bai Jamjuree",
                                    }}
                                >
                                    <img
                                        src={NewsImage1}
                                        alt=""
                                        className="h-[190px]  rounded-2xl"
                                    />
                                    <div className="flex flex-col gap-1 p-3">
                                        <span className="self-start ">When you get 15% Discount</span>

                                        <span
                                            className="text-justify  flex gap-2 justify-center items-center text-[#38393b] font-montserrat"
                                        >
                                            <img src={Date} alt="" className="h-4 w-4" />
                                            <span className="text-[#DF201F] "> 15 Jan, 2022</span>
                                        </span>
                                        <span
                                            className="text-justify  text-[#A2A3A5] font-montserrat"
                                        >
                                            It is a long established fact that a reader will be distracted
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home