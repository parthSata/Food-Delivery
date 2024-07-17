import Strings from "../../../Components/Config/Strings"
import Button from "../../../Components/ReusableComponent/Button"
import { PlayArrow, Shafe } from "../../Config/images"

function AboutUs() {
    return (
        <div>
            <div className="flex h-full  border-2 w-full" style={{ boxShadow: "5px 5px 40px 5px #FFEFDDCC" }}>
                {/* About Us */}
                <div className="m-14 flex flex-col flex-wrap gap-10">
                    <div className="flex flex-col font-semibold gap-1">
                        <span className="self-start text-[#161A1D] text-3xl" style={{ fontFamily: "Bai Jamjuree" }}>{Strings.AboutUs.title}</span>
                        <span className="self-start text-[#DF201F] text-2xl " style={{ fontFamily: "fall in love" }}>{Strings.AboutUs.subtitle}</span>
                    </div>

                    <div className=" font-semibold text-[17px] text-balance">
                        <p className="text-[#A2A3A5] ">
                        {Strings.AboutUs.description}                        </p>
                    </div>
                    <div className="flex flex-row gap-4">
                        <Button className="w-[180px] text-white rounded-full self-center uppercase bg-[#94CD00] h-[50px]" style={{ fontFamily: "Bai Jamjuree", boxShadow: "2px 2px 25px 2px #94CD0099" }}>{Strings.AboutUs.readMore}</Button>
                        <Button className="bg-[#DF201F] rounded-[60px]" style={{ boxShadow: "2px 2px 25px 2px #DF201F6E" }}>
                            <img src={PlayArrow} alt="" className="" />
                        </Button>
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