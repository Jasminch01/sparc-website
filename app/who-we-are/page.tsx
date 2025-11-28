import Banner from "@/components/About/Banner";
import Story from "@/components/About/Story";
import Team from "@/components/About/Team";
import Container from "@/components/Container";
import Wherewework from "@/components/Landingpage/Wherewework";
import { antiquaFont, poppins } from "@/components/utils/font";

const page = () => {
  return (
    <div className="mt-10 md:mt-12 lg:mt-15">
      <Container>
        {/* Top Section */}
        <section className="flex flex-col lg:flex-row justify-between gap-6 sm:gap-8 lg:gap-20">
          <div className="w-full lg:w-1/2">
            <h2 className={`text-2xl sm:text-4xl text-center lg:text-start md:text-4xl lg:text-[51px] lg:max-w-2xl font-extrabold leading-tight ${poppins.className}`}>
              EMPOWERING  <span className="text-[#FF951B]">WOMEN , </span>BUILDING
            </h2>
          </div>
          <div className="w-full lg:w-1/2">
            <p className={`lg:ml-30 text-justify text-md md:text-xl ${antiquaFont.className}`}>
              Every project we run begins with one goal - to uplift Indigenous woman and their communities through action, awarness, and empowerment.
            </p>
          </div>
        </section>
      </Container>
      <Banner />
      <Story />
      <Team />
      <Wherewework />
    </div>
  );
};

export default page;
