import Image from "next/image";
import { antiquaFont } from "../utils/font";

const Card = () => {
  return (
    <div className="mt-20 pb-20 md:pb-40 md:px-8 lg:px-20">
      <div className="flex flex-col lg:flex-row justify-center items-center border-gray-300 border-2 rounded-lg overflow-hidden bg-white  transition-shadow duration-300">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 relative h-64 md:h-80 lg:h-[500px]">
          <Image
            src={"/how-to-partner/image1.png"}
            fill
            className="object-cover"
            alt="Partnership collaboration"
          />
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-10 xl:p-16 space-y-6">
          <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-gray-900">
            JOIN WITH OUR TEAM AND RESEARCH TOGETHER
          </h2>

          <p
            className={`text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed ${antiquaFont.className}`}
          >
            Indigenous young people who are emerging leaders, learners, or
            activists working to preserve their culture and rights.
          </p>
          <div className="text-center lg:text-left">
            <button className="rounded-full cursor-pointer hover:bg-[#FF951B] px-8 py-3 md:px-10 md:py-4 bg-[#36133B] text-white uppercase font-semibold text-sm md:text-base transition-colors duration-300 shadow-md">
              Join Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
