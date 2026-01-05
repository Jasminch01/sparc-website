
"use client"
import Image from "next/image";
import { jost } from "../utils/font";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { useTranslation } from "react-i18next";

const partners = [
  {
    logo: "/how-to-partner/logo1.png",
  },
  {
    logo: "/how-to-partner/logo22.png",
  },
  {
    logo: "/how-to-partner/logo33.png",
  },
  {
    logo: "/how-to-partner/logo44.png",
  },
  {
    logo: "/how-to-partner/logo5.png",
  },
];

const Partners = () => {
  const {t} = useTranslation()
  return (
    <div className="w-full py-12 px-4 lg:px-0">
      <div className={`border-b border-gray-300 pb-7 ${jost.className}`}>
        <h2 className="text-2xl lg:text-4xl font-bold text-center mb-8 lg:mb-12">
         {t("partnersTwo.title")}
        </h2>

        {/* Marquee for all screen sizes */}
        <div>
          <Marquee
            gradient={false}
            speed={40}
            pauseOnHover={true}
            className="overflow-hidden"
          >
            {partners.map((partner, index) => (
              <div
                key={index}
                className={`mx-6 md:mx-8 xl:mx-12 flex items-center justify-center ${partner.logo === "/how-to-partner/logo22.png" ||
                    partner.logo === "/how-to-partner/logo33.png"||
                    partner.logo === "/how-to-partner/logo44.png"
                    ? "w-20 h-20 md:w-28 md:h-28 xl:w-28 xl:h-28"
                    : "w-24 h-24 md:w-32 md:h-32 xl:w-40 xl:h-40"
                  }`}
              >
                <Image
                  width={300}
                  height={300}
                  src={partner.logo}
                  alt={`Partner ${index + 1}`}
                  className="w-full h-full object-contain ilter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>

      <div className="flex justify-between items-center mt-10">
        <section
          className={`flex gap-5 text-sm uppercase font-semibold ${jost.className}`}
        >
          <Link href="/">Home</Link> <span>||</span>
          <p className="text-[#818181]">HOW TO PARTNER</p>
        </section>
      </div>
    </div>
  );
};

export default Partners;