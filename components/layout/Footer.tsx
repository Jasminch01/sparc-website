import Image from "next/image";
import logo from "../../public/Overview/logocopy.png";
import Link from "next/link";
import { antiquaFont, poppins } from "../utils/font";

const navs = [
  "Who we are",
  "Stories",
  "Partners",
  "Work with us",
  "Resources",
  "Blog",
];
const bottomBar = [
  "Tearms & Conditions",
  "Privacy Policy",
  "Accessibility",
  "Legal",
];

const Footer = () => {
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
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 flex flex-col gap-8 lg:gap-10">
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
            {navs.map((btn, index) => (
              <Link
                style={{ fontFamily: '"Nunito", serif' }}
                key={index}
                href={`/${btn.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-base sm:text-lg lg:text-xl hover:text-[#FF951B] transition-colors duration-300"
              >
                {btn}
              </Link>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className={`w-full lg:w-auto ${poppins.className}`}>
            <h2 className={`font-semibold mb-3 text-base sm:text-lg `}>
              Get the freshest news from us
            </h2>
            <form onSubmit={(e) => e.preventDefault()}>
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
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 xl:gap-2 mt-4 lg:mt-8 ${antiquaFont.className}`}
        >
          {/* Bottom Bar Links */}
          <div className={`flex flex-row gap-x-5 w-full`}>
            {bottomBar.map((bottom, index) => (
              <div
                key={index}
                className={`xl:text-base ${
                  index !== bottomBar.length - 1 ? "xl:border-r-2 xl:pr-4" : ""
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
    </div>
  );
};

export default Footer;
