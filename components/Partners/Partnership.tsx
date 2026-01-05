"use client"
import Image from "next/image";
import { antiquaFont, jost, rowanFont } from "../utils/font";
// 1. Import useTranslation
import { useTranslation } from 'react-i18next';

const Partnership = () => {
  // 2. Initialize useTranslation
  const { t } = useTranslation();

  const steps = [
    {
      key: 'step_1',
      imageSrc: "/how-to-partner/step1.png",
      altText: t('partnership_steps.step_1.heading', 'Submit a Partnership Proposal'),
    },
    {
      key: 'step_2',
      imageSrc: "/how-to-partner/step2.png",
      altText: t('partnership_steps.step_2.heading', 'Consultation & Review'),
    },
    {
      key: 'step_3',
      imageSrc: "/how-to-partner/step3.png",
      altText: t('partnership_steps.step_3.heading', 'Agreement & Implementation'),
    },
  ];

  return (
    <div className={`w-full md:py-20 px-5 xl:px-0 ${jost.className}`}>
      <div className="xl:ml-32">
        <h1 className="font-bold text-3xl lg:text-4xl mb-16 text-center lg:text-left">
          {/* Translate main title */}
          {t('partnership_steps.title', 'HOW TO BECOME A PARTNER')}
        </h1>

        <div className="space-y-10 lg:space-y-0">

          {/* Map through the steps for cleaner rendering */}
          {steps.map((step, index) => (
            <div
              key={step.key}
              className="flex flex-col lg:flex-row items-center lg:items-start xl:space-x-24"
            >
              {/* Step Number and Vertical Line (only shown on large screens) */}
              <div className="lg:flex hidden lg:flex-col items-center lg:items-center">
                <span
                  className={`text-6xl font-black text-orange-400 ${rowanFont.className}`}
                >
                  {index + 1}
                </span>
                {/* Only render the line for Step 1 and 2 */}
                {index < steps.length - 1 && (
                  <div
                    className="hidden lg:block w-0.5 h-32 xl:h-60"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(to bottom, #9ca3af 0px, #9ca3af 10px, transparent 10px, transparent 20px)",
                    }}
                  ></div>
                )}
              </div>

              {/* Step Image */}
              <div className="shrink-0">
                <div className="size-32 xl:size-44 relative">
                  <Image
                    src={step.imageSrc}
                    fill
                    alt={step.altText}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Step Content */}
              <div className="flex-1 text-center lg:text-left lg:pt-8 mt-10 lg:mt-0">
                {/* Step Heading */}
                <h2 className="font-bold text-2xl xl:text-3xl lg:mb-3">
                  {t(`partnership_steps.${step.key}.heading`)}
                </h2>
                {/* Step Description */}
                <p className={`text-gray-600 text-lg xl:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 ${antiquaFont.className}`}>
                  {t(`partnership_steps.${step.key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partnership;