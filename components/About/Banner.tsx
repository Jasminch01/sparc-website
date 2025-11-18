"use client";
import Image from "next/image";
import { antiquaFont, poppins } from "../utils/font";
import { FaAnglesDown } from "react-icons/fa6";

const Banner = () => {
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

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 sm:px-6 md:px-8">
        <h1
          className={`text-2xl lg:text-5xl font-black mb-4 md:mb-6 text-center ${poppins.className}`}
        >
          WHO WE ARE
        </h1>
        <p
          className={`text-lg lg:text-xl text-center max-w-2xl lg:max-w-3xl ${antiquaFont.className}`}
        >
          Gain hands-on exprience and make impact through out internship program
        </p>
      </div>

      {/* Scroll Down Button */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 md:bottom-12 lg:bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center text-white cursor-pointer z-10"
        aria-label="Scroll down"
      >
        <span className="text-lg text-[#FF951B] font-bold lg:text-xl mb-2">
          SCROLL DOWN
        </span>

        <FaAnglesDown size={24} />
      </button>
    </div>
  );
};

export default Banner;
