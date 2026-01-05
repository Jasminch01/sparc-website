"use client";
import { antiquaFont, jost } from "../utils/font";
import Container from "../Container";
import { useTranslation } from "react-i18next";
import { Suspense } from "react";
import dynamic from "next/dynamic";

export type LocationCategory = "alumni" | "active" | "operating" | "staff";

// Dynamically import the Map component with SSR disabled
const DynamicMap = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] md:h-[500px] lg:h-[600px] bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
});

const Wherewework = () => {
  const { t } = useTranslation();

  const componentTitle = t("wherewework.title", "WHERE WE WORK");
  const componentDescription = t(
    "wherewework.description",
    "Community development is often linked with community work or community planning, and may involve stakeholders, foundations,"
  );
  return (
    <div className="my-20">
      <Container>
        <div className="text-center mx-auto mb-20 space-y-5">
          <h2
            className={`${jost.className} font-black xl:text-5xl md:text-3xl text-2xl`}
          >
            {componentTitle}
          </h2>
          <p
            className={`text-[#6D6D6D] lg:text-xl text-lg max-w-xl mx-auto ${antiquaFont.className}`}
          >
            {componentDescription}
          </p>
        </div>

        {/* Interactive Map with Suspense boundary */}
        <Suspense
          fallback={
            <div className="w-full h-[600px] md:h-[500px] lg:h-[600px] bg-gray-100 animate-pulse rounded-lg" />
          }
        >
          <DynamicMap />
        </Suspense>
      </Container>
    </div>
  );
};

export default Wherewework;
