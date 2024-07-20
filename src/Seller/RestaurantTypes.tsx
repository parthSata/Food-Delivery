import { useState } from "react";
import { ToastContainer } from "react-toastify"
import ConfirmDialog from "./ConfirmDialog";
import Strings from "../Components/Config/Strings";
import Input from "../Components/ReusableComponent/Input";
import { useLanguageContext } from "../LanguageContext";

function RestaurantTypes() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
      const { t } = useLanguageContext();




    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);
    return (
        <div className="h-full w-full">
            <div className="flex m-8">
                <span className="self-start text-3xl" style={{ fontFamily: "Bai Jamjuree" }}>{t(Strings.restaurantTypes.pageTitle)}</span>
            </div>
            <div className="flex flex-wrap">
                <div className="font-semibold flex  flex-col  gap-10 m-8">
                    <div className="flex justify-center flex-wrap flex-col gap-10 ">
                        <div className="flex flex-col gap-8" style={{ fontFamily: "Montserrat Alternates" }}>
                            <div className="flex flex-col">
                                <span className="self-start text-[#161A1D]">{t(Strings.restaurantTypes.establishmentType)}</span>
                                <p className="self-start text-[#B9BABB] font-medium text-sm text-justify ">{t(Strings.restaurantTypes.establishmentDescription)}</p>
                            </div>
                            <div className="flex flex-col gap-8 ">
                                <div className="flex flex-col ">
                                    <div className="flex flex-row gap-2 items-center">
                                        <Input type="radio" name="restaurantType" className="accent-[#DF201F]" id="" />
                                        <span className="text-[#161A1D]">{t(Strings.restaurantTypes.bothDeliveryDineIn)}</span>
                                    </div>
                                    <p className="text-[#B9BABB]  font-medium text-sm text-justify text-wrap px-5">{t(Strings.restaurantTypes.bothDeliveryDineInDescription)}</p>
                                </div>
                                <div className="flex flex-col ">
                                    <div className="flex flex-row gap-2">
                                        <Input type="radio" name="restaurantType" className="accent-[#DF201F]" id="" />
                                        <span className="text-[#161A1D] ">{t(Strings.restaurantTypes.deliveryOnly)}</span>
                                    </div>
                                    <p className="self-start text-[#B9BABB] font-medium text-sm text-justify px-5">{t(Strings.restaurantTypes.deliveryOnlyDescription)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">

                            <div className="flex flex-col gap-5">
                                <div className="flex" style={{ fontFamily: "Montserrat Alternates" }}>
                                    <span className=" self-start font">{t(Strings.restaurantTypes.selectOptions)}</span>
                                </div>
                                <div className="flex gap-10 flex-wrap px-6" style={{ fontFamily: "Bai Jamjuree" }}>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex flex-row gap-2 items-center">
                                            <Input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                            <span className="">{t(Strings.restaurantTypes.bakery)}</span>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center">
                                            <Input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                            <span className="">{t(Strings.restaurantTypes.bakery)}</span>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center">
                                            <Input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                            <span className="">{t(Strings.restaurantTypes.bakery)}</span>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center">
                                            <Input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                            <span className="">{t(Strings.restaurantTypes.bakery)}</span>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center">
                                            <Input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                            <span className="">{t(Strings.restaurantTypes.bakery)}</span>
                                        </div>

                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex flex-row gap-2 items-center">
                                            <Input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                            <span className="">{t(Strings.restaurantTypes.bakery)}</span>
                                        </div><div className="flex flex-row gap-2 items-center">
                                            <Input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                            <span className="">{t(Strings.restaurantTypes.bakery)}</span>
                                        </div><div className="flex flex-row gap-2 items-center">
                                            <Input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                            <span className="">{t(Strings.restaurantTypes.bakery)}</span>
                                        </div><div className="flex flex-row gap-2 items-center">
                                            <Input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                            <span className="">{t(Strings.restaurantTypes.bakery)}</span>
                                        </div><div className="flex flex-row gap-2 items-center">
                                            <Input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                            <span className="">{t(Strings.restaurantTypes.bakery)}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex flex-row gap-2 items-center">
                                            <Input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                            <span className="">{t(Strings.restaurantTypes.bakery)}</span>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center">
                                            <Input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                            <span className="">{t(Strings.restaurantTypes.bakery)}</span>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center">
                                            <Input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                            <span className="">{t(Strings.restaurantTypes.bakery)}</span>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center">
                                            <Input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                            <span className="">{t(Strings.restaurantTypes.bakery)}</span>
                                        </div><div className="flex flex-row gap-2 items-center">
                                            <Input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                            <span className="">{t(Strings.restaurantTypes.bakery)}</span>
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
                            <span className="self-start text-[#161A1D]">{t(Strings.restaurantTypes.typesOf)}</span>
                            <p className="self-start text-[#B9BABB] font-medium text-sm text-justify ">{t(Strings.restaurantTypes.establishmentType)}</p>
                        </div>
                        <div className="">
                            <div className="flex gap-10 flex-wrap px-6" style={{ fontFamily: "Bai Jamjuree" }}>
                                <div className="flex flex-col gap-3 text-lg">
                                    <div className="flex flex-row gap-2 items-center">
                                        <Input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                        <span className="">{t(Strings.restaurantTypes.bakery)}</span>
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <Input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                        <span className="">{t(Strings.restaurantTypes.bakery)}</span>
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <Input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                        <span className="">{t(Strings.restaurantTypes.bakery)}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 text-lg">
                                    <div className="flex flex-row gap-2 items-center">
                                        <Input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                        <span className="">{t(Strings.restaurantTypes.bakery)}</span>
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <Input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                        <span className="">{t(Strings.restaurantTypes.bakery)}</span>
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <Input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                        <span className="">{t(Strings.restaurantTypes.bakery)}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 text-lg">
                                    <div className="flex flex-row gap-2 items-center">
                                        <Input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                        <span className="">{t(Strings.restaurantTypes.bakery)}</span>
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <Input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                        <span className="">{t(Strings.restaurantTypes.bakery)}</span>
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <Input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                        <span className="">{t(Strings.restaurantTypes.bakery)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 " style={{ fontFamily: "Montserrat Alternates" }}>
                        <div className="flex flex-col font-semibold px-5">
                            <span className="self-start text-[#161A1D] text-xl">{t(Strings.restaurantTypes.restaurantOperationalHours)}</span>
                            <p className="self-start text-[#B9BABB] font-medium text-sm text-justify ">{t(Strings.restaurantTypes.restaurantOperationalHours)}</p>
                        </div>
                        <div className="flex gap-10 px-5 text-[#B9BABB] items-center flex-wrap">
                            <div className="flex  flex-col ">
                                <span className="self-start text-lg">{t(Strings.restaurantTypes.openAt)}</span>
                                <Input type="time" name="" className="border-2 p-4 rounded h-10 w-32 border-[#A2A3A5]" id="" />
                            </div>
                            <span className="self-center">To</span>
                            <div className="flex  flex-col ">
                                <span className="self-start text-lg">{t(Strings.restaurantTypes.closesAt)}</span>
                                <Input type="time" name="" className="border-2 p-4 rounded h-10 w-32 border-[#A2A3A5]" id="" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-8" style={{ fontFamily: "Montserrat Alternates" }}>
                        <div className="flex flex-col font-semibold px-5">
                            <span className="self-start text-[#161A1D]">{t(Strings.restaurantTypes.markOpenDays)}</span>
                            <p className="self-start text-[#B9BABB] font-medium text-sm text-justify ">{t(Strings.restaurantTypes.uncheckOffDays)}</p>
                        </div>
                        <div className="flex flex-col gap-8">
                            <div className="flex gap-10 flex-wrap px-6" style={{ fontFamily: "Bai Jamjuree" }}>
                                <div className="flex flex-col gap-3 text-lg">
                                    <div className="flex flex-row gap-2 items-center">
                                        <Input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                        <span className="">Monday</span>
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <Input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                        <span className="">Tuesday</span>
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <Input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                        <span className="">Wednesday</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 text-lg">
                                    <div className="flex flex-row gap-2 items-center">
                                        <Input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                        <span className="">Thursday</span>
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <Input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                        <span className="">Friday</span>
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <Input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
                                        <span className="">Saturday</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 text-lg">
                                    <div className="flex flex-row gap-2 items-center">
                                        <Input type="checkbox" className="accent-[#DF201F] h-4 w-4" name="Bakery" id="" />
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
                                    {t(Strings.restaurantTypes.submit)}
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