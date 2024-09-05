import { useState } from 'react';

function CategoryMenu() {
    const [active, setActive] = useState('Meal');

    const categories = [
        'Meal (1)',
        'Main Course (1)',
        'Rice (1)',
        'Pizza (1)',
        'Appetizer (1)',
        'Desserts (1)',
        'Drinks (1)',
        'Bread (1)',
        'Salads (1)',
        'Beverages (1)',
        'Snacks (1)',
        'Soups (1)',
        'Bread (1)',
        'Salads (1)',
        'Beverages (1)',
        'Snacks (1)',
        'Soups (1)',
    ];

    return (
        <div className="h-full overflow-y-auto scroll-smooth relative">
            <ul className="pt-4 pl-12 flex flex-col gap-4 text-left border-r-2  max-h-[700px]">
                {categories.map((category, index) => (
                    <li
                        key={index}
                        onClick={() => setActive(category)}
                        className={`hover:border-r-4 text-lg cursor-pointer 
                        ${active === category ? 'text-[#DF201F] border-[#DF201F]' : ''}
                        hover:text-[#DF201F] hover:border-[#DF201F] focus:outline-none`}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoryMenu;
