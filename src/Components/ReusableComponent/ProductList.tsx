import React from "react";
import { t } from "i18next";
import { Button, Loader, ProductCard } from "@/Components/index";

interface ProductListProps {
    products: any[];
    isLoading: boolean;
    onAddProduct: () => void;
    onViewProduct: (id: string) => void;
    onDeleteProduct: (id: string) => void;
    onUpdateProduct: (id: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, isLoading, onAddProduct, onViewProduct, onDeleteProduct, onUpdateProduct }) => {

    return (
        <div className="">
            <Loader isLoading={isLoading}>
                <div className="mt-6 w-full flex gap-2 justify-around flex-wrap">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onViewProduct={onViewProduct}
                            onDeleteProduct={onDeleteProduct}
                            onUpdateProduct={onUpdateProduct}
                        />
                    ))}
                    <div className="sm:w-1/5 mb-10 w-full px-8">
                        <div className="flex justify-center w-full shadow-addNew font-semibold flex-col text-md items-center h-[200px]">
                            <div className="border-dotted  rounded-[15px] border-4 h-[160px] flex-col gap-2 text-md w-[300px] px-2 xl:w-[200px] lg:w-[180px] md:w-[130px] sm:w-[100px] flex justify-center items-center border-[border: 2px solid #161A1D]">
                                <div className="relative bg-[#DF201F] h-12 w-12 flex justify-center rounded-full">
                                    <Button className="flex self-center" onClick={onAddProduct}>
                                        <i className="fa-duotone fa-plus fa-2xl text-addNew"></i>
                                    </Button>
                                </div>
                                <p className="">{t("category.addNewButton")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Loader>
        </div>
    );
};

export default ProductList;
