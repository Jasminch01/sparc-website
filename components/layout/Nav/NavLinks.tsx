import { Poppins } from "next/font/google";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '700']
});

const navs = [
    { title: 'WHO WE ARE' },
    { title: 'OPPORTUNITY', icon: <IoIosArrowDown /> },
    { title: 'STORIES', icon: <IoIosArrowDown /> },
    { title: 'RESOURCES', icon: <IoIosArrowDown /> },
    { title: 'PARTNERS' },
    { title: 'LEARN FROM US' },
    { title: 'BLOG' }
];

const NavLinks = () => {
    const [activeButton, setActiveButton] = useState('WHO WE ARE');
    const [trackButton, setTrackButton] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleClick = (nav: { title: string; }, i: number) => {
        if (activeIndex === i) {
            setTrackButton(prev => !prev);
        } else {
            setActiveButton(nav.title);
            setActiveIndex(i);
            setTrackButton(true);
        }
    };

    return (
        <div className={`flex items-center gap-5 ${poppins.className}`}>
            {navs.map((nav, i) => (
                <div key={i} className="flex items-center gap-1">
                    <button onClick={() => handleClick(nav, i)} className={`text-sm cursor-pointer ${activeIndex === i ? 'text-[#FF951B]' : 'text-black hover:text-[#FF951B]'}`}>
                        {nav.title}
                    </button>
                    {nav.icon && (
                        <button className={`transition-transform duration-300 ${activeIndex === i && trackButton ? 'rotate-180' : 'rotate-0'}`}>
                            {nav.icon}
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default NavLinks;
