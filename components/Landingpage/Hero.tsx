import Image from "next/image";
import Hero_img from "../../public/Hero/Hero_Img.png";
import overlay from "../../public/Hero/overlay.png";
import { Poppins } from "next/font/google";
import Container from "../Container";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const Hero = () => {
  return (
    <div className={`my-5 relative ${poppins.className}`}>
      {/* Top Section with Title and Description */}
      <Container>
        <section className="flex flex-col lg:flex-row items-center md:items-start lg:justify-between gap-6 lg:gap-25 mt-10 mb-5">
          <div className="lg:max-w-xl text-center lg:text-left">
            <h2 className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[51px] leading-tight">
              THE CHT <span className="text-[#FF951B]">INDIGENOUS</span>{" "}
              WOMANIFESTO
            </h2>
          </div>
          <div className="lg:flex-1">
            <p
              style={{ fontFamily: '"Book Antiqua", serif' }}
              className="text-sm sm:text-base lg:text-lg text-center lg:text-left"
            >
              Empowering indigenous women and communities to rise against
              systemic oppression, reclaim their voices.
            </p>
          </div>
        </section>
      </Container>

      {/* Hero Image with Overlay */}
      <div className="relative w-full">
        <Image
          src={Hero_img}
          alt="hero-img"
          height={800}
          width={1000}
          className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[600px] xl:h-auto object-cover"
        />

        {/* Overlay Wave */}
        <div className="absolute left-0 right-0 bottom-0 overflow-hidden w-full pointer-events-none">
          <Image
            src={overlay}
            alt="overlay-image"
            width={1000}
            height={600}
            className="w-full h-auto"
          />
        </div>

        {/* Text Content Over Image */}
        <div className="absolute inset-x-0 bottom-0 pb-4 sm:pb-8 md:pb-12 lg:pb-16">
          <Container>
            <div className="text-white max-w-2xl">
              <p className="font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-2 sm:mb-3 lg:mb-5">
                PROTEST FOR EQUALITY
              </p>
              <p
                style={{ fontFamily: '"Book Antiqua", serif' }}
                className="text-xs sm:text-sm md:text-base lg:text-lg mb-3 sm:mb-4 lg:mb-5 leading-relaxed"
              >
                Empowering indigenous women and communities to rise against
                systemic oppression, reclaim their voices.
              </p>
              <button className="border-b-2 border-white cursor-pointer text-sm sm:text-base hover:border-[#FF951B] transition-colors duration-300">
                Read More
              </button>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Hero;
