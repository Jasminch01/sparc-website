import Image from "next/image";
import { poppins } from "../utils/font";
import Link from "next/link";

const partners = [
  {
    logo: "/how-to-partner/logo1.png",
  },
  {
    logo: "/how-to-partner/logo2.png",
  },
  {
    logo: "/how-to-partner/logo3.png",
  },
  {
    logo: "/how-to-partner/logo4.png",
  },
  {
    logo: "/how-to-partner/logo5.png",
  },
];

const Partners = () => {
  return (
    <div className="w-full py-12 px-4 lg:px-0">
      <div className={`border-b border-gray-300 pb-7 ${poppins.className}`}>
        <h2 className="text-2xl lg:text-4xl font-bold text-center mb-8 lg:mb-12">
          Our Trusted Partners
        </h2>

        {/* Desktop/Tablet: Single Row */}
        <div className="hidden md:flex items-center justify-between xl:space-x-16 w-full">
          {partners.map((partner, index) => (
            <div
              key={index}
              className={`shrink-0 ${
                partner.logo === "/how-to-partner/logo2.png" ||
                partner.logo === "/how-to-partner/logo3.png"
                  ? "size-28 xl:size-28"
                  : "size-32 xl:size-40"
              }`}
            >
              <Image
                width={300}
                height={300}
                src={partner.logo}
                alt={`Partner ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>

        {/* Mobile: Grid Layout */}
        <div className="grid grid-cols-2 gap-6 md:hidden">
          {partners.map((partner, index) => (
            <div
              key={index}
              className={`flex items-center justify-center ${
                index === partners.length - 1 && partners.length % 2 !== 0
                  ? "col-span-2"
                  : ""
              }`}
            >
              <div className="w-28 h-16 sm:h-20">
                <Image
                  width={300}
                  height={300}
                  src={partner.logo}
                  alt={`Partner ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mt-10">
        <section
          className={`flex gap-5 text-sm uppercase font-semibold ${poppins.className}`}
        >
          <Link href="/">Home</Link> <span>||</span>
          <p className="text-[#818181] ">HOW TO PARTNER</p>
        </section>
      </div>
    </div>
  );
};

export default Partners;
