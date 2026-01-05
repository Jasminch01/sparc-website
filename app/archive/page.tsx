"use client";

import Container from "@/components/Container";
import { antiquaFont, jost } from "@/components/utils/font";
import hero from "@/public/Archive/hero.png";
import {
  ArchiveData,
  fetchArchiveDataPaginated,
  fetchArchiveYears,
  PaginatedArchiveResult,
} from "@/sanity/queries/archiveQueries";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import { FaAnglesDown } from "react-icons/fa6";
import { IoIosArrowRoundForward } from "react-icons/io";

const categories: string[] = [
  "All Categories",
  "Historical Records",
  "Community Stories",
  "News and Update",
];

const Page = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCategory, setActiveCategory] =
    useState<string>("All Categories");
  const [data, setData] = useState<ArchiveData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { t } = useTranslation()

  const pageDescription = t("indegenous_archive_page.description");
  const heroTitle = t("indegenous_archive_page.hero.title");
  const heroDescription = t("indegenous_archive_page.hero.description");
  const heroButton = t("indegenous_archive_page.hero.button");
  const homeButton = t("indegenous_archive_page.breadcrumb.title");

  // Fetch data from Sanity
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [total, setTotal] = useState(0);
  const pageSize = 9;
  // Year filter state
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [selectedYearRange, setSelectedYearRange] = useState<string>("");

  // Fetch available years on mount
  useEffect(() => {
    const loadYears = async () => {
      try {
        const years = await fetchArchiveYears();
        setAvailableYears(years);

        // Set default to latest year if available
        if (years.length > 0) {
          const latestYear = years[0];
          setSelectedYearRange(`${latestYear}-${parseInt(latestYear) + 1}`);
        }
      } catch (err) {
        console.error("Error fetching years:", err);
      }
    };

    loadYears();
  }, []);

  // Fetch data with filters
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Parse year range
        let startDate, endDate;
        if (selectedYearRange) {
          const [startYear, endYear] = selectedYearRange.split("-");
          startDate = `${startYear}-01-01`;
          endDate = `${endYear}-12-31`;
        }

        const categoryToFetch =
          activeCategory === "All Categories" ? undefined : activeCategory;

        const result: PaginatedArchiveResult = await fetchArchiveDataPaginated(
          categoryToFetch,
          startDate,
          endDate,
          currentPage,
          pageSize
        );

        setData(result.data);
        setTotal(result.total);
        setTotalPages(result.totalPages);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load archive data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (selectedYearRange) {
      loadData();
    }
  }, [activeCategory, selectedYearRange, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, selectedYearRange]);

  // Filter data by search term (client-side)
  const filteredData = data.filter((d) => {
    if (searchTerm === "") return true;
    return (
      d.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.subtitle?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const handleCategoryChange = (index: number, category: string) => {
    setActiveIndex(index);
    setActiveCategory(category);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById("data")?.scrollIntoView({ behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="mt-10 md:mt-15">
      <Container>
        {/* Top Section */}
        <section className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-10">
          <div className="w-full lg:w-1/2">
            <h2
              className={`text-xl md:text-3xl lg:text-[45px] text-center lg:text-start max-w-2xl font-extrabold leading-tight ${jost.className}`}
            >
              <Trans
                i18nKey="indegenous_archive_page.title"
                components={{
                  1: <span className="text-[#FF951B]" />
                }}
              />
            </h2>

          </div>
          <div className="w-full lg:w-1/2">
            <p
              className={`lg:ml-30 text-justify text-lg text-[#6d6b6b] lg:text-xl ${antiquaFont.className}`}
            >
              {pageDescription}
            </p>
          </div>
        </section>
      </Container>

      {/* Hero Section */}
      <section className="relative w-full">
        <Image
          src={hero}
          alt="indospeak-hero"
          width={1000}
          height={600}
          className="w-full h-[350px] md:h-[500px] lg:h-full object-cover"
        />
        <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-full px-4">
          <h2
            className={`text-2xl lg:text-4xl font-bold mb-2 lg:mb-4 ${jost.className}`}
          >
            {heroTitle}
          </h2>
          <p
            className={`lg:mb-4 text-lg lg:text-xl max-w-2xl mx-auto px-2 ${antiquaFont.className}`}
          >
            {heroDescription}
          </p>
          <div
            onClick={() => {
              document
                .getElementById("data")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex flex-col items-center justify-center lg:mt-30 cursor-pointer"
          >
            <button
              className={`text-[#FF951B] px-6 py-2 lg:px-8 lg:py-3 rounded-full text-sm lg:text-lg font-semibold ${jost.className}`}
            >
              {heroButton}
            </button>
            <FaAnglesDown className="animate-bounce" size={24} />
          </div>
        </div>
      </section>

      {/* Breadcrumb & Search Section */}
      <Container>
        <section
          className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 ${jost.className} my-5 lg:my-20 font-semibold`}
        >
          <div className="flex gap-3 md:gap-5 text-xs md:text-base py-5 lg:py-0">
            <Link href="/" className="hover:text-[#FF951B] transition-colors">
              {homeButton}
            </Link>
            <span>||</span>
            <p className="text-[#818181] uppercase">{heroTitle}</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md flex items-center w-full md:w-auto">
            <input
              type="text"
              placeholder="Search here"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 md:px-5 py-2 outline-none w-full text-sm md:text-base"
            />
            <FaSearch className="mr-2 text-gray-400" />
          </div>
        </section>
      </Container>

      <Container>
        <section id="data" className="my-6 md:my-8 lg:my-10">
          {/* Category container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 overflow-hidden transition-all duration-300 items-center">
            {categories.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => handleCategoryChange(index, item)}
                  className={`px-4 md:px-6 lg:px-8 py-2 md:py-3 rounded-full cursor-pointer transition flex items-center justify-center gap-2 text-sm md:text-base ${
                    jost.className
                  } ${
                    activeIndex === index
                      ? "border-gray-700 border bg-gray-200"
                      : "border-gray-200 bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </section>
      </Container>

      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 py-6 md:py-8 lg:py-10">
          <h2
            className={`flex items-center gap-2 text-2xl md:text-3xl lg:text-4xl font-semibold ${jost.className}`}
          >
            {activeCategory}
          </h2>
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              <select
                value={selectedYearRange}
                onChange={(e) => setSelectedYearRange(e.target.value)}
                className={`${jost.className} border border-gray-300 rounded-sm pl-3 md:pl-4 pr-8 md:pr-10 py-2 text-sm lg:text-base focus:outline-none w-full md:w-auto cursor-pointer appearance-none`}
              >
                {availableYears.length > 0 ? (
                  availableYears.map((year) => {
                    const nextYear = parseInt(year) + 1;
                    const rangeValue = `${year}-${nextYear}`;
                    return (
                      <option key={year} value={rangeValue}>
                        {rangeValue}
                      </option>
                    );
                  })
                ) : (
                  <option value="">No years available</option>
                )}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 md:px-3 text-gray-700">
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

        <section className="pb-8 lg:pb-32">
          {loading ? (
            <div className="text-center h-screen flex justify-center items-center">
              <p
                className={`text-gray-500 text-lg md:text-xl ${jost.className}`}
              >
                Loading...
              </p>
            </div>
          ) : error ? (
            <div className="text-center h-screen flex justify-center items-center">
              <p
                className={`text-red-500 text-lg md:text-xl ${jost.className}`}
              >
                {error}
              </p>
            </div>
          ) : filteredData.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredData.map((project) => (
                  <Link href={`/archive/${project.title}`} key={project._id}>
                    <div className="relative h-full group">
                      <div className="border border-gray-300 p-3 md:p-4 rounded-lg h-full flex flex-col">
                        <div className="relative w-full h-[250px] md:h-[250px] mb-3 md:mb-4 shrink-0">
                          <Image
                            src={project.img}
                            alt={project.title}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div className="mt-4 lg:mt-5 space-y-2 lg:space-y-3 grow flex flex-col">
                          <h2
                            className={`${jost.className} text-base lg:text-lg font-semibold line-clamp-2`}
                          >
                            {project.title}
                          </h2>
                          <p
                            className={`${jost.className} text-[#6d6b6b] text-xs lg:text-sm`}
                          >
                            {formatDate(project.date)}
                          </p>
                          <p
                            className={`${antiquaFont.className} text-justify text-[#6d6b6b] text-sm md:text-base line-clamp-3 grow`}
                          >
                            {project.subtitle}
                          </p>
                          <button
                            className={`${jost.className} flex items-center gap-2 mt-3 lg:mt-5 text-[#36133B] cursor-pointer group-hover:text-[#ff951b] transition-colors text-sm md:text-base pt-auto`}
                          >
                            Read More <IoIosArrowRoundForward size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div
                  className={`flex flex-col items-center gap-4 mt-8 ${jost.className}`}
                >
                  <div className="flex justify-center items-center gap-2 flex-wrap">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-3 py-2 rounded border text-sm md:text-base ${
                        currentPage === 1
                          ? "border-gray-300 text-gray-400 cursor-not-allowed"
                          : "border-gray-400 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Previous
                    </button>

                    {getPageNumbers().map((page, index) =>
                      page === "..." ? (
                        <span key={`ellipsis-${index}`} className="px-2">
                          ...
                        </span>
                      ) : (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page as number)}
                          className={`px-4 py-2 rounded border text-sm md:text-base ${
                            currentPage === page
                              ? "bg-[#FF951B] text-white border-[#FF951B]"
                              : "border-gray-400 text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-2 rounded border text-sm md:text-base ${
                        currentPage === totalPages
                          ? "border-gray-300 text-gray-400 cursor-not-allowed"
                          : "border-gray-400 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center h-screen flex justify-center items-center">
              <p
                className={`text-gray-500 text-lg md:text-xl ${jost.className}`}
              >
                No projects found for {activeCategory} in {selectedYearRange}.
              </p>
            </div>
          )}
        </section>
      </Container>
    </div>
  );
};

export default Page;
