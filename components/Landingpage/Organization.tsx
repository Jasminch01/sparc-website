import { getAllPartners, Partner } from "@/sanity/queries/parthnerQueries";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const Organization = async () => {
  const partners = await getAllPartners();

  if (!partners || partners.length === 0) {
    return null;
  }

  return (
    <div className="border-b border-gray-300 pb-7">
      <Marquee
        gradient={false}
        speed={40}
        pauseOnHover={true}
        className="overflow-hidden"
      >
        {partners.map((partner: Partner, index: number) => (
          <div
            key={partner._id}
            className={`mx-8 md:mx-12 lg:mx-16 flex items-center justify-center ${
              index === 1 || index === 2 || index === 3
                ? "w-28 h-28 md:w-28 md:h-28"
                : "w-32 h-32 md:w-40 md:h-40"
            }`}
          >
            <Image
              width={300}
              height={300}
              src={partner.logo}
              alt={partner.name}
              className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Organization;
