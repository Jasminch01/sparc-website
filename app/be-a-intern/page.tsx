import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";
import hero from "@/public/be-a-intern/be-a-inter-hero.png";
import careergroup from "@/public/be-a-intern/career-group.png";
import icon from "@/public/fellowship/icon.png";
import Image from "next/image";

const requirements = [
  {
    icon: icon,
    title: "Real experience in advocacy and social impact work",
  },
  {
    icon: icon,
    title: "Research & Documentation",
  },
  {
    icon: icon,
    title: "Cultural Learning & Exchange",
  },
  {
    icon: icon,
    title: "Communication & Media",
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
              BE PART OF REAL
              <span className="text-[#FF951B]"> CHANGE</span>
            </h2>
          </div>
          <div className="w-full lg:w-1/2">
            <p
              className={`lg:ml-30 text-justify text-lg lg:text-xl ${antiquaFont.className}`}
            >
              Every project we run begins with one goal — to uplift Indigenous
              women and their communities through action, awareness, and
              empowerment.
            </p>
          </div>
        </section>
      </Container>

      {/* Hero Section */}
      <section className="relative w-full mt-8 lg:mt-0">
        <Image
          src={hero}
          alt="fellowship-hero"
          width={1000}
          height={600}
          className="w-full h-[400px] lg:h-auto object-cover"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/5 text-center text-white px-4 w-full">
          <h2
            className={`text-2xl lg:text-4xl font-bold mb-3 lg:mb-4 ${poppins.className}`}
          >
            START YOUR JOURNEY WITH US
          </h2>
          <p
            className={`mb-3 lg:mb-4 text-lg lg:text-xl max-w-3xl mx-auto ${antiquaFont.className}`}
          >
            Gain hands-on experience and make an impact through our internship
            program.
          </p>
          <button
            className={`bg-[#FF951B] cursor-pointer hover:bg-orange-400 text-white px-5 lg:px-7 py-3 lg:py-5 mt-4 rounded-full text-sm lg:text-lg font-semibold transition duration-200 ${poppins.className}`}
          >
            APPLY FOR INTERNSHIP
          </button>
        </div>
      </section>

      {/* Career Journey Section */}
      <section className="max-w-6xl mx-auto space-y-6 lg:space-y-10 mt-12 lg:mt-20 px-4 lg:px-0">
        <h2
          className={`text-2xl lg:text-4xl font-bold mb-3 lg:mb-4 ${poppins.className}`}
        >
          YOUR CAREER JOURNEY BEGINS HERE. LEARN, GROW, AND MAKE AN IMPACT
        </h2>
        <p
          className={`mb-3 lg:mb-4 text-lg lg:text-xl ${antiquaFont.className}`}
        >
          Our internship program offers valuable real-world experience for
          passionate individuals who want to grow their skills while
          contributing to meaningful causes.
        </p>
        <Image
          src={careergroup}
          alt="career-group"
          width={1400}
          height={600}
          className="w-full h-auto"
        />
        <p
          className={`mb-3 lg:mb-4 text-lg lg:text-xl ${antiquaFont.className} text-justify`}
        >
          Skill-building sessions that provide education, leadership training,
          and emotional support to Indigenous women in local communities.
          Volunteer roles: Event assistance, teaching support, translation, and
          logistics. It is a long established fact that a reader will be
          distracted by the readable content of a page when looking at its
          layout. The point of using Lorem Ipsum is that it has a more-or-less
          normal distribution of letters, as opposed to using Content here,
          content here
        </p>
      </section>

      {/* Eligible Section */}
      <section className="max-w-5xl mx-auto mt-12 lg:mt-15 space-y-4 lg:space-y-5 mb-20 lg:mb-30 px-4 lg:px-0">
        <h2 className={`text-2xl lg:text-4xl font-bold ${poppins.className}`}>
          WHAT YOU CAN DO
        </h2>
        <p
          className={`${antiquaFont.className} text-justify text-lg lg:text-xl`}
        >
          Skill-building sessions that provide education, leadership training,
          and emotional support to Indigenous women in local communities.
          Volunteer roles: Event assistance, teaching support, translation, and
          logistics. It is a long established fact that a reader will be
          distracted by the readable content of a page when looking at its
          layout.
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

        <p
          className={`${antiquaFont.className} text-lg lg:text-xl text-justify`}
        >
          Skill-building sessions that provide education, leadership training,
          and emotional support to Indigenous women in local communities
        </p>
        <div className="pt-8 lg:pt-12">
          <button
            className={`flex items-center justify-center hover:bg-orange-400 text-center mx-auto bg-[#FF951B] px-5 lg:py-5 lg:px-7 py-4 text-white rounded-full text-sm lg:text-lg font-semibold cursor-pointer ${poppins.className}`}
          >
            APPLY FOR INTERNSHIP
          </button>
        </div>
      </section>
    </div>
  );
};

export default page;
