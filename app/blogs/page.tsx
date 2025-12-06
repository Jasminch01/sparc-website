"use client";
import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


interface Blog {
  title: string;
  description: string;
  date: string;
  writtenBy: string;
  img: string;
  category: string;
  longdes: string;
  subcategory: string;
  status: string;
}

const BlogPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSubcategory, setActiveSubcategory] = useState("latest");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<string[]>(["All"]);

  // State for dynamically setting visibleCount
  const [visibleCount, setVisibleCount] = useState(6);

  const visibleCategories = (categories || ["All"]).slice(
    startIndex,
    startIndex + visibleCount
  );

  // Helper function to determine the correct visible count
  const getVisibleCount = () => {
    // Check if window is available (client-side only)
    if (typeof window === 'undefined') return 6;
    const mobileBreakpoint = 1000;
    return window.innerWidth < mobileBreakpoint ? 3 : 6;
  };

  // Effect to set initial visibleCount and listen for window resize
  useEffect(() => {
    // Check if window is defined (client-side only)
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };

    // Set initial visible count
    setVisibleCount(getVisibleCount());

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Fetch blogs from Sanity
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const query = `*[_type == "blog"] | order(date desc) {
          title,
          description,
          date,
          writtenBy,
        "img": img.asset->url,
          category,
          longdes,
          subcategory,
          status
        }`;

        const data = await client.fetch(query);
        setBlogs(data);

        // Extract unique categories from the fetched blogs
        const uniqueCategories = Array.from(
          new Set(data.map((blog: Blog) => blog.category))
        ) as string[];
        setCategories(["All", ...uniqueCategories]);
      } catch (error) {
        console.error("Error fetching blogs from Sanity:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Helper function for prev button
  const handleBack = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => Math.max(0, prev - 1));
    }
  };

  // Helper function for next button
  const handleNext = () => {
    if (startIndex + visibleCount < categories.length) {
      setStartIndex((prev) => prev + 1);
    }
  };

  // Filter by category
  const filteredByCategory =
    activeCategory === "All"
      ? blogs
      : blogs.filter(
        (blog) => blog.category.toLowerCase() === activeCategory.toLowerCase()
      );

  // Filter by subcategory
  const filteredBySubcategory = filteredByCategory.filter(
    (b) => b.subcategory === activeSubcategory
  );

  // Filter by search query
  const filteredBlogs = searchQuery
    ? filteredBySubcategory.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.writtenBy.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : filteredBySubcategory;

  return (
    <div>
      <Container>
        <section className="flex flex-col lg:flex-row justify-between items-center mt-5 mb-5 lg:mt-10 gap-10">
          <h2
            className={`${poppins.className} font-extrabold text-3xl md:text-4xl lg:text-[51px]`}
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

        <hr className="mb-10 text-gray-300" />

        {/* Category section */}
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <p className={`text-xl ${poppins.className}`}>Loading categories...</p>
          </div>
        ) : categories && categories.length > 0 ? (
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
                    className={`lg:px-8 px-3 py-2 rounded-full cursor-pointer transition ${poppins.className
                      } ${activeIndex === realIndex
                        ? "border-gray-700 border bg-gray-200"
                        : "border-gray-200 bg-gray-100"
                      }`}
                  >
                    {category}
                  </div>
                );
              })}
            </div>

            {/* Prev Button */}
            <button
              onClick={handleBack}
              disabled={startIndex === 0}
              className={`absolute left-0 transition ${startIndex === 0
                ? "cursor-not-allowed opacity-50"
                : "block cursor-pointer"
                }`}
            >
              <IoIosArrowBack size={20} />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={
                startIndex + visibleCategories.length >= categories.length
              }
              className={`absolute right-0 ${startIndex + visibleCategories.length >= categories.length
                ? "cursor-not-allowed opacity-50"
                : "block cursor-pointer"
                }`}
            >
              <IoIosArrowForward size={20} />
            </button>
          </section>
        ) : null}

        {/* Active category button */}
        <p
          className={`text-center text-xl lg:text-3xl text-[#303030] font-bold ${poppins.className}`}
        >
          {activeCategory}
        </p>

        {/* Breadcrumb Section */}
        <div className="flex justify-between items-center my-5 lg:my-10 text-xs lg:text-base">
          <section className={`flex gap-5 font-semibold ${poppins.className}`}>
            <Link href="/">HOME</Link> <span>||</span>
            <p className="text-[#818181] uppercase">blog</p>
          </section>

          {/* Sorting button */}
          <section className="flex gap-5 items-center">
            <div className="relative">
              <select
                onChange={(e) => setActiveSubcategory(e.target.value)}
                value={activeSubcategory}
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

        {/* Blogs section */}
        <section className="mt-20 lg:mb-56 max-w-7xl mx-auto">
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
            filteredBlogs.map((blog, index) => (
              <Link
                href={`/blogs/${blog.title.toLowerCase()
                  .replace(/\s+/g, '-')
                  .replace(/[^\w\-]+/g, '')
                  .replace(/\-\-+/g, '-')
                  .replace(/^-+/, '')
                  .replace(/-+$/, '')}`}
                key={index}
                className="flex flex-col md:flex-row gap-5 pb-5 py-5 lg:border-b border-gray-300 hover:bg-gray-50 transition-colors rounded-lg p-4"
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
                  <div className="flex gap-3 items-center">
                    <p className={`text-gray-500 text-sm ${poppins.className}`}>
                      {new Date(blog.date).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>

                  </div>
                </div>

                <div className="md:w-[280px]">
                  {blog.img && (
                    <Image
                      src={blog.img}
                      alt={blog.title}
                      height={400}
                      width={280}
                      className="object-cover w-full h-full rounded"
                    />
                  )}
                </div>
              </Link>
            ))
          ) : (
            <div className="h-screen flex justify-center items-center">
              <p className="text-center text-gray-500">
                No blogs found {searchQuery && `for "${searchQuery}"`}.
              </p>
            </div>
          )}
        </section>
      </Container>
    </div>
  );
};

export default BlogPage;