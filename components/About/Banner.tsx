"use client";
import Image from "next/image";
import React from "react";
import { antiquaFont, poppins } from "../utils/font";

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
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 text-center ${poppins.className}`}
        >
          WHO WE ARE
        </h1>
        <p
          className={`text-base sm:text-lg md:text-xl lg:text-2xl text-center max-w-2xl lg:max-w-3xl ${antiquaFont.className}`}
        >
          Gain hands-on exprience and make impact through out internship program
        </p>
      </div>

      {/* Scroll Down Button */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 md:bottom-12 lg:bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center text-white hover:scale-110 transition-transform duration-300 z-10"
        aria-label="Scroll down"
      >
        <span className="text-xs sm:text-sm md:text-base mb-2 tracking-wider font-medium">
          SCROLL DOWN
        </span>
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Banner;