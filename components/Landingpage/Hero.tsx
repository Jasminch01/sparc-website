import Image from "next/image";
import Container from "../Container";
import { antiquaFont, poppins } from "../utils/font";

const Hero = () => {
  return (
    <div className={`my-5 relative ${poppins.className}`}>
      {/* Top Section with Title and Description */}
      <Container>
        <section className="flex flex-col lg:flex-row items-center md:items-start lg:justify-between lg:space-x-25 mt-10 mb-5">
          <div className="lg:max-w-xl text-center lg:text-left flex-1">
            <h2 className="font-black text-2xl lg:text-[51px]">
              THE CHT <span className="text-[#FF951B]">INDIGENOUS</span>{" "}
              WOMANIFESTO
            </h2>
          </div>
          <div className="lg:flex-1 justify-end mt-5">
            <p
              className={`text-lg lg:text-xl text-center lg:text-right ${antiquaFont.className}`}
            >
              Empowering indigenous women and communities to rise <br /> against
              systemic oppression, reclaim their voices.
            </p>
          </div>
        </section>
      </Container>

      {/* Hero Image with CSS Wave Overlay */}
      <div className="relative w-full">
        <Image
          src={"/Hero/hero.png"}
          alt="hero-img"
          height={800}
          width={1000}
          className="w-full hidden lg:flex h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] object-fill"
        />

        <Image
          src={"/Hero/hero.png"}
          alt="hero-img"
          height={800}
          width={1000}
          className="w-full lg:hidden h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] object-fill"
        />

        {/* Dark overlay for better text readability on small screens */}
        <div className="absolute lg:hidden inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent lg:from-black/50 "></div>

        {/* Text Content Over Image with Left Padding for Mobile */}
        <div className="absolute inset-x-0 bottom-0 pb-6 sm:pb-10 md:pb-14 lg:pb-20 xl:pb-24">
          <div className="px-6 lg:px-10 max-w-7xl mx-auto">
            <div className="text-white max-w-2xl">
              <p className="font-extrabold hidden lg:flex text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-2 sm:mb-3 lg:mb-4">
                PROTEST FOR <br /> EQUALITY
              </p>
              <p className="font-extrabold lg:hidden text-2xl sm:text-2xl lg:text-4xl xl:text-4xl mb-2 lg:mb-4">
                PROTEST FOR EQUALITY
              </p>
              <p
                style={{ fontFamily: '"Book Antiqua", serif' }}
                className="text-lg hidden lg:flex lg:text-xl mb-3 lg:mb-5"
              >
                Empowering indigenous women and communities to rise <br /> against
                systemic oppression, reclaim their voices
              </p>
              <p
                style={{ fontFamily: '"Book Antiqua", serif' }}
                className="text-lg lg:text-xl lg:hidden mb-3 lg:mb-5"
              >
                Empowering indigenous women and communities to rise against
                systemic oppression, reclaim their voices
              </p>
              <button className="border-b-2 border-white cursor-pointer text-sm lg:text-base hover:border-[#FF951B] transition-colors duration-300 uppercase font-semibold">
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
