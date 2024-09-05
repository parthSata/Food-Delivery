import { DummyImg, Location, RestaurantImage2, search, Star } from "@/assets"
import { Input } from "@/Components/index"
import { useNavigate } from "react-router-dom"

function RestaurantNearby() {
    const navigate = useNavigate()
    const handleRestaurantView = () => {
        navigate('/customer/restaurantView')
    }
    return (
        <div className=''>
            <div className="relative mt-4 bg-black opacity-90 font-baiJamjuree">
                <img src={DummyImg} alt="" className="h-[205px] w-full" />
                <div className="absolute max-w-[600px] flex flex-col gap-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4">
                    <label className="font-montserrat self-start font-semibold text-md text-white">Search For Restaurants</label>
                    <div className="rounded-[15px] justify-center  items-center self flex flex-row p-5 gap-2 bg-white  h-full">
                        <Input type="text" className="h-full w-full  border-none outline-none font-montserrat font-semibold text-[#161A1D]" placeholder="Search..."></Input>
                        <img src={search} alt="" className="" />
                    </div>
                </div>
            </div>

            <div className="flex flex-row p-6 flex-wrap ">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,].map((index) => (
                    <div
                        className="sm:w-1/4 mb-10  font-semibold shadow-3xl cursor-pointer font-baiJamjuree"
                        key={index}
                        onClick={handleRestaurantView}
                    >
                        <img
                            src={RestaurantImage2}
                            alt=""
                            className="h-[190px] w-full  rounded-2xl"
                        />
                        <div className="flex flex-col gap-3 px-3">
                            <span className="self-start">Golden Fish Restaurant</span>
                            <span className="flex  gap-6 ">
                                <div className="flex gap-2">
                                    <img src={Location} alt="" className="" />
                                    <span className="">2.5Km</span>
                                </div>
                                <div className="flex gap-2">
                                    {[0, 1, 2, 3, 4].map((index) => (
                                        <img src={Star} alt="" className="h-5" key={index} />
                                    ))}
                                </div>
                            </span>
                            <span
                                className=" text-sm text-[#A2A3A5] text-left font-montserrat"
                            >
                                Manish Nagar, Ingole Nagar, Sonegaon, Nagpur
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RestaurantNearby