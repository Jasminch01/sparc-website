"use client";

import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";
import hero from "@/public/indespeak/hero.png";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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

  const { t, i18n } = useTranslation();

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
            <FaAnglesDown className="animate-bounce" size={24} />
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
            {/* Translation for: loading_stories */}
            {t('loading_stories')}
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
                        {/* Translation for: written_on */}
                        {t('written_on')}{" "}
                        {new Date(ids.writtenOn).toLocaleDateString(i18n.language === 'bn' ? "bn-BD" : "en-US", {
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
                          {/* Hardcoded English text translated to Bengali here */}
                          {isExpanded ? "কম দেখান" : "আরো পড়ুন"}
                          <IoMdArrowDropdown
                            className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""
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