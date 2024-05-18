import { useState, useEffect } from "react";
import search from "../assets/HomePage/search.png";
// import Right from "../assets/HomePage/RightArrow.png";
// import Left from "../assets/HomePage/LeftArrow.png";
import AddProduct from "./AddProduct";
import Header from "./Header";
import Table from "./Table";

interface Product {
  id: number;
  ProductName: string;
  Stock: number;
  Status: string;
  Price: number;
  DiscountPrice: number;
  ProductImage: string;
}

function Home(): JSX.Element {
  const [showAddProductDialog, setShowAddProductDialog] =
    useState<boolean>(false);
  // @ts-ignore
  const [updateProductId, setUpdateProductId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const [searchInput, setSearchInput] = useState("");
  const filteredProducts = products.filter((product) =>
    product.ProductName.toLowerCase().includes(searchInput.toLowerCase())
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // @ts-ignore
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleAddOrUpdateProduct = (newProduct: Product) => {
    const updatedProducts = [...products];
    const existingProductIndex = updatedProducts.findIndex(
      (product) => product.id === newProduct.id
    );

    if (existingProductIndex !== -1) {
      updatedProducts[existingProductIndex] = newProduct;
    } else {
      updatedProducts.push(newProduct);
    }

    // Update state and local storage
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    // Close the dialog
    setShowAddProductDialog(false);
  };

  // Auto fetch Data after add,update product

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products") ?? "[]");
    if (storedProducts) {
      setProducts(storedProducts);
    }
  }, [updateProductId]);

  const openAddProductDialog = () => setShowAddProductDialog(true);
  const closeAddProductDialog = () => setShowAddProductDialog(false);

  // const handleDelete = (id: number) => {
  //   const updatedProducts = products.filter((product) => product.id !== id);
  //   setProducts(updatedProducts);
  //   localStorage.setItem("products", JSON.stringify(updatedProducts));
  // };

  // const handleUpdate = (id: number) => {
  //   const productToUpdate = products.find((product) => product.id === id);
  //   if (productToUpdate) {
  //     setShowAddProductDialog(true);
  //     setUpdateProductId(id);
  //   } else {
  //     console.log("Product not found for update!");
  //   }
  // };

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="min-w-fit ">
        {/* Header Started Here */}
        <Header />
        {/* Header End Here */}

        {/* Body Part Started */}
        <div className="min-w-fit ">
          <div
            className="flex justify-between  items-center mt-10 flex-wrap"
            style={{ fontFamily: "Bai Jamjuree" }}
          >
            <div className="">
              <span className="font-semibold text-[#161A1D]">Product List</span>
            </div>
            <div className="flex flex-wrap">
              <div className="flex justify-evenly ">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search.."
                    className="border-gray-400  border-[1px] p-4 text-[#A2A3A5] focus:border-none  pr-12 hover:border-[1px solid #E7E7E9]  h-10 rounded-full"
                    onChange={(e) => setSearchInput(e.target.value)}
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
          <Table />

          {/* table Start */}

          {/* table End */}
        </div>
        {/* Pagination */}

        {totalPages > 1 && (
          <div className="flex justify-end">
            <div className="flex flex-row items-center justify-center mt-8 w-[308px] h-[38px] rounded-md">
              {/* <img
                src={Left}
                className="h-[26px] w-[25px] rounded-sm cursor-pointer focus:text-white focus:border-black-8 focus:bg-[#DF201F]"
              /> */}
              <button
                className="mr-4 rounded-sm px-3 py-1 hover:bg-gray-200    focus:outline-none"
                onClick={() => handlePreviousPage()}
                disabled={currentPage === 1}
              >
                <i
                  className="fa-solid fa-angle-left"
                  style={{ color: "#8f9194" }}
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
              {/* <img
                src={Right}
                className="h-[26px] w-[25px] rounded-sm cursor-pointer focus:text-white focus:border-black-8 focus:bg-[#DF201F]"
                
              /> */}
              <button
                className="ml-4 rounded-sm px-3 py-1  hover:bg-gray-200 focus:outline-none"
                onClick={() => handleNextPage()}
                disabled={currentPage === totalPages}
              >
                <i
                  className="fa-solid fa-angle-right"
                  style={{ color: "#8f9194" }}
                ></i>
              </button>
            </div>
          </div>
        )}

        {/* Pagination */}
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

            <div className="bg-white rounded-lg shadow-xl transform transition-all      sm:max-w-[1000px] sm:w-full">
              <div className="p-6 relative">
                <button
                  type="button"
                  className={`text-white p-[2px] bg-[#DF201F]  rounded-2xl absolute ${updateProductId &&
                    !filteredProducts.find(
                      (product) => product.id === updateProductId
                    )?.ProductImage
                    ? "top-[10px] left-[100px] sm:top-[20px] sm:left-[20px] md:top-[10px] md:left-[10px] lg:top-[10px] lg:left-[10px] xl:top-[20px] xl:left-[20px]"
                    : "top-[400px] left-[545px] sm:top-[390px] sm:left-[600px] md:top-[30px] md:left-[965px] lg:top-[10px] lg:left-[980px] xl:top-[80px] xl:left-[980px]"
                    } mt-0 mr-6`}
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

                <AddProduct
                  onClose={() => setShowAddProductDialog(false)}
                  productId={updateProductId}
                  onAddProduct={() => handleAddOrUpdateProduct}
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
