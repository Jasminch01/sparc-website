import teamOne from "../../public/Team/team 1.png";
import teamTwo from "../../public/Team/team 2.png";
import teamThree from "../../public/Team/team 3.png";
import teamFour from "../../public/Team/team 4.png";
import leaf from "../../public/Team/Leaf.png";
import Image from "next/image";
import { poppins } from "../utils/font";

const teamMembers = [
  {
    name: "Arthur Morgan",
    designation: "Social Worker, MD",
    img: teamOne,
  },
  {
    name: "Arthur Morgan",
    designation: "Social Worker, MD",
    img: teamTwo,
  },
  {
    name: "Arthur Morgan",
    designation: "Social Worker, MD",
    img: teamThree,
  },
  {
    name: "Arthur Morgan",
    designation: "Social Worker, MD",
    img: teamFour,
  },
];

const Team = () => {
  return (
    <div className="max-w-7xl mx-auto my-12 md:my-16 lg:my-20 px-4 sm:px-6 lg:px-8">
      {/* Top Section */}
      <section className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12 mb-12 md:mb-16 lg:mb-20">
        <div className="w-full lg:w-1/2">
          <div className="max-w-md space-y-3 md:space-y-4">
            <div className="flex gap-2 items-start">
              <h2
                style={{ fontFamily: '"Rowan", serif' }}
                className="xl:text-4xl md:text-3xl text-2xl mt-2 md:mt-5"
              >
                O1
              </h2>
              <Image
                src={leaf}
                alt="team-leaf"
                width={25}
                height={25}
                className="object-contain w-5 h-5 sm:w-6 sm:h-6 md:w-[25px] md:h-[25px]"
              />
            </div>
            <hr className="border-gray-400 border" />
            <p
              className={`${poppins.className} font-bold xl:text-4xl md:text-3xl text-2xl leading-tight`}
            >
              MEET THE TEAM
            </p>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <p
            className="text-justify text-sm sm:text-base md:text-lg leading-relaxed"
            style={{ fontFamily: '"Book Antiqua", serif' }}
          >
            Strong voices. Bold visions. Meet the women and allies driving
            equality and empowerment forward. Our strength lies in unity. The
            incredible women and allies in our team are at the heart of
            everything we do — leading initiatives, empowering communities, and
            standing firm for justice and equality.
          </p>
        </div>
      </section>

      {/* Bottom Section - Team Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-6">
        {teamMembers.map((team, index) => (
          <div key={index} className="flex flex-col">
            <Image
              src={team.img}
              alt={team.name}
              width={400}
              height={400}
              className="object-cover w-full h-auto rounded-lg"
            />
            <div className="mt-3 md:mt-4">
              <h2
                className={`${poppins.className} font-bold text-lg md:text-xl`}
              >
                {team.name}
              </h2>
              <p
                className="text-sm md:text-base text-gray-600"
                style={{ fontFamily: '"Book Antiqua", serif' }}
              >
                {team.designation}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Team;
