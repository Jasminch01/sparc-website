import { Poppins } from "next/font/google";
import Link from "next/link";
import path from "path";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

const navs = [
    { title: "WHO WE ARE", path: '/who-we-are' },
    { title: "OPPORTUNITY", icon: IoIosArrowDown },
    { title: "STORIES", icon: IoIosArrowDown },
    { title: "RESOURCES", icon: IoIosArrowDown },
    { title: "PARTNERS", icon : IoIosArrowDown },
    { title: "LEARN FROM US", path: '/learn' },
    { title: "BLOG", path: '/blogs' },
];

const opportunities = [
    { title: 'Volunteer', path: '/volunteer' },
    { title: 'Be a Intern', path: '/be-a-intern' },
    { title: 'Fellowship', path: '/fellowship' },
];
const resources = [
    { title: 'Reports and Publications', path: '/reports-publications' },
    { title: 'Rebuild Communities', path: '/update' }
]
const stories = [
    { title: 'Indespeak', path: '/indespeak' }
]

const partner = [
   { title : "How to partner", path: "/how-to-partner"},
   { title : "Partners", path: "/partners"}
]

const NavLinks = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setActiveIndex(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleClick = (index: number, hasDropdown: boolean) => {
        if (hasDropdown) {
            setActiveIndex(activeIndex === index ? null : index);
        }
    };

    return (
        <div ref={dropdownRef} className={`relative flex flex-col lg:flex-row lg:items-center gap-6 ${poppins.className}`}>
            {navs.map((nav, i) => {
                const isActive = activeIndex === i;
                const Icon = nav.icon;
                const hasDropdown = !!Icon;

                return (
                    <div key={i} className="relative">
                        {hasDropdown ? (
                            <button onClick={() => handleClick(i, true)} className={`flex items-center gap-1 text-sm cursor-pointer transition-colors duration-200 ${isActive ? "text-[#FF951B]" : "text-black hover:text-[#FF951B]"}`} >
                                {nav.title}
                                <span className={`transition-transform duration-300 ${isActive ? "rotate-180" : "rotate-0"}`}>
                                    <Icon />
                                </span>
                            </button>
                        ) : (
                            <Link href={nav.path || "#"} className="flex items-center gap-1 text-sm cursor-pointer transition-colors duration-200 text-black hover:text-[#FF951B]">
                                {nav.title}
                            </Link>
                        )}

                        {/* Dropdown Menu */}
                        {isActive && nav.title === "OPPORTUNITY" && (
                            <div className="absolute left-0 mt-3 w-44 bg-white shadow-lg border border-gray-100 z-50">
                                {opportunities.map((op, idx) => (
                                    <Link
                                        onClick={() => setActiveIndex(null)}
                                        href={op.path}
                                        key={idx}
                                        className="px-4 py-2 text-sm hover:bg-[#36133B] hover:text-white cursor-pointer flex flex-col gap-3">
                                        {op.title}
                                    </Link>
                                ))}
                            </div>
                        )}
                        {isActive && nav.title === "RESOURCES" && (
                            <div className="absolute left-0 mt-3 w-52 bg-white shadow-lg border border-gray-100 z-50">
                                {resources.map((op, idx) => (
                                    <Link
                                        onClick={() => setActiveIndex(null)}
                                        href={op.path}
                                        key={idx}
                                        className="px-4 py-2 text-sm hover:bg-[#36133B] hover:text-white cursor-pointer flex flex-col gap-3">
                                        {op.title}
                                    </Link>
                                ))}
                            </div>
                        )}
                        {isActive && nav.title === "STORIES" && (
                            <div className="absolute left-0 mt-3 w-52 bg-white shadow-lg border border-gray-100 z-50">
                                {stories.map((op, idx) => (
                                    <Link
                                        onClick={() => setActiveIndex(null)}
                                        href={op.path}
                                        key={idx}
                                        className="px-4 py-2 text-sm hover:bg-[#36133B] hover:text-white cursor-pointer flex flex-col gap-3">
                                        {op.title}
                                    </Link>
                                ))}
                            </div>
                        )}
                        {isActive && nav.title === "PARTNERS" && (
                            <div className="absolute left-0 mt-3 w-52 bg-white shadow-lg border border-gray-100 z-50">
                                {partner.map((op, idx) => (
                                    <Link
                                        onClick={() => setActiveIndex(null)}
                                        href={op.path}
                                        key={idx}
                                        className="px-4 py-2 text-sm hover:bg-[#36133B] hover:text-white cursor-pointer flex flex-col gap-3">
                                        {op.title}
                                    </Link>
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
