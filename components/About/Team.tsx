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
    <div className="mt-32">
      <Container>
        <div className="mb-20">
          <p className="text-center font-black text-3xl mb-10">THE TEAM</p>
          <div className="flex gap-4 mb-10">
            <button className="px-6 py-2 bg-gray-200 text-white rounded-full hover:bg-gray-300 transition">
              Category 1
            </button>
            <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition">
              Category 2
            </button>
            <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition">
              Category 3
            </button>
            <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition">
              Category 4
            </button>
          </div>
          <div className="space-y-10">
            <div className="flex justify-between">
              {socialWorkerTeam.map((member, index) => (
                <div key={index} className="flex flex-col">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={300}
                    height={250}
                    className="object-cover w-full"
                  />
                  <p className={`font-bold text-xl mt-4 ${poppins.className}`}>
                    {member.name}
                  </p>
                  <p className={`text-gray-600 text-lg ${antiquaFont.className}`}>
                    {member.title}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              {socialWorkerTeam.map((member, index) => (
                <div key={index} className="flex flex-col">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={300}
                    height={250}
                    className="object-cover w-full"
                  />
                  <p className={`font-bold text-xl mt-4 ${poppins.className}`}>
                    {member.name}
                  </p>
                  <p className={`text-gray-600 text-lg ${antiquaFont.className}`}>
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
