"use client";
import Image from "next/image";
import { antiquaFont, poppins } from "../utils/font";
import { FaAnglesDown } from "react-icons/fa6";
// Import useTranslation to access i18n data
import { useTranslation } from "react-i18next"; 

const Banner = () => {
    // 1. Fetch translations
    const { t } = useTranslation();
    const title = t('banner.title', 'WHO WE ARE');
    const description = t('banner.description', 'Gain hands-on experience and make impact through our internship program');
    const buttonText = t('banner.button', 'SCROLL DOWN');

    const scrollToContent = () => {
        window.scrollBy({
            top: window.innerHeight,
            behavior: "smooth",
        });
    };

    return (
        <div className="w-full relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen">
            <Image
                src={"/about-hero.png"}
                width={1920}
                height={1080}
                alt="about-image"
                className="w-full h-full object-cover"
                priority
            />

            {/* Center Content - Now using translated text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 sm:px-6 md:px-8">
                <h1
                    className={`text-2xl lg:text-5xl font-black mb-4 md:mb-6 text-center ${poppins.className}`}
                >
                    {title} {/* Replaced 'WHO WE ARE' */}
                </h1>
                <p
                    className={`text-lg lg:text-xl text-center max-w-2xl lg:max-w-3xl ${antiquaFont.className}`}
                >
                    {description} {/* Replaced hardcoded description */}
                </p>
            </div>

            {/* Scroll Down Button - Now using translated text */}
            <button
                onClick={scrollToContent}
                className="absolute bottom-8 md:bottom-12 lg:bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center text-white cursor-pointer z-10"
                aria-label="Scroll down"
            >
                <span className="text-sm text-[#FF951B] font-bold lg:text-xl mb-2">
                    {buttonText} {/* Replaced 'SCROLL DOWN' */}
                </span>

                <FaAnglesDown size={24} className="animate-bounce" />
            </button>
        </div>
    );
};

export default Banner;