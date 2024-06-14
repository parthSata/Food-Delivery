import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CategoriesData } from "../Category/Home";
import { Product } from "../Products/ProductAdd";
import apiUrl from "../Config/apiUrl";
import Container from "../Container";
// import { Loaders } from '../Config/images'

function Category() {
  const { CategoryId } = useParams();
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState<CategoriesData>({
    id: "",
    categoryName: "",
    description: "",
    numberOfProducts: "",
    status: "In Stock",
    imageUrl: "",
  });
  // const [Loader, setLoader] = useState(false)
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (CategoryId) {
      fetchCategoryData(CategoryId);
    }
  }, []);

  const fetchCategoryData = async (id: any) => {
    // setLoader(true);
    try {
      const response = await fetch(`${apiUrl}/categories/${id}`);
      if (response.ok) {
        const data = await response.json();
        setCategoryData(data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      // setLoader(false)
    }
  };

  const handleAddProduct = (id: any) => {
    navigate(`/productsAdd/${id}`, { state: { CategoryId } });
  };

  useEffect(() => {
    if (CategoryId) {
      fetchProducts();
    }
  }, [CategoryId]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${apiUrl}/products`);
      if (response.ok) {
        const data = await response.json();
        const filteredProducts = data.filter(
          (product: any) => product.categoryId === CategoryId
        );
        setProducts(filteredProducts);
      }
    } catch (error) {
      console.error("Error fetching Products:", error);
    }
  };

  const handleUpdateProduct = (id: any) => {
    navigate(`/productsAdd/${id}`, { state: { CategoryId: CategoryId } });
  };

  const handleDeleteProduct = async (id: any) => {
    try {
      const response = await fetch(`https://static-food-delivery-backend.vercel.app/products/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchProducts();
      } else {
        console.error("Failed to delete Products:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting Products:", error);
    }
    navigate(`/category/${CategoryId}`);
  };

  const handleProductView = (id: string) => {
    navigate(`/productView/${id}`, { state: { productId: id } });
  };

  return (
    <>
      <div className="">
        <Container>
          {/* Product Heading */}

          <div
            className="bg-[#fcbc65]  h-52 w-full  sm:w-full "
            style={{ fontFamily: "Bai Jamjuree" }}
          >
            <div className="flex justify-between  items-center w-full">
              <span className="text-3xl pl-28 text-white">
                {categoryData.categoryName}
              </span>
              <img
                src={categoryData.imageUrl}
                alt=""
                className="visible sm:visible md:visible lg:visible xl:visible h-[205px] w-fit "
              />
            </div>
          </div>
          {/* Products */}
          <div className="">
            {/* {Loader ? (
            <div className=""><img src={Loaders} alt="" /></div>
          ) : ( */}
            <div className="mt-6 w-full  flex gap-2 justify-around flex-wrap  ">
              {products.map((item) => (
                <div
                  className="sm:w-1/5 mb-10  w-full cursor-pointer"
                  onClick={() => handleProductView(item.id)}
                  key={item.id}
                >
                  <div className="flex justify-center font-semibold flex-col text-md items-center bg-[#FFE5E5] h-[200px] w-full rounded-[20px]">
                    {/* @ts-ignore */}
                    <img src={item.images[0]} alt="" className="h-20" />
                    <p className="" style={{ fontFamily: "Bai Jamjuree" }}>
                      {item.name}{" "}
                    </p>
                    <p
                      className="flex gap-2 items-center text-[#DF201F]"
                      style={{ fontFamily: "Montserrat Alternates" }}
                    >
                      ₹{item.price}
                      <span className="text-xs line-through">
                        ₹{item.discountPrice}{" "}
                      </span>
                    </p>
                  </div>
                  <div className="relative flex justify-center w-full gap-2  -top-6">
                    <div
                      className="bg-[#DF201F]  h-12 w-12 flex justify-center rounded-3xl "
                      onClick={(e) => (
                        e.stopPropagation(), handleDeleteProduct(item.id)
                      )}
                    >
                      <button className="">
                        <i
                          className="fa-solid fa-trash fa-lg"
                          style={{ color: "#d4d9de" }}
                        ></i>
                      </button>
                    </div>
                    <div
                      className="bg-[#94CD00]  h-12 w-12 flex justify-center rounded-3xl"
                      onClick={(e) => (
                        e.stopPropagation(), handleUpdateProduct(item.id)
                      )}
                    >
                      <button className="">
                        <i
                          className="fa-solid fa-pen fa-lg"
                          style={{ color: "#d4d9de" }}
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className=" sm:w-1/5  mb-10 w-full">
                <div
                  className="flex justify-center w-full font-semibold flex-col text-md items-center  h-[200px]  "
                  style={{ boxShadow: " 2px 2px 20px 2px #FFE9D066" }}
                >
                  <div className="border-dotted rounded-[15px] border-4 h-[160px] flex-col gap-2 text-md w-[220px] flex justify-center items-center border-[border: 2px solid #161A1D]">
                    <div className="relative   bg-[#DF201F] h-12  w-12 flex justify-center  rounded-full">
                      <button
                        className="flex self-center"
                        onClick={() => handleAddProduct(CategoryId)}
                      >
                        <i
                          className="fa-duotone fa-plus fa-2xl "
                          style={{ color: "#e8eaed" }}
                        ></i>
                      </button>
                    </div>
                    <p className="">Add New</p>
                  </div>
                </div>
              </div>
            </div>
            {/* )} */}
          </div>
        </Container>
      </div>
    </>
  );
}

export default Category;
