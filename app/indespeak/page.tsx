"use client";
import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";
import hero from "@/public/indespeak/hero.png";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaAnglesDown } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";

interface Indespeak {
  title: string;
  des: string;
  img: string;
  writtenOn: string;
  imgAlt: string;
  imgName: string;
}

const Page = () => {
  const [activeYear, setActiveYear] = useState("2016-2017");
  const [indiSpeakData, setIndeSpeakData] = useState<Indespeak[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  //  Fetch the data from array json
  useEffect(() => {
    fetch("/indespeak/indispeak.json")
      .then((res) => res.json())
      .then((data) => setIndeSpeakData(data));
  }, []);

  // Filter the data based on year

  const filteredData = indiSpeakData.filter((item) => {
    const itemYear = item.writtenOn.slice(-4);
    const [start, end] = activeYear.split("-");

    return itemYear >= start && itemYear <= end;
  });

  return (
    <div className="mt-15">
      <Container>
        {/* Top Section */}
        <section className="flex flex-col lg:spacy-x-8 space-y-5 lg:space-y-0 lg:flex-row lg:justify-between">
          <div className="w-full lg:w-1/2">
            <h2
              className={`text-2xl lg:text-5xl max-w-2xl font-black text-center lg:text-start ${poppins.className}`}
            >
              STORIES OF <span className="text-[#FF951B]">RESISTANCE</span>
            </h2>
          </div>
          <div className="w-full lg:w-1/2">
            <p
              className={`lg:ml-30 lg:text-justify text-center text-lg md:text-xl ${antiquaFont.className}`}
            >
              Stories of Resistance is a robust and meaningful collection,
              weaving threads of the personal, professional and political into a
              vibrant tapestry of becoming
            </p>
          </div>
        </section>
      </Container>

      {/* Hero Section */}
      <section className="relative">
        <Image
          src={hero}
          alt="indospeak-hero"
          width={1000}
          height={600}
          className="w-full lg:flex h-[350px] md:h-[500px] lg:h-[600px] xl:h-[700px] object-cover"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3 lg:-translate-y-1/4  text-center text-white px-4 w-full">
          <h2
            className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-4 ${poppins.className}`}
          >
            INDISPEAK
          </h2>
          <p
            className={`lg:mb-4 text-lg lg:text-xl max-w-2xl mx-auto ${antiquaFont.className}`}
          >
            Explore stories, documents, and visual archives celebrating the
            heritage, resilience, and identity of Indigenous communities
            worldwide.
          </p>
          <div
            onClick={() => {
              document
                .getElementById("indispeak")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex flex-col items-center justify-center mt-3 lg:mt-30 cursor-pointer"
          >
            <button
              className={`text-[#FF951B] px-6 py-2 lg:px-8 lg:py-3 rounded-full text-sm lg:text-lg font-semibold ${poppins.className}`}
            >
              SCROLL DOWN
            </button>
            <FaAnglesDown className="animate-bounce" size={24} />
          </div>
        </div>
      </section>

      {/* Breadcrumb Section */}
      <Container>
        <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center my-6 lg:my-20">
          <section
            className={`flex gap-3 lg:gap-5 ${poppins.className} font-semibold`}
          >
            <Link href="/">HOME</Link> <span>||</span>
            <p className="text-[#818181] uppercase ">Indispeak</p>
          </section>

          {/* Sorting button */}
          <div className="flex gap-5 items-center">
            <div className="relative">
              <select
                onChange={(e) => setActiveYear(e.target.value)}
                name=""
                id=""
                className={`border border-[#B7B7B7] rounded-sm py-2 pl-4 pr-10 cursor-pointer appearance-none ${poppins.className}`}
              >
                <option value="2016-2017">2016-2017</option>
                <option value="2017-2018">2017-2018</option>
                <option value="2024-2025">2024-2025</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Indispeak content section */}
      <Container>
        <section
          id="indispeak"
          className="flex flex-col gap-8 lg:gap-10  lg:my-20"
        >
          {filteredData.map((ids, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex flex-col xl:flex-row lg:justify-between gap-6 lg:gap-0">
                <div className="w-full xl:w-2/3 space-y-4 lg:space-y-5">
                  <h2
                    className={`uppercase ${poppins.className} font-bold text-2xl md:text-3xl lg:text-[44px]`}
                  >
                    {ids.title}
                  </h2>
                  <p
                    className={`text-[#6B6B6B] ${poppins.className} font-medium uppercase text-sm lg:text-lg`}
                  >
                    Written on {ids.writtenOn}
                  </p>
                  <p
                    className={`${antiquaFont.className} w-full xl:w-3xl text-lg lg:text-xl text-justify`}
                  >
                    {expandedIndex === index
                      ? ids.des
                      : ids.des.slice(0, 300) +
                        (ids.des.length > 300 ? "..." : "")}
                  </p>
                  <div className="w-20">
                    <div className="flex items-center gap-2 cursor-pointer">
                      <div
                        onClick={() =>
                          setExpandedIndex(
                            expandedIndex === index ? null : index
                          )
                        }
                        className="flex items-center gap-2 cursor-pointer w-20"
                      >
                        <button
                          className={`text-lg lg:text-xl ${antiquaFont.className} cursor-pointer hover:text-[#ff951b]`}
                        >
                          {expandedIndex === index ? " Less" : "Expand"}
                        </button>
                        <IoMdArrowDropdown
                          className={`mt-1 transition-transform duration-300 ${
                            expandedIndex === index ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                      <hr className="text-gray-400" />

                      <IoMdArrowDropdown className="mt-1" />
                    </div>
                    <hr className="text-gray-400 " />
                  </div>
                </div>
                <div className="w-full xl:w-1/3">
                  <Image
                    src={ids.img}
                    alt={ids.title}
                    width={500}
                    height={500}
                    className="w-full h-auto"
                  />
                  <h2
                    className={`${poppins.className} mt-4 text-lg xl:text-[22px] font-bold`}
                  >
                    {ids?.imgName}
                  </h2>
                  <p
                    className={`${antiquaFont.className} text-[#252525] text-lg xl:text-xl `}
                  >
                    {ids.imgAlt}
                  </p>
                </div>
              </div>

              <hr className="my-6 lg:my-10 text-gray-300" />
            </div>
          ))}
        </section>
      </Container>
    </div>
  );
};

export default Page;
