import { BhelPuri, Burger, DummyImg, Location, Pizzza } from '@/assets';
import { Input } from '@/Components';
import { t } from 'i18next';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dish() {
    const products = [
        { image: Pizzza, price: "₹200", discountPrice: "₹150", title: "Butter Bhaji Pulao [250 Grams]" },
        { image: Burger, price: "₹200", discountPrice: "₹150", title: "Burger" },
        { image: BhelPuri, price: "₹200", discountPrice: "₹150", title: "Bhelpuri" },
    ];

    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState(products);
    const navigate = useNavigate();

    const handleProductView = () => {
        navigate(`/customer/userProductView`);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length > 0) {
            const filteredResults = products.filter(item =>
                item.title.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filteredResults);
        } else {
            setResults(products);
        }
    };

    return (
        <div className="">
            <div className="relative mt-4 bg-black opacity-90 font-baiJamjuree">
                <img src={DummyImg} alt="" className="h-[205px] w-full" />
                <div className="absolute flex flex-col gap-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4">
                    <div className="flex flex-col gap-2 justify-center h-full w-full">
                        <div className="flex justify-center max-w-[620px]">
                            <label className="font-montserrat pl-[-50px] font-semibold text-md text-white">
                                {t("home.searchProductLabel")}
                            </label>
                        </div>
                        <div className="flex justify-center">
                            <div className="rounded-l-[15px] items-center border-r flex flex-row p-2 max-w-[300px] gap-2 bg-white w-full h-full">
                                <img src={Location} alt="" className="h-6 w-6" />
                                <div className="flex flex-col">
                                    <label className="text-[#A2A3A5] self-start font-semibold font-montserrat">
                                        {t("home.locationLabel")}
                                    </label>
                                    <Input
                                        type="text"
                                        className="border-none placeholder:text-[#161A1D] max-w-[200px] outline-none h-full w-full text-black font-semibold"
                                        placeholder="ex. Rajkot , Gujrat"
                                    />
                                </div>
                            </div>
                            <div className="rounded-r-[15px] items-center flex flex-row p-5 gap-2 max-w-[300px] bg-white w-full h-full">
                                <Input
                                    type="text"
                                    onChange={handleSearchChange}
                                    className="h-full w-full border-none outline-none"
                                    placeholder="Search..."
                                />
                            </div>
                            {searchQuery && results.length > 0 && (
                                <ul className="absolute top-full left-32 max-w-[590px] flex flex-col justify-center right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                                    {results.map((result, index) => (
                                        <li key={index} className="p-2 hover:bg-gray-200 cursor-pointer">
                                            {result.title}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {/* Conditionally render Popular Dishes based on searchQuery */}
                {!searchQuery && (
                    <div className="p-8">
                        <span className="font-semibold text-left mb-[100px] text-xl font-baiJamjuree rounded-[0px, 60px, 60px, 0px]">
                            Popular Dishes
                        </span>
                        <div className="flex flex-row flex-wrap font-popins justify-center gap-16">
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((index) => (
                                <div key={index} className="flex pt-4 flex-col cursor-pointer justify-center">
                                    <img
                                        src={Pizzza}
                                        alt=""
                                        className="self-center h-[100px] w-[100px]"
                                    />
                                    <span className="font-semibold">
                                        {t("dashboard.pizza")}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="">
                    <div className="mt-6 w-full flex gap-2 justify-around flex-wrap">
                        {results.map((item, index) => (
                            <div
                                key={index}
                                className="sm:w-1/5 w-full mb-10"
                                onClick={handleProductView}
                            >
                                <div className="flex justify-center font-semibold flex-col text-md items-center bg-[#FFE5E5] h-[200px] w-full rounded-[20px] gap-2">
                                    <img src={item.image} alt="" className="h-20" />
                                    <p className="" style={{ fontFamily: "Bai Jamjuree" }}>
                                        {item.title}
                                    </p>
                                    <p
                                        className="flex gap-2 items-center text-[#DF201F]"
                                        style={{ fontFamily: "Montserrat Alternates" }}
                                    >
                                        {item.price}
                                        <span className="text-xs line-through">
                                            {item.discountPrice}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dish;
