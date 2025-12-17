/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import { getAllPartners, Partner } from "@/sanity/queries/parthnerQueries";

const Page = () => {
  const { t } = useTranslation();

  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  // translations
  const heroTitle = t("partners_page.hero_section.title");
  const heroDescription = t("partners_page.hero_section.description");
  const heroButton = t("partners_page.hero_section.button");

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const partnersData = await getAllPartners();
      setPartners(partnersData);
    } catch (error) {
      console.error("Error fetching partners:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPartners();
  }, []);

  if (loading) {
    return (
      <Container>
        <div className="text-center py-20">
          <div className="flex flex-col h-screen items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF951B]"></div>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <div>
      <div className="w-full relative h-[400px] md:h-[500px] lg:h-screen overflow-hidden">
        <Image
          src={"/Partners/banner.png"}
          width={1920}
          height={1080}
          alt="about-image"
          className="w-full h-full object-cover"
          priority
        />

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 lg:px-0 xl:mt-40 mt-20">
          <h1
            className={`text-2xl lg:text-5xl font-black md:mb-4 text-center ${poppins.className}`}
          >
            {heroTitle}
          </h1>
          <p
            className={`text-lg lg:text-xl text-center max-w-2xl lg:max-w-3xl ${antiquaFont.className}`}
          >
            {heroDescription}
          </p>
          <div className="md:mt-10 mt-5">
            <button className="md:py-5 md:px-10 p-3 font-semibold cursor-pointer rounded-full bg-[#FF951B] hover:bg-orange-400 text-sm md:text-lg">
              {heroButton}
            </button>
          </div>
        </div>
      </div>

      <Container>
        <div className="py-20">
          <p className="lg:text-4xl text-2xl font-bold text-center">
            {t("partners_page.title")}
          </p>

          {partners.length === 0 ? (
            <div className="text-center py-20">
              <p className={`text-xl text-gray-600 ${antiquaFont.className}`}>
                No partners found. Check back soon!
              </p>
            </div>
          ) : (
            <div className="py-10 lg:py-20">
              <div className="grid grid-cols-1 gap-8 lg:gap-12">
                {partners.map((partner) => (
                  <div
                    key={partner._id}
                    className="p-6 md:p-12 lg:p-20 border rounded"
                  >
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 lg:gap-20">
                      {partner.logo && (
                        <Image
                          src={partner.logo}
                          alt={partner.name || "partner logo"}
                          width={300}
                          height={300}
                          className="w-full max-w-[100px] md:max-w-[250px] lg:max-w-[300px] h-auto object-contain"
                        />
                      )}
                      {partner.image && (
                        <Image
                          src={partner.image}
                          alt={partner.name || "partner image"}
                          width={500}
                          height={500}
                          className="w-full max-w-[200px] md:max-w-[250px] lg:max-w-[500px] h-auto object-contain"
                        />
                      )}
                    </div>
                    <div className="my-6 md:my-10">
                      {/* If about is Sanity block content, you'll need to render it properly */}
                      {Array.isArray(partner.about) ? (
                        <div
                          className={`${antiquaFont.className} lg:text-justify lg:text-xl text-lg`}
                        >
                          {partner.about.map((block, index) => {
                            if (block._type === "block" && block.children) {
                              return (
                                <p key={index} className="mb-4">
                                  {block.children.map(
                                    (child: any, childIndex: number) => (
                                      <span key={childIndex}>{child.text}</span>
                                    )
                                  )}
                                </p>
                              );
                            }
                            return null;
                          })}
                        </div>
                      ) : (
                        <p
                          className={`${antiquaFont.className} lg:text-justify lg:text-xl text-lg`}
                        >
                          {partner.about}
                        </p>
                      )}
                    </div>
                    <div className="text-center">
                      <a
                        href={partner.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button
                          className={`px-6 md:px-8 py-3 md:py-4 cursor-pointer hover:bg-[#ff951b] bg-[#36133B] rounded-full text-white ${poppins.className} hover:bg-[#4a1a50] transition-colors`}
                        >
                          Visit Partner Website
                        </button>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Page;
