import Container from "@/components/Container";
import Card from "@/components/Research/Card";
import ResearchPartners from "@/components/Research/ResearchPartners";
import ResearchProjects from "@/components/Research/ResearchProjects";
import { antiquaFont, poppins } from "@/components/utils/font";
import Image from "next/image";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";

const page = () => {
  return (
    <div>
      <div className="w-full relative h-[400px] md:h-[500px] lg:h-screen ">
        <Image
          src={"/Partners/banner.png"}
          width={1920}
          height={1080}
          alt="about-image"
          className="w-full h-full object-cover"
          priority
        />

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4  md:px-0 xl:mt-30 mt-20">
          <h1
            className={`text-2xl md:text-4xl font-black md:mb-4 text-center ${poppins.className}`}
          >
            OUR RESEARCH
          </h1>
          <p
            className={`text-base md:text-xl text-center max-w-2xl lg:max-w-3xl ${antiquaFont.className}`}
          >
            Our research amplifies Indigenous voices, documents cultural wisdom,
            and supports evidence-based advocacy for equality and sustainability
          </p>
          <div className="md:mt-10 mt-5">
            <button className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 font-semibold rounded-full cursor-pointer bg-[#FF951B] hover:bg-orange-400 text-sm md:text-lg">
              COLLABORATE WITH US
            </button>
          </div>
        </div>
      </div>

      <Container>
        <div className="flex lg:flex-row flex-col justify-between space-y-3 lg:items-center mt-10">
          <section className={`flex text-xs sm:text-base  gap-5  ${poppins.className} font-semibold`}>
            <Link href="/">HOME</Link> <span>||</span>
            <p className="text-[#818181] uppercase">Our Research</p>
          </section>

          {/* Search bar */}
          <div className="relative border-[#B7B7B7] rounded-sm border py-2 px-4 pr-10 focus-within:outline-none w-[300px]">
            <input
              type="text"
              placeholder="Search research..."
              className="w-full pr-8 focus:outline-none border-none"
            />
            <IoSearch className="absolute right-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>
        <ResearchProjects />
        <ResearchPartners />
        <Card />
      </Container>
    </div>
  );
};

export default page;
