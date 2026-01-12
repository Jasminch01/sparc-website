"use client";
import Image from "next/image";
import { antiquaFont, jost, poppins, notoBengali } from "../utils/font";
import vector from "../../public/Whatwedo/Frame1.png";
import { IoIosArrowRoundForward } from "react-icons/io";
import Container from "../Container";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  fetchHighlightedProjects,
  ProjectData,
} from "@/sanity/queries/projectQueries";
import { PortableText } from "next-sanity";

const Highlights = () => {
  const [highlightData, setHighlightData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { t, i18n } = useTranslation();
  const isBn = i18n.language === 'BN';

  const componentTitle = t("highlight.title", "HIGHLIGHTS");
  const readMoreText = t("button.read_more", "Read More");

  // Fetch highlighted project using external query
  useEffect(() => {
    const fetchHighlight = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use the external query function
        const results = await fetchHighlightedProjects();

        // Get the first project (most recent highlighted project)
        const firstHighlight =
          results && results.length > 0 ? results[0] : null;

        setHighlightData(firstHighlight);
      } catch (err) {
        console.error("Error fetching highlight:", err);
        setError("Failed to load highlight");
      } finally {
        setLoading(false);
      }
    };

    fetchHighlight();
  }, []);

  if (loading) {
    return (
      <div className="relative md:pt-10 md:pb-32 pb-20">
        <Container>
          <div className="mt-20 sm:mt-24 md:mt-30">
            <h2
              className={`${jost.className} text-center font-black xl:text-4xl md:text-3xl text-2xl xl:mb-5`}
            >
              {componentTitle}
            </h2>
            <div className="flex items-center justify-center py-20">
              <p className="text-lg">Loading highlight...</p>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative md:pt-10 md:pb-32 pb-20">
        <Container>
          <div className="mt-20 sm:mt-24 md:mt-30">
            <h2
              className={`${jost.className} text-center font-black xl:text-4xl md:text-3xl text-2xl xl:mb-5`}
            >
              {componentTitle}
            </h2>
            <div className="flex items-center justify-center py-20">
              <p className="text-lg text-red-600">{error}</p>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (!highlightData) {
    return (
      <div className="relative md:pt-10 md:pb-32 pb-20">
        <Container>
          <div className="mt-20 sm:mt-24 md:mt-30">
            <h2
              className={`${jost.className} text-center font-black xl:text-4xl md:text-3xl text-2xl xl:mb-5`}
            >
              {componentTitle}
            </h2>
            <div className="flex items-center justify-center py-20">
              <p className="text-lg">No highlight available</p>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="relative md:pt-10 md:pb-32 pb-20">
      <Container>
        <div className="mt-20 sm:mt-24 md:mt-30">
          <h2
            className={`${isBn?notoBengali.className:jost.className} text-center font-black xl:text-5xl md:text-3xl text-2xl xl:mb-5`}
          >
            {componentTitle}
          </h2>

          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-10 py-6 md:py-8 lg:py-10">
            {/* Image Section - Dynamic from Sanity */}
            <div className="w-full lg:w-1/2">
              <Image
                src={highlightData.projectImage}
                alt={highlightData.title}
                width={600}
                height={700}
                sizes=""
                className="object-cover w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[500px] rounded-lg"
              />
            </div>

            {/* Content Section - Dynamic from Sanity */}
            <div className="space-y-4 md:space-y-10 w-full lg:w-1/2 flex flex-col justify-center">
              <h2
                className={`${jost.className} font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[40px] leading-tight`}
              >
                {highlightData.title}
              </h2>
              <div
                className={`text-lg xl:text-xl leading-relaxed line-clamp-6 text-[#4D4D4D] ${antiquaFont.className}`}
              >
                <PortableText value={highlightData.description}></PortableText>
              </div>
              <Link href={`/sparc-update/${highlightData.title}`}>
                <button
                  className={`group relative bg-[#36133B] hover:bg-[#ff951b] flex items-center gap-3 cursor-pointer rounded-[33px] text-white px-6 sm:px-8 md:px-10 py-2.5 md:py-3 text-base transition-colors ${poppins.className} w-fit`}
                >
                  {readMoreText}
                  <IoIosArrowRoundForward
                    size={25}
                    className="absolute right-4 top-1/2 -translate-y-1/2 transform translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"
                  />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Vector Image */}
      <div className="absolute 2xl:-bottom-[9.2rem] xl:-bottom-[7.6rem] lg:-bottom-[6.1rem] md:-bottom-11 -bottom-6 left-0 right-0 w-full pointer-events-none overflow-hidden bottom-4xl">
        <Image
          className="w-full h-auto object-cover"
          src={vector}
          alt="vector-image"
          width={1920}
          height={700}
        />
      </div>
    </div>
  );
};

export default Highlights;
