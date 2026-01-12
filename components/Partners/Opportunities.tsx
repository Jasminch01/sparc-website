"use client"
import Container from "../Container";
import { antiquaFont, jost, notoBengali } from "../utils/font"; // 1. Added notoBengali
import { useTranslation } from 'react-i18next';

const Opportunities = () => {
  const { t, i18n } = useTranslation();
  
  // 2. Detect if current language is Bengali
  const isBn = i18n.language === "bn" || i18n.language === "BN";

  // 3. Define the structure to be iterated over using the translation keys
  const opportunityList = t('partnership_opportunities.list', { returnObjects: true });

  return (
    <div className=" bg-[#36133B] py-10 xl:py-20 my-20 px-5 md:px-0">
      <div>
        {/* 4. Conditional font for the main section title */}
        <p className={`text-3xl lg:text-4xl font-bold text-center text-white px-4 mb-5 ${isBn ? notoBengali.className : jost.className}`}>
          {t('partnership_opportunities.title', 'Partnership Opportunities')}
        </p>
        
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-5 py-10 md:py-20">
            {Array.isArray(opportunityList) && opportunityList.length > 0 ? (
              opportunityList.map((opportunity, index) => (
                <div
                  key={index}
                  className="text-white space-y-5 bg-white/10 border border-white/30 p-6 md:p-10 rounded-xl flex flex-col h-full"
                >
                  {/* 5. Conditional font for card titles */}
                  <p className={`font-bold text-xl md:text-2xl ${isBn ? notoBengali.className : jost.className}`}>
                    {opportunity.title}
                  </p>
                  
                  {/* 6. Conditional font for card descriptions (removing antiquaFont if Bengali) */}
                  <p
                    className={`text-lg lg:text-lg grow ${isBn ? notoBengali.className : antiquaFont.className}`}
                  >
                    {opportunity.description}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-white col-span-full text-center">Translation data loading...</p>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Opportunities;