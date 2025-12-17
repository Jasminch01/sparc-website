"use client";
import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";
import hero from "@/public/reports/reports-hero.png";
import {
  fetchReportDataPaginated,
  fetchReportYears,
  type ReportData,
  type PaginatedReportResult,
} from "@/sanity/queries/reportQueries";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaAnglesDown } from "react-icons/fa6";

const Page = () => {
  const [activeCategory, setActiveCategory] = useState("reports");
  const [selectedYearRange, setSelectedYearRange] = useState<string>("");
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [reportsData, setReportsData] = useState<ReportData[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 3,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const years = await fetchReportYears();
        console.log(years);
        setAvailableYears(years);
      } catch (error) {
        console.error("Error fetching years:", error);
      }
    };
    fetchYears();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        let startDate, endDate;
        if (selectedYearRange) {
          const [startYear, endYear] = selectedYearRange.split("-");
          startDate = `${startYear}-01-01`;
          endDate = `${endYear}-12-31`;
        }

        const result: PaginatedReportResult = await fetchReportDataPaginated(
          activeCategory,
          startDate,
          endDate,
          pagination.page,
          pagination.pageSize
        );

        setReportsData(result.data);
        setPagination({
          page: result.page,
          pageSize: result.pageSize,
          total: result.total,
          totalPages: result.totalPages,
        });
      } catch (error) {
        console.error("Error fetching data from Sanity:", error);
        setError("Failed to load reports. Please try again later.");
        setReportsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeCategory, pagination.page, pagination.pageSize, selectedYearRange]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
    const element = document.getElementById("reports");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToReports = () => {
    const element = document.getElementById("reports");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="mt-10 sm:mt-12 md:mt-15">
      <Container>
        {/* Top Section */}
        <section className="flex flex-col lg:flex-row justify-between gap-6 sm:gap-8 lg:gap-20">
          <div className="w-full lg:w-1/2">
            <h2
              className={`text-3xl sm:text-4xl text-center lg:text-start md:text-4xl lg:text-[51px] max-w-2xl font-extrabold leading-tight ${poppins.className}`}
            >
              KNOWLEDGE THAT <span className="text-[#FF951B]">INSPIRE </span>
              CHANGE
            </h2>
          </div>
          <div className="w-full lg:w-1/2">
            <p
              className={`lg:ml-30 text-justify lg:text-xl text-[#4E4E4E] text-lg ${antiquaFont.className}`}
            >
              Every project we run begins with one goal — to uplift Indigenous
              women and their communities through action, awareness, and
              empowerment.
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
          className="w-full h-[300px] sm:h-[500px] md:h-[600px] lg:h-full object-cover"
          priority
        />
        <div className="absolute top-2/3 sm:top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-full px-4">
          <h2
            className={`text-2xl lg:text-5xl font-bold mb-3 sm:mb-4 ${poppins.className}`}
          >
            REPORTS AND PUBLICATIONS
          </h2>
          <p
            className={`lg:mb-4 text-lg lg:text-xl max-w-2xl mx-auto px-2 ${antiquaFont.className}`}
          >
            Our reports and publications highlight the voices, experiences, and
            resilience of Indigenous women across communities.
          </p>
          <div
            onClick={handleScrollToReports}
            className="flex flex-col items-center justify-center lg:mt-30 cursor-pointer"
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

      {/* Breadcrumb & Filter Section */}
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 my-6 lg:my-20">
          {/* Breadcrumb */}
          <section
            className={`flex gap-3 sm:gap-5 py-5 lg:py-0 text-xs sm:text-base font-semibold ${poppins.className}`}
          >
            <Link
              href="/"
              className="hover:text-[#FF951B] transition-colors uppercase font-semibold"
            >
              Home
            </Link>
            <span>||</span>
            <p className="text-[#818181] uppercase">Reports and Publications</p>
          </section>

          {/* Sorting buttons */}
          <section className="flex flex-col md:flex-row gap-3 md:gap-5 items-stretch md:items-center w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              <select
                onChange={(e) => handleCategoryChange(e.target.value)}
                value={activeCategory}
                className={`border border-[#B7B7B7] rounded-sm py-2 pl-3 md:pl-4 pr-8 md:pr-10 text-sm md:text-base w-full md:w-auto focus:outline-none cursor-pointer appearance-none ${poppins.className}`}
              >
                <option value="reports">ANNUAL REPORTS</option>
                <option value="publications">PUBLICATIONS</option>
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
            <div className="relative w-full md:w-auto">
              <select
                value={selectedYearRange}
                onChange={(e) => setSelectedYearRange(e.target.value)}
                className={`${poppins.className} border border-gray-300 rounded-sm pl-3 md:pl-4 pr-8 md:pr-10 py-2 text-sm lg:text-base focus:outline-none w-full md:w-auto cursor-pointer appearance-none`}
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
          </section>
        </div>
      </Container>

      {/* Reports section */}
      <section
        id="reports"
        className="w-full max-w-7xl mx-auto px-5 lg:px-0 space-y-8 lg:space-y-10 mt-10 lg:mt-15 md:mt-20 mb-12 lg:mb-16"
      >
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF951B]"></div>
              <p className={`text-xl ${poppins.className}`}>
                Loading reports...
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className={`text-xl text-red-600 ${poppins.className}`}>
              {error}
            </p>
          </div>
        ) : reportsData.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <span
              className={`text-center block text-lg sm:text-xl ${poppins.className}`}
            >
              No Data Found!
            </span>
          </div>
        ) : (
          <>
            {reportsData.map((rep, index) => (
              <div
                key={`${rep._id}-${index}`}
                className="flex flex-col gap-4 lg:gap-5 pb-5 lg:pb-16 border-b border-gray-300"
              >
                {rep.category === "publications" ? (
                  <div className="space-y-4 lg:space-y-5">
                    <h2
                      className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-3 lg:mb-4 ${poppins.className}`}
                    >
                      {rep.title}
                    </h2>
                    <p className={`uppercase text-sm ${poppins.className}`}>
                      <span className="text-[#6B6B6B]">Written on</span>{" "}
                      {new Date(rep.writtenOn).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-4 lg:mt-5">
                      <div className="w-full lg:w-1/2">
                        {rep.img && (
                          <Image
                            src={rep.img}
                            alt={rep.title}
                            height={500}
                            width={500}
                            className="w-full md:w-[550px] h-auto md:h-[500px] rounded-lg object-cover"
                          />
                        )}
                      </div>
                      <div
                        className={`w-full md:w-1/2 space-y-4 md:space-y-5 text-base md:text-lg lg:text-base ${antiquaFont.className}`}
                      >
                        {rep.publisher && (
                          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                            <p className="font-bold text-lg md:text-xl">
                              Publisher:
                            </p>
                            <p className="text-base md:text-xl">
                              {rep.publisher}
                            </p>
                          </div>
                        )}
                        {rep.author && (
                          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                            <p className="font-bold text-lg md:text-xl">
                              Author:
                            </p>
                            <p className="text-base md:text-xl">{rep.author}</p>
                          </div>
                        )}
                        {rep.publicationLanguage && (
                          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                            <p className="font-bold text-lg md:text-xl">
                              Publication Language:
                            </p>
                            <p className="text-base md:text-xl">
                              {rep.publicationLanguage}
                            </p>
                          </div>
                        )}
                        {rep.releaseYear && (
                          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                            <p className="font-bold text-lg md:text-xl">
                              Release Year:
                            </p>
                            <p className="text-base md:text-xl">
                              {rep.releaseYear}
                            </p>
                          </div>
                        )}
                        {rep.releaseMonth && (
                          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                            <p className="font-bold text-lg md:text-xl">
                              Release Month | Day:
                            </p>
                            <p className="text-base md:text-xl">
                              {rep.releaseMonth}
                            </p>
                          </div>
                        )}
                        <div className="mt-6 md:mt-10">
                          <div className="text-base text-[#4E4E4E] md:text-lg lg:text-xl text-justify leading-relaxed">
                            <PortableText value={rep.description} />
                          </div>

                          <div className={`mt-6 md:mt-10 ${poppins.className}`}>
                            <Link
                              href={`/reports-publications/${rep.title}`}
                              className="inline-block bg-[#36133B] rounded-full cursor-pointer text-white text-sm md:text-base transition-colors uppercase py-3 md:py-4 font-semibold px-6 md:px-7 hover:bg-[#4a1a50]"
                            >
                              Read More
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 md:space-y-4">
                    <h2
                      className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-3 ${poppins.className}`}
                    >
                      {rep.title}
                    </h2>
                    <p className={`text-base ${poppins.className}`}>
                      {new Date(rep.writtenOn).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <div
                      className={`mb-4 text-base md:text-lg text-[#4E4E4E] text-justify ${antiquaFont.className}`}
                    >
                      <PortableText value={rep.description} />
                    </div>
                    {rep.img && (
                      <Image
                        src={rep.img}
                        alt={rep.title}
                        height={600}
                        width={1000}
                        className="w-full h-auto rounded-lg shadow-md"
                      />
                    )}
                    {rep.imgDes && (
                      <p
                        className={`mt-5 mb-6 text-sm md:text-base text-gray-600 italic ${antiquaFont.className}`}
                      >
                        {rep.imgDes}
                      </p>
                    )}
                    <Link
                      href={`/reports-publications/${rep.title}`}
                      className={`inline-block bg-[#36133B] cursor-pointer text-white px-6 md:px-7 py-3 md:py-4 uppercase font-semibold rounded-full text-sm md:text-base transition-colors hover:bg-[#4a1a50] ${poppins.className}`}
                    >
                      Read More
                    </Link>
                  </div>
                )}
              </div>
            ))}

            {pagination.totalPages > 1 && (
              <div
                className={`flex justify-center items-center space-x-5 mt-20 ${poppins.className}`}
              >
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className={` disabled:opacity-50 font-semibold disabled:cursor-not-allowed  transition-colors `}
                >
                  Previous
                </button>

                <div className="flex space-x-3">
                  {Array.from(
                    { length: pagination.totalPages },
                    (_, i) => i + 1
                  ).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`transition-colors font-semibold ${
                        pagination.page === page
                          ? " text-black cursor-not-allowed"
                          : "text-[#818181] cursor-pointer"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  className={` disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors font-semibold`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Page;
