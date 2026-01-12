"use client"
import Banner from "@/components/About/Banner";
import Story from "@/components/About/Story";
import Container from "@/components/Container";
import Team from "@/components/Landingpage/Team";
import Wherewework from "@/components/Landingpage/Wherewework";
// Added notoBengali to the imports
import { antiquaFont, jost, notoBengali } from "@/components/utils/font";
import { useTranslation, Trans } from "react-i18next";

const AboutPage = () => {
  // Destructure i18n to check the active language
  const { t, i18n } = useTranslation();
  const isBn = i18n.language === 'BN' || i18n.language === 'bn';

  const description = t('aboutpage.top_section.description', 'Every project we run begins with one goal - to uplift Indigenous woman and their communities through action, awarness, and empowerment.');

  return (
    // Apply Bengali font to the wrapper if active
    <div className={`mt-10 md:mt-12 lg:mt-15 ${isBn ? notoBengali.className : ""}`}>
      <Container>
        {/* Top Section */}
        <section className="flex flex-col lg:flex-row justify-between gap-6 sm:gap-8 lg:gap-20">
          <div className="w-full lg:w-1/2">
            <h2 className={`text-2xl sm:text-4xl text-center lg:text-start md:text-4xl lg:text-[51px] lg:max-w-2xl font-extrabold leading-tight ${isBn ? notoBengali.className : jost.className}`}>
              <Trans
                i18nKey="aboutpage.top_section.title"
                defaults="EMPOWERING <1>WOMEN , </1>BUILDING"
                components={{
                  // The <1> tag handles the highlighted color
                  1: <span className="text-[#FF951B]" />,
                }}
              />
            </h2>
          </div>
          <div className="w-full lg:w-1/2">
            <p className={`lg:ml-30 text-justify text-md md:text-xl ${isBn ? notoBengali.className : antiquaFont.className}`}>
              {description}
            </p>
          </div>
        </section>
      </Container>

      {/* Note: Ensure these sub-components also have internal logic 
          to handle i18n font switching if they contain text.
      */}
      <Banner />
      <Story />
      <Team />
      <Wherewework />
    </div>
  );
};

export default AboutPage;