import { Burger, Accepted, Cancel, Pizza } from "@/assets";

import { useLanguageContext } from "../LanguageContext";
import Input from "../ReusableComponent/Input";
// import { useState } from 'react'

function Orders() {
  const { t } = useLanguageContext();
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const itemsPerPage = 5;
  // const [searchInput, setSearchInput] = useState("");
  // const filteredProducts = products.filter((product) =>
  //     product.ProductName.toLowerCase().includes(searchInput.toLowerCase())
  // );
  // // const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // // @ts-ignore
  // const currentItems = filteredProducts.slice(
  //     indexOfFirstItem,
  //     indexOfLastItem
  // );

  // const handlePageChange = (pageNumber: number) => {
  //     setCurrentPage(pageNumber);
  // };
  // const handleNextPage = () => {
  //     if (currentPage < totalPages) {
  //         setCurrentPage(currentPage + 1);
  //     }
  // };

  // const handlePreviousPage = () => {
  //     if (currentPage > 1) {
  //         setCurrentPage(currentPage - 1);
  //     }
  // };

  return (
    <>
      <div className="">
        <div className="flex flex-col flex-wrap">
          <div className="">
            <div className="m-2 flex  flex-wrap justify-between items-center font-medium">
              <span
                className="text-[#161A1D] mb-2"
                style={{ fontFamily: "Bai Jamjuree" }}
              >
                {t("orders.today")}
              </span>
              <span className="">
                {/* Search Input */}

                <form className="max-w-md mx-auto ">
                  <div className="relative ">
                    <div className="absolute  inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4  text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <Input
                      type="search"
                      className="block w-full p-4 ps-10 text-sm  text-gray-500 border border-[1px solid #E7E7E9] rounded-lg "
                      style={{ fontFamily: "Montserrat Alternates" }}
                      placeholder="Search"
                      // onChange={(e) => setSearchInput(e.target.value)}
                    />
                  </div>
                </form>
                {/* Search Input */}
              </span>
            </div>
            <div className="flex flex-wrap  item-center">
              <div className="w-full flex flex-wrap  p-2 ">
                <div className=" p-3 flex  flex-wrap gap-8 mb-4 h-full w-full shadow-Order">
                  <div className="flex font-semibold  flex-row flex-wrap  self-start justify-center ">
                    <div className="flex flex-col  gap-1">
                      <span className="" style={{ fontFamily: "Bai Jamjuree" }}>
                        {t("orders.orderNumber")}
                      </span>
                      <p
                        className="text-[#A2A3A5] text-xs "
                        style={{ fontFamily: "Montserrat Alternates" }}
                      >
                        {t("orders.orderTime")}
                      </p>
                      <span
                        className="flex justify-center items-center text-[#50E06B] gap-2"
                        style={{ fontFamily: "Bai Jamjuree" }}
                      >
                        <img src={Accepted} alt="" className="h-5" />
                        {t("orders.acceptedOrder")}
                      </span>
                    </div>
                  </div>
                  <div className="flex  flex-wrap  gap-4">
                    <div className=" flex flex-wrap w-full sm:flex-nowrap md:flex-nowrap lg:flex-nowrap xl:flex-nowrap gap-4   ">
                      <div
                        className="flex flex-row gap-2 w-full p-4 flex-wrap h-auto justify-center border-2  rounded-[10px]  items-center"
                        style={{ fontFamily: "Bai Jamjuree" }}
                      >
                        <img src={Burger} alt="" className="h-[40px]" />
                        <div className="flex flex-col ">
                          <span className="">Hamburger</span>
                          <span className="text-[#DF201F] self-start text-sm">
                            ₹100
                          </span>
                        </div>
                      </div>
                      <div
                        className="flex flex-row gap-2 w-full p-4 flex-wrap h-auto justify-center border-2  rounded-[10px]  items-center"
                        style={{ fontFamily: "Bai Jamjuree" }}
                      >
                        <img src={Burger} alt="" className="h-[40px]" />
                        <div className="flex flex-col ">
                          <span className="">Hamburger</span>
                          <span className="text-[#DF201F] self-start text-sm">
                            ₹100
                          </span>
                        </div>
                      </div>
                      <div
                        className="flex flex-row gap-2 w-full p-4 flex-wrap h-auto justify-center border-2  rounded-[10px]  items-center"
                        style={{ fontFamily: "Bai Jamjuree" }}
                      >
                        <img src={Burger} alt="" className="h-[40px]" />
                        <div className="flex flex-col ">
                          <span className="">Hamburger</span>
                          <span className="text-[#DF201F] self-start text-sm">
                            ₹100
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap  item-center">
              <div className="w-full flex flex-wrap  p-2 ">
                <div className=" p-3 flex  flex-wrap gap-8 mb-4 h-full w-full shadow-Order">
                  <div className="flex font-semibold  flex-row flex-wrap  self-start justify-center ">
                    <div className="flex flex-col  gap-1">
                      <span className="" style={{ fontFamily: "Bai Jamjuree" }}>
                        Order# ORD00003
                      </span>
                      <p
                        className="text-[#A2A3A5] text-xs "
                        style={{ fontFamily: "Montserrat Alternates" }}
                      >
                        03:25 PM
                      </p>
                      <span
                        className="flex justify-center items-center text-[#DF201F] gap-2"
                        style={{ fontFamily: "Bai Jamjuree" }}
                      >
                        <img src={Cancel} alt="" className="h-5" />
                        Accepted Order
                      </span>
                    </div>
                  </div>
                  <div className="flex  flex-wrap  gap-4">
                    <div className=" flex flex-wrap w-full sm:flex-nowrap md:flex-nowrap lg:flex-nowrap xl:flex-nowrap gap-4   ">
                      <div
                        className="flex flex-row gap-2 w-full p-4 flex-wrap h-auto justify-center border-2  rounded-[10px]  items-center"
                        style={{ fontFamily: "Bai Jamjuree" }}
                      >
                        <img src={Pizza} alt="" className="h-[40px]" />
                        <div className="flex flex-col ">
                          <span className="">Pizza</span>
                          <span className="text-[#DF201F] self-start ">
                            ₹500
                          </span>
                        </div>
                      </div>
                      <div
                        className="flex flex-row gap-2 w-full p-4 flex-wrap h-auto justify-center border-2  rounded-[10px]  items-center"
                        style={{ fontFamily: "Bai Jamjuree" }}
                      >
                        <img src={Pizza} alt="" className="h-[40px]" />
                        <div className="flex flex-col ">
                          <span className="">Pizza</span>
                          <span className="text-[#DF201F] self-start ">
                            ₹500
                          </span>
                        </div>
                      </div>
                      <div
                        className="flex flex-row gap-2 w-full p-4 flex-wrap h-auto justify-center border-2  rounded-[10px]  items-center"
                        style={{ fontFamily: "Bai Jamjuree" }}
                      >
                        <img src={Pizza} alt="" className="h-[40px]" />
                        <div className="flex flex-col ">
                          <span className="">Pizza</span>
                          <span className="text-[#DF201F] self-start ">
                            ₹500
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-wrap">
          <div className="">
            <div className="m-2 flex  flex-wrap justify-between items-center font-medium">
              <span
                className="text-[#161A1D] mb-2"
                style={{ fontFamily: "Bai Jamjuree" }}
              >
                Yesterday , 24th March 2022
              </span>
            </div>
            <div className="flex flex-wrap  item-center">
              <div className="w-full flex flex-wrap  p-2 ">
                <div
                  className=" p-3 flex  flex-wrap gap-8 mb-4 h-full w-full "
                  style={{ boxShadow: "2px 2px 30px 2px #FFF3E5CC" }}
                >
                  <div className="flex font-semibold  flex-row flex-wrap  self-start justify-center ">
                    <div className="flex flex-col  gap-1">
                      <span className="" style={{ fontFamily: "Bai Jamjuree" }}>
                        Order# ORD00003
                      </span>
                      <p
                        className="text-[#A2A3A5] text-xs "
                        style={{ fontFamily: "Montserrat Alternates" }}
                      >
                        03:25 PM
                      </p>
                      <span
                        className="flex justify-center items-center text-[#50E06B] gap-2"
                        style={{ fontFamily: "Bai Jamjuree" }}
                      >
                        <img src={Accepted} alt="" className="h-5" />
                        Accepted Order
                      </span>
                    </div>
                  </div>
                  <div className="flex  flex-wrap  gap-4">
                    <div className=" flex flex-wrap w-full sm:flex-nowrap md:flex-nowrap lg:flex-nowrap xl:flex-nowrap gap-4   ">
                      <div
                        className="flex flex-row gap-2 w-full p-4 flex-wrap h-auto justify-center border-2  rounded-[10px]  items-center"
                        style={{ fontFamily: "Bai Jamjuree" }}
                      >
                        <img src={Burger} alt="" className="h-[40px]" />
                        <div className="flex flex-col ">
                          <span className="">Hamburger</span>
                          <span className="text-[#DF201F] self-start text-sm">
                            ₹100
                          </span>
                        </div>
                      </div>
                      <div
                        className="flex flex-row gap-2 w-full p-4 flex-wrap h-auto justify-center border-2  rounded-[10px]  items-center"
                        style={{ fontFamily: "Bai Jamjuree" }}
                      >
                        <img src={Burger} alt="" className="h-[40px]" />
                        <div className="flex flex-col ">
                          <span className="">Hamburger</span>
                          <span className="text-[#DF201F] self-start text-sm">
                            ₹100
                          </span>
                        </div>
                      </div>
                      <div
                        className="flex flex-row gap-2 w-full p-4 flex-wrap h-auto justify-center border-2  rounded-[10px]  items-center"
                        style={{ fontFamily: "Bai Jamjuree" }}
                      >
                        <img src={Burger} alt="" className="h-[40px]" />
                        <div className="flex flex-col ">
                          <span className="">Hamburger</span>
                          <span className="text-[#DF201F] self-start text-sm">
                            ₹100
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap  item-center">
              <div className="w-full flex flex-wrap  p-2 ">
                <div className=" p-3 flex  flex-wrap gap-8 mb-4 h-full w-full shadow-Order">
                  <div className="flex font-semibold  flex-row flex-wrap  self-start justify-center ">
                    <div className="flex flex-col  gap-1">
                      <span className="" style={{ fontFamily: "Bai Jamjuree" }}>
                        Order# ORD00003
                      </span>
                      <p
                        className="text-[#A2A3A5] text-xs "
                        style={{ fontFamily: "Montserrat Alternates" }}
                      >
                        03:25 PM
                      </p>
                      <span
                        className="flex justify-center items-center text-[#DF201F] gap-2"
                        style={{ fontFamily: "Bai Jamjuree" }}
                      >
                        <img src={Cancel} alt="" className="h-5" />
                        Accepted Order
                      </span>
                    </div>
                  </div>
                  <div className="flex  flex-wrap  gap-4">
                    <div className=" flex flex-wrap w-full sm:flex-nowrap md:flex-nowrap lg:flex-nowrap xl:flex-nowrap gap-4   ">
                      <div
                        className="flex flex-row gap-2 w-full p-4 flex-wrap h-auto justify-center border-2  rounded-[10px]  items-center"
                        style={{ fontFamily: "Bai Jamjuree" }}
                      >
                        <img src={Pizza} alt="" className="h-[40px]" />
                        <div className="flex flex-col ">
                          <span className="">Pizza</span>
                          <span className="text-[#DF201F] self-start ">
                            ₹500
                          </span>
                        </div>
                      </div>
                      <div
                        className="flex flex-row gap-2 w-full p-4 flex-wrap h-auto justify-center border-2  rounded-[10px]  items-center"
                        style={{ fontFamily: "Bai Jamjuree" }}
                      >
                        <img src={Pizza} alt="" className="h-[40px]" />
                        <div className="flex flex-col ">
                          <span className="">Pizza</span>
                          <span className="text-[#DF201F] self-start ">
                            ₹500
                          </span>
                        </div>
                      </div>
                      <div
                        className="flex flex-row gap-2 w-full p-4 flex-wrap h-auto justify-center border-2  rounded-[10px]  items-center"
                        style={{ fontFamily: "Bai Jamjuree" }}
                      >
                        <img src={Pizza} alt="" className="h-[40px]" />
                        <div className="flex flex-col ">
                          <span className="">Pizza</span>
                          <span className="text-[#DF201F] self-start ">
                            ₹500
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Pagination */}

        {/* {totalPages > 1 && (
                        <div className="flex justify-end">
                            <div className="flex flex-row items-center justify-center mt-8 w-[308px] h-[38px] rounded-md">
                                <button
                                    className="mr-4 rounded-sm px-3 py-1 hover:bg-gray-200    focus:outline-none"
                                    onClick={() => handlePreviousPage()}
                                    disabled={currentPage === 1}
                                >
                                    <i
                                        className="fa-solid fa-angle-left text-fontGray"
                                    ></i>
                                </button>
                                <ul className="flex items-end justify-around w-[80px] top-[]">
                                    {[...Array(totalPages)].map((_, index) => (
                                        <li key={index} className="page flex flex-grow">
                                            <a
                                                href="#"
                                                onClick={() => handlePageChange(index + 1)}
                                                className={`h-[26px] w-[25px] rounded-sm focus:text-white focus:border-black-8 focus:bg-[#DF201F] ${currentPage === index + 1 ? "font-bold" : ""
                                                    }`}
                                            >
                                                {index + 1}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    className="ml-4 rounded-sm px-3 py-1  hover:bg-gray-200 focus:outline-none"
                                    onClick={() => handleNextPage()}
                                    disabled={currentPage === totalPages}
                                >
                                    <i
                                        className="fa-solid fa-angle-right text-fontGray"
                                    ></i>
                                </button>
                            </div>
                        </div>
                    )} */}

        {/* Pagination */}
      </div>
    </>
  );
}

export default Orders;
