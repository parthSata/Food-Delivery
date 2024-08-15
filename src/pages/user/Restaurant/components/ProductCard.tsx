import React from 'react';

interface ProductCardProps {
    imageSrc: string;
    altText?: string;
    title: string;
    rating: number;
    price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ imageSrc, altText, title, rating, price }) => {
    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <span key={i} className={i < rating ? "text-yellow-500" : "text-gray-300"}>
                    ⭐
                </span>
            );
        }
        return stars;
    };

    return (
        <div className="mt-4 flex flex-row flex-wrap w-full items-center gap-4">
            <img
                src={imageSrc}
                alt={altText}
                className="h-24 w-auto object-cover rounded-md"
            />
            <div className="flex justify-center flex-col">
                <span className="font-semibold">{title}</span>
                <div className="text-gray-600 text-sm flex items-center gap-2">
                    {renderStars(rating)}
                </div>
                <p className="text-lg text-left font-semibold">{price}</p>
            </div>
        </div>
    );
};

export default ProductCard;
