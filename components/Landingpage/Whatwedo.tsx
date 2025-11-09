import { poppins } from "../utils/font";
import wwdOne from "../../public/Whatwedo/wwd 1.png";
import wwdTwo from "../../public/Whatwedo/wwd 2.png";
import wwdThree from "../../public/Whatwedo/wwd 3.png";
import vectorImage from "../../public/Whatwedo/white1.png";
import Image from "next/image";

const whatwedoes = [
  {
    img: wwdOne,
    title: "Dismantle Patriarchy",
  },
  {
    img: wwdTwo,
    title: "Busting Myth & Misinformation",
  },
  {
    img: wwdThree,
    title: "Capacity Building : Indigenous & Feminist Perspective",
  },
];

const Whatwedo = () => {
  return (
    <div className="bg-[#36133B] py-12 md:py-15 lg:py-20 relative pb-10 sm:pb-36 md:pb-40 lg:pb-44">
      <div className="max-w-7xl mx-auto flex flex-col gap-8 md:gap-10 mb-8 md:mb-10 px-5 lg:px-10 xl:px-0">
        {/* Header Section */}
        <div className="text-center text-white space-y-3 md:space-y-4">
          <h2
            className={`${poppins.className} font-black text-3xl sm:text-4xl md:text-5xl lg:text-4xl`}
          >
            WHAT WE DO
          </h2>
          <p
            style={{ fontFamily: '"Book Antiqua", serif' }}
            className="text-base sm:text-lg md:text-xl lg:text-xl max-w-3xl mx-auto px-4"
          >
            To create a world where all living beings enjoy their rights with
            dignity.
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
          {whatwedoes.map((wwd, index) => (
            <div
              key={index}
              className="flex items-center flex-col bg-[#772E82] text-center py-8 md:py-10 lg:py-12 px-4 gap-4 md:gap-5 rounded-2xl hover:bg-[#8a3596] transition-colors min-h-[220px] md:min-h-[250px]"
            >
              <div className="grow flex items-center justify-center">
                <Image
                  src={wwd.img}
                  alt={wwd.title}
                  width={80}
                  height={80}
                  className="object-contain w-16 h-16 sm:w-20 sm:h-20 md:w-20 md:h-20"
                />
              </div>
              <h3
                className={`text-white text-sm sm:text-base md:text-lg font-semibold leading-snug ${poppins.className}`}
              >
                {wwd.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Vector Image - Fixed at bottom edge */}
      <div className="absolute  2xl:-bottom-40 xl:-bottom-32 lg:-bottom-24 md:-bottom-16 -bottom-9 left-0 right-0 w-full pointer-events-none overflow-hidden bottom-4xl">
        <Image
          className="w-full h-auto object-cover"
          src={vectorImage}
          alt="vector-image"
          width={1920}
          height={600}
        />
      </div>
    </div>
  );
};

export default Whatwedo;
