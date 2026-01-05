"use client";
import { useState } from 'react';
import Image from "next/image";
import logo from "../../public/Overview/logocopy.png";
import Link from "next/link";
import { antiquaFont } from "../utils/font";
import Container from "../Container";
// Import TFunction for type safety instead of using 'any'
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next"; 

// --- Interface Definitions for Component Data ---
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

// Manually map the i18n structure to the required component structure (navs)
// FIX: Changed t: any to t: TFunction
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

// Manually map the i18n legal links to the required component structure (bottomBar)
// FIX: Changed t: any to t: TFunction
const createBottomBarFromI18n = (t: TFunction): FooterLinkItem[] => [
  { title: t('footer.legal_links.terms', 'শর্তাবলী'), href: "/terms-conditions" },
  { title: t('footer.legal_links.privacy', 'গোপনীয়তা নীতি'), href: "/privacy-policy" },
  { title: t('footer.legal_links.accessibility', 'অ্যাক্সেসযোগ্যতা'), href: "/accessibility" },
  { title: t('footer.legal_links.legal', 'আইনি'), href: "/legal" },
];


const Footer = () => {
  // Destructure t from useTranslation
  const { t } = useTranslation();
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  // Load all translated data
  const navs = createNavsFromI18n(t);
  const bottomBar = createBottomBarFromI18n(t);

  // const subscribeHeading = t('footer.subscribe.heading', 'Get the freshest news from us');
  // const subscribePlaceholder = t('footer.subscribe.placeholder', 'Your email address');
  // const subscribeButton = t('footer.subscribe.button', 'Subscribe');
  const copyrightText = t('footer.copyright', 'Sparc 2025. All rights reserved.');


  return (
    <div className="bg-[#36133B] text-white relative h-full md:mt-24 mt-12 lg:pb-20">
      {/* Background Vector Image */}
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
          {/* Logo */}
          <Image
            src={logo}
            alt="logo"
            height={80}
            width={180}
            className="object-contain h-16 sm:h-20 w-auto"
          />

          {/* Main Content Section: Navigation and Newsletter */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-6">

            {/* Navigation Links Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 w-full lg:w-auto">
              {navs.map((nav, index) => (
                <div key={index} className="relative">
                  {/* Dropdown Links (Work with us, Resources) */}
                  {nav.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(index)}
                        style={{ fontFamily: '"Nunito", serif' }}
                        className="text-base sm:text-lg lg:text-xl hover:text-[#FF951B] transition-colors duration-300 flex items-center gap-1"
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
                              style={{ fontFamily: '"Nunito", serif' }}
                              className="block text-sm sm:text-base text-gray-300 hover:text-[#FF951B] transition-colors duration-300 py-2 pl-2 border-l-2 border-gray-600 hover:border-[#FF951B]"
                            >
                              {item.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Simple Links (Who we are, Stories, etc.) */
                    <Link
                      style={{ fontFamily: '"Nunito", serif' }}
                      href={nav.href || "#"}
                      className="text-base sm:text-lg lg:text-xl hover:text-[#FF951B] transition-colors duration-300"
                    >
                      {nav.title}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Newsletter Subscription Section */}
            {/* <div className={`w-full lg:w-auto ${jost.className}`}>
              <h2 className={`font-semibold mb-3 text-base sm:text-lg `}>
                {subscribeHeading}
              </h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-row rounded overflow-hidden gap-2 sm:gap-0">
                  <input
                    type="email"
                    placeholder={subscribePlaceholder}
                    className={`px-3 py-2 w-full sm:w-64 outline-none bg-white text-gray-500 rounded sm:rounded-none sm:rounded-l`}
                  />
                  <button
                    type="submit"
                    className={`bg-[#FF951B] border border-[#FF951B] text-white px-4 py-2 hover:bg-[#e8851a] transition rounded sm:rounded-none xl:rounded-r`}
                  >
                    {subscribeButton}
                  </button>
                </div>
              </form>
            </div> */}
          </div>

          {/* Bottom Section: Legal Links and Copyright */}
          <div
            className={`flex flex-col sm:flex-row justify-between items-start w-full sm:items-center gap-4 xl:gap-2 mt-4 lg:mt-8 ${antiquaFont.className}`}
          >
            {/* Legal Links */}
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

            {/* Copyright */}
            <div className="flex items-center justify-center mt-10 gap-2 w-full md:justify-start xl:justify-end">
              <p className="text-base">{copyrightText}</p>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-600" />
        </div>
      </Container>
    </div>
  );
};

export default Footer;