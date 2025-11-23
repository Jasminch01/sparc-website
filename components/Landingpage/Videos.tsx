// import Image from "next/image";
// import vectorImage from '../../public/Whatwedo/Vector.png'
import Container from "../Container";
import { antiquaFont, poppins } from "../utils/font";

const Videos = () => {
  return (
    <div className="bg-[#36133B] py-10 md:py-16 lg:py-24 xl:py-32 lg:mt-10 relative">
      <Container>
        <div className="text-center text-white">
          <div className="mb-8 md:mb-10 lg:mb-12">
            <h2
              className={`font-black mb-3 md:mb-4 xl:text-4xl md:text-3xl text-2xl ${poppins.className}`}
            >
              VIDEOS
            </h2>
            <p
              className={`text-lg lg:text-xl mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed ${antiquaFont.className}`}
            >
              Strong voices. Bold visions. Meet the women and allies driving
              equality and empowerment forward. Our strength lies in unity.
            </p>
          </div>

          {/* Embedded YouTube video - Responsive */}
          <div className="flex justify-center">
            <div className="w-full max-w-4xl aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-md shadow-lg w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Videos;
