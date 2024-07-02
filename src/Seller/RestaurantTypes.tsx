import { useState } from "react";
import { ToastContainer } from "react-toastify"
import ConfirmDialog from "./ConfirmDialog";

function RestaurantTypes() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);



    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);
    return (
        <div className="h-full w-full">
            <div className="flex m-8">
                <span className="self-start text-3xl" style={{ fontFamily: "Bai Jamjuree" }}>Restaurant Type And Timings</span>
            </div>
            <div className="flex flex-wrap">
                <div className="font-semibold flex  flex-col  gap-10 m-8">
                    <div className="flex justify-center flex-wrap flex-col gap-10 ">
                        <div className="flex flex-col gap-8" style={{ fontFamily: "Montserrat Alternates" }}>
                            <div className="flex flex-col">
                                <span className="self-start text-[#161A1D]">Establishment Type</span>
                                <p className="self-start text-[#B9BABB] font-medium text-sm text-justify ">Select most relevant category for your restaurant type</p>
                            </div>

                            <div className="flex flex-col gap-8 ">
                                <div className="flex flex-col ">
                                    <div className="flex flex-row gap-2 items-center">
                                        <input type="radio" name="restaurantType" className="accent-[#DF201F]" id="" />
                                        <span className="text-[#161A1D]">Both, delivery and dine-in available</span>
                                    </div>
                                    <p className="text-[#B9BABB]  font-medium text-sm text-justify text-wrap px-5">Select this option when you have a place for customers to dine-in and also want to online for your restaurant</p>
                                </div>
                                <div className="flex flex-col ">
                                    <div className="flex flex-row gap-2">
                                        <input type="radio" name="restaurantType" className="accent-[#DF201F]" id="" />
                                        <span className="text-[#161A1D] ">Delivery Only</span>
                                    </div>
                                    <p className="self-start text-[#B9BABB] font-medium text-sm text-justify px-5">Select when you don't have a facility for customers to dine-in (like delivery Kitchens)</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">

                            <div className="flex flex-col gap-5">
                                <div className="flex" style={{ fontFamily: "Montserrat Alternates" }}>
                                    <span className=" self-start font">Select options which are best for you outlet</span>
                                </div>
                                <div className="flex gap-10 flex-wrap px-6" style={{ fontFamily: "Bai Jamjuree" }}>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex flex-row gap-2 items-center">
                                            <input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                            <span className="">Bakery</span>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center">
                                            <input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                            <span className="">Bakery</span>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center">
                                            <input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                            <span className="">Bakery</span>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center">
                                            <input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                            <span className="">Bakery</span>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center">
                                            <input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                            <span className="">Bakery</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex flex-row gap-2 items-center">
                                            <input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                            <span className="">Bakery</span>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center">
                                            <input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                            <span className="">Bakery</span>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center">
                                            <input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                            <span className="">Bakery</span>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center">
                                            <input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                            <span className="">Bakery</span>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center">
                                            <input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                            <span className="">Bakery</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex flex-row gap-2 items-center">
                                            <input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                            <span className="">Bakery</span>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center">
                                            <input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                            <span className="">Bakery</span>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center">
                                            <input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                            <span className="">Bakery</span>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center">
                                            <input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                            <span className="">Bakery</span>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center">
                                            <input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                            <span className="">Bakery</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-10 ">
                    <div className="flex flex-col gap-8" style={{ fontFamily: "Montserrat Alternates" }}>
                        <div className="flex flex-col font-semibold px-5">
                            <span className="self-start text-[#161A1D]">Types of Cuisines</span>
                            <p className="self-start text-[#B9BABB] font-medium text-sm text-justify ">Select most relevant category for your restaurant type</p>
                        </div>
                        <div className="">
                            <div className="flex gap-10 flex-wrap px-6" style={{ fontFamily: "Bai Jamjuree" }}>
                                <div className="flex flex-col gap-3 text-lg">
                                    <div className="flex flex-row gap-2 items-center">
                                        <input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                        <span className="">Bakery</span>
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                        <span className="">Bakery</span>
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                        <span className="">Bakery</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 text-lg">
                                    <div className="flex flex-row gap-2 items-center">
                                        <input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                        <span className="">Bakery</span>
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                        <span className="">Bakery</span>
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                        <span className="">Bakery</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 text-lg">
                                    <div className="flex flex-row gap-2 items-center">
                                        <input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                        <span className="">Bakery</span>
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                        <span className="">Bakery</span>
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                        <span className="">Bakery</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 " style={{ fontFamily: "Montserrat Alternates" }}>
                        <div className="flex flex-col font-semibold px-5">
                            <span className="self-start text-[#161A1D] text-xl">Restaurant operational Hours</span>
                            <p className="self-start text-[#B9BABB] font-medium text-sm text-justify ">Restaurant operational Hours</p>
                        </div>
                        <div className="flex gap-10 px-5 text-[#B9BABB] items-center flex-wrap">
                            <div className="flex  flex-col ">
                                <span className="self-start text-lg">Open At</span>
                                <input type="time" name="" className="border-2 p-4 rounded h-10 w-32 border-[#A2A3A5]" id="" />
                            </div>
                            <span className="self-center">To</span>
                            <div className="flex  flex-col ">
                                <span className="self-start text-lg">Closes At</span>
                                <input type="time" name="" className="border-2 p-4 rounded h-10 w-32 border-[#A2A3A5]" id="" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-8" style={{ fontFamily: "Montserrat Alternates" }}>
                        <div className="flex flex-col font-semibold px-5">
                            <span className="self-start text-[#161A1D]">Mark open days</span>
                            <p className="self-start text-[#B9BABB] font-medium text-sm text-justify ">Don’t forget to uncheck your off days</p>
                        </div>
                        <div className="flex flex-col gap-8">
                            <div className="flex gap-10 flex-wrap px-6" style={{ fontFamily: "Bai Jamjuree" }}>
                                <div className="flex flex-col gap-3 text-lg">
                                    <div className="flex flex-row gap-2 items-center">
                                        <input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                        <span className="">Monday</span>
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                        <span className="">Tuesday</span>
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                        <span className="">Wednesday</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 text-lg">
                                    <div className="flex flex-row gap-2 items-center">
                                        <input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                        <span className="">Thursday</span>
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                        <span className="">Friday</span>
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                        <span className="">Saturday</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 text-lg">
                                    <div className="flex flex-row gap-2 items-center">
                                        <input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                        <span className="">Sunday</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    style={{ fontFamily: "Bai Jamjuree", boxShadow: "2px 2px 25px 2px #94CD0099" }}
                                    className={`bg-[#94CD00] uppercase h-[50px] w-[247px] rounded-3xl text-white text-[18px] md:text-[22px] mt-5s`}
                                    onClick={openDialog}
                                >
                                    Submit
                                </button>
                                <ToastContainer position="top-right" autoClose={1000} pauseOnFocusLoss={false} limit={1} />
                            </div>
                        </div>
                        {isDialogOpen && (
                            <ConfirmDialog isOpen={isDialogOpen} onClose={closeDialog} />
                        )}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default RestaurantTypes