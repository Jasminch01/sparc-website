"use client";

// Import useTranslation and Trans
import { useTranslation, Trans } from "react-i18next";
import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";
import fellowshipHero from "@/public/fellowship/fellowship-hero.png";
import aboutOne from "@/public/fellowship/about.png";
import aboutTwo from "@/public/fellowship/abouttwo.png";
import icon from "@/public/fellowship/icon.png";
import follower from "@/public/fellowship/follower.png";
import women from "@/public/fellowship/women.png";
import Image from "next/image";

// Hardcoded requirements list is now fetched dynamically
// const requirements = [...]

const Page = () => {
  const { t } = useTranslation();

  // --- Fetch Translations ---
  const topSectionTitleKey = "fellowship_page.top_section.title";
  const topSectionDescription = t("fellowship_page.top_section.description");

  const heroTitle = t("fellowship_page.hero_section.title");
  const heroDescription = t("fellowship_page.hero_section.description");
  const applyNowButton = t("fellowship_page.hero_section.button");

  const aboutTitle = t("fellowship_page.about_section.title");
  const aboutDescription = t("fellowship_page.about_section.description");

  const programTitle = t("fellowship_page.program_section.title");
  const programDescription = t("fellowship_page.program_section.description");

  const eligibilityTitle = t("fellowship_page.eligibility_section.title");
  const eligibilityDescription = t(
    "fellowship_page.eligibility_section.description"
  );
  const eligibilitySubtitle = t(
    "fellowship_page.eligibility_section.subtitle"
  );

  // Fetch the list of requirements as an array of strings/objects
  const requirementsList = t(
    "fellowship_page.eligibility_section.requirements",
    {
      returnObjects: true,
    }
  ) as string[];

  const meetFellowsTitle = t(
    "fellowship_page.meet_the_fellows_section.title"
  );

  const ctaTitle = t("fellowship_page.cta_section.title");
  const ctaDescription = t("fellowship_page.cta_section.description");
  const ctaButton = t("fellowship_page.cta_section.button");
  // --- End Fetch Translations ---

  // Reformat list data to use icon path, matching the original structure
  const requirements = requirementsList.map((title) => ({ title, icon }));

  return (
    <div className="mt-8 lg:mt-15">
      <Container>
        {/* Top Section */}
        <section className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-20 px-4 lg:px-0">
          <div className="w-full lg:w-1/2">
            <h2
              className={`text-3xl lg:text-5xl max-w-2xl font-extrabold ${poppins.className}`}
            >
              {/* Translated Title with embedded styling */}
              <Trans
                i18nKey={topSectionTitleKey}
                defaults="THE FELLOWSHIP IS OPEN TO <1>INDIGENOUS</1> YOUTH"
                components={{
                  1: <span className="text-[#FF951B]" />,
                }}
              />
            </h2>
          </div>
          <div className="w-full lg:w-1/2 justify-end">
            <p
              className={`lg:ml-30 text-justify text-lg lg:text-xl text-[#4E4E4E] ${antiquaFont.className}`}
            >
              {/* Translated Description */}
              {topSectionDescription}
            </p>
          </div>
        </section>
      </Container>

      {/* Hero Section */}
      <section className="relative w-full mt-8 lg:mt-0">
        <Image
          src={fellowshipHero}
          alt="fellowship-hero"
          width={1000}
          height={600}
          className="w-full h-[400px] lg:h-auto object-cover"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/5 text-center text-white px-4 w-full">
          <h2
            className={`text-2xl lg:text-5xl font-bold mb-3 lg:mb-4 ${poppins.className}`}
          >
            {/* Translated Hero Title */}
            {heroTitle}
          </h2>
          <p
            className={`mb-3 lg:mb-4 text-lg lg:text-xl max-w-3xl mx-auto ${antiquaFont.className}`}
          >
            {/* Translated Hero Description */}
            {heroDescription}
          </p>
          <button
            className={`bg-[#FF951B] hover:bg-orange-400 cursor-pointer  text-sm lg:text-lg text-white px-6 lg:px-7 py-3 lg:py-4 mt-4 lg:mt-10 rounded-full  font-semibold ${poppins.className}`}
          >
            {/* Translated Button Text */}
            {applyNowButton}
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="mt-12 lg:mt-25 max-w-6xl mx-auto space-y-6 lg:space-y-10 px-4 lg:px-0">
        <div className="space-y-4 lg:space-y-5">
          <h2 className={`text-2xl lg:text-4xl font-bold ${poppins.className}`}>
            {/* Translated About Title */}
            {aboutTitle}
          </h2>
          <p
            className={`${antiquaFont.className} text-[#363636] text-justify text-lg lg:text-xl leading-relaxed`}
          >
            {/* Translated About Description */}
            {aboutDescription}
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-5">
          <Image
            src={aboutOne}
            alt="aboutone"
            width={600}
            height={400}
            className="w-full lg:w-auto h-auto"
          />
          <Image
            src={aboutTwo}
            alt="abouttwo"
            width={530}
            height={400}
            className="w-full lg:w-auto h-auto"
          />
        </div>
      </section>

      {/* Program Section */}
      <section className="mt-12 lg:mt-15 max-w-6xl mx-auto space-y-4 lg:space-y-5 px-4 lg:px-0">
        <h2 className={`${poppins.className} text-2xl lg:text-4xl font-bold`}>
            {/* Translated Program Title */}
            {programTitle}
        </h2>
        <p
          className={`${antiquaFont.className} text-justify text-[#363636] leading-relaxed text-lg lg:text-xl`}
        >
            {/* Translated Program Description */}
            {programDescription}
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-4 lg:px-0 ">
        <section className=" mt-12 lg:mt-15 space-y-4 lg:space-y-5 ">
          <h2 className={`text-2xl lg:text-4xl font-bold ${poppins.className}`}>
            {/* Translated Eligibility Title */}
            {eligibilityTitle}
          </h2>
          <p
            className={`${antiquaFont.className} text-justify text-[#363636] text-lg lg:text-xl`}
          >
            {/* Translated Eligibility Description */}
            {eligibilityDescription}
          </p>
          <div>
            <h3
              className={`${antiquaFont.className} text-[#363636] text-justify text-lg lg:text-xl mb-4`}
            >
                {/* Translated Eligibility Subtitle */}
                {eligibilitySubtitle}
            </h3>
            <ul>
              {requirements.map((req, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 lg:gap-4 my-4 lg:my-5"
                >
                  <Image
                    src={req.icon}
                    alt={req.title}
                    width={20}
                    height={20}
                    className="mt-1 shrink-0"
                  />
                  <li
                    className={`${antiquaFont.className} text-justify text-lg lg:text-xl`}
                  >
                    {/* Translated Requirement */}
                    {req.title}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </section>
        <section className=" mt-12 lg:mt-15 space-y-6 lg:space-y-10">
          <h2 className={`text-2xl lg:text-4xl font-bold ${poppins.className}`}>
            {/* Translated Meet the Fellows Title */}
            {meetFellowsTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-20">
            <Image
              src={follower}
              alt="fellow image 1"
              width={333}
              height={200}
              className="w-full h-auto"
            />
            <Image
              src={follower}
              alt="fellow image 2"
              width={333}
              height={200}
              className="w-full h-auto"
            />
            <Image
              src={follower}
              alt="fellow image 3"
              width={333}
              height={200}
              className="w-full h-auto"
            />
          </div>
          <hr className="border-gray-300" />
        </section>
        <section className="mt-12 lg:mt-15 mb-20 lg:mb-30 rounded-md bg-gray-100 flex flex-col lg:flex-row items-center border border-gray-200 overflow-hidden">
          <div className="w-full lg:w-1/2">
            <Image
              src={women}
              alt="women"
              width={450}
              height={300}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2 space-y-6 lg:space-y-10 p-6 lg:p-8">
            <h2
              className={`text-[#2D2D2D] ${poppins.className} font-bold text-xl lg:text-3xl`}
            >
                {/* Translated CTA Title */}
                {ctaTitle}
            </h2>
            <p
              className={`${antiquaFont.className} text-justify text-lg lg:text-xl text-[#363636]`}
            >
                {/* Translated CTA Description */}
                {ctaDescription}
            </p>
            <div className="text-center lg:text-left">
              <button
                className={`${poppins.className} bg-[#36133B] text-white cursor-pointer px-6 py-2 lg:px-8 lg:py-3 rounded-full uppercase hover:bg-[#ff951b] transition duration-200`}
              >
                {/* Translated CTA Button */}
                {ctaButton}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;