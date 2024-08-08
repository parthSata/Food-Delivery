import { AttachFile, DummyImg, Pasta, ReviewProfile, Star } from '@/assets'
import Button from '@/Components/ReusableComponent/Button'

function RestaurantNearby() {
    return (
        <div className=''>
            <div
                className="relative mt-4 bg-black opacity-90 font-baiJamjuree"
            >
                <img src={DummyImg} alt="" className=" h-[205px] w-full  " />
                <div className=" flex justify-start pl-16">
                    <span
                        className="absolute bottom-20 text-white text-2xl"
                        style={{ fontFamily: "Bai Jamjuree" }}
                    >
                        Restaurant Reviews
                    </span>
                </div>
            </div>

            <div className="p-10 flex flex-col gap-10">
                <div className="flex flex-col gap-6">
                    <span className="flex  justify-start pl-10 rounded-[0px, 60px, 60px, 0px] text-xl font-semibold font-baiJamjuree ">
                        <span className="border-b-4 pb-3 rounded-r border-[#DF201F]">
                            Re
                        </span>
                        views
                    </span>
                    <div className="justify-start flex pl-10 flex-col gap-10">
                        {[0, 1, 2, 3].map((index) => (

                            <div className="flex flex-col  gap-6 " key={index}>
                                <div className="flex flex-row gap-2 items-center">
                                    <img src={ReviewProfile} alt="" className="" />
                                    <div className="flex flex-col gap-1">
                                        <span className="self-start">Rajesh Singh</span>
                                        <div className="flex ">
                                            {[0, 1, 2, 3, 4].map((index) => (
                                                <img src={Star} alt="" className="h-4" key={index} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="font-semibold text-sm font-montserrat text-[#99959E] ">
                                    <p className="text-ju">
                                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more or less normal distribution
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-4 w-full">
                                    <img src={Pasta} alt="" className="h-24 w-auto" />
                                    <img src={Pasta} alt="" className="h-24 w-auto" />
                                    <img src={Pasta} alt="" className="h-24 w-auto" />
                                    <img src={Pasta} alt="" className="h-24 w-auto" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-6">
                    <span className="flex  justify-start pl-10 rounded-[0px, 60px, 60px, 0px] text-xl font-semibold  font-baiJamjuree" >
                        <span className="border-b-4 pb-3 rounded-r border-[#DF201F]">
                            Re
                        </span>
                        view Here
                    </span>
                    <div className="pl-10">
                        <div className="flex justify-start flex-col gap-4">
                            <textarea className=" resize-none border-2 rounded-[20px]  outline-none shadow-3xl text-black  placeholder:text-[#A2A3A5] font-semibold w-full h-full p-6" rows={6} placeholder="Comment Type Here...."></textarea>
                            <div className="flex flex-wrap flex-row justify-center font-baiJamjuree gap-4 h-full w-full">
                                <Button className="shadow-3xl border flex  gap-2 p-4 font-semibold rounded-[15px] items-center w-[200px]  h-[50px]">
                                    <img src={AttachFile} alt="" className=" font-baiJamjuree font-semibold h-6 w-6" />
                                    Choose files
                                </Button>
                                <Button className="uppercase text-white w-[350px] font-semibold rounded-[60px] h-[50px] bg-[#94CD00] shadow-registerBtn">Send Documents</Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default RestaurantNearby