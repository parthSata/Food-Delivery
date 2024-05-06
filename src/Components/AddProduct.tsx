import React, { useEffect, useState } from "react";
import Pasta from "../assets/AddProduct/Pasta.png";
import Pizza from "../assets/AddProduct/Pizza.jpg";
import Burger from "../assets/AddProduct/Burger.jpg";

interface ProductData {
  id: number | string;
  ProductName: string;
  Price: number | string;
  DiscountPrice: number | string;
  Unit: number | string;
  Stock: string;
  IsVeg: string;
  Status: string;
  Discription: string;
}

interface Props {
  productId: number;
}

const AddProduct: React.FC<Props> = ({ productId }) => {
  const [imageDropdown, setImageDropdown] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [formData, setFormData] = useState<ProductData>({
    id: "",
    ProductName: "",
    Price: "",
    DiscountPrice: "",
    Unit: "",
    Stock: "",
    IsVeg: "True",
    Status: "In Stock",
    Discription: "",
  });

  const images = [Pasta, Pizza, Burger];

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? images.length - 1 : prevSlide - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === images.length - 1 ? 0 : prevSlide + 1
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target === null) return; // Null check
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products") ?? "[]");
    if (storedProducts) {
      setProducts(storedProducts);
    }
  }, []);

  const handleDelete = () => {
    const savedFormData = JSON.parse(localStorage.getItem(formData.id) ?? "[]");
    if (savedFormData) {
      localStorage.removeItem(savedFormData.id);
      setFormData({
        id: "",
        ProductName: "",
        Price: "",
        DiscountPrice: "",
        Unit: "",
        Stock: "",
        IsVeg: "True",
        Status: "In Stock",
        Discription: "",
      });
    }
  };

  const handleSubmit = () => {
    const newProduct = { ...formData, id: Date.now().toString() };
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    localStorage.setItem("products", JSON.stringify([...products, newProduct]));
    setFormData({
      id: "",
      ProductName: "",
      Price: "",
      DiscountPrice: "",
      Unit: "",
      Stock: "",
      IsVeg: "True",
      Status: "In Stock",
      Discription: "",
    });
  };

  const handleDropdown = () => {
    setImageDropdown(!imageDropdown);
  };

  const handleUpdate = () => {
    const existingProductData = JSON.parse(
      localStorage.getItem("products") ?? "[]"
    );
    if (!existingProductData) {
      console.log("Product not found for update!");
      return;
    }
    setFormData(existingProductData);
  };

  useEffect(() => {
    const existingProductData = JSON.parse(
      localStorage.getItem("products") ?? "[]"
    );
    console.log("🚀 ~ useEffect ~ existingProductData:", existingProductData);

    existingProductData.filter(
      (productId: number) => existingProductData.productId == productId
    );
  }, [productId]);

  return (
    <div className="">
      {/* DialogBox For Add Product */}
      <div className="flex justify-center gap-2 mt-[700px] sm:mt-[530px] md:mt-[350px] lg:mt-[6px] xl:mt-[85px] md:now lg:flex-nowrap flex-wrap">
        {/* image */}
        <div className="flex flex-col items-center relative mt-[2px] sm:mt-[180px] md:mt-[10px] lg:mt-[10px]">
          <span
            className="font-semibold"
            style={{ fontFamily: "Montserrat Alternates" }}
          >
            Product Image
          </span>
          <div className="">
            <img
              src={images[currentSlide]}
              className="h-[300px] w-[500px] rounded-lg"
              alt=""
            />
          </div>
          <button
            id="dropdownMenuIconButton"
            data-dropdown-toggle="dropdownDots"
            className="absolute right-2 z-20 inline-flex  items-center p-2 text-sm font-medium text-center  top-[35px] rounded-lg text-white focus:ring-gray-50"
            type="button"
            onClick={handleDropdown}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 4 15"
            >
              <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
            </svg>
          </button>
          <div
            className={`absolute right-0 z-10 mt-[74px] mr-4 font-semibold w-36 h-18 border-[1px solid #EFEFEF] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
              imageDropdown ? "" : "hidden"
            }`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
            style={{ fontFamily: "Bai Jamjuree" }}
            id="drop-down"
          >
            <div className="py-1 border-b-2 ">
              <a
                href="#"
                className="text-[#161A1D] block px-4 py-2 h-8 text-sm  font-semibold border-b-2"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-0"
              >
                Upload Image
              </a>
              <a
                href="#"
                className="text-gray-700 block px-4 py-2 text-sm  "
                role="menuitem"
                tabIndex={-1}
                id="menu-item-1"
              >
                Delete
              </a>
            </div>
          </div>

          <button
            type="button"
            className="absolute start-0 z-30 flex bottom-20 top-28 lg:top-0 lg:bottom-[250px] md:top-32   items-center justify-center  px-4 cursor-pointer group focus:outline-none"
            onClick={prevSlide}
          >
            <span className="inline-flex items-center  justify-center w-8 h-8 rounded-full bg-white dark:bg-white">
              <svg
                className="w-4 h-4 text-black rtl:rotate-180 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="absolute end-0  bottom-20 h-32 top-28 lg:top-28 lg:bottom-[200px] md:top-32 z-30 flex items-center  justify-center  px-4 cursor-pointer group focus:outline-none"
            onClick={nextSlide}
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-white">
              <svg
                className="w-4 h-4 text-black rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>

        <div className="w-full max-w-lg">
          <form
            className="w-full flex flex-row font-semibold "
            style={{ fontFamily: "Montserrat Alternates" }}
          >
            <div className="flex flex-wrap mb-6">
              <div className="w-full px-3 mb-6">
                <label className="flex justify-self-start  uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Product Name
                </label>
                <input
                  className="appearance-none w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight focus:outline-none bg-white"
                  type="text"
                  placeholder="Pizza"
                  name="ProductName"
                  value={formData.ProductName}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6">
                <label className="flex justify-self-start  uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Price
                </label>
                <input
                  className="appearance-none  block w-full h-[60px]  text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight focus:outline-none bg-white"
                  id="grid-last-name"
                  type="number"
                  placeholder="180"
                  value={formData.Price}
                  onChange={handleChange}
                  name="Price"
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6">
                <label className="flex justify-self-start  uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Discount Price
                </label>
                <input
                  className="appearance-none block w-full h-[60px]   text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight focus:outline-none bg-white"
                  id="grid-last-name"
                  type="number"
                  placeholder="175"
                  value={formData.DiscountPrice}
                  onChange={handleChange}
                  name="DiscountPrice"
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6">
                <label className="flex justify-self-start  uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Unit
                </label>
                <input
                  className="appearance-none block w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight focus:outline-none bg-white"
                  id="grid-last-name"
                  type="number"
                  placeholder="Gms"
                  value={formData.Unit}
                  onChange={handleChange}
                  name="Unit"
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6">
                <label className="flex justify-self-start  uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Stock
                </label>
                <input
                  className="appearance-none block w-full h-[60px]  text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight focus:outline-none bg-white"
                  id="grid-last-name"
                  type="number"
                  placeholder="25"
                  value={formData.Stock}
                  onChange={handleChange}
                  name="Stock"
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6">
                <label className="flex justify-self-start  uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Is Veg
                </label>
                <select
                  name="IsVeg"
                  value={formData.IsVeg}
                  onChange={() => handleChange}
                  className="appearance-none block w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight focus:outline-none bg-white "
                >
                  <option className="" value="True">
                    True
                  </option>
                  <option className="" value="False">
                    False
                  </option>
                </select>
              </div>
              <div className="w-full md:w-1/1 px-3 mb-6">
                <label className="flex justify-self-start  uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Status
                </label>
                <select
                  name="Status"
                  value={formData.Status}
                  onChange={() => handleChange}
                  className="appearance-none block w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight focus:outline-none bg-white "
                >
                  <option className="" value="In Stock">
                    In Stock
                  </option>
                  <option className="" value="Out of Stock">
                    Out of Stock
                  </option>
                </select>
              </div>
              <div className="w-full md:w-1/1 px-3 mb-6">
                <label className="flex justify-self-start  uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Discription
                </label>
                <textarea
                  className="appearance-none block w-full  text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight focus:outline-none bg-white resize-none"
                  id="grid-last-name"
                  type="text"
                  placeholder="Type Here..."
                  rows={5}
                  cols={5}
                  value={formData.Discription}
                  onChange={() => handleChange}
                  name="Discription"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="rounded-[60px] ml-5 text-[#FFFFFF] bg-[#94CD00] h-[40px] w-[140px]"
          style={{
            boxShadow: "2px 2px 25px 2px #94CD0099",
            fontFamily: "Bai Jamjuree",
          }}
          onClick={handleSubmit}
        >
          Save Product
        </button>
        <button
          type="submit"
          className="rounded-[60px] ml-5 text-[#FFFFFF] bg-[#94CD00] h-[40px] w-[140px]"
          style={{
            boxShadow: "2px 2px 25px 2px #94CD0099",
            fontFamily: "Bai Jamjuree",
          }}
          onClick={handleDelete}
        >
          Delete Product
        </button>
        {/* <button
          type="submit"
          className="rounded-[60px] ml-5 text-[#FFFFFF] bg-[#94CD00] h-[40px] w-[140px]"
          style={{
            boxShadow: "2px 2px 25px 2px #94CD0099",
            fontFamily: "Bai Jamjuree",
          }}
          onClick={handleSelect}
        >
          Select Product
        </button> */}
        <button
          type="submit"
          className="rounded-[60px] ml-5 text-[#FFFFFF] bg-[#94CD00] h-[40px] w-[140px]"
          style={{
            boxShadow: "2px 2px 25px 2px #94CD0099",
            fontFamily: "Bai Jamjuree",
          }}
          onClick={handleUpdate}
        >
          Update Product
        </button>
      </div>
      {/* DialogBox For Add Product */}
    </div>
  );
};

export default AddProduct;
