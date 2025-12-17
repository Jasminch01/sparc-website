"use client";

import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";
import hero from "@/public/indespeak/hero.png";
import { getIndiSpeakStories } from "@/sanity/queries/indispeakQueries";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaAnglesDown } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdSearchOff } from "react-icons/md";

interface Indespeak {
  _id: string;
  title: string;
  des: string;
  imgUrl: string;
  writtenOn: string;
  imgAlt: string;
  autorName: string;
}

const TEXT_LIMIT = 1000;
const ITEMS_PER_PAGE = 4;

const Page = () => {
  const currentYear = new Date().getFullYear();
  const [activeYear, setActiveYear] = useState(
    `${currentYear - 1}-${currentYear}`
  );
  const [indiSpeakData, setIndeSpeakData] = useState<Indespeak[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const { t } = useTranslation();

  // --- Helper Function to handle <1> tag for Styling ---
  // This manually parses the string content from the JSON to apply the orange color.
  const renderStyledTitle = (key: string) => {
    // Fetch the raw translated string
    const rawTitle = t(key);

    // Split the string by the <1> and </1> tags
    const parts = rawTitle.split(/(<1>.*?<\/1>)/g).filter(Boolean);

    return (
      <>
        {parts.map((part, i) => {
          if (part.startsWith('<1>') && part.endsWith('</1>')) {
            // Extract text inside <1> and apply orange color class
            const text = part.replace(/<\/?1>/g, '');
            return <span key={i} className="text-[#FF951B]">{text}</span>;
          }
          // Return the rest of the text as plain string (or React fragment)
          return <span key={i}>{part}</span>;
        })}
      </>
    );
  };
  // --------------------------------------------------------

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getIndiSpeakStories(
          activeYear,
          currentPage,
          ITEMS_PER_PAGE
        );
        setIndeSpeakData(data.stories);
        setTotalItems(data.total);
      } catch (error) {
        console.error("Sanity fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeYear, currentPage]);

  // Reset to page 1 when year changes
  useEffect(() => {
    setCurrentPage(1);
    setExpandedIndex(null);
  }, [activeYear]);

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setExpandedIndex(null);
    document
      .getElementById("indispeak")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="mt-10 md:mt-12 lg:mt-15 mb-52">
      <Container>
        {/* Top Section */}
        <section className="flex flex-col lg:flex-row justify-between gap-5 mb-20">
          <div className="lg:w-1/2">
            <h2
              className={`text-2xl lg:text-5xl font-black ${poppins.className} uppercase`}
            >
              {/* Use helper function for the title with <1> tag styling */}
              {renderStyledTitle('indespeak_page.title')}
            </h2>
          </div>
          <div className="lg:w-1/2">
            <p
              className={`text-[#4E4E4E] text-md md:text-xl ${antiquaFont.className}`}
            >
              {/* Translation for: indespeak_page.description */}
              {t('indespeak_page.description')}
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
            {/* Translation for: indespeak_page.hero.title */}
            {t('indespeak_page.hero.title')}
          </h2>
          <p
            className={`mt-2 text-sm lg:text-xl max-w-2xl ${antiquaFont.className}`}
          >
            {/* Translation for: indespeak_page.hero.description */}
            {t('indespeak_page.hero.description')}
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
              {/* Translation for: indespeak_page.hero.button */}
              {t('indespeak_page.hero.button')}
            </span>
            <FaAnglesDown className="animate-bounce mt-6" size={24} />
          </div>
        </div>
      </section>

      {/* Breadcrumb & Filter */}
      <Container>
        <div className="flex flex-col lg:flex-row justify-between items-center my-6 lg:my-20 gap-4">
          <div className={`flex gap-3 font-semibold ${poppins.className}`}>
            <Link href="/">
              {/* Translation for: breadcrumb.home */}
              {t('breadcrumb.home')}
            </Link>
            <span>||</span>
            <span className="text-[#818181] uppercase">
              {/* Translation for: indespeak_page.hero.title (used as component title/breadcrumb item) */}
              {t('indespeak_page.hero.title')}
            </span>
          </div>

          <select
            value={activeYear}
            onChange={(e) => setActiveYear(e.target.value)}
            className={`border border-[#B7B7B7] py-2 px-4 rounded ${poppins.className} focus:outline-none focus:border-[#FF951B]`}
          >
            <option value="2024-2025">2024-2025</option>
            <option value="2023-2024">2023-2024</option>
            <option value="2022-2023">2022-2023</option>
            <option value="2021-2022">2021-2022</option>
            <option value="2020-2021">2020-2021</option>
            <option value="2017-2018">2017-2018</option>
            <option value="2016-2017">2016-2017</option>
          </select>
        </div>
      </Container>

      {/* Content */}
      <Container>
        {loading ? (
          <div className="flex flex-col h-screen items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#FF951B]"></div>
          </div>
        ) : indiSpeakData.length === 0 ? (
          <div className="flex h-screen flex-col items-center justify-center py-20 px-4">
            <div className="bg-gray-100 rounded-full p-8 mb-6">
              <MdSearchOff className="text-[#FF951B] text-7xl" />
            </div>
            <h3
              className={`text-2xl lg:text-3xl font-bold mb-4 ${poppins.className}`}
            >
              No Stories Found
            </h3>
            <p
              className={`text-center text-lg text-[#6B6B6B] max-w-md mb-8 ${antiquaFont.className}`}
            >
              We couldn&apos;t find any stories for the year range {activeYear}.
              Please try selecting a different year range to explore more
              stories.
            </p>
            <button
              onClick={() => setActiveYear(`${currentYear - 1}-${currentYear}`)}
              className={`px-6 py-3 bg-[#FF951B] text-white rounded hover:bg-[#e68516] transition-colors ${poppins.className} font-semibold`}
            >
              View Latest Stories
            </button>
          </div>
        ) : (
          <>
            <section id="indispeak" className="space-y-16">
              {indiSpeakData.map((ids, index) => {
                const isLongText = ids.des.length > TEXT_LIMIT;
                const isExpanded = expandedIndex === index;
                const isLastItem = index === indiSpeakData.length - 1;

                return (
                  <div key={ids._id}>
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
                            className={`flex cursor-pointer items-center gap-2 ${antiquaFont.className} text-lg hover:text-[#FF951B] transition-colors`}
                          >
                            {isExpanded ? "Show Less" : "Expand"}
                            <IoMdArrowDropdown
                              className={`transition-transform duration-300 ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        )}
                      </div>

                      <div className="xl:w-1/3">
                        {ids.imgUrl && (
                          <Image
                            src={ids.imgUrl}
                            alt={ids.title}
                            width={500}
                            height={500}
                            className="w-full h-auto rounded-lg shadow-md"
                          />
                        )}
                        <h3
                          className={`mt-4 font-bold text-lg ${poppins.className}`}
                        >
                          {ids.autorName}
                        </h3>
                        <p
                          className={`${antiquaFont.className} text-lg text-[#6B6B6B]`}
                        >
                          {ids.imgAlt}
                        </p>
                      </div>
                    </div>

                    {!isLastItem && <hr className="my-10 border-[#E0E0E0]" />}
                  </div>
                );
              })}
            </section>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-20 flex-wrap">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 border border-[#B7B7B7] rounded ${poppins.className} disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FF951B] hover:text-white cursor-pointer hover:border-[#FF951B] transition-all duration-200`}
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 border rounded ${
                        poppins.className
                      } ${
                        currentPage === page
                          ? "bg-[#FF951B] text-white border-[#FF951B]"
                          : "border-[#B7B7B7] hover:bg-[#FF951B] hover:text-white hover:border-[#FF951B]"
                      } transition-all duration-200 cursor-pointer`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 border border-[#B7B7B7] rounded ${poppins.className} disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FF951B] hover:text-white cursor-pointer hover:border-[#FF951B] transition-all duration-200`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default Page;