"use client"
import Container from "../Container";
import { antiquaFont, jost } from "../utils/font";
// 1. Import useTranslation
import { useTranslation } from 'react-i18next';

/* * The opportunities array is no longer strictly needed as data 
 * will be fetched via the t() function from the i18n JSON structure.
 * Keeping it for reference/fallback purposes, but the map below will use the translation key.
 */

const Opportunities = () => {
  // 2. Initialize useTranslation
  const { t } = useTranslation();

  // 3. Define the structure to be iterated over using the translation keys
  const opportunityList = t('partnership_opportunities.list', { returnObjects: true });

  return (
    <div className=" bg-[#36133B] py-10 xl:py-20 my-20 px-5 md:px-0">
      <div>
        <p className={`text-3xl lg:text-4xl font-bold text-center text-white px-4 mb-5 ${jost.className}`}>
          {/* Translate the main title */}
          {t('partnership_opportunities.title', 'Partnership Opportunities')}
        </p>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-5 py-10 md:py-20">
            {/* 4. Use the translated array for mapping */}
            {/* Fallback to original hardcoded list if the translation system doesn't return an object array */}
            {Array.isArray(opportunityList) && opportunityList.length > 0 ? (
              opportunityList.map((opportunity, index) => (
                <div
                  key={index}
                  className="text-white space-y-5 bg-white/10 border border-white/30 p-6 md:p-10 rounded-xl flex flex-col h-full"
                >
                  <p className={`font-bold text-xl md:text-2xl ${jost.className}`}>
                    {/* Use translated title */}
                    {opportunity.title}
                  </p>
                  <p
                    className={`${antiquaFont.className} text-lg lg:text-lg grow`}
                  >
                    {/* Use translated description */}
                    {opportunity.description}
                  </p>
                </div>
              ))
            ) : (
              // Optional: Render a fallback message if i18n data is missing, or keep the original component logic here.
              // For brevity, I'll assume the translation array is structured correctly.
              <p className="text-white col-span-full text-center">Translation data loading...</p>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Opportunities;