"use client";
import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";
import hero from "@/public/rebuild/hero.png";
import frame from "@/public/rebuild/Frame 51.png";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

interface Data {
  category: string;
  img: string;
  des: string;
  title: string;
  date: string;
  video: string;
}
interface Project {
  title: string;
  img: string;
  date: string;
  status: string;
  des: string;
  fundedBy: string;
}
interface Events {
  title: string;
  img: string;
  date: string;
  status: string;
  des: string;
  timeLeft: string;
}

const projectsCategory = ["All Projects", "Ongoing", "Completed"];
const eventsCategory = ["All Events", "Ongoing", "Upcoming"];

const Page = () => {
  const [data, setData] = useState<Data[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [events, setEvents] = useState<Events[]>([]);
  const [activeProjectCategory, setActiveProjectCategory] = useState(0);
  const [activeEventCategory, setActiveEventCategory] = useState(0);

  // Fetch the data
  useEffect(() => {
    fetch("/rebuild/update.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  // Fetch the projects
  useEffect(() => {
    fetch("/rebuild/projects.json")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  // Fetch events data
  useEffect(() => {
    fetch("/rebuild/events.json")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  const combineProjects =
    projectsCategory[activeProjectCategory] === "All Projects"
      ? projects
      : projects.filter(
          (project) =>
            project.status === projectsCategory[activeProjectCategory]
        );

  const combineEvents =
    eventsCategory[activeEventCategory] === "All Events"
      ? events
      : events.filter(
          (project) => project.status === eventsCategory[activeEventCategory]
        );

  return (
    <div className="mt-10 sm:mt-12 md:mt-15">
      <Container>
        {/* Top Section */}
        <section className="flex flex-col lg:flex-row justify-between gap-6 sm:gap-8 lg:gap-20">
          <div className="w-full lg:w-1/2">
            <h2
              className={`text-2xl text-center lg:text-start lg:text-5xl max-w-2xl font-extrabold leading-tight ${poppins.className}`}
            >
             SPARC UPDATE
            </h2>
          </div>
          <div className="w-full lg:w-1/2">
            <p
              className={`lg:ml-30 text-justify text-lg lg:text-xl ${antiquaFont.className}`}
            >
              To share the latest news, activities, and milestones from your
              organization — keeping visitors informed about ongoing advocacy,
              events, and community progress.
            </p>
          </div>
        </section>
      </Container>

      {/* Hero Section */}
      <section className="relative w-full mt-6 sm:mt-8 md:mt-10 ">
        <Image
          src={hero}
          alt="fellowship-hero"
          width={1000}
          height={600}
          className="w-full h-[350px] sm:h-[500px] md:h-[600px] lg:h-full object-cover"
        />
        <div className="absolute top-2/3 lg:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-full px-4">
          <h2
            className={`text-2xl lg:text-5xl font-bold mb-3 ${poppins.className}`}
          >
            SPARC UPDATE
          </h2>
          <p
            className={`mb-3 text-lg lg:text-xl max-w-2xl mx-auto px-2 ${antiquaFont.className}`}
          >
            Stay connected with the latest updates from our organization — from
            local initiatives to global advocacy for Indigenous rights.
          </p>
          <div className="flex flex-col items-center justify-center mt-6 sm:mt-8 md:mt-10">
            <button
              className={`bg-[#FF951B] px-6 md:px-10 py-3 sm:py-4 md:py-5 rounded-full cursor-pointer text-xs lg:text-lg font-semibold hover:bg-orange-400 transition-colors ${poppins.className}`}
            >
              VIEW PROJECTS
            </button>
          </div>
        </div>
      </section>

      {/* Breadcrumb Section */}
      <Container>
        <section
          className={`flex gap-3 sm:gap-5  text-xs sm:text-base font-semibold mt-5  sm:mt-10 ${poppins.className}`}
        >
          <Link href="/" className="hover:text-[#FF951B] transition-colors">
            HOME
          </Link>
          <span>||</span>
          <p className="text-[#818181] uppercase">Sparc Update</p>
        </section>
      </Container>

      {/* Data Content Section */}
      <Container>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-0 mb-8 sm:mb-10 mt-15 border border-gray-300  sm:mt-20">
          {/* Left Column - Highlight */}
          <div className="border-r border-gray-300 relative">
            {/* Header with diagonal cut - positioned outside/above the border */}
            <div
              className="absolute -top-[45px] left-0 w-60 bg-[#303030] text-white px-6 py-3 z-10"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 40px) 0, 100% 100%, 0 100%)",
              }}
            >
              <h3
                className={`text-xs sm:text-sm font-semibold tracking-wider ${poppins.className}`}
              >
                HIGHLIGHT
              </h3>
            </div>

            {/* Content */}
            <div className="p-6 pt-8">
              {data
                .filter((item) => item.category === "highlight")
                .map((item, index) => (
                  <div key={index} className="cursor-pointer group">
                    <div className="relative w-full h-[250px] lg:h-[300px] mb-4">
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h2
                      className={`text-xl lg:text-2xl font-bold mb-3 group-hover:text-[#FF951B] leading-tight ${poppins.className}`}
                    >
                      {item.title}
                    </h2>
                    <p
                      className={`text-xs text-gray-500 mb-4 uppercase ${poppins.className}`}
                    >
                      {item.date}
                    </p>
                    <p
                      className={`text-lg lg:text-xl text-gray-700 mb-4 leading-relaxed ${antiquaFont.className}`}
                    >
                      {item.des}
                    </p>
                    <Link
                      href={`/sparc-update/${item.title
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`}
                      className={`text-sm font-medium flex items-center gap-2 group-hover:text-[#FF951B] transition-colors ${poppins.className}`}
                    >
                      Read More <span>→</span>
                    </Link>
                  </div>
                ))}
            </div>
          </div>

          {/* Right Column - Featured Stories & Latest News */}
          <div className="relative">
            {/* Featured Stories Header with diagonal cut - positioned outside/above the border */}
            <div
              className="absolute -top-[45px] left-0 w-60 bg-[#E5E5E5] text-black px-6 py-3 z-10"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 40px) 0, 100% 100%, 0 100%)",
              }}
            >
              <h3
                className={`text-xs sm:text-sm font-semibold tracking-wider ${poppins.className}`}
              >
                FEATURED_STORIES
              </h3>
            </div>

            {/* Featured Stories Content */}
            <div className="p-6 lg:pt-8 lg:border-0 border-t border-gray-300">
              {data
                .filter((item) => item.category === "FEATURED_STORIES")
                .map((item, index) => (
                  <div key={index} className="mb-6 last:mb-0 group cursor-pointer">
                    <div className="relative w-full h-[300px] mb-3">
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3
                      className={`text-base group-hover:text-[#FF951B] t lg:text-2xl font-bold mb-2 leading-tight ${poppins.className}`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`text-lg text-gray-700 mb-3 ${antiquaFont.className}`}
                    >
                      {item.des.substring(0, 100)}...
                    </p>
                    <div className="flex justify-between items-center">
                      <p
                        className={`text-xs text-gray-500 uppercase ${poppins.className}`}
                      >
                        {item.date}
                      </p>
                      <Link
                        href={`/update/${item.title
                          .replace(/\s+/g, "-")
                          .toLowerCase()}`}
                        className={`text-sm font-medium flex items-center gap-2 group-hover:text-[#FF951B] transition-colors ${poppins.className}`}
                      >
                        Read More <span>→</span>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>

            {/* Latest News Header with diagonal cut - positioned normally in the flow */}
            <div
              className="w-60 bg-[#E5E5E5] text-black px-6 py-3"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 40px) 0, 100% 100%, 0 100%)",
              }}
            >
              <h3
                className={`text-xs sm:text-sm font-semibold tracking-wider ${poppins.className}`}
              >
                LATEST_NEWS
              </h3>
            </div>

            {/* Latest News Content */}
            <div className="p-6 border-t border-gray-300">
              {data
                .filter((item) => item.category === "LATEST_NEWS")
                .map((item, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="relative w-full h-[300px] mb-3 ">
                      {item.img ? (
                        <Image
                          src={item.img}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <iframe
                          src="https://www.youtube.com/embed/OFAXpf9wxgI"
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      )}
                    </div>
                    <h3
                      className={`text-xl lg:text-2xl group-hover:text-[#FF951B] font-bold mb-2 leading-tight ${poppins.className}`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`text-lg text-gray-700 mb-3 ${antiquaFont.className}`}
                    >
                      {item.des.substring(0, 80)}...
                    </p>
                    <div className="flex justify-between items-center">
                      <p
                        className={`text-xs text-gray-500 uppercase ${poppins.className}`}
                      >
                        {item.date}
                      </p>
                      <Link
                        href="https://www.youtube.com/embed/OFAXpf9wxgI"
                        className={`text-sm font-medium flex items-center gap-2 group-hover:text-[#FF951B] transition-colors ${poppins.className}`}
                      >
                        Watch Video <span>→</span>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </Container>

      {/* Funding and project update section */}
      <Container>
        <section className="my-12 sm:my-16 md:my-20">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <h2
              className={`text-2xl lg:text-5xl font-bold mb-3 ${poppins.className}`}
            >
              FUNDING & PROJECT UPDATES
            </h2>
            <p
              className={`mb-3 lg:mb-4 text-base lg:text-lg ${antiquaFont.className} text-gray-500`}
            >
              Each update reflects our commitment to accountability,
              collaboration, and positive impact across Indigenous regions.
            </p>
          </div>

          {/* project Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 py-6 sm:py-8 md:py-10 gap-2 sm:gap-0">
            {projectsCategory.map((cat, index) => (
              <div
                key={index}
                className="flex items-center justify-center lg:border-b-2 lg:border-gray-300"
              >
                <button
                  onClick={() => setActiveProjectCategory(index)}
                  className={`${
                    poppins.className
                  } cursor-pointer py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl font-semibold hover:text-[#FF951B] transition-colors ${
                    activeProjectCategory === index
                      ? "border-b-2 border-black"
                      : ""
                  }`}
                >
                  {cat}
                </button>
              </div>
            ))}
          </div>

          {/* projects Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8 sm:mb-10 gap-4 sm:gap-5">
            {combineProjects.map((project, index) => (
              <div key={index} className="relative">
                <div className="border cursor-pointer border-gray-300 group p-3 lg:p-4 rounded-lg lg:h-[550px] ">
                  <div className="relative w-full h-[250px] sm:h-[300px] mb-3 sm:mb-4">
                    <Image
                      src={project.img}
                      alt={project.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="mt-4 sm:mt-5 space-y-2 sm:space-y-3">
                    <h2
                      className={`${poppins.className} text-base sm:text-lg font-semibold group-hover:text-[#FF951B]`}
                    >
                      {project.title}
                    </h2>
                    <p
                      className={`${antiquaFont.className} text-sm sm:text-base text-justify line-clamp-3`}
                    >
                      {project.des}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[#6B6B6B] text-xs">
                      <p
                        className={`font-bold ${
                          project.status === "Ongoing"
                            ? "text-[#F26522]"
                            : "text-[#018F44]"
                        } ${poppins.className}`}
                      >
                        {project.status}
                      </p>
                      <span className="hidden sm:inline">|</span>
                      <p className={`${poppins.className}`}>{project.date}</p>
                      <span className="hidden sm:inline">|</span>
                      <p className={`${poppins.className}`}>
                        Funded By {project.fundedBy}
                      </p>
                    </div>
                    <div className="h-10">
                      <button
                        className={`text-sm sm:text-md mt-3 sm:mt-5 cursor-pointer ${poppins.className} flex items-center gap-2 group-hover:text-[#FF951B]  transition-all duration-400`}
                      >
                        View Report <IoIosArrowRoundForward size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Container>

      {/* Event Announcement */}
      <Container>
        <section className="my-12 sm:my-16 md:my-20">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 ${poppins.className}`}
            >
              EVENT ANNOUNCEMENTS
            </h2>
            <p
              className={`mb-3 sm:mb-4 text-base sm:text-lg ${antiquaFont.className} text-gray-500`}
            >
              Explore our latest gatherings, campaigns, and community programs
              supporting Indigenous voices
            </p>
          </div>

          {/* event Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 py-6 sm:py-8 md:py-10 gap-2 sm:gap-0">
            {eventsCategory.map((cat, index) => (
              <div
                key={index}
                className="flex items-center justify-center lg:border-b-2 lg:border-gray-300"
              >
                <button
                  onClick={() => setActiveEventCategory(index)}
                  className={`${
                    poppins.className
                  } cursor-pointer py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl font-semibold hover:text-[#FF951B] transition-colors ${
                    activeEventCategory === index
                      ? "border-b-2 border-black"
                      : ""
                  }`}
                >
                  {cat}
                </button>
              </div>
            ))}
          </div>

          {/* events Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8 sm:mb-10 gap-4 sm:gap-5">
            {combineEvents.map((project, index) => (
              <div key={index} className="relative">
                <div className="border cursor-pointer border-gray-300 p-3 lg:p-4 group rounded-lg lg:h-[550px]">
                  <div className="relative w-full h-[250px] lg:h-[300px] mb-3 sm:mb-4">
                    <Image
                      src={project.img}
                      alt={project.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="mt-4 sm:mt-5 space-y-2 sm:space-y-3">
                    <h2
                      className={`${poppins.className} text-base group-hover:text-[#ff951b] lg:text-lg font-semibold`}
                    >
                      {project.title}
                    </h2>
                    <p
                      className={`${antiquaFont.className} text-sm lg:text-base text-justify line-clamp-3`}
                    >
                      {project.des}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 lg:gap-3 text-[#6B6B6B] text-xs">
                      <p
                        className={`font-bold ${
                          project.status === "Upcoming"
                            ? "text-[#36133B]"
                            : "text-[#018F44]"
                        } ${poppins.className}`}
                      >
                        {project.status}
                      </p>
                      <span className="hidden sm:inline">|</span>
                      <p className={`${poppins.className}`}>{project.date}</p>
                      <span className="hidden sm:inline">|</span>
                      <p className={`${poppins.className}`}>
                        {project.timeLeft} Left
                      </p>
                    </div>
                    <div className="h-10">
                      <button
                        className={`transition-all duration-400 text-sm lg:text-md mt-3 sm:mt-5 cursor-pointer ${poppins.className} flex items-center gap-2 group-hover:text-[#ff951b] transition-all duration-400 `}
                      >
                        View Report <IoIosArrowRoundForward size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <Image
          src={frame}
          alt="frame"
          width={2000}
          height={2000}
          className="w-full my-16 sm:my-20 md:my-30"
        />
      </Container>
    </div>
  );
};

export default Page;
