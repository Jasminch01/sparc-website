"use client";
import React from "react";
import Container from "../Container";
import Image from "next/image";
import { antiquaFont, poppins } from "../utils/font";
import Link from "next/link";
// Import useTranslation for internationalization
import { useTranslation } from "react-i18next";

const Story = () => {
  const { t } = useTranslation();

  // 1. Fetch Breadcrumb Text
  const homeLinkText = t('common.home', 'Home');
  const whoWeAreBreadcrumb = t('footer.menu_links.who_we_are', 'WHO WE ARE'); // Reusing existing key or defining a new one if necessary

  // 2. Fetch Story Section Text
  const storyTitle = t('ourstory.title', 'OUR STORY');
  const storyDescription = t('ourstory.description', 'SPaRC is an indigenous women-led...');

  // 3. Fetch What We Stand For Text
  const standForTitle = t('whatwestandforTwo.title', 'WHAT WE STAND FOR');
  const standForDescription = t('whatwestandforTwo.description', 'To ensure women and girls\' social, cultural...');

  // 4. Fetch Where We're Headed Text
  const headedTitle = t('whatweareheadedtwo.title', 'WHERE WE\'RE HEADED');
  const headedDescription = t('whatweareheadedtwo.description', 'To create a world where all living beings...');


  return (
    <div className={`my-20 ${poppins.className}`}>
      <Container>
        <div className="flex justify-between items-center my-20">
          <section
            className={`flex gap-5 text-sm uppercase font-semibold ${poppins.className}`}
          >
            {/* Breadcrumb - Using i18n data */}
            <Link href="/">{homeLinkText}</Link> <span>||</span>
            <p className="text-[#818181] ">{whoWeAreBreadcrumb}</p>
          </section>
        </div>
        <div className="flex flex-col gap-y-8 md:gap-y-10 lg:gap-y-5">
          {/* First Section: Our Story */}
          <div className="flex flex-col lg:flex-row lg:space-x-20 gap-y-6 lg:gap-y-0">
            {/* Images (Path remains hardcoded as requested) */}
            <div className="flex flex-col xl:flex-row gap-5 w-full lg:w-1/2">
              <Image
                src={"/About/our-story1.png"}
                alt="our-story-image"
                width={500}
                height={500}
                className="w-full xl:w-full h-[250px] md:h-[350px]"
              />
              <Image
                src={"/About/our-story2.png"}
                alt="our-story-image"
                width={500}
                height={500}
                className="w-full xl:w-full h-[250px] md:h-[350px]"
              />
            </div>

            {/* Text Content - Using i18n data */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <p className="text-2xl md:text-3xl font-black mb-3 md:mb-4">
                {storyTitle}
              </p>
              <p
                className={`${antiquaFont.className} leading-relaxed text-lg lg:text-xl text-[#2B2B2B] text-justify`}
              >
                {storyDescription}
              </p>
            </div>
          </div>

          {/* Second Section: What We Stand For / Where We're Headed */}
          <div className="flex flex-col lg:flex-row lg:space-x-20 gap-y-6 lg:gap-y-0">
            {/* Image (Path remains hardcoded) */}
            <div className="w-full lg:w-1/2">
              <Image
                src={"/About/our-story3.png"}
                alt="our-story-image"
                width={500}
                height={500}
                className="w-full rounded-lg h-[250px] md:h-[350px] lg:h-[380px] object-cover"
              />
            </div>

            {/* Text Content - Using i18n data */}
            <div className="w-full lg:w-1/2 space-y-5 md:space-y-6 lg:space-y-17">
              {/* WHAT WE STAND FOR */}
              <div>
                <div className="flex items-center space-x-3 md:space-x-5 mb-2 md:mb-3">
                  <Image
                    src={"/About/story-icon1.png"}
                    alt="icon"
                    width={50}
                    height={50}
                    className="object-contain h-10 md:h-12 w-10 md:w-12"
                  />
                  <p className="text-xl md:text-2xl font-black">
                    {standForTitle}
                  </p>
                </div>
                <p
                  className={`${antiquaFont.className} leading-relaxed text-lg lg:text-xl text-[#2B2B2B] text-justify`}
                >
                  {standForDescription}
                </p>
              </div>

              {/* WHERE WE'RE HEADED */}
              <div>
                <div className="flex items-center space-x-3 md:space-x-5 mb-2 md:mb-3">
                  <Image
                    src={"/About/story-icon2.png"}
                    alt="icon"
                    width={50}
                    height={50}
                    className="object-contain h-10 md:h-12 w-10 md:w-12"
                  />
                  <p className="text-xl md:text-2xl font-black">
                    {headedTitle}
                  </p>
                </div>
                <p
                  className={`${antiquaFont.className} leading-relaxed text-lg lg:text-xl text-[#2B2B2B] text-justify`}
                >
                  {headedDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Story;