import { useState, useEffect } from "react";
import search from "../assets/HomePage/search.png";
import Pizza from "../assets/HomePage/Pizza.png";
import Right from "../assets/HomePage/RightArrow.png";
import Left from "../assets/HomePage/LeftArrow.png";
// import { useNavigate } from "react-router-dom";
import AddProduct from "./AddProduct";
import Header from "./Header";
import SideMenu from "./SideMenu";

interface Product {
  id: number;
  ProductName: string;
  Stock: number;
  Status: string;
  Price: number;
  DiscountPrice: number;
}

function Home(): JSX.Element {
  // const navigate = useNavigate();
  const [showAddProductDialog, setShowAddProductDialog] =
    useState<boolean>(false);
  const [updateProductId, setUpdateProductId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const openAddProductDialog = () => setShowAddProductDialog(true);
  const closeAddProductDialog = () => setShowAddProductDialog(false);

  const handleDelete = (id: number) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const handleUpdate = (id: number) => {
    console.log("Home, Product Id is :", id);
    const productToUpdate = products.find((product) => product.id === id);
    if (!productToUpdate) {
      return;
    }
    setShowAddProductDialog(true);
    setUpdateProductId(id);
  };

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  return (
    <>
      <div className="min-w-fit h-full">
        {/* Header Started Here */}
        <Header />
        {/* Header End Here */}

        {/* sideMenu */}
        <SideMenu />
        {/* sideMenu */}

        {/* Body Part Started */}
        <div className="min-w-fit ">
          <div
            className="flex justify-between  items-center mt-10"
            style={{ fontFamily: "Bai Jamjuree" }}
          >
            <div className="">
              <span className="font-semibold text-[#161A1D]">Product List</span>
            </div>
            <div className="">
              <div className="flex justify-evenly ">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search.."
                    className="border-gray-400  border-[1px] p-4 text-[#A2A3A5] focus:border-none  pr-12 hover:border-[1px solid #E7E7E9]  h-10 rounded-full"
                  />
                  <img
                    src={search}
                    alt="Search"
                    className="absolute right-4 top-3 w-[14px] h-[14px]"
                  />
                </div>
                <button
                  type="button"
                  className="rounded-[60px] ml-5 text-[#FFFFFF] bg-[#94CD00] h-[40px] w-[200px]"
                  style={{ boxShadow: "2px 2px 25px 2px #94CD0066" }}
                  onClick={openAddProductDialog}
                >
                  Add New Product +
                </button>
              </div>
            </div>
          </div>

          {/* table Start */}
          <div className="flex flex-col relative overflow-x-auto">
            <div className="mt-4 flex rounded-[10px] overflow-hidden relative  ">
              <table
                className=" w-full   text-md text-left rtl:text-right text-gray-500 dark:text-gray-400"
                style={{
                  fontFamily: "Bai Jamjuree",
                  boxShadow: "2px 2px 30px 2px #FFF3E5",
                }}
              >
                <thead className="rounded-full bg-[#DF201F]">
                  <tr className="text-[#FFFFFF] font-semibold ">
                    <th className="border-r-1  py-2 px-4 rounded-tl-lg    border-r-[#FFFFFF]  h-[60px]  rounded-[8px, 8px, 0px, 0px] opacity-100">
                      Name
                    </th>
                    <th className="border-r-1  py-2 px-4  border-r-[#FFFFFF]  h-[60px]  rounded-[8px, 8px, 0px, 0px] opacity-100">
                      Product Id
                    </th>
                    <th className="border-r-1 py-2 px-4   border-r-[#FFFFFF]  h-[60px]  rounded-[8px, 8px, 0px, 0px] opacity-100">
                      Quantity
                    </th>
                    <th className="border-r-1  py-2 px-4  border-r-[#FFFFFF]  h-[60px]  rounded-[8px, 8px, 0px, 0px] opacity-100">
                      Status
                    </th>
                    <th className="border-r-1  py-2 px-4  border-r-[#FFFFFF]  h-[60px]  rounded-[8px, 8px, 0px, 0px] opacity-100">
                      Price
                    </th>
                    <th className="border-r-1  py-2 px-4   border-r-[#FFFFFF]  h-[60px]  rounded-[8px, 8px, 0px, 0px] opacity-100">
                      Discount Price
                    </th>
                    <th className="border-r-1  py-2 px-4   border-r-[#FFFFFF]  h-[60px]  rounded-[8px, 8px, 0px, 0px] opacity-100">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item) => (
                    <tr
                      key={item.id}
                      className="text-[#A2A3A5] border-[2px]   border-opacity-10 border-[#A2A3A5] border-b"
                    >
                      <td className=" flex items-center p-6 sm:pr-16 border-opacity-10 border-[#A2A3A5]  ">
                        <img
                          src={Pizza}
                          className="ml-2 mr-2 w-[42px] h-[42px]"
                          alt=""
                        />
                        {item.ProductName}
                      </td>
                      <td className="p-4 border-[2px] py-2 px-4 border-opacity-10 border-[#A2A3A5]">
                        {item.id}
                      </td>
                      <td className="p-4 border-[2px] py-2 px-4 border-opacity-10 border-[#A2A3A5]">
                        {item.Stock}
                      </td>
                      <td className="p-4 border-[2px] py-2 px-4 border-opacity-10 border-[#A2A3A5]">
                        {item.Status}
                      </td>
                      <td className="p-4 border-[2px] py-2 px-4 border-opacity-10 border-[#A2A3A5]">
                        ₹{item.Price}
                      </td>
                      <td className="p-4 border-[2px] py-2 px-4 border-opacity-10 border-[#A2A3A5]">
                        ₹{item.DiscountPrice}
                      </td>
                      <td className="p-4  py-2 px-4 border-opacity-10 ">
                        <i
                          className="fa-solid fa-trash fa-xl  cursor-pointer md:mr-2 lg:mr-6"
                          onClick={(): void => handleDelete(item.id)}
                        ></i>
                        <i
                          className="fa-solid fa-pen fa-xl cursor-pointer "
                          onClick={() => handleUpdate(item.id)}
                        ></i>{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* table End */}
        </div>
        <div className="flex justify-end">
          <div
            className="flex flex-row items-center justify-center mt-8 w-[308px] h-[38px] rounded-md"
            style={{ boxShadow: "2px 2px 30px 2px #FFF3E5" }}
          >
            <img
              src={Left}
              className="h-[26px] w-[25px] rounded-sm cursor-pointer focus:text-white focus:border-black-8 focus:bg-[#DF201F]"
            />
            <ul className="flex items-end justify-around w-64 top-[]">
              <li className="flex flex-grow ">
                <a
                  href="#"
                  className="h-[26px] w-[25px] rounded-sm focus:text-white focus:border-black-8 focus:bg-[#DF201F]"
                >
                  1
                </a>
              </li>
              <li className="page flex flex-grow">
                <a
                  href="#"
                  className="h-[26px] w-[25px] rounded-sm focus:text-white focus:border-black-8 focus:bg-[#DF201F]"
                >
                  2
                </a>
              </li>
              <li className="page flex flex-grow">
                <a
                  href="#"
                  className="h-[26px] w-[25px] rounded-sm focus:text-white focus:border-black-8 focus:bg-[#DF201F]"
                >
                  3
                </a>
              </li>
              <li className="page flex flex-grow">
                <a
                  href="#"
                  className="h-[26px] w-[25px] rounded-sm focus:text-white focus:border-black-8 focus:bg-[#DF201F]"
                >
                  4
                </a>
              </li>
              <li className="page flex flex-grow">
                <a
                  href="#"
                  className="h-[26px] w-[25px] rounded-sm focus:text-white focus:border-black-8 focus:bg-[#DF201F]"
                >
                  5
                </a>
              </li>
            </ul>
            <img
              src={Right}
              className="h-[26px] w-[25px] rounded-sm cursor-pointer focus:text-white focus:border-black-8 focus:bg-[#DF201F]"
            />
          </div>
        </div>
        {/* Body Ended Started */}
      </div>
      {showAddProductDialog && (
        <div className="fixed rounded-[10px]  z-10 inset-0 overflow-x-hidden  sm:m-10 md:m-4 m-8">
          <div className="flex items-center  justify-center h-screen ">
            <div
              className="fixed inset-0 transition-opacity "
              aria-hidden="true"
            >
              <div className="absolute inset-0  bg-[#161A1D] opacity-75"></div>
            </div>

            <div className="bg-white rounded-lg shadow-xl transform transition-all  sm:top-[600px]  md:top-[1px]    sm:max-w-[1000px] sm:w-full">
              <button
                type="button"
                className="text-white p-[2px] bg-[#DF201F]  rounded-2xl absolute  top-[710px] sm:top-[720px] md:top-[465px] lg:top-[40px] xl:top-[80px] right-[-22px] mt-0 mr-6"
                onClick={closeAddProductDialog}
              >
                <span className="sr-only ">Close</span>
                <svg
                  className="h-[26px] w-[26px] p-[4px]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="p-6">
                <AddProduct
                  onClose={() => setShowAddProductDialog(false)}
                  productId:Number={updateProductId}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
