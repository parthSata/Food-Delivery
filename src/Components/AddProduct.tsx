import React, { useEffect, useState, useRef, RefObject } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ProductData {
  id: number | string;
  ProductName: string;
  Price: number | string;
  DiscountPrice: number | string;
  Unit: number | string;
  ProductImage?: File | string;
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

const AddProduct: React.FC<Props> = ({ productId, onClose }) => {
  const [imageDropdown, setImageDropdown] = useState<boolean>(false);
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
  const [errors, setErrors] = useState<Partial<ProductData>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const closeImageDropdown = () => {
    if (imageDropdownRef.current) {
      imageDropdownRef.current.classList.add("hidden");
    }
  };

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
  const convertImageToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const isFieldEmpty = (value: string | number) => {
    return value === "" || value === null || value === undefined;
  };

  const handleSubmit = async () => {
    const newErrors: Partial<ProductData> = {};

    switch (true) {
      case !formData.ProductImage || typeof formData.ProductImage === "string":
        newErrors.ProductImage = "Select The File";
        break;
      case isFieldEmpty(formData.ProductName):
        newErrors.ProductName = "Product Name is required";
        break;
      case isFieldEmpty(formData.Price):
        newErrors.Price = "Price is required";
        break;
      case isFieldEmpty(formData.DiscountPrice):
        newErrors.DiscountPrice = "Discount Price is required";
        break;
      case isFieldEmpty(formData.Unit):
        newErrors.Unit = "Unit is required";
        break;
      case isFieldEmpty(formData.Stock):
        newErrors.Stock = "Stock is required";
        break;
      case isFieldEmpty(formData.Discription):
        newErrors.Discription = "Description is required";
        break;
      case !formData.ProductImage:
        newErrors.ProductImage = "Product Image is required";
        break;
      default:
        break;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    let productImageBase64: any = "";
    if (formData.ProductImage) {
      if (typeof formData.ProductImage === "string") {
        // Handle case when ProductImage is a string (URL)
        productImageBase64 = formData.ProductImage;
      } else {
        // Handle case when ProductImage is a File
        const file = formData.ProductImage;
        productImageBase64 = await convertImageToBase64(file);
      }
    }

    const newProduct: ProductData = {
      ...formData,
      id: Date.now().toString(),
      ProductImage: productImageBase64, // Store the Base64 string
    };

    const existingProducts: ProductData[] = JSON.parse(
      localStorage.getItem("products") ?? "[]"
    );

    const updatedProducts: ProductData[] = [...existingProducts, newProduct];

    localStorage.setItem("products", JSON.stringify(updatedProducts));

    // Only update the products state with the new product
    setProducts(updatedProducts);

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

    onClose();
  };

  const handleDropdown = () => {
    setImageDropdown((prevDropdown) => !prevDropdown);
    if (imageDropdownRef.current) {
      imageDropdownRef.current.classList.toggle("hidden");
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        ProductImage: file,
      });
    }
  };

  const handleUpdate = async () => {
    if (
      !formData.ProductName ||
      !formData.Price ||
      !formData.DiscountPrice ||
      !formData.Unit ||
      !formData.Stock ||
      !formData.Discription ||
      !formData.ProductImage ||
      (typeof formData.ProductImage === "string" &&
        formData.ProductImage.length === 0)
    ) {
      toast.warn("Please Fill all inputs and Upload Image");
      return;
    }

    let productImageBase64: any = "";
    if (formData.ProductImage) {
      if (typeof formData.ProductImage === "string") {
        // Handle case when ProductImage is a string (URL)
        productImageBase64 = formData.ProductImage;
      } else {
        // Handle case when ProductImage is a File
        const file = formData.ProductImage;
        productImageBase64 = await convertImageToBase64(file);
      }
    }

    const updatedProduct: ProductData = {
      ...formData,
      ProductImage: productImageBase64, // Store the Base64 string
    };

    const existingProducts: ProductData[] = JSON.parse(
      localStorage.getItem("products") ?? "[]"
    );

    const existingProductIndex = existingProducts.findIndex(
      (product: ProductData) => product.id === productId
    );

    if (existingProductIndex !== -1) {
      existingProducts[existingProductIndex] = updatedProduct;

      localStorage.setItem("products", JSON.stringify(existingProducts));
      setProducts(existingProducts);

      console.log("Product Data Updated");
    } else {
      console.log("Product not found for update!");
    }

    onClose();
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

      <div
        className={`flex justify-center gap-2 mt-[700px] sm:mt-[530px] md:mt-[350px] lg:mt-[6px] xl:mt-[85px]  lg:flex-nowrap flex-wrap ${
          !formData.ProductImage
            ? "mt-[400px] sm:mt-[200px] md:mt-[80px] lg:mt-[30px] "
            : " xl:mt-[80px]"
        }`}
      >
        {/* image */}
        <div
          className={`flex flex-col items-center relative mt-[2px] sm:mt-[180px] md:mt-[10px] lg:mt-[10px] `}
        >
          <span
            className="font-semibold"
            style={{ fontFamily: "Montserrat Alternates" }}
          >
            Product Image
          </span>

          <div className="">
            <div className="flex justify-center items-center flex-col ">
              {formData.ProductImage &&
              typeof formData.ProductImage !== "string" ? (
                <img
                  src={URL.createObjectURL(formData.ProductImage)} // Use createObjectURL to display image preview
                  className="h-[300px] w-[500px] rounded-lg"
                  alt="Image Preview"
                />
              ) : (
                <input
                  type="file"
                  accept="image/*"
                  className="border-2 text-[#A2A3A5] mt-[3px] p-2 text-xl focus:outline-none h-[50px] w-[300px] rounded-lg "
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                />
              )}
              {errors.ProductImage && (
                <span className="text-red-600 text-md">Select the File</span>
              )}
            </div>
          </div>
          {formData.ProductImage && (
            <button
              id="dropdownMenuIconButton"
              className="absolute right-[30px]  z-20 inline-flex items-center p-2 text-sm font-medium text-center top-[35px] rounded-lg text-white focus:ring-gray-50"
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
          )}
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
            // @ts-ignore
            ref={imageDropdownRef}
          />
        </div>
        {/* Image Dropdown */}

        <div
          className={`absolute right-[120px] top-[725px] sm:fixed sm:top-[730px] sm:right-[130px] md:fixed md:top-[380px] md:right-[220px] lg:top-[40px] lg:right-[570px] lg:fixed xl:top-[120px] xl:right-[580px] xl:fixed  z-10 mt-[74px] opacity-0.1 mr-4 font-semibold w-36 h-18 border-[1px solid #EFEFEF] rounded-md  bg-white shadow-lg focus:outline-none ${
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
          <div className="py-1 ">
            <a
              href="#"
              className="text-[#161A1D] block px-4 py-2 h-8 text-sm  font-semibold border-b-2"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-0"
              onClick={handleUpdate}
            >
              Update Image
            </a>
          </div>
        </div>

        {/* Image Dropdown */}

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
                  className={`${
                    productId !== null ? "border-4 border-gray" : "outline-none"
                  } appearance-none w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8] ro unded py-3 px-4 leading-tight hover:outline-none hover:border-[#9ad219]    focus:outline-[#99c928] rounded-md bg-white`}
                  type="text"
                  placeholder="Pizza"
                  name="ProductName"
                  value={formData.ProductName}
                  onChange={handleChange}
                />
                {errors.ProductName && (
                  <span
                    className={`text-red-600 text-sm ${
                      formData.ProductName ? "" : "hidden"
                    }}`}
                  >
                    {errors.ProductName}
                  </span>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6">
                <label className="flex justify-self-start  uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Price
                </label>
                <input
                  className={`${
                    productId !== null ? "border-4 border-gray" : "outline-none"
                  } appearance-none  block w-full h-[60px]  text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight hover:border-[#9ad219]    focus:outline-[#99c928] bg-white`}
                  id="grid-last-name"
                  type="number"
                  placeholder="180"
                  value={formData.Price}
                  onChange={handleChange}
                  name="Price"
                />
                {errors.Price && (
                  <span className="text-red-600 text-sm">{errors.Price}</span>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6">
                <label className="flex justify-self-start  uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Discount Price
                </label>
                <input
                  className="appearance-none block w-full h-[60px]   text-[#A2A3A5] border border-[2px solid #E8E8E8]  rounded py-3 px-4 leading-tight hover:border-[#9ad219]    focus:outline-[#99c928] bg-white"
                  id="grid-last-name"
                  type="number"
                  placeholder="175"
                  value={formData.DiscountPrice}
                  onChange={handleChange}
                  name="DiscountPrice"
                  disabled={productId !== null}
                />
                {errors.DiscountPrice && (
                  <span className="text-red-600 text-sm">
                    {errors.DiscountPrice}
                  </span>
                )}
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6">
                <label className="flex justify-self-start  uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Unit
                </label>
                <input
                  className="appearance-none  block w-full h-[60px]  text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight hover:border-[#9ad219]    focus:outline-[#99c928] bg-white"
                  id="grid-last-name"
                  type="number"
                  placeholder="Gms"
                  value={formData.Unit}
                  onChange={handleChange}
                  name="Unit"
                  disabled={productId !== null}
                />
                {errors.Unit && (
                  <span className="text-red-600 text-sm">{errors.Unit}</span>
                )}
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6">
                <label className="flex justify-self-start  uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Stock
                </label>
                <input
                  className={`${
                    productId !== null ? "border-4 border-gray" : "outline-none"
                  } appearance-none block w-full h-[60px]  text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight hover:border-[#9ad219]    focus:outline-[#99c928] bg-white`}
                  id="grid-last-name"
                  type="number"
                  placeholder="25"
                  value={formData.Stock}
                  onChange={handleChange}
                  name="Stock"
                />
                {errors.Stock && (
                  <span className="text-red-600 text-sm">{errors.Stock}</span>
                )}
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6">
                <label className="flex justify-self-start  uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Is Veg
                </label>
                <select
                  name="IsVeg"
                  value={formData.IsVeg}
                  onChange={(e) => handleChange(e)}
                  className="appearance-none block w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight hover:border-[#9ad219]    focus:outline-[#99c928]  bg-white "
                  disabled={productId !== null}
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
                  className="appearance-none block w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight hover:border-[#9ad219]    focus:outline-[#99c928]    bg-white "
                  disabled={productId !== null}
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
                  className="appearance-none block w-full  text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight hover:border-[#9ad219]    focus:outline-[#99c928] bg-white resize-none"
                  //@ts-ignore
                  type="text"
                  id="grid-last-name"
                  placeholder="Type Here..."
                  rows={5}
                  cols={5}
                  value={formData.Discription}
                  onChange={(e) => handleChange(e)}
                  name="Discription"
                  disabled={productId !== null}
                />
                {errors.Discription && (
                  <span className="text-red-600 text-sm">
                    {errors.Discription}
                  </span>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-center">
        {productId === null && ( // Only show the button when productId is null
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
        )}
        <ToastContainer
          position="top-right"
          autoClose={1000}
          pauseOnFocusLoss={false}
          limit={1}
        />
        <button
          type="submit"
          className={`rounded-[60px] ml-5 text-[#FFFFFF] bg-[#94CD00] h-[40px] w-[140px] ${
            productId === null ? "hidden" : ""
          }`}
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
