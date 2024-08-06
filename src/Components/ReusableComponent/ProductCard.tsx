import React from "react";
import Button from "../ReusableComponent/Button";

interface ProductCardProps {
    product: {
        id: string;
        name: string;
        price: number;
        discountPrice: number;
        images: string[];
    };
    onViewProduct: (id: string) => void;
    onDeleteProduct: (id: string) => void;
    onUpdateProduct: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewProduct, onDeleteProduct, onUpdateProduct }) => (
    <div className="sm:w-1/5 mb-10 w-full cursor-pointer px-8" onClick={() => onViewProduct(product.id)} key={product.id}>
        <div className="flex justify-center font-semibold flex-col text-md items-center bg-[#FFE5E5] h-[200px] w-full rounded-[20px]">
            <img src={product.images?.[0]} alt="" className="h-20" />
            <p className="" style={{ fontFamily: "Bai Jamjuree" }}>{product.name}</p>
            <p className="flex gap-2 items-center text-[#DF201F]" style={{ fontFamily: "Montserrat Alternates" }}>
                ₹{product.price}
                <span className="text-xs line-through">₹{product.discountPrice}</span>
            </p>
        </div>
        <div className="relative flex justify-center w-full gap-2 -top-6">
            <div className="bg-[#DF201F] h-12 w-12 flex justify-center rounded-3xl" onClick={(e) => (e.stopPropagation(), onDeleteProduct(product.id))}>
                <Button>
                    <i className="fa-solid fa-trash fa-lg text-productBtn"></i>
                </Button>
            </div>
            <div className="bg-[#94CD00] h-12 w-12 flex justify-center rounded-3xl" onClick={(e) => (e.stopPropagation(), onUpdateProduct(product.id))}>
                <Button>
                    <i className="fa-solid fa-pen fa-lg text-productBtn"></i>
                </Button>
            </div>
        </div>
    </div>
);

export default ProductCard;
