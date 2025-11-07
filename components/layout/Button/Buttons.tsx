"use client";

import { useState } from "react";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '700']
})
const Buttons = () => {
    const [language, setLanguage] = useState("EN");
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (lang: string) => {
        setLanguage(lang);
        setIsOpen(false);
    };
    const flags: Record<string, string> = {
        EN: "https://flagcdn.com/us.svg",
        BN: "https://flagcdn.com/bd.svg",
    };

    return (
        <div className={`flex items-center gap-3 relative ${poppins.className}`}>
            {/* Language Dropdown */}
            <div className="relative">
                <button onClick={() => setIsOpen((prev) => !prev)} className="px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition">
                    <Image
                        src={flags[language]}
                        alt={`${language} flag`}
                        width={20}
                        height={20}
                        className="rounded-full h-5 w-5 object-cover"
                    />
                    {language}
                    <IoIosArrowDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} />
                </button>

                {isOpen && (
                    <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 z-10">
                        {/* English Option */}
                        <button onClick={() => handleSelect("EN")} className="flex items-center gap-2 cursor-pointer border-b border-gray-200 w-full text-left px-3 py-2 text-sm hover:bg-gray-100" >
                            <Image
                                src={flags.EN}
                                alt="English flag"
                                width={18}
                                height={18}
                                className="rounded-full object-cover h-5 w-5"
                            />
                            EN
                        </button>

                        {/* Bengali Option */}
                        <button onClick={() => handleSelect("BN")} className="flex items-center gap-2 cursor-pointer w-full text-left px-3 py-2 text-sm hover:bg-gray-100" >
                            <Image
                                src={flags.BN}
                                alt="Bangladesh flag"
                                width={18}
                                height={18}
                                className="rounded-full h-5 w-5 object-cover"
                            />
                            BN
                        </button>
                    </div>
                )}
            </div>

            {/* Donate Button */}
            <button className="px-10 py-4 bg-[#FF951B] text-[14px] text-white rounded-full font-semibold">
                DONATE NOW
            </button>
        </div>
    );
};

export default Buttons;
