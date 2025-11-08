import Image from "next/image";
import storyTwo from "../../public/Stories/story 2.png";
import storyThree from "../../public/Stories/story 3.png";
import storyFour from "../../public/Stories/story 4.png";
import { poppins } from "../utils/font";

const stories = [
  {
    img: storyTwo,
    date: "8 OCTOBER, 2025",
    title: "Indigenous people at risk people at risk",
    des: "Empowering indigenous women and communities to rise against systemic oppression, reclaim their voices Empowering indigenous women and communities .....",
  },
  {
    img: storyFour,
    date: "8 OCTOBER, 2025",
    title: "Indigenous people at risk people at risk",
    des: "Empowering indigenous women and communities to rise against systemic oppression, reclaim their voices Empowering indigenous women and communities .....",
  },
  {
    img: storyThree,
    date: "8 OCTOBER, 2025",
    title: "Indigenous people at risk people at risk",
    des: "Empowering indigenous women and communities to rise against systemic oppression, reclaim their voices Empowering indigenous women and communities .....",
  },
];

const Stories = () => {
  return (
    <div className="bg-[#36133B] py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-xl mx-auto text-white space-y-3 md:space-y-4 mb-10 md:mb-12 lg:mb-16">
          <h2
            className={`${poppins.className} font-bold xl:text-4xl md:text-3xl text-2xl `}
          >
            STORIES AND NEWS
          </h2>
          <p
            className="text-sm sm:text-base md:text-lg leading-relaxed px-4"
            style={{ fontFamily: '"Book Antiqua", serif' }}
          >
            Community development is often linked with community work or
            community planning, and may involve stakeholders, foundations.
          </p>
        </div>

        {/* Story Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-6">
          {stories.map((story, index) => (
            <div
              key={index}
              className="flex flex-col bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className="relative w-full h-[200px] sm:h-[220px] md:h-60 lg:h-[260px]">
                <Image
                  src={story.img}
                  alt={story.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bg-white py-5 md:py-6 px-6 md:px-8 lg:px-10 space-y-3 md:space-y-4 lg:space-y-5 grow flex flex-col">
                <p
                  className={`text-[#767676] ${poppins.className} text-xs sm:text-sm`}
                >
                  {story.date}
                </p>
                <h2
                  className={`${poppins.className} font-extrabold text-lg sm:text-xl md:text-2xl leading-tight`}
                >
                  {story.title}
                </h2>
                <p
                  className="text-sm sm:text-base md:text-md text-justify leading-relaxed text-[#4D4D4D] grow"
                  style={{ fontFamily: '"Book Antiqua", serif' }}
                >
                  {story.des}
                </p>
                <button
                  className={`text-[#FF7F00] border-b border-[#FF7F00] ${poppins.className} text-sm md:text-base hover:text-[#cc6600] hover:border-[#cc6600] transition-colors w-fit pb-1`}
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stories;
