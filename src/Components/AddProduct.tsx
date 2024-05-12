import React, { useEffect, useState, useRef, RefObject } from "react";
// import Pasta from "../assets/AddProduct/Pasta.png";
// import Pizza from "../assets/AddProduct/Pizza.jpg";
// import Burger from "../assets/AddProduct/Burger.jpg";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";

interface ProductData {
  id: number | string;
  ProductName: string;
  Price: number | string;
  DiscountPrice: number | string;
  Unit: number | string;
  ProductImage?: string;
  Stock: string;
  IsVeg: string;
  Status: string;
  Discription: string;
}

interface Props {
  onClose: () => void;
  productId?: number | null;
  onAddProduct: (newProduct: ProductData) => void;
}

const AddProduct: React.FC<Props> = ({ productId, onAddProduct, onClose }) => {
  // const [imageDropdown, setImageDropdown] = useState<boolean>(false);
  // const [currentSlide, setCurrentSlide] = useState<number>(0);
  // @ts-ignore
  const [products, setProducts] = useState<ProductData[]>([]);
  const [formData, setFormData] = useState<ProductData>({
    id: "",
    ProductName: "",
    Price: "",
    DiscountPrice: "",
    Unit: "",
    ProductImage: "",
    Stock: "",
    IsVeg: "True",
    Status: "In Stock",
    Discription: "",
  });
  const imageDropdownRef: RefObject<HTMLButtonElement> = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  // const fileInputRef = useRef<HTMLInputElement>(null);

  // const images = [Pasta, Pizza, Burger];

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    if (name === "ProductImage") {
      setErrorMessage(validate(value));
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        imageDropdownRef.current &&
        !imageDropdownRef.current.contains(event.target as Node)
      ) {
        // Clicked outside of the dropdown, close it
        closeImageDropdown();
      }
    };

    // Add event listener to handle clicks outside of the dropdown
    document.addEventListener("mousedown", handleOutsideClick);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const validate = (value: string): string => {
    if (validator.isURL(value)) {
      return ""; // Return empty string for valid URL
    } else {
      return "Is Not Valid URL"; // Return error message for invalid URL
    }
  };
  const closeImageDropdown = () => {
    if (imageDropdownRef.current) {
      imageDropdownRef.current.classList.add("hidden");
    }
  };

  // const prevSlide = () => {
  //   setCurrentSlide((prevSlide) =>
  //     prevSlide === 0 ? images.length - 1 : prevSlide - 1
  //   );
  // };

  // const nextSlide = () => {
  //   setCurrentSlide((prevSlide) =>
  //     prevSlide === images.length - 1 ? 0 : prevSlide + 1
  //   );
  // };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (event.target === null) return;
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products") ?? "[]");
    if (storedProducts) {
      setProducts(storedProducts);
    }
  }, []);

  const handleSubmit = () => {
    if (
      !formData.ProductName ||
      !formData.Price ||
      !formData.DiscountPrice ||
      !formData.Unit ||
      !formData.Stock ||
      !formData.Discription ||
      !formData.ProductImage || // Add null check for formData.ProductImage
      formData.ProductImage?.length === 0 // Ensure at least one image is uploaded
    ) {
      toast.warn("Please Fill all inputs and Upload Image");
      return;
    }

    if (formData.ProductImage && formData.ProductImage.length === 0) {
      const confirmUpload = window.confirm(
        "No image uploaded. Do you want to proceed without an image?"
      );
      if (!confirmUpload) {
        return; // Don't proceed without an image
      }
    }

    const newProduct: ProductData = {
      ...formData,
      id: Date.now().toString(),
      ProductImage: "", // Initialize empty array
    };

    // formData.ProductImage.forEach((image) => {
    //   if (typeof image === "string") {
    //     // If it's a base64 encoded string, push it directly
    //     newProduct.ProductImage?.push(image);
    //   } else {
    //     // If it's a File object, read it as base64 and push the encoded string
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //       const base64Data = reader.result as string;
    //       newProduct.ProductImage?.push(base64Data);
    //       // Update the state after saving to localStorage
    //       setProducts((prevProducts) => [...prevProducts, newProduct]);
    //       // Save to localStorage immediately
    //       localStorage.setItem(
    //         "products",
    //         JSON.stringify([...products, newProduct])
    //       );
    //     };
    //     reader.readAsDataURL(image);
    //   }
    // });

    setFormData({
      id: "",
      ProductName: "",
      Price: "",
      DiscountPrice: "",
      Unit: "",
      ProductImage: "",
      Stock: "",
      IsVeg: "True",
      Status: "In Stock",
      Discription: "",
    });

    onAddProduct(newProduct);
    onClose();
  };

  // const handleDropdown = () => {
  //   setImageDropdown(!imageDropdown);
  //   if (imageDropdownRef.current) {
  //     imageDropdownRef.current.classList.toggle("hidden");
  //   }
  // };

  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     setFormData({
  //       ...formData,
  //       ProductImage: [...(formData.ProductImage ?? []), file],
  //     });
  //   }
  // };

  // const handleImageUploadClick = () => {
  //   fileInputRef.current?.click();
  // };

  const handleUpdate = () => {
    const existingProducts = JSON.parse(
      localStorage.getItem("products") ?? "[]"
    );
    const existingProductIndex = existingProducts.findIndex(
      (product: ProductData) => product.id === productId
    );
    if (existingProductIndex !== -1) {
      existingProducts[existingProductIndex] = { ...formData, id: productId };
      // find index of updated product id then update that object with updated data

      localStorage.setItem("products", JSON.stringify(existingProducts));
      setProducts(existingProducts);

      console.log("Product Data Updated");
    } else {
      console.log("Product not found for update!");
    }
  };

  useEffect(() => {
    const existingProducts = JSON.parse(
      localStorage.getItem("products") ?? "[]"
    );
    const existingProduct = existingProducts.find(
      (product: ProductData) => product.id === productId
    );
    if (existingProduct) {
      setFormData(existingProduct);
    }
  }, [productId]);

  return (
    <div className="">
      {/* DialogBox For Add Product */}
      <div className="flex justify-center gap-2 mt-[700px] sm:mt-[530px] md:mt-[350px] lg:mt-[6px] xl:mt-[85px]  lg:flex-nowrap flex-wrap">
        {/* image */}
        <div className="flex flex-col items-center relative mt-[2px] sm:mt-[180px] md:mt-[10px] lg:mt-[10px]">
          <span
            className="font-semibold"
            style={{ fontFamily: "Montserrat Alternates" }}
          >
            Product Image
          </span>
          <div className="border-2 flex flex-col justify-center items-center h-[150px] w-[400px] rounded-lg mb-8">
            {formData.ProductImage && (
              <img
                src={formData.ProductImage}
                className="h-[300px] w-[500px] rounded-lg"
                alt="Image Preview"
              />
            )}
            {/* <span
              className="mt-[2px] self-start ml-14 text-xl font-semibold"
              style={{ fontFamily: "Bai jamjuree" }}
            >
              Image Url
            </span>
            <div className="flex justify-center items-center flex-col ">
              <input
                type="url"
                name="ProductImage"
                value={formData.ProductImage}
                className="border-2 text-[#A2A3A5] mt-[3px] p-8 text-2xl focus:outline-none h-[80px] w-[300px] rounded-lg"
                onChange={handleUrlChange}
              />
              <span className="font-bold self-start text-red-600 text-sm">
                {errorMessage}
              </span>
            </div> */}
            {!formData.ProductImage && (
              <>
                <span
                  className="mt-[2px] self-start ml-14 text-xl font-semibold"
                  style={{ fontFamily: "Bai jamjuree" }}
                >
                  Image Url
                </span>
                <div className="flex justify-center items-center flex-col ">
                  <input
                    type="url"
                    name="ProductImage"
                    value={formData.ProductImage}
                    className="border-2 text-[#A2A3A5] mt-[3px] p-8 text-2xl focus:outline-none h-[80px] w-[300px] rounded-lg"
                    onChange={handleUrlChange}
                  />
                  <span className="font-bold self-start text-red-600 text-sm">
                    {errorMessage}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Image Dropdown */}
          {/* <button
            id="dropdownMenuIconButton"
            data-dropdown-toggle="dropdownDots"
            className="absolute right-2 z-20 inline-flex  items-center p-2 text-sm font-medium text-center  top-[35px] rounded-lg text-white focus:ring-gray-50"
            type="button"
            onClick={handleDropdown}
            ref={imageDropdownRef}
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
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
            ref={fileInputRef}
          />
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
            //@ts-ignored
            ref={imageDropdownRef}
          >
            <div className="py-1 border-b-2">
              <a
                href="#"
                className="text-[#161A1D] block px-4 py-2 h-8 text-sm  font-semibold border-b-2"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-0"
                onClick={handleImageUploadClick}
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
          </div> */}
          {/* Image Dropdown */}

          {/* <button
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
          </button> */}
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
                  onChange={(e) => handleChange(e)}
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
                  onChange={(e) => handleChange(e)}
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
                  //@ts-ignore
                  type="text"
                  id="grid-last-name"
                  placeholder="Type Here..."
                  rows={5}
                  cols={5}
                  value={formData.Discription}
                  onChange={(e) => handleChange(e)}
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
        <ToastContainer
          position="top-right"
          autoClose={1000}
          pauseOnFocusLoss={false}
          limit={1}
        />
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
