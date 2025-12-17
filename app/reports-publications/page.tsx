"use client";
import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";
import hero from "@/public/reports/reports-hero.png";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { FaAnglesDown } from "react-icons/fa6";

interface Report {
  title: string;
  writtenOn: string;
  des: string;
  img: string;
  category: "reports" | "publications";
  date: string;
  imgDes?: string;
  publisher?: string;
  author?: string;
  publicationLanguage?: string;
  financialSupportBy?: string;
  releaseYear?: number;
  releaseMonth?: string;
}

const Page = () => {
  const [activeCategory, setActiveCategory] = useState("reports");
  const [activeYear, setActiveYear] = useState("2020-2021");
  const [reportsData, setReportsData] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const { t } = useTranslation()



  const pageDescription = t("reports_publications_page.description");
  const heroTitle = t("reports_publications_page.hero.title");
  const heroDescription = t("reports_publications_page.hero.description");
  const heroButton = t("reports_publications_page.hero.button");
  const homeButton = t("reports_publications_page.breadcrumb.title");

  // Fetch data from Sanity
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const query = `*[_type == "reports"] | order(writtenOn desc) {
          title,
          writtenOn,
          des,
          "img": img.asset->url,
          category,
          date,
          imgDes,
          publisher,
          author,
          publicationLanguage,
          financialSupportBy,
          releaseYear,
          releaseMonth,
        }`;

        const data = await client.fetch(query);
        setReportsData(data || []);
      } catch (error) {
        console.error("Error fetching data from Sanity:", error);
        setError("Failed to load reports. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to create URL slug
  const createSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  // Filter data by category and date
  const combineCategoryandDate = reportsData.filter(
    (f) => f.category === activeCategory && f.date === activeYear
  );

  // Smooth scroll handler
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
              <Trans
                i18nKey="reports_publications_page.title"
                components={{
                  1: <span className="text-[#FF951B]" />
                }}
              />
            </h2>


          </div>
          <div className="w-full lg:w-1/2">
            <p
              className={`lg:ml-30 text-justify lg:text-xl text-[#4E4E4E] text-lg ${antiquaFont.className}`}
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
            {heroTitle}
          </h2>
          <p
            className={`lg:mb-4 text-lg lg:text-xl max-w-2xl mx-auto px-2 ${antiquaFont.className}`}
          >
            {heroDescription}
          </p>
          <div
            onClick={handleScrollToReports}
            className="flex flex-col items-center justify-center lg:mt-30 cursor-pointer"
          >
            <button
              className={`text-[#FF951B] px-6 py-2 lg:px-8 lg:py-3 rounded-full text-sm lg:text-lg font-semibold ${poppins.className}`}
            >
              {heroButton}
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
              {homeButton}
            </Link>
            <span>||</span>
            <p className="text-[#818181] uppercase">{heroTitle}</p>
          </section>

          {/* Sorting buttons */}
          <section className="flex flex-col md:flex-row gap-3 md:gap-5 items-stretch md:items-center w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              <select
                onChange={(e) => setActiveCategory(e.target.value)}
                value={activeCategory}
                className={`border border-[#B7B7B7] rounded-sm py-2 pl-3 md:pl-4 pr-8 md:pr-10 text-sm md:text-base w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-[#FF951B] cursor-pointer appearance-none ${poppins.className}`}
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
                onChange={(e) => setActiveYear(e.target.value)}
                value={activeYear}
                className={`border border-[#B7B7B7] rounded-sm py-2 pl-3 lg:pl-4 pr-8 lg:pr-10 text-sm md:text-base w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-[#FF951B] cursor-pointer appearance-none ${poppins.className}`}
              >
                <option value="2020-2021">2020-2021</option>
                <option value="2024-2025">2024-2025</option>
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
        ) : combineCategoryandDate.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <span
              className={`text-center block text-lg sm:text-xl ${poppins.className}`}
            >
              No Data Found!
            </span>
          </div>
        ) : (
          combineCategoryandDate.map((rep, index) => (
            <div
              key={`${rep.title}-${index}`}
              className="flex flex-col gap-4 lg:gap-5 pb-5 lg:pb-16 border-b border-gray-300"
            >
              {rep.category === "publications" ? (
                <div className="space-y-4 lg:space-y-5">
                  <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-3 lg:mb-4 ${poppins.className}`}>
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
                        <div>
                          <p className="text-base text-[# 4E4E4E] md:text-lg lg:text-xl text-justify leading-relaxed">
                            {rep.des}
                          </p>
                        </div>
                        <div className={`mt-6 md:mt-10 ${poppins.className}`}>
                          <Link
                            href={`/reports-publications/${createSlug(rep.title)}`}
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
                  <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-3 ${poppins.className}`}>
                    {rep.title}
                  </h2>
                  <p className={`text-base ${poppins.className}`}>
                    {new Date(rep.writtenOn).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p className={`mb-4 text-base md:text-lg text-[#4E4E4E] text-justify ${antiquaFont.className}`}>
                    {rep.des}
                  </p>
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
                    <p className={`mt-5 mb-6 text-sm md:text-base text-gray-600 italic ${antiquaFont.className}`}>
                      {rep.imgDes}
                    </p>
                  )}
                  <Link
                    href={`/reports-publications/${createSlug(rep.title)}`}
                    className={`inline-block bg-[#36133B] cursor-pointer text-white px-6 md:px-7 py-3 md:py-4 uppercase font-semibold rounded-full text-sm md:text-base transition-colors hover:bg-[#4a1a50] ${poppins.className}`}
                  >
                    Read More
                  </Link>
                </div>
              )}
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Page;