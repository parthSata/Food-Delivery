import { useState, useEffect } from "react";
import AddCategory from "./AddCategory";
import { search, Pizza } from "../Config/images";
import { useNavigate } from "react-router-dom";
import { ref, onValue, set, update, remove } from "firebase/database";
import { db } from "../../Firebase/firebase"; // Adjust the import based on your firebase setup
import Loader from "../Loader";
import Strings from "../Config/Strings";
import Input from "../ReusableComponent.tsx/Input";

export interface CategoriesData {
  id: string;
  categoryName: string;
  description: string;
  numberOfProducts: string;
  status: string;
  imageUrl: string;
}

function Home(): JSX.Element {
  const [showAddCategoryDialog, setShowAddCategoryDialog] =
    useState<boolean>(false);
  const [updateCategoryId, setUpdateCategoryId] = useState<string>("");
  const [categories, setCategories] = useState<CategoriesData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const filteredCategories = categories.filter((category) =>
    category.categoryName?.toLowerCase().includes(searchInput.toLowerCase())
  );
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const [isLoading, setisLoading] = useState(false)


  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    setisLoading(true)
    const categoriesRef = ref(db, "categories");
    onValue(categoriesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const categoriesData = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setCategories(categoriesData);
        setisLoading(false)
      }
    });

  };

  const handleAddOrUpdateCategory = async (newCategory: CategoriesData) => {
    setisLoading(true)
    try {
      if (newCategory.id) {
        // Update category
        const categoryRef = ref(db, `categories/${newCategory.id}`);
        await update(categoryRef, newCategory);
      } else {
        // Add new category
        const newCategoryRef = ref(db, "categories");
        await set(newCategoryRef, newCategory);
      }
      fetchCategories();
      setShowAddCategoryDialog(false);
    } catch (error) {
      console.error("Error adding/updating category:", error);
      setisLoading(false)
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (id: string) => {
    setisLoading(true)
    try {
      const categoryRef = ref(db, `categories/${id}`);
      await remove(categoryRef);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setisLoading(false)

    }
  };

  const handleUpdate = (id: string) => {
    setUpdateCategoryId(id);
    setShowAddCategoryDialog(true);
  };

  const handleViewCategories = (id: string) => {
    navigate(`/seller/category/${id}`);
  };

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

  const openAddCategoryDialog = () => setShowAddCategoryDialog(true);
  const closeAddCategoryDialog = () => setShowAddCategoryDialog(false);

  return (
    <div>
      {/* Body Part Started */}
      <div
        className="flex justify-between items-center font-BaiJamjuree font-semibold  mt-10 flex-wrap gap-2"
      >
        <div className="">
          <span className="font-semibold  text-[#161A1D]">{Strings.category.categoryList}</span>
        </div>
        <div className="flex ">
          <div className="flex justify-evenly flex-wrap gap-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search.."
                disabled
                className="border-gray-400 border-[1px] p-4 text-[#A2A3A5] focus:border-none pr-12 hover:border-[1px solid #E7E7E9] h-10 rounded-full"
                onChange={(e: any) => setSearchInput(e.target.value)}
              />
              <img
                src={search}
                alt="Search"
                className="absolute right-4 top-3 w-[14px] h-[14px]"
              />
            </div>
            <div className="">
              <button
                type="button"
                className="rounded-[60px] ml-5 text-[#FFFFFF] bg-[#94CD00] h-[40px] w-[200px]"
                style={{ boxShadow: "2px 2px 25px 2px #94CD0066" }}
                onClick={openAddCategoryDialog}
              >
                {Strings.category.addNewCategoryButton}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <Table /> */}

      {/* table Start */}
      <Loader isLoading={isLoading}>
        <div className="flex flex-col relative ">
          <div className="mt-4 flex rounded-[10px] absolute overflow-hidden w-full overflow-x-auto max-w-[100%] sm:overflow-x-scroll md:overflow-x-auto lg:overflow-x-auto">
            <table
              className="w-full text-md min-w-full shadow-[2px 2px 30px 2px #FFF3E5] text-left font-BaiJamjuree font-semibold  rtl:text-right text-gray-500 dark:text-gray-400 table-auto overflow-x-scroll"

            >
              <thead className="rounded-full bg-[#DF201F] ">
                <tr className="text-[#FFFFFF] font-semibold ">
                  <th className="border-r-1 py-2 px-4  border-r-[#FFFFFF] h-[60px] rounded-[8px, 8px, 0px, 0px] opacity-100">
                    {Strings.category.headerCategory}
                  </th>
                  <th className="border-r-1 py-2 px-4  border-r-[#FFFFFF] h-[60px] rounded-[8px, 8px, 0px, 0px] opacity-100">
                    {Strings.category.headerCategoryId}
                  </th>
                  <th className="border-r-1 py-2 px-4 border-r-[#FFFFFF] h-[60px] rounded-[8px, 8px, 0px, 0px] opacity-100">
                    {Strings.category.headerDescription}
                  </th>
                  <th className="border-r-1 py-2 px-4 border-r-[#FFFFFF] h-[60px] rounded-[8px, 8px, 0px, 0px] opacity-100">
                    {Strings.category.headerNumberOfProducts}
                  </th>
                  <th className="border-r-1 py-2 px-4 border-r-[#FFFFFF] h-[60px] rounded-[8px, 8px, 0px, 0px] opacity-100">
                    {Strings.category.headerStatus}
                  </th>
                  <th className="border-r-1 py-2 px-4 border-r-[#FFFFFF] h-[60px] rounded-[8px, 8px, 0px, 0px] opacity-100">
                    {Strings.category.headerAction}
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.map((item) => (
                  <tr
                    key={item.id}
                    className="text-[#A2A3A5] border-[2px] border-opacity-10 border-[#A2A3A5] border-b"
                  >
                    <td className=" flex items-center p-6 sm:pr-16 pr-20 border-opacity-10 border-[#A2A3A5]  ">
                      <img
                        src={item.imageUrl || Pizza}
                        className="ml-2 mr-2 w-[42px] h-[42px] rounded-3xl"
                        alt=""
                      />
                      {item.categoryName}
                    </td>
                    <td className="p-4 border-[2px] py-2 px-4 border-opacity-10 border-[#A2A3A5]">
                      {item.id}
                    </td>
                    <td className="p-4 border-[2px] py-2 px-4 border-opacity-10 border-[#A2A3A5]">
                      {item.description}
                    </td>
                    <td className="p-4 border-[2px] py-2 px-4 border-opacity-10 border-[#A2A3A5]">
                      {item.numberOfProducts}
                    </td>
                    <td className="p-4 border-[2px] py-2 px-4 border-opacity-10 border-[#A2A3A5]">
                      {item.status}
                    </td>
                    <td className="p-4 py-2 px-4 border-opacity-10 flex gap-4 w-full">
                      <i
                        className="fa-solid fa-trash fa-xl cursor-pointer "
                        onClick={() => handleDelete(item.id)}
                      // Delete Category
                      ></i>
                      <i
                        className="fa-solid fa-pen fa-xl cursor-pointer "
                        onClick={() => handleUpdate(item.id)}
                      // Update Category
                      ></i>{" "}
                      <i
                        className="fa-solid fa-eye fa-xl cursor-pointer"
                        onClick={() => handleViewCategories(item.id)}
                      // View  Category Categories
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Loader>
      {/* table End */}

      {/* table End */}
      {/* Pagination */}

      {totalPages > 1 && (
        <div className="flex justify-end">
          <div className="flex flex-row items-center justify-center mt-8 w-[308px] h-[38px] rounded-md">
            <button
              className="mr-4 rounded-sm px-3 py-1 hover:bg-gray-200 focus:outline-none"
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
            <button
              className="ml-4 rounded-sm px-3 py-1 hover:bg-gray-200 focus:outline-none"
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
      )
      }

      {/* Pagination */}
      {/* Body Ended Started */}
      {showAddCategoryDialog && (
        <div className="fixed rounded-[10px] z-10 inset-0 overflow-x-hidden bg-red">
          <div className="flex items-center justify-center h-full ">
            <div
              className="fixed inset-0 transition-opacity "
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-[#161A1D] opacity-75"></div>
            </div>

            <div className="bg-white rounded-lg shadow-xl transform transition-all p-6 relative m-8">
              <button
                type="button"
                className={`text-white p-[2px] bg-[#DF201F]  rounded-2xl absolute top-[-10px] right-[-10px]
                   mt-0`}
                onClick={closeAddCategoryDialog}
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

              <AddCategory
                id={updateCategoryId}
                onAddCategory={handleAddOrUpdateCategory}
                onClose={closeAddCategoryDialog}
              />
            </div>
          </div>
        </div>
      )
      }
    </div >
  );
}

export default Home;
