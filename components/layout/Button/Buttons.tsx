"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import { Poppins } from "next/font/google";
import DonationModal from "@/components/Landingpage/DonationModal";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

interface LanguageOption {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
}

const languageOptions: LanguageOption[] = [
  {
    code: "EN",
    name: "English",
    flag: "https://flagcdn.com/us.svg",
    nativeName: "English",
  },
  {
    code: "BN",
    name: "Bengali",
    flag: "https://flagcdn.com/bd.svg",
    nativeName: "বাংলা",
  },
];

const Buttons = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(
    languageOptions[0]
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (
    event: React.KeyboardEvent,
    language: LanguageOption
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSelect(language);
    }
  };

  const handleSelect = (language: LanguageOption) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className={`flex items-center gap-3 relative ${poppins.className}`}>
        {/* Language Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleDropdown();
              }
            }}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-label={`Selected language: ${selectedLanguage.name}. Press to change language`}
            className="px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#FF951B] focus:ring-opacity-50"
          >
            <Image
              src={selectedLanguage.flag}
              alt=""
              width={20}
              height={20}
              className="rounded-full h-5 w-5 object-cover"
              role="presentation"
            />
            <span className="min-w-[30px]">{selectedLanguage.code}</span>
            <IoIosArrowDown
              className={`h-4 w-4 transition-transform duration-200 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
              aria-hidden="true"
            />
          </button>

          {isOpen && (
            <div
              role="listbox"
              aria-label="Select language"
              className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-20 overflow-hidden"
            >
              {languageOptions.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleSelect(language)}
                  onKeyDown={(e) => handleKeyDown(e, language)}
                  role="option"
                  aria-selected={selectedLanguage.code === language.code}
                  className={`flex items-center gap-3 w-full text-left px-4 py-3 text-sm transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 ${
                    selectedLanguage.code === language.code
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700"
                  }`}
                >
                  <Image
                    src={language.flag}
                    alt=""
                    width={18}
                    height={18}
                    className="rounded-full h-5 w-5 object-cover"
                    role="presentation"
                  />
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{language.nativeName}</span>
                    <span className="text-xs text-gray-500">
                      {language.name}
                    </span>
                  </div>
                  {selectedLanguage.code === language.code && (
                    <div className="ml-auto w-2 h-2 bg-[#FF951B] rounded-full" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Donate Button */}
        <button
          onClick={() => setIsDonationModalOpen(true)}
          className="lg:px-10 px-6 py-2 cursor-pointer lg:py-4 bg-[#FF951B] text-[14px] text-white rounded-full font-semibold transition-all duration-200 hover:bg-[#E88617] focus:outline-none focus:ring-2 focus:ring-[#FF951B] focus:ring-opacity-50"
          aria-label="Donate now"
        >
          DONATE NOW
        </button>
      </div>

      {/* Donation Modal */}
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
      />
    </>
  );
};

export default Buttons;
