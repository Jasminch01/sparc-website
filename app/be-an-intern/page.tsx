"use client";
import { useTranslation, Trans } from "react-i18next";
import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";
import hero from "@/public/be-a-intern/be-a-inter-hero.png";
import careergroup from "@/public/be-a-intern/career-group.png";
import icon from "@/public/fellowship/icon.png";
import Image from "next/image";


const Page = () => {
  const { t } = useTranslation();

  // --- Fetch Translations ---
  const heroTitleKey = "internship_page.top_section.title";
  const heroDescription = t("internship_page.top_section.description");

  const bannerTitle = t("internship_page.hero_section.title");
  const bannerDescription = t("internship_page.hero_section.description");
  const applyButtonText = t("internship_page.hero_section.button");

  const journeyTitle = t("internship_page.career_journey_section.title");
  const journeyDescription1 = t(
    "internship_page.career_journey_section.description_part1"
  );
  const journeyDescription2 = t(
    "internship_page.career_journey_section.description_part2"
  );

  const whatYouCanDoTitle = t("internship_page.eligible_section.title");
  const whatYouCanDoDescription = t(
    "internship_page.eligible_section.description_part1"
  );
  const requirementsSubtitle = t("internship_page.eligible_section.subtitle");
  
  // Fetch the list of requirements as an array of strings
  const requirementsList = t(
    "internship_page.eligible_section.requirements",
    {
      returnObjects: true,
    }
  ) as string[];

  const finalParagraph = t("internship_page.eligible_section.description_part2");
  const finalCtaButtonText = t("internship_page.final_call_to_action");
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
              className={`text-2xl text-center lg:text-left lg:text-5xl max-w-2xl font-extrabold ${poppins.className}`}
            >
              {/* Translated Hero Title with embedded styling */}
              <Trans
                i18nKey={heroTitleKey}
                defaults="BE PART OF REAL <1>CHANGE</1>"
                components={{
                  1: <span className="text-[#FF951B]" />,
                }}
              />
            </h2>
          </div>
          <div className="w-full lg:w-1/2">
            <p
              className={`lg:ml-30 text-justify text-lg lg:text-xl ${antiquaFont.className}`}
            >
              {/* Translated Hero Description */}
              {heroDescription}
            </p>
          </div>
        </section>
      </Container>

      {/* Hero Section */}
      <section className="relative w-full mt-8 lg:mt-0">
        <Image
          src={hero}
          alt="fellowship-hero"
          width={1000}
          height={600}
          className="w-full h-[400px] lg:h-auto object-cover"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/5 text-center text-white px-4 w-full">
          <h2
            className={`text-2xl lg:text-4xl font-bold mb-3 lg:mb-4 ${poppins.className}`}
          >
            {/* Translated Banner Title */}
            {bannerTitle}
          </h2>
          <p
            className={`mb-3 lg:mb-4 text-lg lg:text-xl max-w-3xl mx-auto ${antiquaFont.className}`}
          >
            {/* Translated Banner Description */}
            {bannerDescription}
          </p>
          <button
            className={`bg-[#FF951B] cursor-pointer hover:bg-orange-400 text-white px-5 lg:px-7 py-3 lg:py-5 mt-4 rounded-full text-sm lg:text-lg font-semibold transition duration-200 ${poppins.className}`}
          >
            {/* Translated Button Text */}
            {applyButtonText}
          </button>
        </div>
      </section>

      {/* Career Journey Section */}
      <section className="max-w-6xl mx-auto space-y-6 lg:space-y-10 mt-12 lg:mt-20 px-4 lg:px-0">
        <h2
          className={`text-2xl lg:text-4xl font-bold mb-3 lg:mb-4 ${poppins.className}`}
        >
          {/* Translated Journey Title */}
          {journeyTitle}
        </h2>
        <p
          className={`mb-3 lg:mb-4 text-lg lg:text-xl text-[#666666] ${antiquaFont.className}`}
        >
          {/* Translated Journey Description 1 */}
          {journeyDescription1}
        </p>
        <Image
          src={careergroup}
          alt="career-group"
          width={1400}
          height={600}
          className="w-full h-auto"
        />
        <p
          className={`mb-3 lg:mb-4 text-lg lg:text-xl text-[#666666] ${antiquaFont.className} text-justify`}
        >
          {/* Translated Journey Description 2 */}
          {journeyDescription2}
        </p>
      </section>

      {/* Eligible Section */}
      <section className="max-w-6xl mx-auto mt-12 lg:mt-15 space-y-4 lg:space-y-5 mb-20 lg:mb-30 px-4 lg:px-0">
        <h2
          className={`text-2xl lg:text-4xl font-bold ${poppins.className}`}
        >
          {/* Translated 'What You Can Do' Title */}
          {whatYouCanDoTitle}
        </h2>
        <p
          className={`${antiquaFont.className} text-justify text-[#666666] text-lg lg:text-xl`}
        >
          {/* Translated 'What You Can Do' Description */}
          {whatYouCanDoDescription}
        </p>
        <div>
          <h3
            className={`${antiquaFont.className} text-[#363636] text-justify text-lg lg:text-xl mb-4`}
          >
            {/* Translated Requirements Subtitle */}
            {requirementsSubtitle}
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
                  className={`${antiquaFont.className} text-[#666666] text-justify text-lg lg:text-xl`}
                >
                  {/* Translated Requirement Title */}
                  {req.title}
                </li>
              </div>
            ))}
          </ul>
        </div>

        <p
          className={`${antiquaFont.className} text-lg text-[#666666] lg:text-xl text-justify`}
        >
          {/* Translated Final Paragraph */}
          {finalParagraph}
        </p>
        <div className="pt-8 lg:pt-12">
          <button
            className={`flex items-center justify-center hover:bg-orange-400 text-center mx-auto bg-[#FF951B] px-5 lg:py-5 lg:px-7 py-4 text-white rounded-full text-sm lg:text-lg font-semibold cursor-pointer ${poppins.className}`}
          >
            {/* Translated Final Button Text */}
            {finalCtaButtonText}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Page;