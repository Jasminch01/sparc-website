import Image from "next/image";
import logo from "../../public/Overview/logocopy.png";
import vector from "../../public/Whatwedo/Vector.png";
import Link from "next/link";
import { poppins } from "../utils/font";

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
    <div className="bg-[#3E1A43] text-white">
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
          <div className="w-full lg:w-auto">
            <h2
              className={`font-semibold mb-3 text-base sm:text-lg ${poppins.className}`}
            >
              Get the freshest news from us
            </h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col sm:flex-row rounded overflow-hidden gap-2 sm:gap-0">
                <input
                  type="email"
                  placeholder="Your email address"
                  className={`px-3 py-2 w-full sm:w-64 outline-none bg-white text-gray-900 rounded sm:rounded-none sm:rounded-l ${poppins.className}`}
                />
                <button
                  type="submit"
                  className={`bg-[#FF951B] border border-[#FF951B] text-white px-4 py-2 hover:bg-[#e8851a] transition rounded sm:rounded-none sm:rounded-r ${poppins.className}`}
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-2 mt-4 lg:mt-8">
          {/* Bottom Bar Links */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full sm:w-auto">
            {bottomBar.map((bottom, index) => (
              <div
                style={{ fontFamily: '"Book Antiqua", serif' }}
                key={index}
                className={`text-sm sm:text-base ${
                  index !== bottomBar.length - 1 ? "sm:border-r-2 sm:pr-4" : ""
                } hover:text-[#FF951B] transition-colors duration-300 cursor-pointer`}
              >
                {bottom}
              </div>
            ))}
          </div>

          {/* Copyright and Vector */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-start sm:justify-end">
            <p
              style={{ fontFamily: '"Book Antiqua", serif' }}
              className="text-xs sm:text-sm"
            >
              Sparce 2025. All rights reserved.
            </p>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-600" />
      </div>
    </div>
  );
};

export default Footer;
