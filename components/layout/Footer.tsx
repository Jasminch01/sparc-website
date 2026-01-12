"use client";
import { useState } from 'react';
import Image from "next/image";
import logo from "../../public/Overview/logocopy.png";
import Link from "next/link";
// Added notoBengali to the imports
import { antiquaFont, notoBengali } from "../utils/font";
import Container from "../Container";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";

interface FooterLinkItem {
  title: string;
  href: string;
}

interface DropdownItem {
  title: string;
  href: string;
}

interface NavItem {
  title: string;
  href?: string;
  dropdown?: DropdownItem[];
}

const createNavsFromI18n = (t: TFunction): NavItem[] => [
  { title: t('footer.menu_links.who_we_are', 'আমরা কারা'), href: "/who-we-are" },
  { title: t('footer.menu_links.stories', 'গল্পসমূহ'), href: "/stories-news" },
  { title: t('footer.menu_links.partners', 'অংশীদারগণ'), href: "/partners" },
  { title: t('footer.menu_links.blogs', 'ব্লগসমূহ'), href: "/blogs" },
  {
    title: t('footer.menu_links.work_with_us.title', 'আমাদের সাথে কাজ করুন'),
    dropdown: [
      { title: t('footer.menu_links.work_with_us.volunteer', 'স্বেচ্ছাসেবক'), href: "/volunteer" },
      { title: t('footer.menu_links.work_with_us.intern', 'ইন্টার্ন হোন'), href: "/be-an-intern" },
      { title: t('footer.menu_links.work_with_us.fellowship', 'ফেলোশিপ'), href: "/fellowship" }
    ]
  },
  {
    title: t('footer.menu_links.resources.title', 'সম্পদ/রিসোর্স'),
    dropdown: [
      { title: t('footer.menu_links.resources.reports_publications', 'প্রতিবেদন ও প্রকাশনা'), href: "/reports-publications" },
      { title: t('footer.menu_links.resources.indigenous_archive', 'আদিবাসী আর্কাইভ'), href: "/archive" },
      { title: t('footer.menu_links.resources.our_research', 'আমাদের গবেষণা'), href: "/our-research" }
    ]
  }
];

const createBottomBarFromI18n = (t: TFunction): FooterLinkItem[] => [
  { title: t('footer.legal_links.terms', 'শর্তাবলী'), href: "/terms-conditions" },
  { title: t('footer.legal_links.privacy', 'গোপনীয়তা নীতি'), href: "/privacy-policy" },
  { title: t('footer.legal_links.accessibility', 'অ্যাক্সেসযোগ্যতা'), href: "/accessibility" },
  { title: t('footer.legal_links.legal', 'আইনি'), href: "/legal" },
];


const Footer = () => {
  const { t, i18n } = useTranslation();
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  // Determine if the current language is Bengali
  const isBn = i18n.language === 'BN' || i18n.language === 'bn';

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const navs = createNavsFromI18n(t);
  const bottomBar = createBottomBarFromI18n(t);
  const copyrightText = t('footer.copyright', 'Sparc 2025. All rights reserved.');

  return (
    // Applied conditional font to the root div
    <div className={`bg-[#36133B] text-white relative h-full md:mt-24 mt-12 lg:pb-20 ${isBn ? notoBengali.className : ""}`}>
      <div className="absolute -z-10 2xl:-top-32 xl:-top-24 lg:-top-[4.3rem] md:-top-11 -top-7 left-0 right-0 w-full pointer-events-none overflow-hidden top-4xl">
        <Image
          className="w-full h-auto object-cover"
          src={"/Whatwedo/Frame1.png"}
          alt="vector-image"
          width={1920}
          height={700}
        />
      </div>
      <Container>
        <div className=" py-10 flex flex-col gap-8 lg:gap-10">
          <Image
            src={logo}
            alt="logo"
            height={80}
            width={180}
            className="object-contain h-16 sm:h-20 w-auto"
          />

          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 w-full lg:w-auto">
              {navs.map((nav, index) => (
                <div key={index} className="relative">
                  {nav.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(index)}
                        // Use class instead of hardcoded fontFamily
                        className={`text-base sm:text-lg lg:text-xl hover:text-[#FF951B] transition-colors duration-300 flex items-center gap-1 ${isBn ? notoBengali.className : ""}`}
                      >
                        {nav.title}
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${openDropdown === index ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {openDropdown === index && (
                        <div className="absolute left-0 top-full mt-2 bg-[#4a1a50] rounded shadow-lg py-2 px-3 z-10 min-w-[200px]">
                          {nav.dropdown.map((item, subIndex) => (
                            <Link
                              key={subIndex}
                              href={item.href}
                              onClick={() => setOpenDropdown(null)}
                              className={`block text-sm sm:text-base text-gray-300 hover:text-[#FF951B] transition-colors duration-300 py-2 pl-2 border-l-2 border-gray-600 hover:border-[#FF951B] ${isBn ? notoBengali.className : ""}`}
                            >
                              {item.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={nav.href || "#"}
                      className={`text-base sm:text-lg lg:text-xl hover:text-[#FF951B] transition-colors duration-300 ${isBn ? notoBengali.className : ""}`}
                    >
                      {nav.title}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div
            className={`flex flex-col sm:flex-row justify-between items-start w-full sm:items-center gap-4 xl:gap-2 mt-4 lg:mt-8 ${isBn ? notoBengali.className : antiquaFont.className}`}
          >
            <div className={`flex flex-col lg:flex-row gap-5 w-full`}>
              {bottomBar.map((bottom, index) => (
                <Link
                  key={index}
                  href={bottom.href}
                  className={`xl:text-base ${index !== bottomBar.length - 1
                    ? "xl:border-r-2 xl:pr-4"
                    : ""
                    } hover:text-[#FF951B] transition-colors duration-300`}
                >
                  {bottom.title}
                </Link>
              ))}
            </div>

            <div className="flex items-center justify-center mt-10 gap-2 w-full md:justify-start xl:justify-end">
              <p className="text-base">{copyrightText}</p>
            </div>
          </div>

          <hr className="border-gray-600" />
        </div>
      </Container>
    </div>
  );
};

export default Footer;