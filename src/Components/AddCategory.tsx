import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ProductData {
  id: number | string;
  CategoryName: string;
  NumberOfProducts: number;
  ProductImage?: File | string;
  Status: string;
  Discription: string;
}

interface Props {
  onClose: () => void;
  productId?: number | null;
  onAddProduct: (newProduct: ProductData) => void;
}

const AddProduct: React.FC<Props> = ({ }) => {
  const presetKey = "ml_default";
  const cloudName = "dwxhjomtn";
  const apiUrl = "http://localhost:3000/categories";
  const [product, setProduct] = useState({
    categoryName: '',
    description: '',
    numberOfProducts: '',
    status: '',
    categoryId: 1,
    imageUrl: '',
  });

  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const uploadImageToCloudinary = async (file: File): Promise<string | null> => {
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", presetKey);
      data.append("folder", "Categories");

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: data,
      });

      const imgData = await response.json();
      return imgData.secure_url;
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      return null;
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl: string | null = '';
    if (imageFile) {
      imageUrl = await uploadImageToCloudinary(imageFile);
    }

    const productData = {
      ...product,
      imageUrl,
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      const result = await response.json();
      console.log('Product saved:', result);
      onAddProduct(result);
      toast.success("Category added successfully!");
    } catch (error) {
      console.error('Error saving the product:', error);
      toast.error("Error saving the product!");
    }
  };

  return (
    <div className="">
      {/* DialogBox For Add Product */}

      <div
        className={`flex justify-center gap-2  mt-[250px] sm:mt-[200px] md:mt-[20px] lg:mt-[20px]  xl:mt-[5px]  lg:flex-nowrap flex-wrap`}
      >
        {/* image */}
        <div
          className={`flex flex-col items-center relative mt-[2px] sm:mt-[60px] md:mt-[10px] lg:mt-[10px] `}
        >
          <span
            className="font-semibold"
            style={{ fontFamily: "Montserrat Alternates" }}
          >
            Product Image
          </span>

          <div className="">
            <div className="flex justify-center items-starts flex-col ">
              <input
                type="file"
                accept="image/*"
                className="border-2 text-[#A2A3A5] mt-[3px] p-2 text-xl focus:outline-none h-[50px] w-[300px] rounded-lg "
              />
            </div>
          </div>
              {/* {errors.ProductImage && (
                <span className="text-red-600 text-md">Select the File</span>
              )} */}
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
          />
        </div>
        <div className="w-full max-w-lg">
          <form
            className="w-full flex flex-row font-semibold "
            style={{ fontFamily: "Montserrat Alternates" }}
          >
            <div className="flex flex-wrap mb-6">
              <div className="w-full px-3 mb-6">
                <label className="flex justify-self-start  uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Category Name
                </label>
                <input
                  className={` appearance-none w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8] ro unded py-3 px-4 leading-tight hover:outline-none hover:border-[#9ad219]    focus:outline-[#99c928] rounded-md bg-white`}
                  type="text"
                  placeholder="Pizza"
                  name="ProductName"
                />
                {/* {errors.ProductName && (
                  <span
                    className={`text-red-600 text-sm ${formData.ProductName ? "" : "hidden"
                      }}`}
                  >
                    {errors.ProductName}
                  </span>
                )} */}
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
                  name="Discription"
                />
                {/* {errors.Discription && (
                  <span className="text-red-600 text-sm">
                    {errors.Discription}
                  </span>
                )} */}
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6">
                <label className="flex justify-self-start  uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Number of Products
                </label>
                <input
                  className={` appearance-none  block w-full h-[60px]  text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight hover:border-[#9ad219]    focus:outline-[#99c928] bg-white`}
                  id="grid-last-name"
                  type="number"
                  placeholder="180"
                  onChange={handleChange}
                  name="Price"
                />
                {/* {errors.Price && (
                  <span className="text-red-600 text-sm">{errors.Price}</span>
                )} */}
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6">
                <label className="flex justify-self-start  uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Status
                </label>
                <select
                  name="Status"
                  className="appearance-none block w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight hover:border-[#9ad219]    focus:outline-[#99c928]    bg-white "
                >
                  <option className="" value="In Stock">
                    In Stock
                  </option>
                  <option className="" value="Out of Stock">
                    Out of Stock
                  </option>
                </select>
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
          className={`rounded-[60px] ml-5 text-[#FFFFFF] bg-[#94CD00] h-[40px] w-[140px] `}
          style={{
            boxShadow: "2px 2px 25px 2px #94CD0099",
            fontFamily: "Bai Jamjuree",
          }}
        >
          Update Product
        </button>
      </div>
      {/* DialogBox For Add Product */}
    </div>
  );
};

export default AddProduct;
