"use client"
import Image from "next/image";
import Container from "../Container";
import { antiquaFont, jost, } from "../utils/font";
import hero from '../../public/Hero/hero.png'
import { Trans, useTranslation } from "react-i18next";

const Hero = () => {
  // Use the useTranslation hook to get the translation function 't'
  const { t } = useTranslation();

  // Define keys based on the JSON structure for clarity
  const headerDescription = t('header.description');
  const heroTitle = t('hero.title');
  const heroDescription = t('hero.description');

  return (
    <div className={`my-5 relative ${jost.className}`}>
      {/* Top Section with Title and Description */}
      <Container>
        <section className="flex flex-col lg:flex-row items-center md:items-start lg:justify-between lg:space-x-25 mt-10 mb-5">
          <div className="lg:max-w-xl text-center lg:text-left flex-1">
            <h2 className={`${jost.className} font-black text-2xl lg:text-[51px]`}>
              <Trans
                i18nKey="header.title" 
                components={{
                  1: <span className="text-[#FF951B]" />,
                }}
              />
            </h2>
          </div>
          <div className="lg:flex-1 justify-end mt-5  text-center">
            <p
              className={`text-lg lg:text-xl text-wrap  lg:text-right hero-text ${antiquaFont.className}`}
            >
              {/* Using header.description from the JSON */}
              {/* Note: The <br /> tag might break the translated text flow; consider handling line breaks in CSS or removing them for dynamic text. */}
              {headerDescription}
            </p>
          </div>
        </section>
      </Container>

      {/* Hero Image section remains the same */}
      <div className="relative w-full">
        <Image
          src={hero}
          alt="hero-img"
          height={800}
          width={1000}
          className="w-full hidden lg:flex h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] object-cover"
        />

        <Image
          src={"/Hero/banner.png"}
          alt="hero-img"
          height={800}
          width={1000}
          className="w-full lg:hidden h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute lg:hidden inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent lg:from-black/50 "></div>

        {/* Text Content Over Image */}
        <div className="absolute inset-x-0 bottom-0 pb-6 sm:pb-10 md:pb-14 lg:pb-20 xl:pb-24">
          <Container>
            <div className="">
              <div className="text-white max-w-2xl">
                {/* Hero Title (Large Screens) */}
                <p className={` ${jost.className} font-extrabold hidden lg:flex text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-2 sm:mb-3 lg:mb-4`}>
                  {heroTitle}
                </p>
                {/* Hero Title (Small Screens) */}
                <p className={`${jost.className} font-extrabold lg:hidden text-2xl sm:text-2xl lg:text-4xl xl:text-4xl mb-2 lg:mb-4`}>
                  {heroTitle}
                </p>

                {/* Hero Description (Large Screens) */}
                <p
                  style={{ fontFamily: '"Book Antiqua", serif' }}
                  className="text-lg hidden lg:flex lg:text-xl mb-3 lg:mb-5"
                >
                  {/* Note: Removed the hardcoded <br /> here for better translation flexibility */}
                  {heroDescription}
                </p>
                {/* Hero Description (Small Screens) */}
                <p
                  style={{ fontFamily: '"Book Antiqua", serif' }}
                  className="text-lg lg:text-xl lg:hidden mb-3 lg:mb-5"
                >
                  {heroDescription}
                </p>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Hero;