"use client"
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { jost } from "../utils/font";
import logo1 from "../../public/how-to-partner/logo1.png";
import logo2 from "../../public/how-to-partner/logo22.png";
import logo3 from "../../public/how-to-partner/logo33.png";
import logo4 from "../../public/how-to-partner/logo44.png";
import logo5 from "../../public/how-to-partner/logo5.png";

const partners = [
  {
    logo: logo1,
    path: "/how-to-partner/logo1.png",
  },
  {
    logo: logo2,
    path: "/how-to-partner/logo22.png",
  },
  {
    logo: logo3,
    path: "/how-to-partner/logo33.png",
  },
  {
    logo: logo4,
    path: "/how-to-partner/logo44.png",
  },
  {
    logo: logo5,
    path: "/how-to-partner/logo5.png",
  },
];

const ResearchPartners = () => {

  return (
    <div className="w-full py-10">
      <p className={`font-bold xl:text-4xl text-center lg:text-3xl text-2xl mb-20 ${jost.className}`}>
        RESEARCH PARTNERS
      </p>
      <Marquee
        gradient={false}
        speed={40}
        pauseOnHover={true}
        className="overflow-hidden"
      >
        {partners.map((partner, index) => (
          <div
            key={index}
            className={`mx-8 md:mx-12 lg:mx-16 flex items-center justify-center ${
              partner.path === "/how-to-partner/logo22.png" ||
              partner.path === "/how-to-partner/logo33.png" ||
              partner.path === "/how-to-partner/logo44.png"
                ? "w-28 h-28 md:w-28 md:h-28"
                : "w-32 h-32 md:w-40 md:h-40"
            }`}
          >
            <Image
              src={partner.logo}
              alt={`Partner ${index + 1}`}
              width={300}
              height={300}
              placeholder="blur"
              sizes="(max-width: 768px) 120px, 160px"
              className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default ResearchPartners;
