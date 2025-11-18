"use client";
import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";
import hero from "@/public/Learn/hero.png";
import icon from "@/public/Learn/icon.png";
import banner from "@/public/Learn/ggds 1.png";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
type Course = {
  title: string;
  des: string;
  category: string;
  itemsSold: number;
  img: string;
  price: string;
  updated: string;
  longDes: string;
  rating: string;
  whatYouLearn: string[];
};

const learnCategory = [
  "Culture and Advocacy",
  "Indigenous History",
  "Sovereignty and Resilience",
  "Anthropology",
];

const Page = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isHoveringPopup, setIsHoveringPopup] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const coursesPerPage = 4;

  // Fetch the courses from json
  useEffect(() => {
    fetch("/Learn/learn.json")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  // Filter data based on active category
  const filteredCourses = courses.filter(
    (course) => course.category === learnCategory[activeCategory]
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = currentPage * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Reset to first page when category changes
  useEffect(() => {
    const timeout = setTimeout(() => setCurrentPage(0), 0);
    return () => clearTimeout(timeout);
  }, [activeCategory]);

  return (
    <div className="mt-15">
      <Container>
        {/* Top Section */}
        <section className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-20">
          <div className="w-full lg:w-1/2">
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl max-w-2xl font-black ${poppins.className}`}
            >
              LEARN <span className="text-[#FF951B]">Anything</span>, EVERYTHING
            </h2>
          </div>
          <div className="w-full lg:w-1/2">
            <p
              className={`lg:ml-30 text-justify text-lg lg:text-xl ${antiquaFont.className}`}
            >
              Learning their history and present challenges is the first step
              toward justice, equality, and empowerment.
            </p>
          </div>
        </section>
      </Container>

      {/* Hero Section */}
      <section className="relative w-full">
        <Image
          src={hero}
          alt="fellowship-hero"
          width={1000}
          height={600}
          className="w-full lg:flex h-[350px] md:h-[500px] lg:h-[600px] xl:h-[700px] object-fill"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3 text-center text-white px-4">
          <h2
            className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4 ${poppins.className}`}
          >
            LEARN{" "}
          </h2>
          <p
            className={`mb-2 md:mb-4 text-base md:text-lg lg:text-xl max-w-3xl mx-auto ${antiquaFont.className}`}
          >
            Our reports and publications highlight the voices, experiences, and
            resilience of Indigenous women across communities.
          </p>
        </div>
      </section>

      {/* Breadcrumb Section */}
      <Container>
        <section
          className={`flex gap-3 md:gap-5 font-semibold py-5 md:py-10 ${poppins.className}`}
        >
          <Link href="/">Home</Link> <span>||</span>
          <p className="text-[#818181] uppercase ">Learn from us</p>
        </section>
      </Container>

      {/* Learn Section */}
      <Container>
        <section>
          <div className="">
            <h2
              className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4 ${poppins.className}`}
            >
              LEARN TO KNOW BETTER
            </h2>
            <p
              className={`mb-2 md:mb-4 text-base md:text-lg lg:text-xl ${antiquaFont.className} text-gray-500`}
            >
              Program offers valuable real-world experience for passionate
              individuals.{" "}
            </p>
          </div>

          {/* Course Category */}
          <div className="py-5 md:py-10">
            <div className="lg:border-gray-300 lg:border-b-2 w-full flex flex-wrap space-y-5 lg:space-y-0 lg:space-x-10 space-x-0">
              {learnCategory.map((cat, index) => (
                <div key={index} className="">
                  <button
                    onClick={() => setActiveCategory(index)}
                    className={`${
                      poppins.className
                    } cursor-pointer py-3 text-left md:py-5 text-xs md:text-base lg:text-xl font-semibold whitespace-nowrap ${
                      activeCategory === index
                        ? "border-b-2 border-gray-400"
                        : ""
                    }`}
                  >
                    {cat}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          {filteredCourses.length > coursesPerPage && (
            <div className="flex justify-center lg:justify-end items-center gap-2 md:gap-4 mb-5 md:mb-10">
              <button
                onClick={handlePrev}
                disabled={currentPage === 0}
                className={`flex items-center gap-1 md:gap-2 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition text-xs md:text-base ${
                  poppins.className
                } ${
                  currentPage === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-[#5B1E63] text-white hover:bg-[#7a2887]"
                }`}
              >
                <IoArrowBack />
                Previous
              </button>

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages - 1}
                className={`flex items-center gap-1 md:gap-2 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition text-xs md:text-base ${
                  poppins.className
                } ${
                  currentPage === totalPages - 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-[#5B1E63] text-white hover:bg-[#7a2887]"
                }`}
              >
                Next
                <IoArrowForward />
              </button>
            </div>
          )}
          {/* Courses Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-5 md:mb-10 gap-5">
            {currentCourses.map((course, index) => {
              const isLastInRow = (index + 1) % 4 === 0;
              return (
                <div key={index} className="relative">
                  <div
                    className="border-2 border-gray-300 p-4 rounded-lg group"
                    onMouseEnter={() => {
                      if (hoverTimeoutRef.current) {
                        clearTimeout(hoverTimeoutRef.current);
                      }
                      setHoveredIndex(index);
                    }}
                    onMouseLeave={() => {
                      hoverTimeoutRef.current = setTimeout(() => {
                        if (!isHoveringPopup) {
                          setHoveredIndex(null);
                        }
                      }, 200);
                    }}
                  >
                    <Image
                      src={course.img}
                      alt={course.title}
                      height={400}
                      width={400}
                      className="w-full"
                    />
                    <div className="mt-5 space-y-3">
                      <h2
                        className={`${poppins.className} text-base md:text-lg font-semibold`}
                      >
                        {course.title}
                      </h2>
                      <p
                        className={`${antiquaFont.className} text-justify text-xs md:text-base`}
                      >
                        {course.des}
                      </p>
                      <div className="flex items-center gap-3 md:gap-5">
                        <p
                          className={`bg-[#FFE8CE] border-2 rounded-sm border-[#FFE8CE] font-bold text-xs md:text-sm text-[#F26522] px-4 md:px-6 py-1 ${poppins.className}`}
                        >
                          {course.rating}
                        </p>
                        <p
                          className={`border-2 border-gray-300 px-4 md:px-6 py-1 rounded-sm text-xs md:text-sm ${poppins.className}`}
                        >
                          {course.itemsSold} Sold
                        </p>
                      </div>
                      <p
                        className={`${poppins.className} font-bold text-sm md:text-base`}
                      >
                        {course.price} BDT
                      </p>
                    </div>
                  </div>

                  {/* Hovered content - Only show on larger screens */}
                  {hoveredIndex === index && (
                    <div
                      className={`hidden lg:block absolute py-10 z-50 top-[-3] ${
                        isLastInRow ? "right-full mr-4" : "left-full ml-4"
                      } w-80 p-5 bg-white shadow-2xl rounded-lg border border-gray-200 transition-all duration-300`}
                      onMouseEnter={() => {
                        if (hoverTimeoutRef.current) {
                          clearTimeout(hoverTimeoutRef.current);
                        }
                        setIsHoveringPopup(true);
                      }}
                      onMouseLeave={() => {
                        setIsHoveringPopup(false);
                        setHoveredIndex(null);
                      }}
                    >
                      {/* Arrow pointing to the card */}
                      <div
                        className={`absolute top-8 ${
                          isLastInRow ? "-right-2" : "-left-2"
                        } w-0 h-0 border-t-10 border-t-transparent border-b-10 border-b-transparent ${
                          isLastInRow
                            ? "border-l-8 border-l-white"
                            : "border-r-8 border-r-white"
                        }`}
                      ></div>

                      <h2
                        className={`${poppins.className} text-xl font-bold mb-2`}
                      >
                        {course.title}
                      </h2>
                      <p
                        className={`${antiquaFont.className} text-[#2B2B2B] text-justify mb-3`}
                      >
                        {course.longDes}
                      </p>
                      <h3
                        className={`${poppins.className} font-semibold text-sm mb-1`}
                      >
                        What you&apos;ll learn
                      </h3>
                      <div className="space-y-1">
                        {course.whatYouLearn.map((item, i) => (
                          <div
                            key={i}
                            className={`${antiquaFont.className} text-sm flex items-center gap-2`}
                          >
                            <Image
                              src={icon}
                              alt="icon"
                              height={10}
                              width={15}
                            />
                            <p>{item}</p>
                          </div>
                        ))}
                        <button className="flex justify-center mx-auto bg-[#5B1E63] rounded-full px-10 py-2 text-white mt-5 cursor-pointer">
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <hr className="mb-5 md:mb-10 text-gray-300" />
        </section>

        <section className="mb-10 md:mb-20">
          <Image
            src={banner}
            alt="banner"
            width={1000}
            height={600}
            className="w-full"
          />
        </section>
      </Container>
    </div>
  );
};

export default Page;
