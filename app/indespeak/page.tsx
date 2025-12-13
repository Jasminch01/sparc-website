"use client";

import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";
import hero from "@/public/indespeak/hero.png";
import { client } from "@/sanity/lib/client";
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

const TEXT_LIMIT = 1000;

const Page = () => {
  const [activeYear, setActiveYear] = useState("2016-2017");
  const [indiSpeakData, setIndeSpeakData] = useState<Indespeak[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const query = `*[_type == "indispeak"] | order(writtenOn desc) {
          title,
          des,
          "img": img.asset->url,
          writtenOn,
          imgAlt,
          imgName
        }`;

        const data = await client.fetch(query);
        setIndeSpeakData(data);
      } catch (error) {
        console.error("Sanity fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter by year
  const filteredData = indiSpeakData.filter((item) => {
    const year = new Date(item.writtenOn).getFullYear();
    const [start, end] = activeYear.split("-").map(Number);
    return year >= start && year <= end;
  });

  return (
    <div className="mt-10 md:mt-12 lg:mt-15">
      <Container>
        {/* Top Section */}
        <section className="flex flex-col lg:flex-row justify-between gap-5">
          <div className="lg:w-1/2">
            <h2
              className={`text-2xl lg:text-5xl font-black ${poppins.className}`}
            >
              STORIES OF <span className="text-[#FF951B]">RESISTANCE</span>
            </h2>
          </div>
          <div className="lg:w-1/2">
            <p
              className={`text-[#4E4E4E] text-md md:text-xl ${antiquaFont.className}`}
            >
              Stories of Resistance is a robust and meaningful collection,
              weaving threads of the personal, professional and political into a
              vibrant tapestry of becoming.
            </p>
          </div>
        </section>
      </Container>

      {/* Hero */}
      <section className="relative">
        <Image
          src={hero}
          alt="indispeak hero"
          width={1200}
          height={700}
          className="w-full h-[350px] md:h-[500px] lg:h-[600px] object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h2 className={`text-3xl lg:text-4xl font-bold ${poppins.className}`}>
            INDISPEAK
          </h2>
          <p
            className={`mt-2 text-sm lg:text-xl max-w-2xl ${antiquaFont.className}`}
          >
            Explore stories, documents, and visual archives celebrating the
            heritage, resilience, and identity of Indigenous communities
            worldwide.
          </p>
          <div
            onClick={() =>
              document
                .getElementById("indispeak")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex flex-col items-center mt-6 cursor-pointer"
          >
            <span className={`text-[#FF951B] ${poppins.className}`}>
              SCROLL DOWN
            </span>
            <FaAnglesDown className="animate-bounce" size={24} />
          </div>
        </div>
      </section>

      {/* Breadcrumb & Filter */}
      <Container>
        <div className="flex flex-col lg:flex-row justify-between items-center my-6 lg:my-20 gap-4">
          <div className={`flex gap-3 font-semibold ${poppins.className}`}>
            <Link href="/">HOME</Link>
            <span>||</span>
            <span className="text-[#818181] uppercase">Indispeak</span>
          </div>

          <select
            onChange={(e) => setActiveYear(e.target.value)}
            className={`border border-[#B7B7B7] py-2 px-4 ${poppins.className}`}
          >
            <option value="2016-2017">2016-2017</option>
            <option value="2017-2018">2017-2018</option>
            <option value="2024-2025">2024-2025</option>
          </select>
        </div>
      </Container>

      {/* Content */}
      <Container>
        {loading ? (
          <p className={`text-center text-xl ${poppins.className}`}>
            Loading stories...
          </p>
        ) : (
          <section id="indispeak" className="space-y-16">
            {filteredData.map((ids, index) => {
              const isLongText = ids.des.length > TEXT_LIMIT;
              const isExpanded = expandedIndex === index;

              return (
                <div key={index}>
                  <div className="flex flex-col xl:flex-row gap-10">
                    <div className="xl:w-2/3 space-y-4">
                      <h2
                        className={`text-2xl lg:text-[44px] font-bold uppercase ${poppins.className}`}
                      >
                        {ids.title}
                      </h2>

                      <p
                        className={`text-sm lg:text-lg uppercase text-[#6B6B6B] ${poppins.className}`}
                      >
                        Written on{" "}
                        {new Date(ids.writtenOn).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>

                      <p
                        className={`${antiquaFont.className} text-lg lg:text-xl text-justify`}
                      >
                        {isExpanded || !isLongText
                          ? ids.des
                          : ids.des.slice(0, TEXT_LIMIT) + "..."}
                      </p>

                      {isLongText && (
                        <button
                          onClick={() =>
                            setExpandedIndex(isExpanded ? null : index)
                          }
                          className={`flex items-center gap-2 ${antiquaFont.className} text-lg hover:text-[#FF951B]`}
                        >
                          {isExpanded ? "Less" : "Expand"}
                          <IoMdArrowDropdown
                            className={`transition-transform duration-300 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    <div className="xl:w-1/3">
                      {ids.img && (
                        <Image
                          src={ids.img}
                          alt={ids.title}
                          width={500}
                          height={500}
                          className="w-full h-auto"
                        />
                      )}
                      <h3
                        className={`mt-4 font-bold text-lg ${poppins.className}`}
                      >
                        {ids.imgName}
                      </h3>
                      <p className={`${antiquaFont.className} text-lg`}>
                        {ids.imgAlt}
                      </p>
                    </div>
                  </div>

                  <hr className="my-10" />
                </div>
              );
            })}
          </section>
        )}
      </Container>
    </div>
  );
};

export default Page;
