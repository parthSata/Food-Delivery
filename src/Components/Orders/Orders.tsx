import DashboardHeader from '../Dashboard/Menu'
import Burger from '../../assets/Orders/Burger.png'
import Pizza from '../../assets/Orders/Pizza.png'
import Accepted from '../../assets/Orders/OrderAccepted.png'
import Cancel from '../../assets/Orders/OrderCancel.png'

function Orders() {
    return (
        <>
            <div className="">
                <DashboardHeader />
                <div className="">
                    <div className="m-2 flex justify-between items-center font-medium">
                        <span className="text-[#161A1D]" style={{ fontFamily: "Bai Jamjuree" }}>Today , 25th March 2022</span>
                        <span className="">
                            <form className="max-w-md mx-auto">
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                    <input type="search" id="default-search" className="block  p-4 ps-10 text-sm text-gray-500 border border-[1px solid #E7E7E9] rounded-lg " style={{ fontFamily: "Montserrat Alternates" }} placeholder="Search" />
                                </div>
                            </form>
                        </span>
                    </div>
                    <div className="">
                        <div className="border-2 p-3 flex gap-8 mb-4 h-[130px] w-full flex-row items-center" style={{ boxShadow: "2px 2px 30px 2px #FFF3E5CC" }}>
                            <div className="flex font-semibold flex-col gap-1   justify-center items-start">
                                <span className="" style={{ fontFamily: "Bai Jamjuree" }}>Order# ORD00003</span>
                                <p className="text-[#A2A3A5] text-xs " style={{ fontFamily: "Montserrat Alternates" }}>03:25 PM</p>
                                <span className="flex justify-center items-center text-[#50E06B] gap-2" style={{ fontFamily: "Bai Jamjuree" }}><img src={Accepted} alt="" className="h-5" />Acccepted Order</span>
                            </div>
                            <div className="flex flex-row  border-2 h-20 rounded-[10px]">
                                <div className="flex items-center gap-2 p-2" style={{ fontFamily: "Bai Jamjuree" }}>
                                    <img src={Burger} alt="" className="h-[40px]" />
                                    <div className="flex flex-col">
                                        <span className="text-sm">HamBurger</span><span className="text-[#DF201F] self-start text-sm">₹100</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row border-2 h-20  rounded-[10px]">
                                <div className="flex items-center gap-2 p-2" style={{ fontFamily: "Bai Jamjuree" }}>
                                    <img src={Burger} alt="" className="h-[40px]" />
                                    <div className="flex flex-col">
                                        <span className="text-sm">HamBurger</span><span className="text-[#DF201F] self-start text-sm">₹100</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row border-2 h-20  rounded-[10px]">
                                <div className="flex items-center gap-2 p-2" style={{ fontFamily: "Bai Jamjuree" }}>
                                    <img src={Burger} alt="" className="h-[40px]" />
                                    <div className="flex flex-col">
                                        <span className="text-sm">HamBurger</span><span className="text-[#DF201F] self-start text-sm">₹100</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border-2 p-3 flex gap-8 mb-4 h-[130px] w-full flex-row items-center" style={{ boxShadow: "2px 2px 30px 2px #FFF3E5CC" }}>
                            <div className="flex font-semibold flex-col gap-1   justify-center items-start">
                                <span className="" style={{ fontFamily: "Bai Jamjuree" }}>Order# ORD00003</span>
                                <p className="text-[#A2A3A5] text-xs " style={{ fontFamily: "Montserrat Alternates" }}>03:25 PM</p>
                                <span className="flex justify-center items-center text-[#DF201F] gap-2" style={{ fontFamily: "Bai Jamjuree" }}><img src={Cancel} alt="" className="h-5" />Cancel Order</span>
                            </div>
                            <div className="flex gap-6">
                                <div className="flex flex-row  border-2 h-20 rounded-[10px]">
                                    <div className="flex items-center gap-2 p-2" style={{ fontFamily: "Bai Jamjuree" }}>
                                        <img src={Burger} alt="" className="h-[40px]" />
                                        <div className="flex flex-col">
                                            <span className="text-sm">HamBurger</span><span className="text-[#DF201F] self-start text-sm">₹100</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row border-2 h-20  rounded-[10px]">
                                    <div className="flex items-center gap-2 p-2" style={{ fontFamily: "Bai Jamjuree" }}>
                                        <img src={Burger} alt="" className="h-[40px]" />
                                        <div className="flex flex-col">
                                            <span className="text-sm">HamBurger</span><span className="text-[#DF201F] self-start text-sm">₹100</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row border-2 h-20  rounded-[10px]">
                                    <div className="flex items-center gap-2 p-2" style={{ fontFamily: "Bai Jamjuree" }}>
                                        <img src={Pizza} alt="" className="h-[40px]" />
                                        <div className="flex flex-col">
                                            <span className="text-sm">HamBurger</span><span className="text-[#DF201F] self-start text-sm">₹100</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">

                    </div>

                </div>

            </div>
        </>
    )
}

export default Orders
