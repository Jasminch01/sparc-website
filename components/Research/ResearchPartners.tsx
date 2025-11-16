import Image from "next/image";

const partners = [
  {
    logo: "/how-to-partner/logo1.png",
  },
  {
    logo: "/how-to-partner/logo6.png",
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

const ResearchPartners = () => {
  return (
    <div className="w-full py-10">
      <p className="font-bold xl:text-4xl text-center lg:text-3xl text-2xl mb-20">
        RESEARCH PARTNERS
      </p>
      <div className="flex items-center justify-center space-x-6 md:gap-8 lg:gap-12">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="shrink-0 w-32 h-20 md:w-40 md:h-24 lg:w-48 lg:h-28"
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
    </div>
  );
};

export default ResearchPartners;
