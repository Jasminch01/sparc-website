import Image from "next/image";
import Hero_img from "../../public/Hero/Hero_Img.png";
import { Poppins } from "next/font/google";
import Container from "../Container";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});
const Hero = () => {
  return (
    <div className={`my-5 relative ${poppins.className}`}>
      <Container>
        {/* Bottom Section */}
        <section className="flex items-center gap-50 mt-10">
          <div className="max-w-xl">
            <h2 className="font-extrabold text-[51px]">
              THE CHT <span className="text-[#FF951B]">INDIGENOUS</span>{" "}
              WOMANIFESTO
            </h2>
          </div>
          <div>
            <p
              style={{ fontFamily: '"Book Antiqua",  serif' }}
              className="ml-15"
            >
              Empowering indigenous women and communities to rise against
              systemic oppression, reclaim their voices.
            </p>
          </div>
        </section>
      </Container>
      <Image
        src={Hero_img}
        alt="hero-img"
        height={800}
        width={800}
        className="w-full relative"
      />
      {/* Clip Path Wave */}
      {/* This position will be absolute */}
      <div className="absolute left-0 right-0 bottom-0 overflow-hidden">
        <svg className="brightness-75 h-[340px]" viewBox="0 0 1440 320">
          <path
            fill="rgba(0, 0, 0, 0.55)"
            d="M0,0L0,60.9C300,-180,1140,400,480,80C640,107,800,213,960,245.3C1120,277,1280,235,1360,213.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Absoulute Test */}
      <div className="absolute left-0 right-0 bottom-1/8 px-10 w-lg text-white ">
        <p className="font-extrabold text-5xl mb-5">PROTEST FOR EQUALITY</p>
        <p style={{ fontFamily: '"Book Antiqua",  serif ' }} className="mb-5">
          Empowering indigenous women and communities to rise against systemic
          oppression, reclaim their voices.
        </p>
        <button className="border-b-2 cursor-pointer">Read More</button>
      </div>
    </div>
  );
};

export default Hero;
