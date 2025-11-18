import Banner from "@/components/About/Banner";
import Story from "@/components/About/Story";
import Team from "@/components/About/Team";
import Container from "@/components/Container";
import Wherewework from "@/components/Landingpage/Wherewework";
import { antiquaFont, poppins } from "@/components/utils/font";

const page = () => {
  return (
    <div>
      <Container>
        <section className="flex flex-col xl:flex-row xl:items-center xl:gap-x-50 gap-y-6 xl:gap-y-0 mt-8 xl:mt-32 px-4 xl:px-0">
          <div className="w-full xl:w-auto">
            <h2
              className={`font-black text-2xl lg:text-[51px] xl:whitespace-nowrap ${poppins.className}`}
            >
              EMPOWERING <span className="text-[#FF951B]">WOMEN</span>, <br />{" "}
              BUILDING
            </h2>
          </div>
          <div className="w-full xl:w-auto">
            <p
              className={`text-lg lg:text-xl text-justify ${antiquaFont.className}`}
            >
              Every project we run begins with one goal - to uplift Indigenous
              woman and their communities through action, awarness, and
              empowerment.
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
