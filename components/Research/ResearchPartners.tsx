import Image from "next/image";
import Marquee from "react-fast-marquee";
import { jost } from "../utils/font";

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
              partner.logo === "/how-to-partner/logo22.png" ||
              partner.logo === "/how-to-partner/logo33.png" ||
              partner.logo === "/how-to-partner/logo44.png"
                ? "w-28 h-28 md:w-28 md:h-28"
                : "w-32 h-32 md:w-40 md:h-40"
            }`}
          >
            <Image
              width={300}
              height={300}
              src={partner.logo}
              alt={`Partner ${index + 1}`}
              className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default ResearchPartners;
