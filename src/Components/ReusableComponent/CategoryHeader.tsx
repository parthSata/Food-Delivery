import React from "react";

interface CategoryHeaderProps {
    categoryName: string;
    imageUrl: string;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ categoryName, imageUrl }) => (
    <div className="bg-[#fcbc65] h-full w-full sm:w-full" style={{ fontFamily: "Bai Jamjuree" }}>
        <div className="flex justify-between  flex-wrap  items-center w-full">
            <span className="xl:text-3xl text-2xl pl-8 xl:pl-28 self-center  text-white">{categoryName}</span>
            <img src={imageUrl} alt="" className="visible  sm:visible md:visible lg:visible xl:visible h-[150px] xl:h-[205px] w-auto" />
        </div>
    </div>
);

export default CategoryHeader;