/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import Image from "next/image";
import logo from "../../public/Header/Sparce-logo.png";
import Navbar from "./Nav/Navbar";
import { IoClose, IoMenu} from "react-icons/io5";
import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { poppins } from "../utils/font";
import Container from "../Container";
import DonationModal from "@/components/Landingpage/DonationModal";
import { IoIosArrowDown } from "react-icons/io";

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

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(
    languageOptions[0]
  );
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close menu when route changes
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      setMenuOpen(false);
      prevPathnameRef.current = pathname;
    }
  }, [pathname]);

  // Handle body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  // Handle header shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsLanguageOpen(false);
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
    setIsLanguageOpen(false);
  };

  const toggleDropdown = () => {
    setIsLanguageOpen((prev) => !prev);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <Container>
          <div className={`${poppins.className}`}>
            <section className="flex items-center justify-between h-16 sm:h-20 lg:h-24 gap-4">
              {/* Logo - Responsive sizing */}
              <div
                className="shrink-0 cursor-pointer"
                onClick={() => {
                  router.push("/");
                  setMenuOpen(false);
                }}
              >
                <Image
                  src={logo}
                  alt="sparc-logo"
                  width={149}
                  height={84}
                  className="w-20 h-11 lg:w-32 lg:h-18 xl:w-[140px] xl:h-20"
                  priority
                />
              </div>

              {/* Desktop Navigation */}
              <nav
                className="hidden xl:flex flex-1 justify-center"
                aria-label="Main navigation"
              >
                <Navbar />
              </nav>

              {/* Desktop Buttons */}
              <div className="shrink-0 hidden xl:flex items-center gap-3">
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
                    aria-expanded={isLanguageOpen}
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
                        isLanguageOpen ? "rotate-180" : "rotate-0"
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {isLanguageOpen && (
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
                  className="px-10 py-4 bg-[#FF951B] text-[14px] text-white rounded-full transition-all duration-200 hover:bg-[#E88617] focus:outline-none focus:ring-2 focus:ring-[#FF951B] focus:ring-opacity-50"
                  aria-label="Donate now"
                >
                  DONATE NOW
                </button>
              </div>

              {/* Mobile Buttons & Menu Toggle */}
              <div className="flex xl:hidden items-center gap-2">
                {/* Mobile Donate Button */}
                <button
                  onClick={() => setIsDonationModalOpen(true)}
                  className="px-3 sm:px-4 py-2 bg-[#FF951B] text-[12px] sm:text-[14px] text-white rounded-full transition-all duration-200 hover:bg-[#E88617]"
                  aria-label="Donate now"
                >
                  DONATE
                </button>

                {/* Mobile Menu Toggle */}
                <button
                  className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 cursor-pointer hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-all duration-200"
                  onClick={() => setMenuOpen(true)}
                  aria-label="Open navigation menu"
                  aria-expanded={menuOpen}
                >
                  <IoMenu className="text-2xl sm:text-3xl text-gray-700" />
                </button>
              </div>

              {/* Mobile Menu Overlay */}
              <div
                onClick={() => setMenuOpen(false)}
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300 xl:hidden ${
                  menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                aria-hidden={!menuOpen}
                role="button"
                tabIndex={-1}
              />

              {/* Mobile Menu Drawer */}
              <aside
                className={`fixed xl:hidden top-0 left-0 h-full w-80 sm:w-96 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out ${
                  menuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
                aria-label="Mobile navigation"
              >
                {/* Drawer Header */}
                <div className="flex items-center justify-between px-5 sm:px-6 h-16 sm:h-20 border-b border-gray-200 bg-linear-to-r from-gray-50 to-white">
                  <Image
                    src={logo}
                    alt="sparc-logo"
                    width={149}
                    height={84}
                    className="w-20 h-11 sm:w-24 sm:h-14 cursor-pointer"
                    onClick={() => {
                      router.push("/");
                      setMenuOpen(false);
                    }}
                  />
                  <button
                    className="flex items-center justify-center w-10 h-10 cursor-pointer hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-all duration-200"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close navigation menu"
                  >
                    <IoClose className="text-2xl sm:text-3xl text-gray-700" />
                  </button>
                </div>

                {/* Drawer Content */}
                <div className="flex flex-col h-[calc(100%-4rem)] sm:h-[calc(100%-5rem)]">
                  <nav
                    className="flex-1 overflow-y-auto px-5 sm:px-6 py-6 space-y-2 overscroll-contain"
                    aria-label="Mobile navigation menu"
                  >
                    <Navbar />
                  </nav>

                  {/* Language Dropdown at Bottom */}
                  <div className="border-t border-gray-200 px-5 sm:px-6 py-4">
                    <div className="relative">
                      <button
                        onClick={toggleDropdown}
                        aria-label={`Selected language: ${selectedLanguage.name}`}
                        className="w-full px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-between transition-all duration-200 hover:bg-gray-50 border border-gray-200"
                      >
                        <div className="flex items-center gap-3">
                          <Image
                            src={selectedLanguage.flag}
                            alt=""
                            width={20}
                            height={20}
                            className="rounded-full h-5 w-5 object-cover"
                            role="presentation"
                          />
                          <div className="flex flex-col items-start">
                            <span className="font-medium text-gray-900">
                              {selectedLanguage.nativeName}
                            </span>
                            <span className="text-xs text-gray-500">
                              {selectedLanguage.name}
                            </span>
                          </div>
                        </div>
                        <IoIosArrowDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            isLanguageOpen ? "rotate-180" : "rotate-0"
                          }`}
                          aria-hidden="true"
                        />
                      </button>

                      {isLanguageOpen && (
                        <div
                          role="listbox"
                          className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
                        >
                          {languageOptions.map((language) => (
                            <button
                              key={language.code}
                              onClick={() => handleSelect(language)}
                              role="option"
                              aria-selected={selectedLanguage.code === language.code}
                              className={`flex items-center gap-3 w-full text-left px-4 py-3 text-sm transition-all duration-200 hover:bg-gray-50 ${
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
                  </div>
                </div>
              </aside>
            </section>
          </div>
        </Container>
      </header>

      {/* Donation Modal */}
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
      />
    </>
  );
};

export default Header;