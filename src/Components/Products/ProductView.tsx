import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Product } from "./ProductAdd";
import { useParams } from "react-router-dom";
import Loader from "../ReusableComponent/Loader";
import { toast } from "react-toastify";
import { t } from "i18next";
import config from "@/config/Config";

// import Footer from '../Footer';

const ProductView: React.FC = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [productImages, setProductImages] = useState<string[]>([]);
  const { productId } = useParams<{ productId?: string }>();
  const [quantity, setQuantity] = useState<number>(1);
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
    publicId: ""
  });
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    if (productId) {
      fetchProductData(productId);
    }
  }, [productId]);

  const fetchProductData = async (id: string) => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${config.firebaseDatabaseUrl}/products/${id}.json`
      );
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setProduct(data);
          setProductImages(data.images || []);
          if (data.images && data.images.length > 0) {
            setPreviewImage(data.images[0]);
          }
        } else {
          toast.warn("No such document!");
        }
      } else {
        console.error("Error fetching product: ", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
    setisLoading(false);
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleEditOrder = () => { };

  const handleDeleteOrder = () => { };
  return (
    <div className="">
      <Loader isLoading={isLoading}>
        <div className="flex flex-wrap lg:flex-nowrap xl:flex-nowrap flex-row px-6">
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
                    className={` rounded-[15px] border-2  h-[100px] m-6 flex-col gap-2 text-md w-[140px] flex justify-center items-center ${productImages[index]
                      ? "border-[3px] border-[#DF201F]"
                      : " outline-none border-[#161A1D]"
                      }`}
                  >
                    {productImages[index] && (
                      <div
                        className="relative h-full w-full flex justify-center items-center rounded-[15px] overflow-hidden cursor-pointer"
                        onClick={() => setPreviewImage(productImages[index])}
                      >
                        <img
                          src={productImages[index]}
                          alt={`Preview ${index}`}
                          className="h-auto w-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* Preview Image */}
            <div
              className="flex items-start w-full  order-1"
              style={{ fontFamily: "Bai Jamjuree" }}
            >
              <div className="flex justify-center  font-semibold flex-col text-md items-center m-4 h-[500px] w-full md:w-[500px] lg:w-[350px] xl:w-[429px] shadow-addNew">
                <div className=" bg-[#F5F5F5]  border-none rounded-[15px]  h-[480px] flex-col gap-2 text-md w-full flex justify-center items-center border-[border: 2px solid #161A1D]">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="h-auto w-full object-cover"
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

          {/* Order Details */}
          <div
            className="w-full flex flex-col mt-[50px] gap-12 flex-wrap  font-semibold "
            style={{ fontFamily: "Bai Jamjuree" }}
          >
            <div className="flex flex-col gap-2 ">
              <p className="text-2xl self-start">{product.name}</p>
              <p
                className="text-[#DF201F] flex gap-1"
                style={{ fontFamily: "Montserrat Alternates" }}
              >
                <span className="">₹{product.price}</span>
                <span className="line-through">₹{product.discountPrice}</span>
              </p>
            </div>
            <div className="flex gap-28 flex-wrap w-full flex-row">
              <div className="flex items-start gap-2 flex-col">
                <span className="">Size</span>
                <ul className="flex items-end justify-around gap-2 w-[80px] top-[]">
                  {["S", "M", "L"].map((size) => (
                    <li key={size} className="page flex flex-grow text-xl">
                      <a
                        href="#"
                        className={`h-[42px] w-[40px] border-none rounded-sm shadow-Size p-1 focus:text-white focus:border-black-8 focus:bg-[#DF201F]`}
                      >
                        {size}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-start gap-2 flex-col">
                <span className="">Quantity</span>
                <div className="flex  gap-1 shadow-Size">
                  <button
                    className=" w-[40px] h-[42px]  border-r   border-gray"
                    onClick={decrementQuantity}
                  >
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <div className=" w-[40px] p-2.5 h-[42px]  border-r  border-gray">
                    {quantity}
                  </div>
                  <button
                    className=" w-[40px] h-[42px]  border-r  border-gray"
                    onClick={incrementQuantity}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2  font-semibold">
              <span className="self-start">Description</span>
              <div className="" style={{ fontFamily: "Montserrat Alternates" }}>
                <span className="text-[#A2A3A5] text-sm text-pretty">
                  {product.description}
                </span>
              </div>
            </div>

            <div className="flex gap-6 w-full justify-around">
              <button
                className="h-[70px] w-full text-white text-xl  rounded-[60px] bg-[#94CD00] shadow-registerBtn"
                onClick={handleEditOrder}
              >
                {t("productView.editButton")}
              </button>
              <button
                className="h-[70px] w-full text-white text-xl  rounded-[60px] bg-[#DF201F] shadow-adminbtn"
                onClick={handleDeleteOrder}
              >
                {t("productView.deleteButton")}
              </button>
            </div>
          </div>
        </div>
      </Loader>
    </div>
  );
};

export default ProductView;
