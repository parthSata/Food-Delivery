import EmployeImg from '../../assets/OurTeam/Ellipse 7 (2).png'

function Team() {
    return (
        <div>
            <div className="mt-14">
                <div className="text-2xl flex justify-center flex-wrap font-semibold m-2">
                    <span className=" rounded-[0px, 60px, 60px, 0px] p-4  mb-4"><span className="border-b-4 pb-3 rounded-r border-[#DF201F]">Ou</span>r Team</span>
                </div>
                <div className="flex flex-wrap gap-16 mt-12 justify-center">
                    <div
                        className="relative sm:w-1/4  flex py-10 justify-center w-full h-[350px] "
                    >
                        <div className="w-full flex justify-center ">
                            <div className="absolute -top-10 ">
                                <img
                                    src={EmployeImg}
                                    alt="No Image Found"
                                    className=" h-40 w-40"
                                />
                                <div
                                    className="flex flex-col font-semibold"
                                    style={{ fontFamily: "Bai Jamjuree" }}
                                >
                                    <span className="text-xl">Parth Sata</span>
                                    <span className="text-[18px] text-[#DF201F]">
                                        Manager
                                    </span>
                                </div>
                            </div>
                            <div
                                className="h-[60%] w-full border-2 rounded-t-2xl "
                                style={{ boxShadow: "1.49px 1.49px 22.33px 1.49px #FFF3E5" }}
                            ></div>

                        </div>
                    </div>
                    <div
                        className="relative sm:w-1/4  flex py-10 justify-center w-full h-[350px] "
                    >
                        <div className="w-full flex justify-center ">
                            <div className="absolute -top-10 ">
                                <img
                                    src={EmployeImg}
                                    alt="No Image Found"
                                    className=" h-40 w-40"
                                />
                                <div
                                    className="flex flex-col font-semibold"
                                    style={{ fontFamily: "Bai Jamjuree" }}
                                >
                                    <span className="text-xl">Parth Sata</span>
                                    <span className="text-[18px] text-[#DF201F]">
                                        Manager
                                    </span>
                                </div>
                            </div>
                            <div
                                className="h-[60%] w-full border-2 rounded-t-2xl "
                                style={{ boxShadow: "1.49px 1.49px 22.33px 1.49px #FFF3E5" }}
                            ></div>

                        </div>
                    </div>
                    <div
                        className="relative sm:w-1/4  flex py-10 justify-center w-full h-[350px] "
                    >
                        <div className="w-full flex justify-center ">
                            <div className="absolute -top-10 ">
                                <img
                                    src={EmployeImg}
                                    alt="No Image Found"
                                    className=" h-40 w-40"
                                />
                                <div
                                    className="flex flex-col font-semibold"
                                    style={{ fontFamily: "Bai Jamjuree" }}
                                >
                                    <span className="text-xl">Parth Sata</span>
                                    <span className="text-[18px] text-[#DF201F]">
                                        Manager
                                    </span>
                                </div>
                            </div>
                            <div
                                className="h-[60%] w-full border-2 rounded-t-2xl "
                                style={{ boxShadow: "1.49px 1.49px 22.33px 1.49px #FFF3E5" }}
                            ></div>

                        </div>
                    </div>
                    <div className="mb-4 flex    space-x-2 justify-center rtl:space-x-reverse">
                        <button type="button" className="w-3 h-3 border-2 border-[#94CD00] accent-[#DF201F]  rounded-full" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                        <button type="button" className="w-3 h-3 border-2 border-[#94CD00]  rounded-full" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                        <button type="button" className="w-3 h-3 border-2 border-[#94CD00]  rounded-full" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                        <button type="button" className="w-3 h-3 border-2 border-[#94CD00]  rounded-full" aria-label="Slide 4" data-carousel-slide-to="3"></button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Team