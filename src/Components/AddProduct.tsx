import React, { useEffect, useState, useRef, RefObject } from "react";
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
  const [isValidUrl, setIsValidUrl] = useState(false);

  const handleUrlChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    console.log("Current form data:", formData); // Log current form data
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

    if (name === "ProductImage") {
      setErrorMessage(validate(value));
      if (validator.isURL(value)) {
        try {
          console.log("In URL validation");

          const response = await fetch(value);
          console.log("Fetch response:", response); // Log fetch response
          if (response.ok) {
            const imageUrl = value;
            console.log("Image URL:", imageUrl); // Log created image URL
            setFormData((prevFormData) => ({
              ...prevFormData,
              ProductImage: imageUrl,
            }));
          } else {
            console.log("Fetch unsuccessful");

            setFormData((prevFormData) => ({
              ...prevFormData,
              ProductImage: "", // Clear image if fetch fails
            }));
            toast.error("Failed to fetch image from the URL");
          }
        } catch (error) {
          console.error("Error during fetch:", error);
        }
      }
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
      setIsValidUrl(true);
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
        return;
      }
    }

    const newProduct: ProductData = {
      ...formData,
      id: Date.now().toString(),
    };

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);

    localStorage.setItem("products", JSON.stringify(updatedProducts));

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

            {!isValidUrl && (
              <div className="">
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
              </div>
            )}
          </div>
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
