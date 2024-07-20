import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { db } from "@/config/Firebase/firebase";
import { set, ref, onValue, update } from "firebase/database";
import Loader from "../ReusableComponent/Loader";

import Input from "../ReusableComponent/Input";
import { useLanguageContext } from "../../context/LanguageContext";

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
  const { t } = useLanguageContext();
  const location = useLocation();
  const { CategoryId, updateId } = location.state || [];
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
  const [isLoading, setisLoading] = useState(false);

  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [productImages, setProductImages] = useState<string[]>([]);

  const handleUpdate = async (e: React.FormEvent) => {
    setisLoading(true);
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
      newErrors.description = "Description is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    let imageUrl: any = product.images;
    if (imageFile) {
      imageUrl = await uploadImageToCloudinary(imageFile);
    }

    const updatedProduct = { ...product, images: imageUrl, id: product.id };

    try {
      await update(ref(db, `products/${updateId}`), updatedProduct);
      toast.success("Product successfully updated");
      navigate(`/seller/category/${CategoryId}`);
    } catch (error) {
      toast.error("Error updating product.");
    }
    setisLoading(false);
  };

  useEffect(() => {
    if (updateId) {
      fetchProductData();
    }
  }, [updateId]);

  const fetchProductData = () => {
    setisLoading(true);
    const productRef = ref(db, `products/${updateId}`);
    onValue(
      productRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setProductImages(data.images || []);
          if (data.images && data.images.length > 0) {
            setPreviewImage(data.images[0]);
          }
          setProduct(data);
        }
      },
      {
        onlyOnce: true,
      }
    );
    setisLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setisLoading(true);

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
      newErrors.description = "Description is required";

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
      await set(ref(db, `products/${newProduct.id}`), newProduct);
      toast.success("Product Added");
      CategoryId
        ? navigate(`/seller/category/${CategoryId}`)
        : navigate("/products");
    } catch (error) {
      toast.error("Error adding product.");
    }
    setisLoading(false);
    resetform();
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
    setisLoading(true);
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
    } finally {
      setisLoading(false);
    }
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setisLoading(true);

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
          updatedImages[index] = imageUrl;
          return updatedImages;
        });
        setPreviewImage(imageUrl);
        e.target.disabled = true;
      }
    }
    setisLoading(false);
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

  const deleteImageFromCloudinary = async (imageUrl: string) => {
    try {
      const publicId = extractPublicIdFromUrl(imageUrl);
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ public_id: publicId }),
        }
      );

      const data = await response.json();
      if (data.result === "ok") {
        toast.success(`Image ${publicId} deleted successfully from Cloudinary`);
      } else {
        console.warn(`Failed to delete image ${publicId} from Cloudinary`);
      }
    } catch (error) {
      console.error("Error deleting image from Cloudinary:", error);
    }
  };

  const extractPublicIdFromUrl = (url: string): string => {
    const parts = url.split("/");
    const fileName = parts[parts.length - 1];
    const publicId = fileName.split(".")[0];
    return publicId;
  };

  return (
    <>
      <div className="">
        <Loader isLoading={isLoading}>
          <div className="flex flex-wrap lg:flex-nowrap xl:flex-nowrap flex-row ">
            {/* Upload Product Image */}
            <div className="flex flex-wrap-reverse sm:flex-wrap-reverse md:flex-nowrap lg:flex-nowrap xl:flex-nowrap mt-4 ">
              <div className="flex flex-wrap">
                <div
                  className="flex -order-1 justify-center flex-wrap sm:flex-row md:flex-col xl:flex-row w-auto flex-row mb-10 font-semibold"
                  style={{ fontFamily: "Bai Jamjuree" }}
                >
                  {[0, 1, 2, 3].map((index) => (
                    <div
                      key={index}
                      className={`border-dotted rounded-[15px] border-4 h-[120px] m-6 flex-col gap-2 text-md w-[150px] flex justify-center items-center ${
                        productImages[index]
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
                              deleteImageFromCloudinary(product.id);
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
                                <i className="fa-solid fa-plus fa-2xl text-addNew"></i>
                              </span>
                              <Input
                                type="file"
                                onChange={(e: any) =>
                                  handleImageUpload(e, index)
                                }
                                style={{ display: "none" }}
                              />
                            </label>
                          </div>
                          <p>{t("productAdd.uploadNow")}</p>
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
                <div className="flex justify-center  font-semibold flex-col text-md items-center m-4 h-[420px] w-[480px] shadow-addNew">
                  <div className="border-dotted bg-[#F5F5F5] rounded-[15px] border-4 h-[380px] flex-col gap-2 text-md w-full flex justify-center items-center border-[border: 2px solid #161A1D]">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="h-[250px]  object-cover"
                      />
                    ) : (
                      <p>{t("productAdd.noImageUploaded")}</p>
                    )}
                    <p className="text-[#A4A1A1] text-[16px] font-semibold">
                      {t("productAdd.supportedFiles")}
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
                        {t("productAdd.nameLabel")}
                      </label>
                      <Input
                        className="appearance-none w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8]  py-3 px-4 leading-tight hover:outline-none hover:border-[#9ad219] focus:outline-[#99c928] rounded-md bg-white"
                        type="text"
                        placeholder={t("productAdd.nameLabel")}
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                      />
                      {errors.name && (
                        <span
                          className={`text-red-600 text-sm ${
                            product.name ? "" : "hidden"
                          }`}
                        >
                          {errors.name}
                        </span>
                      )}
                    </div>
                    <div className="w-full  md:w-1/2 px-3 mb-6">
                      <label className="flex justify-self-start uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        {t("productAdd.priceLabel")}
                      </label>
                      <Input
                        className="appearance-none block w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight hover:border-[#9ad219] focus:outline-[#99c928] bg-white"
                        type="number"
                        placeholder="0"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                      />
                      {errors.price && (
                        <span
                          className={`text-red-600 text-sm ${
                            product.price ? "" : "hidden"
                          }`}
                        >
                          {errors.price}
                        </span>
                      )}
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                      <label className="flex justify-self-start uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        {t("productAdd.discountPriceLabel")}
                      </label>
                      <Input
                        className="appearance-none block w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight hover:border-[#9ad219] focus:outline-[#99c928] bg-white"
                        type="number"
                        placeholder="0"
                        name="discountPrice"
                        value={product.discountPrice}
                        onChange={handleChange}
                      />
                      {errors.discountPrice && (
                        <span
                          className={`text-red-600 text-sm ${
                            product.discountPrice ? "" : "hidden"
                          }`}
                        >
                          {errors.discountPrice}
                        </span>
                      )}
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                      <label className="flex justify-self-start uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        {t("productAdd.weightLabel")}
                      </label>
                      <Input
                        className="appearance-none block w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight hover:border-[#9ad219] focus:outline-[#99c928] bg-white"
                        type="number"
                        placeholder="0"
                        name="weight"
                        value={product.weight}
                        onChange={handleChange}
                      />
                      {errors.weight && (
                        <span
                          className={`text-red-600 text-sm ${
                            product.weight ? "" : "hidden"
                          }`}
                        >
                          {errors.weight}
                        </span>
                      )}
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                      <label className="flex justify-self-start uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        {t("productAdd.unitLabel")}
                      </label>
                      <Input
                        className="appearance-none block w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight hover:border-[#9ad219] focus:outline-[#99c928] bg-white"
                        type="text"
                        placeholder="0"
                        name="unit"
                        value={product.unit}
                        onChange={handleChange}
                      />
                      {errors.unit && (
                        <span
                          className={`text-red-600 text-sm ${
                            product.unit ? "" : "hidden"
                          }`}
                        >
                          {errors.unit}
                        </span>
                      )}
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                      <label className="flex justify-self-start uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        {t("productAdd.packagingChargesLabel")}
                      </label>
                      <Input
                        className="appearance-none block w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight hover:border-[#9ad219] focus:outline-[#99c928] bg-white"
                        type="number"
                        placeholder="0"
                        name="packagingCharges"
                        value={product.packagingCharges}
                        onChange={handleChange}
                      />
                      {errors.packagingCharges && (
                        <span
                          className={`text-red-600 text-sm ${
                            product.packagingCharges ? "" : "hidden"
                          }`}
                        >
                          {errors.packagingCharges}
                        </span>
                      )}
                    </div>
                    <div className="w-full px-3 mb-6">
                      <label className="flex justify-self-start uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        {t("productAdd.descriptionLabel")}
                      </label>
                      <textarea
                        className="resize-none appearance-none block w-full h-[120px] text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight hover:border-[#9ad219] focus:outline-[#99c928] bg-white"
                        placeholder="Description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                      ></textarea>
                      {errors.description && (
                        <span
                          className={`text-red-600 text-sm ${
                            product.description ? "" : "hidden"
                          }`}
                        >
                          {errors.description}
                        </span>
                      )}
                    </div>
                    <div className="flex w-full">
                      <button
                        className="rounded-[60px] text-md ml-5 text-[#FFFFFF] bg-[#DF201F] h-[50px] w-full shadow-couponAdd"
                        style={{
                          fontFamily: "Bai Jamjuree",
                        }}
                        onClick={handleSubmit}
                      >
                        Add Product
                      </button>
                      <button
                        className="rounded-[60px] text-md ml-5 text-[#FFFFFF] bg-[#DF201F] h-[50px] w-full shadow-couponAdd"
                        style={{
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
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Loader>
      </div>
    </>
  );
};

export default ProductAdd;
