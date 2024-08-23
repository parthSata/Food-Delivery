import { useState } from 'react';

function CategoryMenu() {
    const [active, setActive] = useState('Meal');

    const categories = [
        'Meal(1)',
        'Main Course (1)',
        'Main Course (1)',
        'Main Course (1)',
        'Rice(1)',
        'Pizza(1)',
        'Rice(1)',
        'Pizza(1)',
        'Rice(1)',
        'Pizza(1)',
        'Rice(1)',
        'Pizza(1)',
        'Rice(1)',
        'Pizza(1)',
        'Burgers and Sandwiches (11)'
    ];

    return (
        <div>
            <ul className="pl-4 sticky top-0 overflow-x-scroll max-h-full flex flex-col gap-2 justify-center  text-left border-r-2 ">
                {categories.map((category, index) => (
                    <li
                        key={index}
                        onClick={() => setActive(category)}
                        className={`hover:border-r-4  cursor-pointer
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
