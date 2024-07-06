import { PlayArrow, Shafe } from "../../Config/images"

function AboutUs() {
    return (
        <div>
            <div className="flex h-full  border-2 w-full" style={{ boxShadow: "5px 5px 40px 5px #FFEFDDCC" }}>
                {/* About Us */}
                <div className="m-14 flex flex-col flex-wrap gap-10">
                    <div className="flex flex-col font-semibold gap-1">
                        <span className="self-start text-[#161A1D] text-3xl" style={{ fontFamily: "Bai Jamjuree" }}>About Us</span>
                        <span className="self-start text-[#DF201F] text-2xl " style={{ fontFamily: "fall in love" }}>We are here since 6 year</span>
                    </div>

                    <div className=" font-semibold text-[17px] text-balance">
                        <p className="text-[#A2A3A5] ">
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed
                        </p>
                    </div>
                    <div className="flex flex-row gap-4">
                        <button className="w-[180px] text-white rounded-full self-center uppercase bg-[#94CD00] h-[50px]" style={{ fontFamily: "Bai Jamjuree", boxShadow: "2px 2px 25px 2px #94CD0099" }}>Read More</button>
                        <button className="bg-[#DF201F] rounded-[60px]" style={{ boxShadow: "2px 2px 25px 2px #DF201F6E" }}>
                            <img src={PlayArrow} alt="" className="" />
                        </button>
                    </div>
                </div>

                {/* Image */}
                <div className="flex items-end">
                    <img src={Shafe} alt="" className="h-[360px] w-[650px]" />
                </div>
            </div>
        </div >
    )
}

export default AboutUs