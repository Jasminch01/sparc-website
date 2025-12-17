"use client"
import Banner from "@/components/About/Banner";
import Story from "@/components/About/Story";
import Container from "@/components/Container";
import Team from "@/components/Landingpage/Team";
import Wherewework from "@/components/Landingpage/Wherewework";
import { antiquaFont, poppins } from "@/components/utils/font";
// Import Trans component alongside useTranslation
import { useTranslation, Trans } from "react-i18next";

const AboutPage = () => {
  const { t } = useTranslation();

  // Fetch the description directly
  const description = t('aboutpage.top_section.description', 'Every project we run begins with one goal - to uplift Indigenous woman and their communities through action, awarness, and empowerment.');
// WHERE IS HERO?
  // NOTE: The title uses Trans to handle the styled span tag from the i18n JSON

  return (
    <div className="mt-10 md:mt-12 lg:mt-15">
      <Container>
        {/* Top Section */}
        <section className="flex flex-col lg:flex-row justify-between gap-6 sm:gap-8 lg:gap-20">
          <div className="w-full lg:w-1/2">
            <h2 className={`text-2xl sm:text-4xl text-center lg:text-start md:text-4xl lg:text-[51px] lg:max-w-2xl font-extrabold leading-tight ${poppins.className}`}>
              {/* Use Trans component for the title to apply styling */}
              <Trans
                i18nKey="aboutpage.top_section.title"
                defaults="EMPOWERING <1>WOMEN , </1>BUILDING"
                components={{
                  // The <1> tag in the JSON corresponds to this styled span
                  1: <span className="text-[#FF951B]" />,
                }}
              />
            </h2>
          </div>
          <div className="w-full lg:w-1/2">
            <p className={`lg:ml-30 text-justify text-md md:text-xl ${antiquaFont.className}`}>
              {/* Use the translated description */}
              {description}
            </p>
          </div>
        </section>
      </Container>
      <Banner />
      <Story />
      <Team />
      <Wherewework />
    </div>
  );
};

export default AboutPage;