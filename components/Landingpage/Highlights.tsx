import Image from "next/image";
import highlightImage from "../../public/Highlight/highlight.png";
import { antiquaFont, poppins } from "../utils/font";
import vector from "../../public/Whatwedo/Frame1.png";

const Highlights = () => {
  return (
    <div className="relative md:pt-10 md:pb-32 pb-20">
      <div className="mt-20 sm:mt-24 md:mt-30 max-w-7xl mx-auto px-5 lg:px-10 xl:px-0">
        <h2
          className={`${poppins.className} text-center font-black xl:text-4xl md:text-3xl text-2xl xl:mb-5`}
        >
          HIGHLIGHTS
        </h2>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-10 py-6 md:py-8 lg:py-10">
          {/* Image Section */}
          <div className="w-full lg:w-1/2">
            <Image
              src={highlightImage}
              alt="highlight-image"
              width={600}
              height={400}
              className="object-cover w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-auto rounded-lg"
            />
          </div>

          {/* Content Section */}
          <div className="space-y-4 md:space-y-10 w-full lg:w-1/2 flex flex-col justify-center">
            <h2
              className={`${poppins.className} font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[40px] leading-tight`}
            >
              Chittagong Hill Tracts: <br className="hidden sm:block" />
              Indigenous people at risk
            </h2>
            <p
              className={`text-justify text-lg lg:text-xl leading-relaxed ${antiquaFont.className}`}
            >
              Empowering indigenous women and communities to rise against
              systemic oppression, reclaim their voices Empowering indigenous
              women and communities to rise against systemic oppression, reclaim
              their voicesEmpowering indigenous women and communities to rise
              against systemic oppression, reclaim their voices Empowering
            </p>
            <button
              className={`bg-[#36133B] cursor-pointer rounded-[33px] text-white px-6 sm:px-8 md:px-10 py-2.5 md:py-3 text-base hover:bg-[#4a1a4f] transition-colors ${poppins.className} w-fit`}
            >
              Read More
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Vector Image - Keep in same position across all screens */}
      <div className="absolute 2xl:-bottom-[9.2rem] xl:-bottom-[7.6rem] lg:-bottom-[6.1rem] md:-bottom-11 -bottom-6 left-0 right-0 w-full pointer-events-none overflow-hidden bottom-4xl">
        <Image
          className="w-full h-auto object-cover"
          src={vector}
          alt="vector-image"
          width={1920}
          height={700}
        />
      </div>
    </div>
  );
};

export default Highlights;
