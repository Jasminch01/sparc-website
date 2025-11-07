import { Poppins } from "next/font/google";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

const navs = [
    { title: "WHO WE ARE" },
    { title: "OPPORTUNITY", icon: IoIosArrowDown },
    { title: "STORIES", icon: IoIosArrowDown },
    { title: "RESOURCES", icon: IoIosArrowDown },
    { title: "PARTNERS" },
    { title: "LEARN FROM US" },
    { title: "BLOG" },
];

const opportunities = ["Volunteer", "Be an Intern", "Fellowship"];

const NavLinks = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const handleClick = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className={`relative flex items-center gap-6 ${poppins.className}`}>
            {navs.map((nav, i) => {
                const isActive = activeIndex === i;
                const Icon = nav.icon;
                return (
                    <div key={i} className="relative">
                        <button onClick={() => handleClick(i)} className={`flex items-center gap-1 text-sm cursor-pointer transition-colors duration-200 ${isActive ? "text-[#FF951B]" : "text-black hover:text-[#FF951B]"}`}>
                            {nav.title}
                            {Icon && (
                                <span className={`transition-transform duration-300 ${isActive ? "rotate-180" : "rotate-0"}`}>
                                    <Icon />
                                </span>
                            )}
                        </button>

                        {/* Dropdown Menu */}
                        {isActive && nav.title === "OPPORTUNITY" && (
                            <div className="absolute left-0 mt-3 w-44 bg-white shadow-lg  border border-gray-100 z-50">
                                {opportunities.map((op, idx) => (
                                    <div key={idx} className="px-4 py-2 text-sm hover:bg-[#36133B] hover:text-white  cursor-pointer">
                                        {op}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default NavLinks;
