"use client";
import Container from "@/components/Container";
import Form from "@/components/Partners/Form";
import Opportunities from "@/components/Partners/Opportunities";
import Partners from "@/components/Partners/Partners";
import Partnership from "@/components/Partners/Partnership";
import { antiquaFont, jost, notoBengali } from "@/components/utils/font";
import Image from "next/image";
import { useTranslation } from 'react-i18next';

const Page = () => {
  // 1. Initialize translation hook
  const { t, i18n } = useTranslation();

  // 2. Check if the current language is Bengali
  const isBn = i18n.language === "bn" || i18n.language === "BN";

  return (
    // 3. Apply the font conditionally to the wrapper or specific elements
    <div className={isBn ? notoBengali.className : jost.className}>
      <div className="w-full relative h-[400px] md:h-[500px] lg:h-screen">
        <Image
          src={"/Partners/banner.png"}
          width={1920}
          height={1080}
          alt="about-image"
          className="w-full h-full object-cover"
          priority
        />

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 md:px-0 xl:mt-40 mt-20">
          <h1 className="text-2xl md:text-4xl font-black md:mb-4 text-center">
            {t('partners_page.hero_section.title', 'HOW TO PARTNER')}
          </h1>
          
          <p className={`text-base md:text-xl text-center max-w-2xl lg:max-w-3xl ${isBn ? '' : antiquaFont.className}`}>
            {t('partners_page.hero_section.description', "Our research amplifies Indigenous voices...")}
          </p>

          <div className="md:mt-10 mt-5">
            <button className="md:py-5 md:px-10 cursor-pointer hover:bg-orange-400 p-3 font-semibold rounded-full bg-[#FF951B] text-sm md:text-lg">
              {t('partners_page.hero_section.button', 'BECOME A PARTNER')}
            </button>
          </div>
        </div>
      </div>
      
      <Container>
        <Partners />
        <Partnership />
      </Container>
      <Opportunities />
      <Container>
        <Form />
      </Container>
    </div>
  );
};

export default Page;