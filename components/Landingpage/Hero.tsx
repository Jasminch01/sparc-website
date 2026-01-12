"use client"
import Image from "next/image";
import Container from "../Container";
import { antiquaFont, notoBengali, jost } from "../utils/font";
import hero from '../../public/Hero/hero.png'
import { Trans, useTranslation } from "react-i18next";

const Hero = () => {
  const { t, i18n } = useTranslation();

  // Logical check: Is the current language Bengali?
  const isBn = i18n.language === 'BN';

  const headerDescription = t('header.description');
  const heroTitle = t('hero.title');
  const heroDescription = t('hero.description');

  return (
    /* Swap Poppins for Noto Sans globally for this section if isBn is true */
    <div className={`my-5 relative ${isBn ? notoBengali.className : jost.className}`}>

      <Container>
        <section className="flex flex-col lg:flex-row items-center md:items-start lg:justify-between lg:space-x-25 mt-10 mb-5">
          <div className="lg:max-w-xl text-center lg:text-left flex-1">
            <h2 className="font-black text-2xl lg:text-[51px]">
              <Trans
                i18nKey="header.title"
                components={{
                  1: <span className="text-[#FF951B]" />,
                }}
              />
            </h2>
          </div>
          <div className="lg:flex-1 justify-end mt-5 text-center">
            <p
              className={`text-lg lg:text-xl text-wrap lg:text-right hero-text ${isBn ? notoBengali.className : antiquaFont.className
                }`}
            >
              {headerDescription}
            </p>
          </div>
        </section>
      </Container>

      <div className="relative w-full">
        {/* Desktop Image */}
        <Image
          src={hero}
          alt="hero-img"
          height={800}
          width={1000}
          className="w-full hidden lg:flex h-[300px] md:h-[700px] object-cover"
        />

        {/* Mobile Image */}
        <Image
          src={"/Hero/banner.png"}
          alt="hero-img"
          height={800}
          width={1000}
          className="w-full lg:hidden h-[300px] md:h-[700px] object-cover"
        />

        <div className="absolute lg:hidden inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent"></div>

        <div className="absolute inset-x-0 bottom-0 pb-6 lg:pb-24">
          <Container>
            {/* Added missing closing tag for this div and cleaned up structure */}
            <div className="text-white max-w-2xl">
              {/* Hero Title (Large Screens) */}
              <p className={` ${jost.className} font-extrabold hidden lg:flex text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-2 sm:mb-3 lg:mb-4`}>
                {heroTitle}
              </p>
              {/* Hero Title (Small Screens) */}
              <p className={`${jost.className} font-extrabold lg:hidden text-2xl sm:text-2xl lg:text-4xl xl:text-4xl mb-2 lg:mb-4`}>
                {heroTitle}
              </p>

              <p
                className={`text-lg lg:text-xl mb-3 lg:mb-5 ${isBn ? notoBengali.className : antiquaFont.className
                  }`}
              >
                {heroDescription}
              </p>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Hero;