import React from "react";
import Container from "../Container";
import Image from "next/image";
import { antiquaFont, poppins } from "../utils/font";

const Team = () => {

  const socialWorkerTeam = [
    {
      name: "Arthur Morgan",
      title: "Social Worker, MD",
      image: "/About/socialTeam1.png",
    },
    {
      name: "Jane Smith",
      title: "Social Worker, PhD",
      image: "/About/socialTeam2.png",
    },
    {
      name: "John Doe",
      title: "Social Worker, MSW",
      image: "/About/socialTeam3.png",
    },
    {
      name: "John Snow",
      title: "Social Worker, MSW",
      image: "/About/socialTeam4.png",
    },
  ];

  return (
    <div className={`mt-16 md:mt-24 lg:mt-32 ${poppins.className}`}>
      <Container>
        <div className="mb-12 md:mb-16 lg:mb-20 px-4 md:px-6 lg:px-0">
          <p className="text-center font-black text-2xl lg:text-4xl mb-6 md:mb-8 lg:mb-10">
            THE TEAM
          </p>

          {/* Category Buttons */}
          <div className="flex flex-wrap gap-3 md:gap-4 mb-8 md:mb-10 justify-center md:justify-start">
            <button className="px-4 md:px-6 py-2 bg-gray-200 text-white rounded-full hover:bg-gray-300 transition text-sm md:text-base">
              Category 1
            </button>
            <button className="px-4 md:px-6 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition text-sm md:text-base">
              Category 2
            </button>
            <button className="px-4 md:px-6 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition text-sm md:text-base">
              Category 3
            </button>
            <button className="px-4 md:px-6 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition text-sm md:text-base">
              Category 4
            </button>
          </div>

          {/* Team Members */}
          <div className="space-y-8 md:space-y-10">
            {/* First Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-4">
              {socialWorkerTeam.map((member, index) => (
                <div key={index} className="flex flex-col">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={300}
                    height={250}
                    className="object-cover w-full h-[250px] sm:h-[280px] md:h-[300px] lg:h-[250px]"
                  />
                  <p
                    className={`font-bold text-lg md:text-xl mt-3 md:mt-4`}
                  >
                    {member.name}
                  </p>
                  <p
                    className={`text-gray-600 text-base md:text-lg ${antiquaFont.className}`}
                  >
                    {member.title}
                  </p>
                </div>
              ))}
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-4">
              {socialWorkerTeam.map((member, index) => (
                <div key={index} className="flex flex-col">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={300}
                    height={250}
                    className="object-cover w-full h-[250px] sm:h-[280px] md:h-[300px] lg:h-[250px]"
                  />
                  <p
                    className={`font-bold text-lg md:text-xl mt-3 md:mt-4 ${poppins.className}`}
                  >
                    {member.name}
                  </p>
                  <p
                    className={`text-gray-600 text-base md:text-lg ${antiquaFont.className}`}
                  >
                    {member.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Team;
