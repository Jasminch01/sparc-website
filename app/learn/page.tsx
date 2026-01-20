"use client";
import Container from "@/components/Container";
import { antiquaFont, jost, notoBengali } from "@/components/utils/font";
import hero from "@/public/Learn/hero.png";
import icon from "@/public/Learn/icon.png";
import banner from "@/public/Learn/ggds 1.png";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  Course,
  getCoursesByCategory,
  getCourseCategories,
} from "@/sanity/queries/courseQueries";

const Page = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const isBn = i18n.language === "bn" || i18n.language === "BN";

  const [courses, setCourses] = useState<Course[]>([]);
  const [learnCategory, setLearnCategory] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isHoveringPopup, setIsHoveringPopup] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 4;
  const [isMobile, setIsMobile] = useState(false);
  const [totalCourses, setTotalCourses] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);

  // Helper Function
  const renderStyledTitle = (key: string) => {
    const rawTitle = t(key);
    const parts = rawTitle.split(/(<1>.*?<\/1>)/g).filter(Boolean);

    return (
      <>
        {parts.map((part, i) => {
          if (part.startsWith("<1>") && part.endsWith("</1>")) {
            const text = part.replace(/<\/?1>/g, "");
            return (
              <span key={i} className="text-[#ff951b]">
                {text}
              </span>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </>
    );
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      setIsCategoriesLoading(true);
      try {
        const categories = await getCourseCategories();
        setLearnCategory(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      if (learnCategory.length === 0) return;

      setIsLoading(true);
      try {
        const selectedCategory = learnCategory[activeCategory];
        const data = await getCoursesByCategory(
          selectedCategory,
          currentPage,
          coursesPerPage,
        );
        setCourses(data.courses);
        setTotalCourses(data.total);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [activeCategory, currentPage, learnCategory]);

  const totalPages = Math.ceil(totalCourses / coursesPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const handleCourseClick = (course: Course) => {
    if (isMobile) {
      const slug = course.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      router.push(`/learn/${slug}?id=${course._id}`);
    }
  };

  const handleEnrollClick = (formUrl: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (formUrl) {
      window.open(formUrl, "_blank");
    }
  };

  return (
    <div className="mt-10 sm:mt-12 md:mt-15 overflow-hidden">
      <Container>
        <section className="flex flex-col lg:flex-row justify-between gap-6 sm:gap-8 lg:gap-20">
          <div className="w-full lg:w-1/2">
            <h2
              className={`text-2xl text-center lg:text-start lg:text-5xl max-w-2xl font-bold leading-tight ${isBn ? notoBengali.className : jost.className}`}
            >
              {renderStyledTitle("learn_page.title")}
            </h2>
          </div>
          <div className="w-full lg:w-1/2">
            <p
              className={`lg:ml-30 text-justify text-lg text-[#6d6b6b] lg:text-xl ${isBn ? notoBengali.className : antiquaFont.className}`}
            >
              {t("learn_page.description")}
            </p>
          </div>
        </section>
      </Container>

      <section className="relative w-full ">
        <Image
          src={hero}
          alt="fellowship-hero"
          width={1000}
          height={600}
          className="w-full h-[300px] sm:h-[500px] md:h-[600px] lg:h-full object-cover"
        />
        <div className="absolute top-1/2 lg:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4 text-center text-white w-full px-4">
          <h2
            className={`text-xl lg:text-4xl font-bold mb-3 lg:mb-4 ${isBn ? notoBengali.className : jost.className}`}
          >
            {t("learn_page.hero.title")}
          </h2>
          <p
            className={`mb-3 text-lg lg:text-xl md:text-2xl max-w-2xl mx-auto px-2 ${isBn ? notoBengali.className : antiquaFont.className}`}
          >
            {t("learn_page.hero.description")}
          </p>
        </div>
      </section>

      <Container>
        <section
          className={`flex gap-5 my-10 lg:my-20 font-semibold text-xs md:text-base ${isBn ? notoBengali.className : jost.className}`}
        >
          <Link href="/">{t("learn_page.breadcrumb.title")}</Link>
          <span>||</span>
          <p className="text-[#818181] uppercase ">
            {t("learn_page.hero.title")}
          </p>
        </section>
      </Container>

      <Container>
        <section>
          <div className="">
            <h2
              className={`text-2xl lg:text-4xl font-bold mb-4 ${isBn ? notoBengali.className : jost.className}`}
            >
              {t("learn_page.cta.title")}
            </h2>
            <p
              className={`mb-4 text-lg text-gray-500 ${isBn ? notoBengali.className : antiquaFont.className}`}
            >
              {t("learn_page.cta.description")}
            </p>
          </div>

          {isCategoriesLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-4 my-5 lg:my-10 border-b-2 border-gray-300">
              {[...Array(4)].map((_, index) => (
                <div key={index}>
                  <div className="py-5 bg-gray-200 animate-pulse h-12 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 my-5 lg:my-10 border-b-2 border-gray-300">
              {learnCategory.map((cat, index) => (
                <div key={index}>
                  <button
                    onClick={() => setActiveCategory(index)}
                    className={`cursor-pointer py-5 text-sm lg:text-xl font-semibold transition-all duration-300 ${isBn ? notoBengali.className : jost.className} ${activeCategory === index ? "border-b-2 border-[#FF951B] text-[#FF951B]" : "hover:text-[#FF951B]"}`}
                  >
                    {t(
                      `categories.${cat.replace(/\s/g, "_").toLowerCase()}`,
                      cat,
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}

          {totalCourses > coursesPerPage && (
            <div className="flex justify-end items-center gap-4 mb-10">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${isBn ? notoBengali.className : jost.className} ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-[#5B1E63] text-white hover:bg-[#7a2887]"
                }`}
              >
                <IoArrowBack />
                {t("common.previous", "Previous")}
              </button>

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${isBn ? notoBengali.className : jost.className} ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-[#5B1E63] text-white hover:bg-[#7a2887]"
                }`}
              >
                {t("common.next", "Next")}
                <IoArrowForward />
              </button>
            </div>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-4 mb-10 gap-5 min-h-[400px]">
              {[...Array(coursesPerPage)].map((_, index) => (
                <div
                  key={index}
                  className="border p-4 rounded-lg animate-pulse"
                >
                  <div className="bg-gray-200 h-[187px] rounded"></div>
                  <div className="mt-5 space-y-3">
                    <div className="bg-gray-200 h-6 rounded"></div>
                    <div className="bg-gray-200 h-4 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : courses.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] mb-10 border-b border-[#D9D9D9]">
              <div className="text-center">
                <h3
                  className={`text-2xl font-bold text-gray-400 mb-2 ${isBn ? notoBengali.className : jost.className}`}
                >
                  No Courses Found
                </h3>
                <p
                  className={`text-gray-500 ${isBn ? notoBengali.className : antiquaFont.className}`}
                >
                  There are currently no courses available in this category.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 mb-20 gap-5 min-h-[400px] border-b border-[#D9D9D9] pb-20">
              {courses.map((course, index) => {
                const isLastInRow = (index + 1) % 4 === 0;
                const isHovered = hoveredIndex === index;
                return (
                  <div key={course._id} className="relative">
                    <div
                      className={`border p-4 cursor-pointer rounded-lg transition-all duration-300 ${
                        isHovered
                          ? "border-[#FF951B] shadow-lg scale-105 bg-orange-50/30"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                      onClick={() => handleCourseClick(course)}
                      onMouseEnter={() => !isMobile && setHoveredIndex(index)}
                      onMouseLeave={() => {
                        if (!isMobile) {
                          hoverTimeoutRef.current = setTimeout(() => {
                            if (!isHoveringPopup) setHoveredIndex(null);
                          }, 200);
                        }
                      }}
                    >
                      <Image
                        src={course.img}
                        alt={course.imgAlt || course.title}
                        height={400}
                        width={400}
                        className="h-[187px] object-cover rounded"
                      />
                      <div className="mt-5 flex flex-col gap-3">
                        <h2
                          className={`${isBn ? notoBengali.className : jost.className} text-[#6d6b6b] text-lg font-semibold line-clamp-2 h-13`}
                        >
                          {course.title}
                        </h2>
                        <p
                          className={`${isBn ? notoBengali.className : antiquaFont.className} text-justify line-clamp-2`}
                        >
                          {course.subtitle}
                        </p>
                        <div className="flex items-center gap-5">
                          <p
                            className={`bg-[#FFE8CE] border-2 rounded-sm border-[#FFE8CE] font-bold text-sm text-[#F26522] px-6 py-1 ${isBn ? notoBengali.className : jost.className}`}
                          >
                            {course.rating}
                          </p>
                          <p
                            className={`border-2 border-gray-300 px-6 py-1 rounded-sm text-sm ${isBn ? notoBengali.className : jost.className}`}
                          >
                            {course.itemsSold} {t("course.sold", "Sold")}
                          </p>
                        </div>
                        <p
                          className={`${isBn ? notoBengali.className : jost.className} font-bold`}
                        >
                          {course.price} {t("common.currency", "BDT")}
                        </p>
                      </div>
                    </div>

                    {!isMobile && (
                      <div
                        className={`absolute py-10 z-50 hidden lg:block top-[-3] ${isLastInRow ? "right-full mr-4" : "left-full ml-4"} w-80 p-5 bg-white shadow-2xl rounded-lg border-2 border-[#FF951B] transition-all duration-300 ${isHovered ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}
                        onMouseEnter={() => {
                          if (hoverTimeoutRef.current)
                            clearTimeout(hoverTimeoutRef.current);
                          setIsHoveringPopup(true);
                        }}
                        onMouseLeave={() => {
                          setIsHoveringPopup(false);
                          setHoveredIndex(null);
                        }}
                      >
                        <h2
                          className={`${isBn ? notoBengali.className : jost.className} text-xl font-bold mb-2 text-[#5B1E63]`}
                        >
                          {course.title}
                        </h2>
                        <p
                          className={`${isBn ? notoBengali.className : antiquaFont.className} text-[#6d6b6b] text-justify mb-3`}
                        >
                          {course.subtitle}
                        </p>
                        <h3
                          className={`${isBn ? notoBengali.className : jost.className} font-semibold text-sm mb-1`}
                        >
                          What you&apos;ll learn
                        </h3>
                        <div className="space-y-1">
                          {course.whatYouLearn?.map((item, i) => (
                            <div
                              key={i}
                              className={`${isBn ? notoBengali.className : antiquaFont.className} text-[#6d6b6b] text-sm flex items-center gap-2`}
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
                          <button
                            onClick={(e) => handleEnrollClick(course.form, e)}
                            className={`flex justify-center mx-auto bg-[#5B1E63] rounded-full px-10 py-2 text-white mt-5 cursor-pointer hover:bg-[#7a2887] transition-all ${isBn ? notoBengali.className : jost.className}`}
                          >
                            Enroll Now
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="mb-20">
          <Image
            src={banner}
            alt="banner"
            width={1000}
            height={1000}
            className="w-full"
          />
        </section>
      </Container>
    </div>
  );
};

export default Page;
