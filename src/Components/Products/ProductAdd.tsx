import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import apiUrl from "../Config/apiUrl";
import Container from "../Container";

export interface Product {
  id: string;
  name: string;
  price: number | string;
  discountPrice: number | string;
  weight: number | string;
  unit: string;
  packagingCharges: number | string;
  description: string;
  images: string[];
  categoryId: any;
}

const ProductAdd: React.FC = () => {
  const { updateId } = useParams();
  const location = useLocation();
  const { CategoryId } = location.state || [];
  // @ts-ignore
  const Categoryid = location.state?.CategoryId;
  const presetKey = "ml_default";
  const cloudName = "dwxhjomtn";
  const [errors, setErrors] = useState<Partial<Product>>({});
  const [product, setProduct] = useState<Product>({
    id: "",
    name: "",
    price: "",
    discountPrice: "",
    weight: "",
    unit: "",
    packagingCharges: "",
    description: "",
    images: [],
    categoryId: "",
  });

  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [productImages, setProductImages] = useState<string[]>([]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<Product> = {};
    if (isFieldEmpty(product.name)) newErrors.name = "Product Name is required";
    if (isFieldEmpty(product.price)) newErrors.price = "Price is required";
    if (isFieldEmpty(product.discountPrice))
      newErrors.discountPrice = "Discount Price is required";
    if (isFieldEmpty(product.weight)) newErrors.weight = "Weight is required";
    if (isFieldEmpty(product.unit)) newErrors.unit = "Unit is required";
    if (isFieldEmpty(product.packagingCharges))
      newErrors.packagingCharges = "Packaging Charges is required";
    if (isFieldEmpty(product.description))
      newErrors.description = "Discription is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    let imageUrl: any = product.images;
    if (imageFile) {
      imageUrl = await uploadImageToCloudinary(imageFile);
    }

    const updatedProducts = { ...product, imageUrl, id: product.id };

    try {
      const response = await fetch(
        `https://static-food-delivery-backend.vercel.app/products/${updateId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProducts),
        }
      );

      if (response.status === 200) {
        // @ts-ignore
        const data = await response.json();
        toast.success("Products successfully updated");
        navigate(`/category/${CategoryId}`);
      } else {
        toast.warn("Failed to update!");
      }
    } catch (error) {
      toast.error("Error updating product.");
    }
  };

  useEffect(() => {
    if (updateId) {
      fetchProductData();
    }
  }, [updateId]);

  const fetchProductData = async () => {
    try {
      const response = await fetch(`${apiUrl}/${updateId}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
        setProductImages(data.images || []);
        if (data.images && data.images.length > 0) {
          setPreviewImage(data.images[0]);
        }
      }
    } catch (error) { }
  };

  const resetform = () => {
    setProduct({
      id: "",
      name: "",
      price: "",
      discountPrice: "",
      weight: "",
      unit: "",
      packagingCharges: "",
      description: "",
      images: [],
      categoryId: "",
    });
  };

  const uploadImageToCloudinary = async (
    file: File
  ): Promise<string | null> => {
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", presetKey);
      data.append("cloud_name", cloudName);
      data.append("folder", "Products");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const imgData = await response.json();
      return imgData.url;
    } catch (error) {
      return null;
    }
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const imageUrl: any = await uploadImageToCloudinary(file);
      if (imageUrl) {
        const newImages = [...product.images];
        newImages[index] = imageUrl;
        setProduct((prevState) => ({
          ...prevState,
          images: newImages,
        }));
        setProductImages((prevImages) => {
          const updatedImages = [...prevImages];
          // @ts-ignore
          updatedImages[index] = imageUrl;
          return updatedImages;
        });
        setPreviewImage(imageUrl);
        e.target.disabled = true;
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedProducts: any = { ...product };
    updatedProducts[name] = value;

    setProduct(updatedProducts);
  };

  const isFieldEmpty = (value: string | number) => {
    return value === "" || value === null || value === undefined;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<Product> = {};

    switch (true) {
      case isFieldEmpty(product.name):
        newErrors.name = "Product Name is required";
        break;
      case isFieldEmpty(product.price):
        newErrors.price = "Price is required";
        break;
      case isFieldEmpty(product.discountPrice):
        newErrors.discountPrice = "Discount Price is required";
        break;
      case isFieldEmpty(product.weight):
        newErrors.weight = "Weight is required";
        break;
      case isFieldEmpty(product.unit):
        newErrors.unit = "Unit is required";
        break;
      case isFieldEmpty(product.packagingCharges):
        newErrors.packagingCharges = "Packaging Charges is required";
        break;
      case isFieldEmpty(product.description):
        newErrors.description = "Discription  is required";
        break;

      default:
        break;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    const newProduct: Product = {
      ...product,
      id: uuidv4(),
      categoryId: CategoryId,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      const result = await response.json();
      toast.success("Product Added", result);
      CategoryId ? navigate(`/category/${CategoryId}`) : navigate('/products')
    } catch (error) { }
    resetform();
  };

  const onCloseDelete = async (imageUrl: string, index: number) => {
    try {
      const publicId = extractPublicIdFromUrl(imageUrl);
      const response = await fetch(
        "https://static-food-delivery-backend.vercel.app/products/delete-image",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ publicId }),
        }
      );

      const result = await response.json();
      if (result.message === "Image deleted successfully") {
        const newImages = [...product.images];
        newImages.splice(index, 1);
        setProduct((prevState) => ({
          ...prevState,
          images: newImages,
        }));
        setProductImages(newImages);
        toast.success(result.message);
      } else {
        toast.warn(result.message);
      }
    } catch (error) {
      toast.error("Error deleting image.");
    }
  };

  const extractPublicIdFromUrl = (url: string) => {
    const parts = url.split("/");
    const versionIndex = parts.findIndex((part) => part.startsWith("v"));
    const publicIdParts = parts.slice(versionIndex + 1);
    const publicId = publicIdParts.join("/").split(".")[0];
    return publicId;
  };

  return (
    <>
      <div className="">
        <Container >
        <div className="flex flex-wrap lg:flex-nowrap xl:flex-nowrap flex-row ">
          {/* Upload Product Image */}
          <div className="flex   flex-wrap-reverse sm:flex-wrap-reverse md:flex-nowrap lg:flex-nowrap xl:flex-nowrap mt-4 ">
            <div className="flex  flex-wrap">
              <div
                className="flex -order-1 justify-center flex-wrap sm:flex-row md:flex-col xl:flex-row w-auto flex-row mb-10 font-semibold"
                style={{ fontFamily: "Bai Jamjuree" }}
              >
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className={`border-dotted rounded-[15px] border-4 h-[120px] m-6 flex-col gap-2 text-md w-[150px] flex justify-center items-center ${productImages[index]
                      ? "border-[#DF201F]"
                      : "border-[#161A1D]"
                      }`}
                  >
                    {productImages[index] ? (
                      <div
                        className="relative h-full w-full flex justify-center items-center rounded-[15px] overflow-hidden cursor-pointer"
                        onClick={() => setPreviewImage(productImages[index])}
                      >
                        <img
                          src={productImages[index]}
                          alt={`Preview ${index}`}
                          className="h-auto w-auto object-cover"
                        />
                        <button
                          type="button"
                          className={`text-white p-[2px] bg-[#DF201F]  rounded-2xl absolute   top-[2px] left-[110px] `}
                          onClick={(e) => {
                            e.stopPropagation();
                            onCloseDelete(productImages[index], index);
                          }}
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
                      </div>
                    ) : (
                      <>
                        <div className="relative bg-[#DF201F] h-12 w-12 flex justify-center rounded-full">
                          <label className="flex">
                            <span className="flex self-center cursor-pointer">
                              <i
                                className="fa-solid fa-plus fa-2xl"
                                style={{ color: "#e8eaed" }}
                              ></i>
                            </span>
                            <input
                              type="file"
                              onChange={(e) => handleImageUpload(e, index)}
                              style={{ display: "none" }}
                            />
                          </label>
                        </div>
                        <p>Upload New</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* Preview Image */}
            <div
              className="flex items-center w-full order-1"
              style={{ fontFamily: "Bai Jamjuree" }}
            >
              <div
                className="flex justify-center  font-semibold flex-col text-md items-center m-4 h-[420px] w-[480px]"
                style={{ boxShadow: "2px 2px 20px 2px #FFE9D066" }}
              >
                <div className="border-dotted bg-[#F5F5F5] rounded-[15px] border-4 h-[380px] flex-col gap-2 text-md w-full flex justify-center items-center border-[border: 2px solid #161A1D]">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="h-[250px]  object-cover"
                    />
                  ) : (
                    <p>No image uploaded</p>
                  )}
                  <p className="text-[#A4A1A1] text-[16px] font-semibold">
                    Supported files PNG, JPEG, SVG, WEBP
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="w-full flex flex-row flex-wrap items-center">
            <div className="flex   w-full ">
              <form
                className="w-full flex flex-wrap  justify-center font-semibold"
                style={{ fontFamily: "Montserrat Alternates" }}
              >
                <div className="flex flex-wrap  mb-6 w-full">
                  <div className="w-full px-3 mb-6">
                    <label className="flex justify-self-start uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Name
                    </label>
                    <input
                      className="appearance-none w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8]  py-3 px-4 leading-tight hover:outline-none hover:border-[#9ad219] focus:outline-[#99c928] rounded-md bg-white"
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={product.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <span
                        className={`text-red-600 text-sm ${product.name ? "" : "hidden"
                          }}`}
                      >
                        {errors.name}
                      </span>
                    )}
                  </div>
                  <div className="w-full  md:w-1/2 px-3 mb-6">
                    <label className="flex justify-self-start uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Price
                    </label>
                    <input
                      className="appearance-none block w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight hover:border-[#9ad219] focus:outline-[#99c928] bg-white"
                      type="number"
                      placeholder="0"
                      name="price"
                      value={product.price}
                      onChange={handleChange}
                    />
                    {errors.price && (
                      <span
                        className={`text-red-600 text-sm ${product.price ? "" : "hidden"
                          }}`}
                      >
                        {errors.price}
                      </span>
                    )}
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-6">
                    <label className="flex justify-self-start uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Discount Price
                    </label>
                    <input
                      className="appearance-none block w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight hover:border-[#9ad219] focus:outline-[#99c928] bg-white"
                      type="number"
                      placeholder="0"
                      name="discountPrice"
                      value={product.discountPrice}
                      onChange={handleChange}
                    />
                    {errors.discountPrice && (
                      <span
                        className={`text-red-600 text-sm ${product.discountPrice ? "" : "hidden"
                          }}`}
                      >
                        {errors.discountPrice}
                      </span>
                    )}
                  </div>
                  <div className=" w-1/2 sm:w-1/2 md:w-1/2 px-3 mb-6">
                    <label className="flex justify-self-start uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Weight
                    </label>
                    <input
                      className="appearance-none block w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight hover:border-[#9ad219] focus:outline-[#99c928] bg-white"
                      type="number"
                      placeholder="0"
                      name="weight"
                      value={product.weight}
                      onChange={handleChange}
                    />
                    {errors.weight && (
                      <span
                        className={`text-red-600 text-sm ${product.weight ? "" : "hidden"
                          }}`}
                      >
                        {errors.weight}
                      </span>
                    )}
                  </div>
                  <div className="w-1/2 sm:w-1/2 md:w-1/2 px-3 mb-6">
                    <label className="flex justify-self-start uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Unit
                    </label>
                    <input
                      className="appearance-none block w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight hover:border-[#9ad219] focus:outline-[#99c928] bg-white"
                      type="text"
                      placeholder="0"
                      name="unit"
                      value={product.unit}
                      onChange={handleChange}
                    />
                    {errors.unit && (
                      <span
                        className={`text-red-600 text-sm ${product.unit ? "" : "hidden"
                          }}`}
                      >
                        {errors.unit}
                      </span>
                    )}
                  </div>
                  <div className="w-full   px-3 mb-6">
                    <label className="flex justify-self-start uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Packaging Charges
                    </label>
                    <input
                      className="appearance-none block w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight hover:border-[#9ad219] focus:outline-[#99c928] bg-white"
                      type="number"
                      placeholder="0"
                      name="packagingCharges"
                      value={product.packagingCharges}
                      onChange={handleChange}
                    />
                    {errors.packagingCharges && (
                      <span
                        className={`text-red-600 text-sm ${product.packagingCharges ? "" : "hidden"
                          }}`}
                      >
                        {errors.packagingCharges}
                      </span>
                    )}
                  </div>
                  <div className="w-full px-3 mb-6">
                    <label className="flex justify-self-start uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Description
                    </label>
                    <textarea
                      className="appearance-none block w-full text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight hover:border-[#9ad219] focus:outline-[#99c928] bg-white resize-none"
                      placeholder="Type Here..."
                      rows={5}
                      name="description"
                      value={product.description}
                      onChange={handleChange}
                    />
                    {errors.description && (
                      <span
                        className={`text-red-600 text-sm ${product.description ? "" : "hidden"
                          }}`}
                      >
                        {errors.description}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex w-full">
                  <button
                    className="rounded-[60px] text-md ml-5 text-[#FFFFFF] bg-[#DF201F] h-[50px] w-full"
                    style={{
                      boxShadow: "2px 2px 20px 2px #DF201F66",
                      fontFamily: "Bai Jamjuree",
                    }}
                    onClick={handleSubmit}
                  >
                    Add Product
                  </button>
                  <button
                    className="rounded-[60px] text-md ml-5 text-[#FFFFFF] bg-[#DF201F] h-[50px] w-full"
                    style={{
                      boxShadow: "2px 2px 20px 2px #DF201F66",
                      fontFamily: "Bai Jamjuree",
                    }}
                    onClick={handleUpdate}
                  >
                    Update Product
                  </button>
                  <ToastContainer
                    position="top-right"
                    autoClose={1000}
                    pauseOnFocusLoss={false}
                    limit={1}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        </Container>
      </div>
    </>
  );
};

export default ProductAdd;
