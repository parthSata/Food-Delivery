import { Manchurian } from "../Config/images"

function TodaySpecial() {
    return (
        <div className="h-full w-full ">
            <div className="text-2xl flex justify-between flex-wrap font-semibold m-2">
                <span className=" rounded-[0px, 60px, 60px, 0px] p-4  mb-4"><span className="border-b-4 pb-3 rounded-r  border-[#DF201F]">To</span>day Special</span>
                <button className="w-[180px] text-white rounded-full  self-center uppercase bg-[#94CD00] h-[50px]" style={{ fontFamily: "Bai Jamjuree", boxShadow: "2px 2px 25px 2px #94CD0099" }}>View All</button>
            </div>

            <div className="mt-6 w-full  flex gap-2 justify-around flex-wrap  ">
                <div className="sm:w-1/5 w-full mb-10 font-semibold"
                    style={{
                        fontFamily: "Bai Jamjuree",
                        boxShadow: "2px 2px 40px 2px #FFF3E5",
                    }}
                >
                    <img
                        src={Manchurian}
                        alt=""
                        className="h-[190px] w-full max-w-[340px] rounded-2xl"
                    />
                    <div className="flex flex-col gap-1  p-3">
                        <span className="self-start">Dry Manchurian</span>
                        <p className="flex gap-2 items-center text-[#DF201F]" style={{ fontFamily: "Montserrat Alternates" }}>₹90
                            <span className="text-xs line-through">
                                ₹120
                            </span>
                        </p>
                    </div>
                </div>
                <div className="sm:w-1/5 w-full mb-10 font-semibold"
                    style={{
                        fontFamily: "Bai Jamjuree",
                        boxShadow: "2px 2px 40px 2px #FFF3E5",
                    }}
                >
                    <img
                        src={Manchurian}
                        alt=""
                        className="h-[190px] w-full max-w-[340px] rounded-2xl"
                    />
                    <div className="flex flex-col gap-1  p-3">
                        <span className="self-start">Dry Manchurian</span>
                        <p className="flex gap-2 items-center text-[#DF201F]" style={{ fontFamily: "Montserrat Alternates" }}>₹90
                            <span className="text-xs line-through">
                                ₹120
                            </span>
                        </p>
                    </div>
                </div>
                <div className="sm:w-1/5 w-full mb-10 font-semibold"
                    style={{
                        fontFamily: "Bai Jamjuree",
                        boxShadow: "2px 2px 40px 2px #FFF3E5",
                    }}
                >
                    <img
                        src={Manchurian}
                        alt=""
                        className="h-[190px] w-full max-w-[340px] rounded-2xl"
                    />
                    <div className="flex flex-col gap-1  p-3">
                        <span className="self-start">Dry Manchurian</span>
                        <p className="flex gap-2 items-center text-[#DF201F]" style={{ fontFamily: "Montserrat Alternates" }}>₹90
                            <span className="text-xs line-through">
                                ₹120
                            </span>
                        </p>
                    </div>
                </div>
                <div className="sm:w-1/5 w-full mb-10 font-semibold"
                    style={{
                        fontFamily: "Bai Jamjuree",
                        boxShadow: "2px 2px 40px 2px #FFF3E5",
                    }}
                >
                    <img
                        src={Manchurian}
                        alt=""
                        className="h-[190px] w-full max-w-[340px] rounded-2xl"
                    />
                    <div className="flex flex-col gap-1  p-3">
                        <span className="self-start">Dry Manchurian</span>
                        <p className="flex gap-2 items-center text-[#DF201F]" style={{ fontFamily: "Montserrat Alternates" }}>₹90
                            <span className="text-xs line-through">
                                ₹120
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodaySpecial