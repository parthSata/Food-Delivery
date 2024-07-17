import Noodles from '../../assets/All Product/Noodles.jpg'
import DummyImg from '../../assets/All Product/DummyFood.png'
import { useState } from 'react';
import search from "../../assets/HomePage/search.png";
import Container from '../../Components/ReusableComponent/Container';
import Button from '../../Components/ReusableComponent/Button';
import Input from '../../Components/ReusableComponent/Input';


function UserProducts() {
    // @ts-ignore
    const [searchInput, setSearchInput] = useState("");


    return (
        <div className="">
            <Container >
                {/* Product Heading */}
                <div className="relative bg-black opacity-90 ">
                    <img src={DummyImg} alt="" className=" h-[205px] w-full  " />
                    <div className=" flex justify-start pl-16">
                        <span className="absolute bottom-20 text-white text-2xl"
                            style={{ fontFamily: "Bai Jamjuree" }}>
                            All Products
                        </span>
                    </div>
                </div>
                <div className="relative flex justify-end mt-5">
                    <Input
                        type="text"
                        placeholder="Search.."
                        className="border-gray-400 border-[1px] p-5 hover:outline-green-400 text-[#A2A3A5] focus:border-none pr-12 hover:border-[1px solid #E7E7E9] h-12 w-[300px] rounded-full"
                        onChange={(e:any) => setSearchInput(e.target.value)}
                    />
                    <img
                        src={search}
                        alt="Search"
                        className="absolute right-4 top-4 w-[16px] h-[16px]"
                    />
                </div>

                {/* Products */}
                <div className="">
                    <div className="mt-6 w-full  flex gap-2 justify-around flex-wrap  ">
                        <div className="sm:w-1/5 mb-10  ">
                            <div className="h-full w-full rounded-[15px] border-2">
                                <img src={Noodles} alt="" className="h-[150px] rounded-t-[15px] w-full" />
                                <div className="flex flex-col items-start p-2 font-semibold" >
                                    <span className="">Noodles</span>
                                    <div className="flex text-red-500 gap-1 items-center">
                                        <span className="">₹500</span><span className="text-xs line-through">₹400</span>
                                    </div>
                                    <p className="font-bold">
                                        This easy stir fried veggie noodles recipe has just the right level of spice.
                                    </p>
                                </div>
                            </div>
                        </div>


                        <div className=" sm:w-1/5  mb-10 ">
                            <div className="flex justify-center font-semibold flex-col text-md items-center  h-auto w-full " style={{ boxShadow: " 2px 2px 20px 2px #FFE9D066" }}>
                                <div className="border-dotted rounded-[15px] border-4 h-[160px] flex-col gap-2 text-md w-[180px] flex justify-center items-center border-[border: 2px solid #161A1D]">
                                    <div className="relative   bg-[#DF201F] h-12  w-12 flex justify-center  rounded-full">
                                        <Button className="flex self-center"><i className="fa-duotone fa-plus fa-2xl " style={{ color: "#e8eaed" }}></i></Button>
                                    </div>
                                    <p className="">Add New</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div >
    )
}

export default UserProducts
