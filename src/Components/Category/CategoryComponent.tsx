import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CategoriesData } from "@/Components/Category/CategoryPage";
import { Product } from "../Products/ProductAdd";
import { db } from "@/config/Firebase/firebase";
import { ref, onValue, remove } from "firebase/database";
import CategoryHeader from "@/Components/ReusableComponent/CategoryHeader";
import ProductList from "@/Components/ReusableComponent/ProductList";

const Category: React.FC = () => {
    const { CategoryId } = useParams<{ CategoryId?: string }>();
    const navigate = useNavigate();
    const [categoryData, setCategoryData] = useState<CategoriesData>({
        id: "",
        categoryName: "",
        description: "",
        numberOfProducts: "",
        status: "In Stock",
        imageUrl: "",
    });
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (CategoryId) {
            fetchCategoryData(CategoryId);
            fetchProducts(CategoryId);
        }
    }, [CategoryId]);

    const fetchCategoryData = (id: string) => {
        setIsLoading(true);
        const categoryRef = ref(db, `categories/${id}`);
        onValue(
            categoryRef,
            (snapshot) => {
                const data = snapshot.val();
                setCategoryData({ id, ...data });
                setIsLoading(false);
            },
            {
                onlyOnce: true,
            }
        );
    };

    const fetchProducts = (categoryId: string) => {
        const productsRef = ref(db, "products");
        onValue(
            productsRef,
            (snapshot) => {
                const data = snapshot.val();
                if (!data) {
                    console.error("Data is null or undefined");
                    return;
                }

                const productsData = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));

                const filteredProductsData = productsData.filter(
                    (product) => product.categoryId === categoryId
                );
                setProducts(filteredProductsData);
            },
            {
                onlyOnce: true,
            }
        );
    };

    const handleAddProduct = (id: string) => {
        navigate(`/seller/productsAdd/${id}`, { state: { CategoryId } });
    };

    const handleUpdateProduct = (id: string) => {
        navigate(`/seller/productsAdd/${id}`, { state: { CategoryId, updateId: id } });
    };

    const handleDeleteProduct = (id: string) => {
        const productRef = ref(db, `products/${id}`);
        remove(productRef)
            .then(() => {
                fetchProducts(CategoryId!);
            })
            .catch((error) => {
                console.error("Error deleting product:", error);
            });
        navigate(`/seller/category/${CategoryId}`);
    };

    const handleProductView = (id: string) => {
        navigate(`/seller/productView/${id}`, { state: { productId: id } });
    };

    return (
        <div className="">
            <CategoryHeader categoryName={categoryData.categoryName} imageUrl={categoryData.imageUrl} />
            <ProductList
                products={products}
                isLoading={isLoading}
                onAddProduct={() => handleAddProduct(CategoryId!)}
                onViewProduct={handleProductView}
                onDeleteProduct={handleDeleteProduct}
                onUpdateProduct={handleUpdateProduct}
            />
        </div>
    );
};

export default Category;
