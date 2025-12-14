import { useState } from 'react';
import Image from "next/image";
import logo from "../../public/Overview/logocopy.png";
import Link from "next/link";
import { antiquaFont, poppins } from "../utils/font";
import Container from "../Container";

const navs = [
  { title: "Who we are", href: "/who-we-are" },
  { title: "Stories", href: "/stories-news" },
  { title: "Partners", href: "/partners" },
  { 
    title: "Work with us",
    dropdown: [
      { title: "Volunteer", href: "/volunteer" },
      { title: "Be an Intern", href: "/be-an-intern" },
      { title: "Fellowship", href: "/fellowship" }
    ]
  },
  { 
    title: "Resources",
    dropdown: [
      { title: "Reports & Publications", href: "/reports-publications" },
      { title: "Indigenous Archive", href: "/archive" },
      { title: "Our Research", href: "/our-research" }
    ]
  },
  { title: "Blogs", href: "/blogs" },
];

const bottomBar = [
  "Tearms & Conditions",
  "Privacy Policy",
  "Accessibility",
  "Legal",
];

const Footer = () => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <div className="bg-[#36133B] text-white relative h-full md:mt-24 mt-12 lg:pb-20">
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

          {/* Main Content Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-6">
            {/* Navigation Links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 w-full lg:w-auto">
              {navs.map((nav, index) => (
                <div key={index} className="relative">
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
                    <Link
                      style={{ fontFamily: '"Nunito", serif' }}
                      href={nav.href}
                      className="text-base sm:text-lg lg:text-xl hover:text-[#FF951B] transition-colors duration-300"
                    >
                      {nav.title}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Newsletter Section */}
            <div className={`w-full lg:w-auto ${poppins.className}`}>
              <h2 className={`font-semibold mb-3 text-base sm:text-lg `}>
                Get the freshest news from us
              </h2>
              <div onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-row rounded overflow-hidden gap-2 sm:gap-0">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className={`px-3 py-2 w-full sm:w-64 outline-none bg-white text-gray-500 rounded sm:rounded-none sm:rounded-l`}
                  />
                  <button
                    type="submit"
                    className={`bg-[#FF951B] border border-[#FF951B] text-white px-4 py-2 hover:bg-[#e8851a] transition rounded sm:rounded-none xl:rounded-r`}
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div
            className={`flex flex-col sm:flex-row justify-between items-start w-full sm:items-center gap-4 xl:gap-2 mt-4 lg:mt-8 ${antiquaFont.className}`}
          >
            {/* Bottom Bar Links */}
            <div className={`flex flex-col lg:flex-row gap-5 w-full`}>
              {bottomBar.map((bottom, index) => (
                <div
                  key={index}
                  className={`xl:text-base ${
                    index !== bottomBar.length - 1
                      ? "xl:border-r-2 xl:pr-4"
                      : ""
                  } hover:text-[#FF951B] transition-colors duration-300 cursor-pointer`}
                >
                  {bottom}
                </div>
              ))}
            </div>

            {/* Copyright and Vector */}
            <div className="flex items-center justify-center mt-10 gap-2 w-full md:justify-start xl:justify-end">
              <p className="text-base">Sparc 2025. All rights reserved.</p>
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