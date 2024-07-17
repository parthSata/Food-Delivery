import { useNavigate } from "react-router-dom"
// import Loader from "../../../Components/Loader"
import { BurgerImg, FlashBurger } from "../../Config/images"
import Strings from "../../../Components/Config/Strings"
import Button from "../../../Components/ReusableComponent/Button"

function Category() {
    const navigate = useNavigate()

    const handleAddProduct = () => {
        navigate("/customer/checkOutPage")
    }

    const handleProductView = () => {

    }

    return (
        <div className="">
            {/* Product Heading */}
            <div
                className="relative mt-4 w-full flex-row bg-black opacity-90 "
                style={{ fontFamily: "Bai Jamjuree" }}
            >
                <div className=" flex justify-start flex-col pl-16 w-full  h-full" style={{ background: ("269.88deg, #83B018 0.09%, #C2C965 99.89%") }}>
                    <span className="absolute bottom-28 text-white text-2xl">{Strings.category.getOff}</span>
                    <span className="absolute bottom-20 text-white text-2xl">{Strings.category.bestBurger}</span>
                </div>
                <div className="w-full">
                    <img src={BurgerImg} alt="" className="h-[205px] w-full  " />
                </div>
            </div>
            {/* Products */}
            {/* <Loader isLoading={isLoading}> */}
            <div className="">
                <div className="mt-6 w-full  flex gap-2 justify-around flex-wrap  ">
                    <div className="sm:w-1/5 w-full mb-10" onClick={handleProductView}>
                        <div className="flex justify-center font-semibold flex-col text-md items-center bg-[#FFE5E5] h-[200px] w-full rounded-[20px]">
                            {/* @ts-ignore */}
                            <img src={FlashBurger} alt="" className="h-20" />
                            <p className="" style={{ fontFamily: "Bai Jamjuree" }}>{Strings.orders.hamburger}</p>
                            <p className="flex gap-2 items-center text-[#DF201F]" style={{ fontFamily: "Montserrat Alternates" }}>
                                {Strings.checkOut.discountPrice}
                                <span className="text-xs line-through">
                                    {Strings.checkOut.price}
                                </span>
                            </p>
                        </div>
                        <div className="relative flex justify-center w-full gap-2  -top-6">
                            <div className="hover:bg-[#DF201F] bg-white  h-12 w-12 flex justify-center rounded-3xl " style={{
                                boxShadow: "2px 2px 15px 2px #FFE5E5"
                            }}>
                                <Button className="" onClick={(handleAddProduct)}>
                                    <i
                                        className="fa-solid fa-plus fa-lg hover:text-white"
                                        style={{ color: "#111213" }}
                                    ></i>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* </Loader> */}
        </div>
    )
}

export default Category