"use client";
import React, { useState } from "react";
import teamOne from "../../public/Team/team 1.png";
import teamTwo from "../../public/Team/team 2.png";
import teamThree from "../../public/Team/team 3.png";
import teamFour from "../../public/Team/team 4.png";
import leaf from "../../public/Team/Leaf.png";
import Image from "next/image";
import { antiquaFont, poppins } from "../utils/font";
import Container from "../Container";

const teamMembers = [
  {
    name: "Arthur Morgan",
    designation: "Social Worker, MD",
    img: teamOne,
    category: "Category1",
  },
  {
    name: "Jane Smith",
    designation: "Social Worker, PhD",
    img: teamTwo,
    category: "Category1",
  },
  {
    name: "John Doe",
    designation: "Social Worker, MSW",
    img: teamThree,
    category: "Category2",
  },
  {
    name: "John Snow",
    designation: "Social Worker, MSW",
    img: teamFour,
    category: "Category3",
  },
];

const categoryTeam = [
  "All",
  "Category1",
  "Category2",
  "Category3",
  "Category4",
];

const Team = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(false);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setLoading(true);
    setTimeout(() => setLoading(false), 300);
  };

  const filteredTeam =
    activeCategory === "All"
      ? teamMembers
      : teamMembers.filter(
          (member) =>
            member.category?.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <Container>
      <div className="my-12 md:my-16 lg:my-20">
        {/* Top Section */}
        <section className="flex flex-col xl:flex-row items-start xl:items-center gap-8 lg:gap-12 mb-12 md:mb-16 lg:mb-20">
          <div className="w-full lg:w-1/2">
            <div className="max-w-md space-y-3 md:space-y-4">
              <div className="flex gap-2 items-start">
                <h2
                  style={{ fontFamily: '"Rowan", serif' }}
                  className="xl:text-7xl font-bold md:text-5xl text-4xl mt-2 md:mt-5"
                >
                  01
                </h2>
                <Image
                  src={leaf}
                  alt="team-leaf"
                  width={80}
                  height={80}
                  className="object-contain lg:size-28 size-14 md:size-20"
                />
              </div>
              <hr className="border-gray-400 border" />
              <p
                className={`${poppins.className} font-bold xl:text-4xl md:text-3xl text-2xl leading-tight`}
              >
                MEET THE TEAM
              </p>
            </div>
          </div>

          <div className="w-full xl:w-1/2">
            <p
              className={`text-justify text-lg lg:text-xl leading-relaxed ${antiquaFont.className}`}
            >
              Strong voices. Bold visions. Meet the women and allies driving
              equality and empowerment forward. Our strength lies in unity. The
              incredible women and allies in our team are at the heart of
              everything we do — leading initiatives, empowering communities,
              and standing firm for justice and equality.
            </p>
          </div>
        </section>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-3 md:gap-4 mb-8 md:mb-10 justify-center md:justify-start">
          {categoryTeam.map((ct, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(ct)}
              className={`${
                poppins.className
              } px-4 md:px-6 py-2 rounded-full text-lg transition-all duration-200 cursor-pointer ${
                activeCategory === ct
                  ? "bg-[#772E82] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-[#772E82] hover:text-white"
              }`}
            >
              {ct}
            </button>
          ))}
        </div>

        {/* Team Grid with improved loading state */}
        <div className="min-h-[500px]">
          {loading ? (
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-6">
              {[1, 2, 3, 4].map((skeleton) => (
                <div key={skeleton} className="flex flex-col animate-pulse">
                  <div className="bg-gray-200 w-full aspect-3/4 rounded-lg"></div>
                  <div className="mt-3 md:mt-4 space-y-2">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </section>
          ) : filteredTeam.length > 0 ? (
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-6">
              {filteredTeam.map((team, index) => (
                <div 
                  key={index} 
                  className="flex flex-col opacity-0 animate-fadeIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative w-full aspect-3/4 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={team.img}
                      alt={team.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                      priority={index < 4}
                    />
                  </div>
                  <div className="mt-3 md:mt-4">
                    <h2
                      className={`${poppins.className} font-bold text-lg md:text-xl`}
                    >
                      {team.name}
                    </h2>
                    <p
                      className="text-sm md:text-base text-gray-600"
                      style={{ fontFamily: '"Book Antiqua", serif' }}
                    >
                      {team.designation}
                    </p>
                  </div>
                </div>
              ))}
            </section>
          ) : (
            <div className="text-center py-32">
              <p
                className={`text-center text-gray-500 font-medium text-sm ${poppins.className}`}
              >
                No team members found in this category.
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </Container>
  );
};

export default Team;