import { CartLogo, Revenue, TotalShops, Pizza, CustomerImage } from "@/assets";
// import LineChart from '../Chart/Line'
import { useEffect, useState } from "react";
import { t } from "i18next";

function Dashboard() {
  // @ts-ignore
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch("${apiUrl}");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      setDashboardData(jsonData);
    } catch (error) {
      // console.error('Error fetching data:', error);
    }
  };
  return (
    <div className="h-full w-full px-10">
      {/* {dashboardData && ( */}
      <div
        className="flex justify-between  mt-8 w-full flex-wrap text-lg"
        style={{ fontFamily: "Bai Jamjuree" }}
      >
        <div className="h-[90px] sm:w-[280px]  mb-4 w-full  flex justify-around rounded-[10px] items-center bg-[#DF201F]  text-[#FFFFFF]">
          <div className="flex flex-col">
            <span className="self-start">44620</span>
            <span className="">{t("dashboard.recentOrder")}</span>
          </div>
          <span className="">
            <img src={CartLogo} className="h-[50px] w-[50px] " />
          </span>
        </div>
        <div className="h-[90px] sm:w-[280px] mb-4 w-full  flex justify-around rounded-[10px] items-center bg-[#DF201F]  text-[#FFFFFF]">
          <div className="flex flex-col ">
            <span className="self-start">923</span>
            <span className="">{t("dashboard.revenue")}</span>
          </div>
          <span className="">
            <img src={Revenue} className="h-[50px] w-[50px]" />
          </span>
        </div>
        <div className="h-[90px] sm:w-[280px] mb-4 w-full flex justify-around rounded-[10px] items-center bg-[#DF201F]  text-[#FFFFFF]">
          <div className="flex flex-col">
            <span className="self-start">923</span>
            <span className="">{t("dashboard.newCustomer")}</span>
          </div>
          <span className="">
            <img src={CustomerImage} className="h-[50px] w-[50px]" />
          </span>
        </div>
        <div className="h-[90px] sm:w-[280px] mb-4 w-full  flex justify-around rounded-[10px] items-center bg-[#DF201F]  text-[#FFFFFF]">
          <div className="flex flex-col">
            <span className="self-start">923</span>
            <span className="">{t("dashboard.totalShops")}</span>
          </div>
          <span className="">
            <img src={TotalShops} className="h-[50px] w-[50px]" />
          </span>
        </div>
      </div>
      {/* )} */}
      <div className="flex gap-6 ">
        <div className="mt-4 rounded-[15px] bg-[#FFFFFF] h-[370px] w-full flex-wrap shadow-dashboard">
          <div className="flex justify-around gap-6 flex-wrap lg:flex-nowrap ">
            <div className="mt-8 rounded-[15px] bg-[#FFFFFF] h-[370px] w-full border-2 shadow-dashboard">
              <div className="flex justify-around">
                <div className="relative  w-full">
                  <table
                    className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    style={{ fontFamily: "Bai Jamjuree" }}
                  >
                    <thead className="text-lg font-semibold bg-gray-50 ">
                      <tr className="flex justify-between text-black ">
                        <th scope="col" className="px-6 py-3  cursor-pointer">
                          {t("dashboard.recentOrders")}
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3  cursor-pointer text-[#DF201F] "
                        >
                          {t("dashboard.viewAll")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="flex justify-between items-center border-b border-gray-200 p-2 hover:bg-gray-100">
                        <td className=" flex flex-col  cursor-pointer text-[#161A1D] ">
                          ORD00003{" "}
                          <span className=" text-[#A2A3A5] ">03:25 PM</span>
                        </td>
                        <td className=" cursor-pointer  text-[#50E06B] ">
                          {t("dashboard.acceptedOrder")}
                        </td>
                        <td className="p-6 flex relative mr-10 cursor-pointer">
                          <img
                            src={Pizza}
                            alt="Order Image"
                            className=" absolute left-0 top-0"
                          />
                          <img
                            src={Pizza}
                            alt="Order Image"
                            className=" absolute left-4 top-0"
                          />
                          <img
                            src={Pizza}
                            alt="Order Image"
                            className=" absolute left-8 top-0"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap  mt-8 border-2  rounded-[15px] h-[370px] w-full shadow-dashboard">
              <div className="flex flex-col m-4">
                <span className="self-start">{t("dashboard.revenue")}</span>
                <span className="self-start">
                  {t("dashboard.revenueAmount")}
                </span>
              </div>
              <div className="ml-10 mb-10 " style={{ width: 550 }}>
                {/* <LineChart /> */}
              </div>
            </div>
          </div>
          <div className="mt-24 h-full w-full">
            <div className="flex justify-between font-semibold text-xl">
              <span className="text-[#161A1D] ">
                {t("dashboard.recentlyPlacedOrders")}
              </span>
              <span className="text-[#DF201F]">{t("dashboard.viewAll")}</span>
            </div>
            <div className="">
              <div
                className="flex flex-col relative "
                style={{ fontFamily: "Bai Jamjuree" }}
              >
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
                          {t("dashboard.order")}
                        </th>
                        <th
                          scope="col"
                          className="border-r-1  py-2 px-4  border-r-[#FFFFFF]  h-[60px]  rounded-[8px, 8px, 0px, 0px] opacity-100"
                        >
                          {t("dashboard.customerName")}
                        </th>
                        <th
                          scope="col"
                          className="border-r-1  py-2 px-4  border-r-[#FFFFFF]  h-[60px]  rounded-[8px, 8px, 0px, 0px] opacity-100"
                        >
                          {t("dashboard.status")}
                        </th>
                        <th
                          scope="col"
                          className="border-r-1  py-2 px-4  border-r-[#FFFFFF]  h-[60px]  rounded-[8px, 8px, 0px, 0px] opacity-100"
                        >
                          {t("dashboard.time")}
                        </th>
                        <th
                          scope="col"
                          className="border-r-1  py-2 px-4  border-r-[#FFFFFF]  h-[60px]  rounded-[8px, 8px, 0px, 0px] opacity-100"
                        >
                          {t("dashboard.discountPrice")}
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
                          <span className="mr-10">{t("dashboard.pizza")}</span>
                        </td>
                        <td className="p-4 border-[2px] py-2 px-4 border-opacity-10 border-[#A2A3A5]">
                          {/* {item.id} */}
                          {t("dashboard.parthSata")}
                        </td>
                        <td className="p-4 border-[2px] text-[#E9CB3F] py-2 px-4 border-opacity-10 border-[#A2A3A5]">
                          {/* {item.Stock} */}
                          {t("dashboard.pending")}
                        </td>
                        <td className="p-4 border-[2px] py-2 px-4 border-opacity-10 border-[#A2A3A5]">
                          {/* {item.Status} */}
                          {t("dashboard.orderTime")}
                        </td>
                        <td className="p-4 border-[2px] py-2 px-4 border-opacity-10 border-[#A2A3A5]">
                          {/* ₹{item.Price} */}
                          {t("dashboard.price")}
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
      </div>

      {/* Pagination */}

      {/* Pagination */}
    </div>
  );
}

export default Dashboard;
