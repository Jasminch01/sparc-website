import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";
import fellowshipHero from "@/public/fellowship/fellowship-hero.png";
import aboutOne from "@/public/fellowship/about.png";
import aboutTwo from "@/public/fellowship/abouttwo.png";
import icon from "@/public/fellowship/icon.png";
import follower from "@/public/fellowship/follower.png";
import women from "@/public/fellowship/women.png";
import Image from "next/image";

const requirements = [
  {
    icon: icon,
    title: "Open to all Indigenous individuals (18+)",
  },
  {
    icon: icon,
    title:
      "Must have a demonstrated commitment to community service or research",
  },
  {
    icon: icon,
    title: "Fellowship duration: 6–12 months",
  },
  {
    icon: icon,
    title: "Provides stipend and mentorship support",
  },
];

const page = () => {
  return (
    <div className="mt-8 lg:mt-15">
      <Container>
        {/* Top Section */}
        <section className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-20">
          <div className="w-full lg:w-1/2">
            <h2
              className={`text-3xl lg:text-5xl max-w-2xl font-extrabold ${poppins.className}`}
            >
              THE FELLOWSHIP IS OPEN TO{" "}
              <span className="text-[#FF951B]">INDIGENOUS </span>YOUTH
            </h2>
          </div>
          <div className="w-full lg:w-1/2 justify-end">
            <p
              className={`lg:ml-30 text-justify text-lg lg:text-xl text-[#4E4E4E] ${antiquaFont.className}`}
            >
              Our Fellowship Program supports individuals dedicated to
              protecting Indigenous rights, documenting histories, and building
              stronger communities.
            </p>
          </div>
        </section>
      </Container>

      {/* Hero Section */}
      <section className="relative w-full mt-8 lg:mt-0">
        <Image
          src={fellowshipHero}
          alt="fellowship-hero"
          width={1000}
          height={600}
          className="w-full h-[400px] lg:h-auto object-cover"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/5 text-center text-white px-4 w-full">
          <h2
            className={`text-2xl lg:text-5xl font-bold mb-3 lg:mb-4 ${poppins.className}`}
          >
            FELLOWSHIP
          </h2>
          <p
            className={`mb-3 lg:mb-4 text-lg lg:text-xl max-w-3xl mx-auto ${antiquaFont.className}`}
          >
            Gain hands-on experience and make an impact through our internship
            program.
          </p>
          <button
            className={`bg-[#FF951B] hover:bg-orange-400 cursor-pointer  text-sm lg:text-lg text-white px-6 lg:px-7 py-3 lg:py-4 mt-4 lg:mt-10 rounded-full  font-semibold ${poppins.className}`}
          >
            APPLY NOW
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="mt-12 lg:mt-25 max-w-6xl mx-auto space-y-6 lg:space-y-10 px-4 lg:px-0">
        <div className="space-y-4 lg:space-y-5">
          <h2 className={`text-2xl lg:text-4xl font-bold ${poppins.className}`}>
            ABOUT THE FELLOWSHIP
          </h2>
          <p
            className={`${antiquaFont.className} text-[#363636] text-justify text-lg lg:text-xl leading-relaxed`}
          >
            This fellowship provides mentorship, training, and funding to
            individuals passionate about cultural heritage, gender equity,
            environmental justice, and Indigenous education. To help address
            these challenges, our Early Career Fellowship empowers a new,
            diverse generation of Internet champions who will bridge the gap
            between technology and policy, becoming advocates for the open,
            globally connected, secure, and trustworthy Internet.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-5">
          <Image
            src={aboutOne}
            alt="aboutone"
            width={600}
            height={400}
            className="w-full lg:w-auto h-auto"
          />
          <Image
            src={aboutTwo}
            alt="abouttwo"
            width={530}
            height={400}
            className="w-full lg:w-auto h-auto"
          />
        </div>
      </section>

      {/* Program Section */}
      <section className="mt-12 lg:mt-15 max-w-6xl mx-auto space-y-4 lg:space-y-5 px-4 lg:px-0">
        <h2 className={`${poppins.className} text-2xl lg:text-4xl font-bold`}>
          ABOUT THE PROGRAM
        </h2>
        <p
          className={`${antiquaFont.className} text-justify text-[#363636] leading-relaxed text-lg lg:text-xl`}
        >
          The Indigenous Fellowship Program is designed to empower emerging
          leaders from Indigenous communities through mentorship, research
          support, and cultural advocacy training. The program provides fellows
          with the resources and guidance needed to preserve traditional
          knowledge, document community histories, and lead initiatives that
          strengthen Indigenous rights and representation. Through
          collaboration, storytelling, and field-based projects, fellows
          contribute to building a more inclusive and equitable future for their
          people.
        </p>
      </section>

      <Container>
        <section className=" mt-12 lg:mt-15 space-y-4 lg:space-y-5 ">
          <h2 className={`text-2xl lg:text-4xl font-bold ${poppins.className}`}>
            WHO IS ELIGIBLE TO APPLY?
          </h2>
          <p
            className={`${antiquaFont.className} text-justify text-[#363636] text-lg lg:text-xl`}
          >
            The fellowship is open to Indigenous individuals who are passionate
            about community development, cultural preservation, and social
            advocacy.
          </p>
          <div>
            <h3
              className={`${antiquaFont.className} text-[#363636] text-justify text-lg lg:text-xl mb-4`}
            >
              Candidates with the following are welcome to apply:
            </h3>
            <ul>
              {requirements.map((req, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 lg:gap-4 my-4 lg:my-5"
                >
                  <Image
                    src={req.icon}
                    alt={req.title}
                    width={20}
                    height={20}
                    className="mt-1 shrink-0"
                  />
                  <li
                    className={`${antiquaFont.className} text-justify text-lg lg:text-xl`}
                  >
                    {req.title}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </section>
        <section className=" mt-12 lg:mt-15 space-y-6 lg:space-y-10">
          <h2 className={`text-2xl lg:text-4xl font-bold ${poppins.className}`}>
            MEET THE FELLOWS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-20">
            <Image
              src={follower}
              alt="follower"
              width={333}
              height={200}
              className="w-full h-auto"
            />
            <Image
              src={follower}
              alt="follower"
              width={333}
              height={200}
              className="w-full h-auto"
            />
            <Image
              src={follower}
              alt="follower"
              width={333}
              height={200}
              className="w-full h-auto"
            />
          </div>
          <hr className="border-gray-300" />
        </section>
        <section className="mt-12 lg:mt-15 mb-20 lg:mb-30 rounded-md bg-gray-100 flex flex-col lg:flex-row items-center border border-gray-200 overflow-hidden">
          <div className="w-full lg:w-1/2">
            <Image
              src={women}
              alt="women"
              width={450}
              height={300}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2 space-y-6 lg:space-y-10 p-6 lg:p-8">
            <h2
              className={`text-[#2D2D2D] ${poppins.className} font-bold text-xl lg:text-3xl`}
            >
              YOUR CAREER JOURNEY BEGINS HERE. LEARN, GROW
            </h2>
            <p
              className={`${antiquaFont.className} text-justify text-lg lg:text-xl text-[#363636]`}
            >
              Indigenous young people who are emerging leaders, learners, or
              activists working to preserve their culture and rights.
            </p>
            <div className="text-center lg:text-left">
              <button
                className={`${poppins.className} bg-[#36133B] text-white cursor-pointer px-6 py-2 lg:px-8 lg:py-3 rounded-full uppercase hover:bg-[#ff951b] transition duration-200`}
              >
                Apply Now
              </button>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default page;
