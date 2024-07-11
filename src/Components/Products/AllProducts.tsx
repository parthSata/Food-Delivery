import DummyImg from "../../assets/All Product/DummyFood.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product } from "./ProductAdd";
import { db } from '../../Firebase/firebase';
import { ref, remove, get } from 'firebase/database';
import Loader from "../Loader";
import Strings from "../Config/Strings";

function AllProducts() {
  const navigate = useNavigate();
  // @ts-ignore
  const [productUpdateId, setProductUpdateId] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setisLoading] = useState(false)

  const handleAddProduct = (id: any) => {
    navigate(`/seller/productsAdd/${id}`);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setisLoading(true)
    try {
      const productsRef = ref(db, 'products');
      const snapshot = await get(productsRef);

      if (snapshot.exists()) {
        const productsData = snapshot.val();
        const productsArray = Object.keys(productsData).map(key => ({
          id: key,
          ...productsData[key],
        }));
        setProducts(productsArray);
      } else {
        console.error("No products available");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setisLoading(false)
  };

  const handleUpdateProduct = (id: any) => {
    setProductUpdateId(id);
    navigate(`/seller/productsAdd/${id}`);
  };

  const handleDeleteProduct = async (id: any) => {
    setisLoading(true)
    try {
      // Delete product from Firebase Realtime Database
      const productRef = ref(db, `products/${id}`);
      await remove(productRef);

      // Fetch updated product list
      fetchProducts();

      // Navigate to products page
      navigate(`/seller/products`);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
    setisLoading(false)
  };

  const handleProductView = (id: string) => {
    navigate(`/seller/productView/${id}`, { state: { productId: id } });
  };

  return (
    <div className="">
      {/* Product Heading */}
      <div
        className="relative mt-4 bg-black opacity-90 "
        style={{ fontFamily: "Bai Jamjuree" }}
      >
        <img src={DummyImg} alt="" className=" h-[205px] w-full  " />
        <div className=" flex justify-start pl-16">
          <span
            className="absolute bottom-20 text-white text-2xl"
            style={{ fontFamily: "Bai Jamjuree" }}
          >
            {Strings.allProduct.productHeading}
          </span>
        </div>
      </div>
      {/* Products */}
      <Loader isLoading={isLoading}>
        <div className="">
          <div className="mt-6 w-full  flex gap-2 justify-around flex-wrap  ">
            {products.map((item) => (
              <div
                className="sm:w-1/5 w-full mb-10 "
                onClick={() => handleProductView(item.id)}
                key={item.id}
              >
                <div className="flex justify-center font-semibold flex-col text-md items-center bg-[#FFE5E5] h-[200px] w-full rounded-[20px]">
                  {/* @ts-ignore */}
                  <img src={item.images?.[0]} alt="" className="h-20" />
                  <p className="" style={{ fontFamily: "Bai Jamjuree" }}>
                    {item.name}
                  </p>
                  <p
                    className="flex gap-2 items-center text-[#DF201F]"
                    style={{ fontFamily: "Montserrat Alternates" }}
                  >
                    ₹{item.price}
                    <span className="text-xs line-through">
                      ₹{item.discountPrice}
                    </span>
                  </p>
                </div>
                <div className="relative flex justify-center w-full gap-2  -top-6">
                  <div className="bg-[#DF201F]  h-12 w-12 flex justify-center rounded-3xl ">
                    <button
                      className=""
                      onClick={(e) => (
                        e.stopPropagation(), handleDeleteProduct(item.id)
                      )}
                    >
                      <i
                        className="fa-solid fa-trash fa-lg"
                        style={{ color: "#d4d9de" }}
                      ></i>
                    </button>
                  </div>
                  <div className="bg-[#94CD00]  h-12 w-12 flex justify-center rounded-3xl">
                    <button
                      className=""
                      onClick={(e) => (
                        e.stopPropagation(), handleUpdateProduct(item.id)
                      )}
                    >
                      <i
                        className="fa-solid fa-pen fa-lg"
                        style={{ color: "#d4d9de" }}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className=" sm:w-1/5 w-full mb-10 ">
              <div
                className="flex justify-center font-semibold flex-col text-md items-center  h-[200px] w-full "
                style={{ boxShadow: " 2px 2px 20px 2px #FFE9D066" }}
              >
                <div className="border-dotted rounded-[15px] border-4 h-[160px] flex-col gap-2 text-md w-[220px] flex justify-center items-center border-[border: 2px solid #161A1D]">
                  <div className="relative   bg-[#DF201F] h-12  w-12 flex justify-center  rounded-full">
                    <button
                      className="flex self-center"
                      onClick={handleAddProduct}
                    >
                      <i
                        className="fa-duotone fa-plus fa-2xl "
                        style={{ color: "#e8eaed" }}
                      ></i>
                    </button>
                  </div>
                  <p className="">{Strings.category.addNewButton}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Loader>
    </div>
  );
}

export default AllProducts;
