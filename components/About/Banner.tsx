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
    <div className="w-full relative h-screen">
      <Image
        src={"/about-hero.png"}
        width={1000}
        height={1000}
        alt="about-image"
        className="w-full h-full object-cover"
      />

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h1 className={`text-4xl font-black mb-4 text-center ${poppins.className}`}>
          WHO WE ARE
        </h1>
        <p className={`text-xl text-center max-w-2xl ${antiquaFont.className}`}>
          Gain hands-on exprience and make impact through out internship program
        </p>
      </div>

      {/* Scroll Down Button */}
      <button
        onClick={scrollToContent}
        className=" flex flex-col items-center text-white hover:scale-110 transition-transform duration-300"
        aria-label="Scroll down"
      >
        <span className="text-sm mb-2 tracking-wider">SCROLL DOWN</span>
        <svg
          className="w-6 h-6 animate-bounce"
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
