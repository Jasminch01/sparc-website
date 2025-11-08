import Image from "next/image";
import Hero_img from "../../public/Hero/Hero_Img.png";
import Container from "../Container";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const Hero = () => {
  return (
    <div className={`my-3 md:my-5 relative ${poppins.className}`}>
      <Image
        src={Hero_img}
        alt="hero-img"
        height={800}
        width={1920}
        className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-auto object-cover"
        priority
      />

      {/* Overlay Wave */}
      <div className="absolute left-0 right-0 bottom-0 overflow-hidden w-full pointer-events-none">
        <Image
          src={"/Hero/overlay.png"}
          alt="overlay-image"
          width={1920}
          height={600}
          className="object-cover w-full h-auto"
        />
      </div>

      {/* Text Content */}
      <div className="absolute left-0 right-0 bottom-[8%] sm:bottom-[10%] md:bottom-[12%] lg:bottom-[15%]">
        <Container>
          <div className="text-white max-w-2xl px-4 md:px-0">
            <h1 className="font-extrabold xl:text-4xl md:text-3xl text-2xl mb-3 md:mb-4 lg:mb-5 leading-tight">
              PROTEST FOR EQUALITY
            </h1>
            <p
              style={{ fontFamily: '"Book Antiqua", serif' }}
              className="text-sm sm:text-base md:text-lg lg:text-xl mb-3 md:mb-4 lg:mb-5 leading-relaxed"
            >
              Empowering indigenous women and communities to rise against
              systemic oppression, reclaim their voices.
            </p>
            <button className="border-b-2 cursor-pointer hover:border-b-4 transition-all text-sm sm:text-base md:text-lg pb-1">
              Read More
            </button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Hero;
