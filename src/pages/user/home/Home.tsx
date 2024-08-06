import { DummyImg, Location } from "@/assets"
import Input from "@/Components/ReusableComponent/Input"

function Home() {
    return (
        <div>
            <div className="">
                <div className="relative flex justify-center font-baiJamjuree bg-black opacity-90">
                    <img src={DummyImg} alt="" className="" />
                    <div className="absolute flex flex-col items-center gap-2 justify-center top-20 ">
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

                <div className="">
                    <span className=" rounded-[0px, 60px, 60px, 0px] p-4  mb-4">
                        Our C
                        <span className="border-b-4 pb-3 rounded-r border-[#DF201F]">
                            at
                        </span>
                        egory
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Home