import { useEffect, useState } from "react";
import Pizza from "../assets/HomePage/Pizza.png";
import { toast } from "react-toastify";


interface Product {
  id: number;
  ProductName: string;
  Stock: number;
  Status: string;
  Price: number;
  DiscountPrice: number;
  ProductImage: string;
}

function Table() {
  const [products, setProducts] = useState<Product[]>([]);
  // @ts-ignore
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  // @ts-ignore

  const [searchInput, setSearchInput] = useState("");
  const filteredProducts = products.filter((product) =>
    product.ProductName.toLowerCase().includes(searchInput.toLowerCase())
  );
  const [updateProductId, setUpdateProductId] = useState<number | null>(null);
  // @ts-ignore

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const handleDelete = (id: number) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products") ?? "[]");
    if (storedProducts) {
      setProducts(storedProducts);
    }
  }, [updateProductId]);

  const handleUpdate = (id: number) => {
    const productToUpdate = products.find((product) => product.id === id);
    if (productToUpdate) {
      // setShowAddProductDialog(true);
      setUpdateProductId(id);
    } else {
      toast.error("Product not found for update!");
    }
  };

  return (
    <>
      <div className="flex flex-col relative ">
        <div className="relative overflow-x-auto  max-w-[100%]">
          <table
            className="mt-4 w-full text-md text-left rtl:text-right rounded-[10px] overflow-hidden  text-gray-500 shadow-dashboard"
            style={{
              fontFamily: "Bai Jamjuree",
            }}
          >
            <thead className="rounded-full   bg-[#DF201F]  ">
              <tr className="text-[#FFFFFF] font-semibold ">
                <th
                  scope="col"
                  className="border-r-1  py-2 px-4  border-r-[#FFFFFF]  h-[60px]  rounded-[8px, 8px, 0px, 0px] opacity-100"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="border-r-1  py-2 px-4  border-r-[#FFFFFF]  h-[60px]  rounded-[8px, 8px, 0px, 0px] opacity-100"
                >
                  Product Id
                </th>
                <th
                  scope="col"
                  className="border-r-1  py-2 px-4  border-r-[#FFFFFF]  h-[60px]  rounded-[8px, 8px, 0px, 0px] opacity-100"
                >
                  Quantity
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
                  Price
                </th>
                <th
                  scope="col"
                  className="border-r-1  py-2 px-4  border-r-[#FFFFFF]  h-[60px]  rounded-[8px, 8px, 0px, 0px] opacity-100"
                >
                  Discount Price
                </th>
                <th
                  scope="col"
                  className="border-r-1  py-2 px-4  border-r-[#FFFFFF]  h-[60px]  rounded-[8px, 8px, 0px, 0px] opacity-100"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((item) => (
                <tr
                  key={item.id}
                  className="text-[#A2A3A5] border-[2px]   border-opacity-10 border-[#A2A3A5] border-b"
                >
                  <td
                    scope="row"
                    className="flex items-center p-6 sm:pr-16 border-opacity-10 border-[#A2A3A5]"
                  >
                    <img
                      src={item.ProductImage || Pizza}
                      className="ml-2 mr-2 w-[42px] h-[42px] rounded-3xl"
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
                  <td className="p-4 py-2 px-4 border-opacity-10">
                    <i
                      className="fa-solid fa-trash fa-xl  cursor-pointer md:mr-2 lg:mr-6"
                      onClick={(): void => handleDelete(item.id)}
                    ></i>
                    <i
                      className="fa-solid fa-pen fa-xl cursor-pointer "
                      onClick={(): void => handleUpdate(item.id)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Table;
