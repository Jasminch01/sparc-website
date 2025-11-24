"use client";
import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface Blogs {
  title: string;
  description: string;
  date: string;
  writtenBy: string;
  img: string;
  category: string;
  longdes: string;
  subcategory: string;
}

const categories = [
  "All",
  "Jum Cultivation",
  "Jum",
  "Hill News",
  "Photography",
  "Indigenous Opinion",
  "CHT People",
  "Hill Tracts",
];

const BlogPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [blogs, setBlogs] = useState<Blogs[]>([]);
  const [activeSubcategory, setActiveSubcategory] = useState("latest");
  const [activeCategory, setActiveCategory] = useState("All");

  // 1. New state for dynamically setting visibleCount
  const [visibleCount, setVisibleCount] = useState(6);

  const visibleCategories = categories.slice(
    startIndex,
    startIndex + visibleCount
  );

  // 2. Helper function to determine the correct visible count
  const getVisibleCount = () => {
    // Define your mobile breakpoint (e.g., 768px for md in Tailwind)
    const mobileBreakpoint = 1000;
    return window.innerWidth < mobileBreakpoint ? 3 : 6;
  };

  // 3. Effect to set initial visibleCount and listen for window resize
  useEffect(() => {
    // Handler function to call on resize event
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures it runs only on mount and unmount

  // Helper function for prv button
  const handleBack = () => {
    if (startIndex > 0) {
      // Note: When you go back, ensure you don't jump past 0
      setStartIndex((prev) => Math.max(0, prev - 1));
    }
  };

  // Helper function for next button
  const handleNext = () => {
    if (startIndex + visibleCount < categories.length) {
      setStartIndex((prev) => prev + 1);
    }
  };

  // Blogs fetching
  useEffect(() => {
    fetch("/Blogs/Blogs.json")
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);

  // Make a filter button to render the filter category data
  const filteredButton =
    activeCategory === "All"
      ? blogs
      : blogs.filter(
          (blog) => blog.category.toLowerCase() === activeCategory.toLowerCase()
        );

  // Find the data based on subcategory ,,old, latest...
  const filterdSubcategory = blogs.filter(
    (b) => b.subcategory === activeSubcategory
  );

  // Combine both of them
  const combineButtonAndSubcategory = filteredButton && filterdSubcategory;

  return (
    <div>
      <Container>
        <section className="flex flex-col lg:flex-row justify-between items-center mt-5 mb-5 lg:mt-10 lg:mb-10 gap-10 ">
          <h2
            className={`${poppins.className} font-extrabold text-3xl md:text-4xl lg:text-[51px]`}
          >
            BLOG
          </h2>
          <div className="flex items-center border border-gray-300 rounded-full px-3 py-1 lg:py-2 bg-white">
            <input
              type="text"
              placeholder="Search..."
              className="px-2 py-1 text-gray-700 outline-none"
            />
            <FaSearch className="text-gray-400 cursor-pointer hover:text-gray-600 transition" />
          </div>
        </section>

        <hr className="mb-10 text-gray-300 " />

        {/* Category section */}
        <section className="relative flex justify-center mb-15 items-center">
          {/* Category container */}
          <div className="flex gap-3 overflow-hidden transition-all text-[8px] lg:text-base duration-300 items-center px-5 lg:px-10">
            {visibleCategories.map((category, index) => {
              const realIndex = startIndex + index;
              return (
                <div
                  key={realIndex}
                  onClick={() => {
                    setActiveIndex(realIndex);
                    setActiveCategory(category);
                  }}
                  className={`lg:px-8 px-3 py-2 rounded-full cursor-pointer transition ${
                    poppins.className
                  } ${
                    activeIndex === realIndex
                      ? "border-gray-700 border bg-gray-200"
                      : "border-gray-200 bg-gray-100"
                  }`}
                >
                  {category}
                </div>
              );
            })}
          </div>

          {/* Prev Button (absolute) */}
          <button
            onClick={handleBack}
            disabled={startIndex === 0}
            className={`absolute left-0 transition ${
              startIndex === 0
                ? "cursor-not-allowed opacity-50"
                : "block cursor-pointer"
            }`}
          >
            <IoIosArrowBack size={20} />
          </button>

          {/* Next Button (absolute) */}
          <button
            onClick={handleNext}
            disabled={
              startIndex + visibleCategories.length >= categories.length
            }
            className={`absolute right-0 ${
              startIndex + visibleCategories.length >= categories.length
                ? "cursor-not-allowed opacity-50"
                : "block cursor-pointer"
            }`}
          >
            <IoIosArrowForward size={20} />
          </button>
        </section>

        {/* Active categoru button */}
        <p
          className={`text-center text-xl lg:text-3xl text-[#303030] font-bold ${poppins.className}`}
        >
          {activeCategory}
        </p>

        {/* Breadcrup Section */}
        <Container>
          <div className="flex justify-between items-center my-5 lg:my-10 text-xs lg:text-base ">
            <section
              className={`flex gap-5 font-semibold  ${poppins.className}`}
            >
              <Link href="/">HOME</Link> <span>||</span>
              <p className="text-[#818181] uppercase">blog</p>
            </section>

            {/* Sorting button */}
            <section className="flex gap-5 items-center">
              <div className="relative">
                <select
                  onChange={(e) => setActiveSubcategory(e.target.value)}
                  name=""
                  id=""
                  className={`border border-[#B7B7B7] rounded-sm py-2 pl-4 pr-10 cursor-pointer appearance-none ${poppins.className}`}
                >
                  <option value="latest">Latest</option>
                  <option value="old">Old</option>
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
            </section>
          </div>
        </Container>

        {/* This is blogs section where the blogs will load based on activeCategory */}
        <section className="my-10 max-w-7xl mx-auto">
          {filteredButton.length > 0 && filterdSubcategory ? (
            combineButtonAndSubcategory.map((blog, index) => (
              <Link
                href={`/blogs/${blog.title.replace(/\s+/g, "-").toLowerCase()}`}
                key={index}
                className="flex flex-col md:flex-row gap-5 pb-5 py-5 lg:border-b border-gray-300"
              >
                <div className="flex-1 space-y-3">
                  <p className={`text-gray-500 text-sm ${poppins.className}`}>
                    Written by{" "}
                    <span className="text-black">{blog.writtenBy}</span>
                  </p>
                  <h2
                    className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-2 max-w-xl ${poppins.className}`}
                  >
                    {blog.title}
                  </h2>
                  <p
                    className={`text-gray-700 mb-2 max-w-[500px] ${antiquaFont.className}`}
                  >
                    {blog.description}
                  </p>
                  <p className={`text-gray-500 text-sm ${poppins.className}`}>
                    {blog.date}
                  </p>
                </div>

                <div className="">
                  <Image
                    src={blog.img}
                    alt={blog.title}
                    height={400}
                    width={280}
                    className="object-cover w-full h-full rounded"
                  />
                </div>
              </Link>
            ))
          ) : (
            <div className="h-screen flex justify-center items-center">
              <p className="text-center text-gray-500">
                No blogs found for this category.
              </p>
            </div>
          )}
        </section>
      </Container>
    </div>
  );
};

export default BlogPage;
