import DashboardHeader from '../Dashboard/Menu'
import BurgerImg from '../../assets/Products/Burger.png'
import HamBurger from '../../assets/Products/HamBurger.png'

function Burger() {
    return (
        <>
            <div className="">
                <DashboardHeader />
                {/* Product Heading */}
                <div className="bg-[#fcbc65]  h-52 w-full  sm:w-full">
                    <div className="flex justify-between  items-center w-full">
                        <span className="text-3xl pl-28 text-white">Burger</span>
                        <img src={BurgerImg} alt="" className="visible sm:visible md:visible lg:visible xl:visible h-[205px] w-fit " />
                    </div>
                </div>
                {/* Products */}
                <div className="">
                    <div className="mt-6 w-full  flex gap-2 justify-around flex-wrap  ">
                        <div className="sm:w-1/5 mb-10  w-full">
                            <div className="flex justify-center font-semibold flex-col text-md items-center bg-[#FFE5E5] h-[200px] w-full rounded-[20px]">
                                <img src={HamBurger} alt="" className="h-20" />
                                <p className="" style={{ fontFamily: "Bai Jamjuree" }}>HamBurger </p>
                                <p className="flex gap-2 items-center text-[#DF201F]" style={{ fontFamily: "Montserrat Alternates" }}>₹100<span className="text-xs line-through">₹120 </span></p>
                            </div>
                            <div className="relative flex justify-center w-full gap-2  -top-6">
                                <div className="bg-[#DF201F]  h-12 w-12 flex justify-center rounded-3xl ">
                                    <button className="" ><i className="fa-solid fa-trash fa-lg" style={{ color: "#d4d9de" }}></i></button>
                                </div>
                                <div className="bg-[#94CD00]  h-12 w-12 flex justify-center rounded-3xl">
                                    <button className="" ><i className="fa-solid fa-pen fa-lg" style={{ color: "#d4d9de" }}></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="sm:w-1/5 mb-10 w-full ">
                            <div className="flex justify-center font-semibold flex-col text-md items-center bg-[#FFE5E5] h-[200px] w-full rounded-[20px]">
                                <img src={HamBurger} alt="" className="h-20" />
                                <p className="" style={{ fontFamily: "Bai Jamjuree" }}>HamBurger </p>
                                <p className="flex gap-2 items-center text-[#DF201F]" style={{ fontFamily: "Montserrat Alternates" }}>₹100<span className="text-xs line-through">₹120 </span></p>
                            </div>
                            <div className="relative flex justify-center w-full gap-2  -top-6">
                                <div className="bg-[#DF201F]  h-12 w-12 flex justify-center rounded-3xl ">
                                    <button className="" ><i className="fa-solid fa-trash fa-lg" style={{ color: "#d4d9de" }}></i></button>
                                </div>
                                <div className="bg-[#94CD00]  h-12 w-12 flex justify-center rounded-3xl">
                                    <button className="" ><i className="fa-solid fa-pen fa-lg" style={{ color: "#d4d9de" }}></i></button>
                                </div>
                            </div>
                        </div>

                        <div className=" sm:w-1/5  mb-10 w-full">
                            <div className="flex justify-center font-semibold flex-col text-md items-center  h-[200px] w-[180px] " style={{ boxShadow: " 2px 2px 20px 2px #FFE9D066" }}>
                                <div className="border-dotted rounded-[15px] border-4 h-[160px] flex-col gap-2 text-md w-[150px] flex justify-center items-center border-[border: 2px solid #161A1D]">
                                    <div className="relative   bg-[#DF201F] h-12  w-12 flex justify-center  rounded-full">
                                        <button className="flex self-center"><i className="fa-duotone fa-plus fa-2xl " style={{ color: "#e8eaed" }}></i></button>
                                    </div>
                                    <p className="">Add New</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Burger