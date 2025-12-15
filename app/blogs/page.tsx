/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";
import {
  Blog,
  fetchBlogs,
  fetchCategories,
} from "@/sanity/queries/blogQueries";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const ITEMS_PER_PAGE = 6;

const BlogPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSubcategory, setActiveSubcategory] = useState<"latest" | "old">(
    "latest"
  );
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [visibleCount, setVisibleCount] = useState(6);

  // Add ref for smooth scrolling to blog section
  const blogSectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const visibleCategories = (categories || ["All"]).slice(
    startIndex,
    startIndex + visibleCount
  );

  // Helper function to determine the correct visible count
  const getVisibleCount = () => {
    if (typeof window === "undefined") return 6;
    const mobileBreakpoint = 1000;
    return window.innerWidth < mobileBreakpoint ? 3 : 6;
  };

  // Effect to set initial visibleCount and listen for window resize
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Fetch categories
  useEffect(() => {
    const loadCategories = async () => {
      const cats = await fetchCategories();
      setCategories(["All", ...cats]);
    };

    loadCategories();
  }, []);

  // Fetch blogs with pagination and sorting
  useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true);

      // Scroll to blog section smoothly when category changes
      if (blogSectionRef.current) {
        const headerOffset = 100; // Adjust this value based on your header height
        const elementPosition =
          blogSectionRef.current.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }

      const result = await fetchBlogs({
        category: activeCategory,
        sortBy: activeSubcategory,
        page: currentPage,
        itemsPerPage: ITEMS_PER_PAGE,
      });

      setBlogs(result.blogs);
      setTotalPages(result.totalPages);
      setLoading(false);
    };

    loadBlogs();
  }, [activeCategory, activeSubcategory, currentPage]);

  // Helper function for category prev button
  const handleBack = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => Math.max(0, prev - 1));
    }
  };

  // Helper function for category next button
  const handleNext = () => {
    if (startIndex + visibleCount < categories.length) {
      setStartIndex((prev) => prev + 1);
    }
  };

  // Helper function to extract plain text from Portable Text
  const getPlainTextFromPortableText = (portableText: any): string => {
    if (!portableText || !Array.isArray(portableText)) return "";

    return portableText
      .filter((block: any) => block._type === "block")
      .map((block: any) => {
        if (block.children) {
          return block.children.map((child: any) => child.text || "").join("");
        }
        return "";
      })
      .join(" ")
      .substring(0, 200); // Limit to 200 characters for preview
  };

  // Filter by search query (client-side)
  const filteredBlogs = searchQuery
    ? blogs.filter((blog) => {
        const plainTextDesc = getPlainTextFromPortableText(blog.description);
        return (
          blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.writtenBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
          plainTextDesc.toLowerCase().includes(searchQuery.toLowerCase())
        );
      })
    : blogs;

  // Handle category change - reset to page 1
  const handleCategoryChange = (category: string, index: number) => {
    setActiveIndex(index);
    setActiveCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  // Pagination handlers
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  // Handle subcategory change - reset to page 1
  const handleSubcategoryChange = (value: "latest" | "old") => {
    setActiveSubcategory(value);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="mt-20">
      <Container>
        <section className="flex flex-col lg:flex-row justify-between items-center mt-20 lg:mt-10 gap-10 border-b border-[#E5E5E5] pb-5 mb-10">
          <h2
            className={`${poppins.className} font-extrabold text-3xl lg:text-5xl`}
          >
            BLOG
          </h2>
          <div className="flex items-center border border-gray-300 rounded-full px-3 py-1 lg:py-2 bg-white">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-2 py-1 text-gray-700 outline-none"
            />
            <FaSearch className="text-gray-400 cursor-pointer hover:text-gray-600 transition" />
          </div>
        </section>

        {/* Category section */}
        {loading && !blogs.length ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full size-10 border-t-2 border-b-2 border-[#FF951B]"></div>
          </div>
        ) : categories && categories.length > 0 ? (
          <section className="relative flex justify-center mb-15 items-center">
            <div className="flex gap-3 overflow-hidden transition-all text-[8px] lg:text-base duration-300 items-center px-5 lg:px-10">
              {visibleCategories.map((category, index) => {
                const realIndex = startIndex + index;
                return (
                  <div
                    key={realIndex}
                    onClick={() => handleCategoryChange(category, realIndex)}
                    className={`lg:px-8 px-3 py-2 bg-[#F6F6F6] rounded-full cursor-pointer transition ${
                      poppins.className
                    } ${
                      activeIndex === realIndex
                        ? "border-black border "
                        : "border-[#F6F6F6]"
                    }`}
                  >
                    {category}
                  </div>
                );
              })}
            </div>

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
        ) : null}

        <p
          className={`text-center text-xl lg:text-3xl text-[#303030] font-bold ${poppins.className}`}
        >
          {activeCategory}
        </p>

        {/* Breadcrumb Section */}
        <div
          className="flex justify-between items-center my-5 lg:my-10 text-xs lg:text-base"
          ref={blogSectionRef}
        >
          <section className={`flex gap-5 font-semibold ${poppins.className}`}>
            <Link href="/">HOME</Link> <span>||</span>
            <p className="text-[#818181] uppercase">blog</p>
          </section>

          <section className="flex gap-5 items-center">
            <div className="relative">
              <select
                onChange={(e) =>
                  handleSubcategoryChange(e.target.value as "latest" | "old")
                }
                value={activeSubcategory}
                className={`border border-[#B7B7B7] rounded-sm py-2 pl-4 pr-10 cursor-pointer appearance-none focus:outline-none  ${poppins.className}`}
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

        {/* Blogs section with min-height to prevent jerking */}
        <section
          className="mt-20 max-w-7xl mx-auto min-h-[600px]"
          ref={contentRef}
        >
          <div
            className={`transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"}`}
          >
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="flex flex-col items-center gap-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF951B]"></div>
                  <p className={`text-xl ${poppins.className}`}>
                    Loading blogs...
                  </p>
                </div>
              </div>
            ) : filteredBlogs.length > 0 ? (
              <>
                {filteredBlogs.map((blog, index) => (
                  <Link
                    href={`/blogs/${blog.title}`}
                    key={index}
                    className="flex lg:h-80 flex-col space-x-10 md:flex-row space-y-10 lg:space-y-0 mb-10 pb-4 lg:border-b
                     border-[#E5E5E5] transition-colors animate-fadeIn"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animationFillMode: "backwards",
                    }}
                  >
                    <div className="flex-1 space-y-3">
                      <p
                        className={`text-[#505050] text-base font-medium ${poppins.className}`}
                      >
                        Written by{" "}
                        <span className="text-black">{blog.writtenBy}</span>
                      </p>
                      <h2
                        className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-2  ${poppins.className}`}
                      >
                        {blog.title}
                      </h2>
                      {blog.subtitle && (
                        <p
                          className={`text-[#505050] text-lg mb-2 ${antiquaFont.className}`}
                        >
                          {blog.subtitle}
                        </p>
                      )}
                      <div className="flex gap-3 items-center">
                        <p
                          className={`text-[#6B6B6B] uppercase text-base font-medium ${poppins.className}`}
                        >
                          {new Date(blog.date).toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex-1 flex justify-end">
                      {blog.img && (
                        <Image
                          src={blog.img}
                          alt={blog.title}
                          height={400}
                          width={280}
                          className="object-cover w-full h-60 lg:h-auto rounded"
                        />
                      )}
                    </div>
                  </Link>
                ))}

                {/* Pagination Controls */}
                {!searchQuery && totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-5 my-32">
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className={` disabled:cursor-not-allowed ${
                        currentPage === 1 ? "text-[#818181]" : "text-black"
                      } ${poppins.className}`}
                    >
                      Previous
                    </button>

                    <div className="flex space-x-4">
                      {getPageNumbers().map((page, index) =>
                        page === "..." ? (
                          <span
                            key={`ellipsis-${index}`}
                            className="px-3 py-2 text-gray-500"
                          >
                            ...
                          </span>
                        ) : (
                          <button
                            key={page}
                            onClick={() => handlePageClick(page as number)}
                            className={`${
                              currentPage === page
                                ? "text-black"
                                : "text-[#818181]"
                            } ${poppins.className}`}
                          >
                            {page}
                          </button>
                        )
                      )}
                    </div>

                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className={` disabled:cursor-pointer ${
                        currentPage === totalPages
                          ? "text-[#818181]"
                          : "text-black cursor-pointer"
                      } ${poppins.className}`}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="h-screen flex justify-center items-center">
                <p className="text-center text-gray-500">
                  No blogs found {searchQuery && `for "${searchQuery}"`}.
                </p>
              </div>
            )}
          </div>
        </section>
      </Container>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default BlogPage;
