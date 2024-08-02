import React from "react";

interface CategoryHeaderProps {
    categoryName: string;
    imageUrl: string;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ categoryName, imageUrl }) => (
    <div className="bg-[#fcbc65] h-52 w-full sm:w-full" style={{ fontFamily: "Bai Jamjuree" }}>
        <div className="flex justify-between items-center w-full">
            <span className="text-3xl pl-28 text-white">{categoryName}</span>
            <img src={imageUrl} alt="" className="visible sm:visible md:visible lg:visible xl:visible h-[205px] w-fit" />
        </div>
    </div>
);

export default CategoryHeader;