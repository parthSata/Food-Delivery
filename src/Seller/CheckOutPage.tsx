import { useState } from "react";
import { FlashBurger } from "../User/Config/images"





function CheckoutPage() {
    const [quantity, setQuantity] = useState(0)
    const incrementQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };
    return (
        <div>

            <div className="">
                {/* Total */}
                <div className="flex flex-row">
                    <div className="">
                        <div className="" style={{ boxShadow: "2px 2px 30px 2px #FFF3E5" }}>
                            <div className="flex flex-row">
                                <img src={FlashBurger} alt="" className="" />
                                <div className="">
                                    <span className="">HamBurger</span>
                                    <span className="flex gap-2 items-center text-[#DF201F]">₹100<span className="line-through text-xs">₹200</span></span>
                                    <div className="flex items-start gap-2 flex-col">
                                        <span className="">Quantity</span>
                                        <div
                                            className="flex  gap-1"
                                            style={{ boxShadow: " 2px 2px 15px 2px #FFE5E5" }}
                                        >
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
                            </div>
                        </div>
                    </div>
                    <div className="">

                    </div>
                </div>




                {/* Address */}
                <div className=""></div>
            </div>
        </div >
    )
}

export default CheckoutPage