import { Date, DummyImg, Location, NewsImage1, Pizzza } from "@/assets"
import Button from "@/Components/ReusableComponent/Button"
import Input from "@/Components/ReusableComponent/Input"
import { BestSeller, ProductGallary, Team, TodaySpecial } from "@/navigation"
import { t } from "i18next"

function Home() {
    return (
        <div>
            <div className="">
                <div className="relative flex justify-center font-baiJamjuree bg-black opacity-90">
                    <img src={DummyImg} alt="" className="w-full" />
                    <div className="relative flex flex-col items-center gap-2 justify-center top-20 ">
                        <label className="font-montserrat self-start font-semibold text-md text-white">Search Your Product</label>
                        <div className="flex flex-row h-full w-full">
                            <div className="rounded-l-[15px] items-center border-r flex flex-row  p-2 gap-2 bg-white w-full h-full">
                                <img src={Location} alt="" className="h-6 w-6" />
                                <div className="flex flex-col ">
                                    <label className="text-[#A2A3A5] self-start font-semibold font-montserrat">Location</label>
                                    <Input type="text" className="border-none  outline-none h-full w-full text-black font-semibold " placeholder="ex. Rajkot , Gujrat"></Input>
                                </div>
                            </div>
                            <div className="rounded-r-[15px] items-center flex flex-row  p-5 gap-2 bg-white w-full h-full">
                                <Input type="text" className="h-full w-full border-none outline-none " placeholder="Search..."></Input>
                            </div>
                        </div>
                    </div>

                    {/* <div className="absolute top-52 ]">
                        <div className=" flex flex-row items-end gap-4 top-10">
                            <div className="rounded-[15px] h-[100px] w-[280px] bg-gradient-to-l  from-[#9E0821]"></div>
                            <div className="rounded-[15px] h-[100px] w-[280px] bg-red-700"></div>
                            <div className="rounded-[15px] h-[100px] w-[280px] bg-red-700"></div>
                        </div>
                    </div> */}
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