"use client";
// Import useTranslation and Trans
import { useTranslation, Trans } from "react-i18next";
import { antiquaFont, poppins } from "@/components/utils/font";
// import vector from "../../public/Volunteer/vector.png";
import hero from "../../public/Volunteer/banner.png";
import countryimage from "../../public/Volunteer/country-image.png";
import Image from "next/image";
import Container from "@/components/Container";
import icon from "../../public/Volunteer/icon.png";
import whatyouwillgainimage from "../../public/Volunteer/gain-image.png";

const Page = () => {
  const { t } = useTranslation();

  // --- Fetch Translations ---
  const heroTitleKey = 'volunteer_page.hero_section.title';
  const heroDescription = t('volunteer_page.hero_section.description');
  
  const formHeading = t('volunteer_page.form.heading');
  const namePlaceholder = t('volunteer_page.form.name_placeholder');
  const emailPlaceholder = t('volunteer_page.form.email_placeholder');
  const phonePlaceholder = t('volunteer_page.form.phone_placeholder');
  const addressPlaceholder = t('volunteer_page.form.address_placeholder');
  const messagePlaceholder = t('volunteer_page.form.message_placeholder');
  const submitButtonText = t('volunteer_page.form.submit_button');

  const whyTitle = t('volunteer_page.why_volunteer_section.title');
  const whyDescription = t('volunteer_page.why_volunteer_section.description');
  const whySubtitle = t('volunteer_page.why_volunteer_section.subtitle');
  const whyList = t('volunteer_page.why_volunteer_section.list', { returnObjects: true }) as string[];

  const gainTitle = t('volunteer_page.gain_section.title');
  const gainDescription = t('volunteer_page.gain_section.description');
  const gainSubtitle = t('volunteer_page.gain_section.subtitle');
  const gainList = t('volunteer_page.gain_section.list', { returnObjects: true }) as string[];

  const ctaButtonText = t('volunteer_page.final_call_to_action');
  // --- End Fetch Translations ---
  // Reformat list data to use icon path, matching the original structure
  const opinions = whyList.map(title => ({ title, icon }));
  const gain = gainList.map(title => ({ title, icon }));

  return (
    <div className="relative mt-8 lg:mt-15">
      {/* Top Part - Hero Section with Form */}
      <Container>
        <div className="">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 lg:pr-8 px-5 lg:px-0">
              <h2
                className={`uppercase text-center lg:text-left font-black text-3xl sm:text-4xl lg:text-[51px] text-black mb-4 sm:mb-6 max-w-xl ${poppins.className}`}
              >
                {/* Translated Hero Title with styling */}
                <Trans
                  i18nKey={heroTitleKey}
                  defaults="Apply today to become a <1>volunteer</1>"
                  components={{
                    1: <span className="text-orange-400" />,
                  }}
                />
              </h2>
              <p
                className={`text-[#4E4E4E] ${antiquaFont.className} text-lg leading-relaxed lg:text-xl`}
              >
                {/* Translated Hero Description */}
                {heroDescription}
              </p>
            </div>
            <div className=" lg:hidden w-full">
              <Image
                src={hero}
                alt="hero-img"
                height={800}
                width={1000}
                className="w-full h-[300px] md:h-[500px] lg:h-[600px] xl:h-[700px] object-cover"
              />
            </div>

            {/* Right Form - Now using translated placeholders/heading */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
              <form
                id="form"
                action=""
                className="relative lg:absolute z-30 bg-white rounded-xl px-6 lg:px-12 py-8 lg:py-10 border border-gray-200 w-full sm:max-w-md lg:w-[500px] shadow-lg"
              >
                <h2
                  className={`text-center mb-6 lg:mb-8 text-lg lg:text-xl font-bold text-gray-800 uppercase tracking-wide ${poppins.className}`}
                >
                  {/* Translated Form Heading */}
                  {formHeading}
                </h2>
                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder={namePlaceholder} // Translated
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 bg-white text-sm"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder={emailPlaceholder} // Translated
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 bg-white text-sm"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder={phonePlaceholder} // Translated
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 bg-white text-sm"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder={addressPlaceholder} // Translated
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 bg-white text-sm"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder={messagePlaceholder} // Translated
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 bg-white resize-none text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#FF951B] cursor-pointer hover:bg-orange-400 text-white font-semibold py-3 px-6 rounded-full uppercase tracking-wide text-sm transition duration-200"
                  >
                    {submitButtonText} {/* Translated */}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>

      {/* Banner Images Section (No translation needed here) */}
      <div className="relative w-full">
        <Image
          src={hero}
          alt="hero-img"
          height={800}
          width={1000}
          className="w-full hidden lg:flex h-[300px] md:h-[500px] lg:h-[600px] xl:h-[700px] object-"
        />
      </div>

      {/* Why Volunteers - Now using translated text */}
      <Container>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 py-12 lg:py-20">
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <Image
              src={countryimage}
              alt="country-image"
              width={500}
              height={400}
              className="w-full max-w-md lg:max-w-none h-auto object-contain"
            />
          </div>
          <div className="w-full lg:w-1/2 space-y-4 sm:space-y-5 lg:mt-20">
            <h2
              className={`${poppins.className} text-2xl lg:text-4xl font-extrabold`}
            >
              {whyTitle} {/* Translated */}
            </h2>
            <p
              className={`${antiquaFont.className} text-[#2B2B2B] leading-relaxed text-lg xl:text-xl`}
            >
              {whyDescription} {/* Translated */}
            </p>
            <div className="space-y-4 lg:space-y-5 pt-4">
              <h2
                className={`font-semibold ${poppins.className} text-xl lg:text-2xl`}
              >
                {whySubtitle} {/* Translated */}
              </h2>
              <ul className="space-y-3 sm:space-y-5">
                {opinions.map((op, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Image
                      src={op.icon}
                      alt={op.title}
                      height={20}
                      width={20}
                      className="mt-1 shrink-0"
                    />
                    <p
                      className={`${antiquaFont.className} text-lg lg:text-xl`}
                    >
                      {op.title}
                    </p>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>

      {/* What you will gain - Now using translated text */}
      <Container>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-12 sm:mb-16 lg:mb-20">
          <div className="w-full lg:w-1/2 space-y-4 sm:space-y-5 order-2 lg:order-1">
            <h2
              className={`${poppins.className} text-2xl lg:text-4xl font-black`}
            >
              {gainTitle} {/* Translated */}
            </h2>
            <p
              className={`${antiquaFont.className} text-[#2B2B2B] text-lg lg:text-xl leading-relaxed`}
            >
              {gainDescription} {/* Translated */}
            </p>
            <div className="space-y-4 sm:space-y-5 pt-4">
              <h2
                className={`font-semibold ${poppins.className} text-xl lg:text-2xl`}
              >
                {gainSubtitle} {/* Translated */}
              </h2>
              <ul className="space-y-3 sm:space-y-5">
                {gain.map((op, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Image
                      src={op.icon}
                      alt={op.title}
                      height={10}
                      width={20}
                      className="mt-1 shrink-0"
                    />
                    <p
                      className={`${antiquaFont.className} text-[#2B2B2B] text-lg lg:text-xl`}
                    >
                      {op.title}
                    </p>
                  </div>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end order-1 lg:order-2">
            <Image
              src={whatyouwillgainimage}
              alt="gain-image"
              width={700}
              height={400}
              className="w-full max-w-md lg:max-w-none h-auto object-contain"
            />
          </div>
        </div>
      </Container>

      {/* Final Call to Action Button - Now using translated text */}
      <div className="flex items-center justify-center mb-12 sm:mb-15 px-4">
        <button
          className={`bg-[#FF951B] px-6 py-4 lg:px-8 lg:py-5 font-semibold text-sm lg:text-lg text-white rounded-full cursor-pointer hover:bg-orange-400 transition duration-200 ${poppins.className}`}
        >
          {ctaButtonText} {/* Translated */}
        </button>
      </div>
    </div>
  );
};

export default Page;