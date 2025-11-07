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
        <section className="flex items-center gap-50 mt-32">
          <div className="max-w-xl">
            <h2 className={`font-extrabold text-[51px] ${poppins.className}`}>
              EMPOWERING
              <span className="text-[#FF951B]">WOMEN</span>, BUILDING
            </h2>
          </div>
          <div>
            <p className={`justify-end text-2xl text-justify ${antiquaFont.className}`}>
              Every project we run begins with one goal - to uplift Indigenous woman and their communities through action, awarness, and empowerment.
            </p>
          </div>
        </section>
      </Container>
      <Banner />
      <Story/>
      <Team/>
      <Wherewework/>
    </div>
  );
};

export default page;
