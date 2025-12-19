"use client";
import { antiquaFont, poppins } from "../utils/font";
import Container from "../Container";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Map from "./Map";

export type LocationCategory = "alumni" | "active" | "operating" | "staff";

const Wherewework = () => {
  const { t } = useTranslation();
  const [selectedCategories, setSelectedCategories] = useState<
    LocationCategory[]
  >(["alumni", "active", "operating", "staff"]);

  const componentTitle = t("wherewework.title", "WHERE WE WORK");
  const componentDescription = t(
    "wherewework.description",
    "Community development is often linked with community work or community planning, and may involve stakeholders, foundations,"
  );

  const toggleCategory = (category: LocationCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const categories = [
    { key: "alumni" as LocationCategory, label: "Alumni", color: "#802390" },
    {
      key: "active" as LocationCategory,
      label: "Active Members",
      color: "#FF951B",
    },
    {
      key: "operating" as LocationCategory,
      label: "Operating Areas",
      color: "#2ECC71",
    },
    { key: "staff" as LocationCategory, label: "Staff", color: "#3498DB" },
  ];

  return (
    <div className="my-20">
      <Container>
        <div className="text-center mx-auto mb-20 space-y-5">
          <h2
            className={`${poppins.className} font-black xl:text-4xl md:text-3xl text-2xl`}
          >
            {componentTitle}
          </h2>
          <p
            className={`text-[#6D6D6D] lg:text-xl text-lg max-w-xl mx-auto ${antiquaFont.className}`}
          >
            {componentDescription}
          </p>
        </div>

        {/* Interactive Map */}
        {/* <Map selectedCategories={selectedCategories} /> */}

        {/* Category Filter & Legend */}
        {/* <div className={`mt-10 space-y-3 ${antiquaFont.className}`}>
          <h3 className="text-lg font-semibold mb-4">Filter by Category:</h3>
          {categories.map((category) => (
            <div key={category.key} className="flex items-center gap-5">
              <button
                onClick={() => toggleCategory(category.key)}
                className={`w-5 h-5 border-2 transition-all ${
                  selectedCategories.includes(category.key)
                    ? "opacity-100"
                    : "opacity-30"
                }`}
                style={{
                  backgroundColor: category.color,
                  borderColor: category.color,
                }}
                aria-label={`Toggle ${category.label}`}
              />
              <label
                className={`cursor-pointer select-none transition-opacity ${
                  selectedCategories.includes(category.key)
                    ? "opacity-100"
                    : "opacity-50"
                }`}
                onClick={() => toggleCategory(category.key)}
              >
                {category.label}
              </label>
            </div>
          ))}
        </div> */}
      </Container>
    </div>
  );
};

export default Wherewework;
