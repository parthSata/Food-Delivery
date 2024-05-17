import Cart from '../assets/Dashboard/Cart.png'
import Revenue from '../assets/Dashboard/Revenue.png'
import Customer from '../assets/Dashboard/Customer.png'
import TotalShops from '../assets/Dashboard/TotalShops.png'
import SideMenu from './SideMenu'
import Pizza from "../assets/HomePage/Pizza.png";
import LineChart from '../Components/Chart/Line'
import DashboardHeader from './DashboardHeader'
// import { UserData } from "./Chart/Data.jsx";
// import { useState } from 'react'

function Dashboard() {
    // const [userData, setUserData] = useState({
    //     labels: UserData.map((data) => data.day),
    //     datasets: [
    //         {
    //             label: "Parth Sata",
    //             data: UserData.map((data: any) => data.userGain),

    //             backgroundColor: [
    //                 "rgba(75,192,192,1)",
    //                 "#ecf0f1",
    //                 "#50AF95",
    //                 "#f3ba2f",
    //                 "#2a71d0",
    //             ],
    //             borderColor: "red",
    //             borderWidth: 2,
    //         },
    //     ],
    // });



    return (
        <>
            <div className="h-full w-full">
                <DashboardHeader />
                <SideMenu />
                <div className="flex justify-between  mt-10 flex-wrap" style={{ fontFamily: "Bai Jamjuree" }}>
                    <div className="h-[90px] sm:w-[200px]  mb-4 w-full  flex justify-around rounded-[10px] items-center bg-[#DF201F] text-sm text-[#FFFFFF]">
                        <div className="flex flex-col">
                            <span className='self-start'>923</span>
                            <span className=''>Recent Order</span>
                        </div>
                        <span className=""><img src={Cart} className="h-[50px] w-[50px] " /></span>
                    </div>
                    <div className="h-[90px] sm:w-[200px] mb-4 w-full  flex justify-around rounded-[10px] items-center bg-[#DF201F] text-sm text-[#FFFFFF]">
                        <div className="flex flex-col ">
                            <span className='self-start'>923</span>
                            <span className=''>Revenue</span>
                        </div>
                        <span className=""><img src={Revenue} className="h-[50px] w-[50px]" /></span>
                    </div>
                    <div className="h-[90px] sm:w-[200px] mb-4 w-full flex justify-around rounded-[10px] items-center bg-[#DF201F] text-sm text-[#FFFFFF]">
                        <div className="flex flex-col">
                            <span className='self-start'>923</span>
                            <span className=''>New Customer</span>
                        </div>
                        <span className=""><img src={Customer} className="h-[50px] w-[50px]" /></span>
                    </div>
                    <div className="h-[90px] sm:w-[200px] mb-4 w-full  flex justify-around rounded-[10px] items-center bg-[#DF201F] text-sm text-[#FFFFFF]">
                        <div className="flex flex-col">
                            <span className='self-start'>923</span>
                            <span className=''>Total Shops</span>
                        </div>
                        <span className=""><img src={TotalShops} className="h-[50px] w-[50px]" /></span>
                    </div>
                </div>
                <div className="flex gap-6 flex-wrap lg:flex-nowrap">
                    <div className="mt-8 rounded-[15px] bg-[#FFFFFF] h-[370px] " style={{ boxShadow: " 2px 2px 30px 2px #FFF3E5" }}>
                        <div className="flex justify-around ">
                            <div className="relative  w-full">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" style={{ fontFamily: "Bai Jamjuree" }}>
                                    <thead className="text-md  bg-gray-50 ">
                                        <tr className='flex justify-between text-black '>
                                            <th scope="col" className="px-6 py-3  cursor-pointer">
                                                Recent Orders
                                            </th>
                                            <th scope="col" className="px-6 py-3  cursor-pointer text-[#DF201F] ">
                                                View All
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="flex justify-between items-center border-b border-gray-200 p-2 hover:bg-gray-100">
                                            <div className="flex flex-wrap  ">
                                                <td className=" flex flex-col  cursor-pointer text-[#161A1D] ">ORD00003 <span className=" text-[#A2A3A5] ">03:25 PM</span></td>
                                                <td className=" cursor-pointer  text-[#50E06B] ">Accepted Order</td>
                                            </div>
                                            <td className="p-6 flex relative mr-10 cursor-pointer">
                                                <img src={Pizza} alt="Order Image" className=" absolute left-0 top-0" />
                                                <img src={Pizza} alt="Order Image" className=" absolute left-4 top-0" />
                                                <img src={Pizza} alt="Order Image" className=" absolute left-8 top-0" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 border-2 rounded-[15px] h-[370px] w-full" style={{ boxShadow: " 2px 2px 30px 2px #FFF3E5" }}>
                        <div className="flex flex-col m-4">
                            <span className="self-start">Revenue</span>
                            <span className="self-start">44620 Rs</span>
                        </div>
                        <div className='ml-10 mb-10' style={{ width: 550 }}>
                            <LineChart />
                        </div>
                    </div>
                </div>
                <div className="mt-24 h-[502px] w-full">
                    <div className="flex justify-between font-semibold text-xl">
                        <span className="text-[#161A1D] ">Recently Placed Orders</span>
                        <span className="text-[#DF201F]">View All</span>
                    </div>
                    <div className="">
                        <div className="flex flex-col relative " style={{ fontFamily: "Bai Jamjuree" }}>
                            <div className="relative overflow-x-auto  max-w-[100%]">
                                <table
                                    className="mt-4 w-full  text-md text-left rtl:text-right rounded-[10px] overflow-hidden  text-gray-500"
                                    style={{
                                        fontFamily: "Bai Jamjuree",
                                        boxShadow: "2px 2px 30px 2px #FFF3E5",
                                        minWidth: "100%",
                                    }}
                                >
                                    <thead className="rounded-full   bg-[#DF201F]  ">
                                        <tr className="text-[#FFFFFF] font-semibold ">
                                            <th
                                                scope="col"
                                                className="border-r-1  py-2 px-4  border-r-[#FFFFFF]  h-[60px]  rounded-[8px, 8px, 0px, 0px] opacity-100"
                                            >
                                                Order
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-r-1  py-2 px-4  border-r-[#FFFFFF]  h-[60px]  rounded-[8px, 8px, 0px, 0px] opacity-100"
                                            >
                                                Customer Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-r-1  py-2 px-4  border-r-[#FFFFFF]  h-[60px]  rounded-[8px, 8px, 0px, 0px] opacity-100"
                                            >
                                                Status
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-r-1  py-2 px-4  border-r-[#FFFFFF]  h-[60px]  rounded-[8px, 8px, 0px, 0px] opacity-100"
                                            >
                                                Time
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-r-1  py-2 px-4  border-r-[#FFFFFF]  h-[60px]  rounded-[8px, 8px, 0px, 0px] opacity-100"
                                            >
                                                Discount Price
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* {currentItems?.map((item) => ( */}
                                        <tr
                                            // key={item.id}
                                            className="text-[#A2A3A5] border-[2px]   border-opacity-10 border-[#A2A3A5] border-b"
                                        >
                                            <td
                                                scope="row"
                                                className="flex items-center p-4 border-opacity-10 border-[#A2A3A5]"
                                            >
                                                <img
                                                    src={Pizza}
                                                    className="  w-[42px] h-[42px] rounded-3xl"
                                                    alt=""
                                                />
                                                {/* {item.ProductName} */}
                                                <span className="mr-10">Pizza</span>
                                            </td>
                                            <td className="p-4 border-[2px] py-2 px-4 border-opacity-10 border-[#A2A3A5]">
                                                {/* {item.id} */}
                                                Parth Sata
                                            </td>
                                            <td className="p-4 border-[2px] py-2 px-4 border-opacity-10 border-[#A2A3A5]">
                                                {/* {item.Stock} */}Pending
                                            </td>
                                            <td className="p-4 border-[2px] py-2 px-4 border-opacity-10 border-[#A2A3A5]">
                                                {/* {item.Status} */}10:05
                                            </td>
                                            <td className="p-4 border-[2px] py-2 px-4 border-opacity-10 border-[#A2A3A5]">
                                                {/* ₹{item.Price} */}₹200
                                            </td>
                                        </tr>
                                        {/* ))} */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
