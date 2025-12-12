"use client";
import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";
import hero from "@/public/rebuild/hero.png";
import frame from "@/public/rebuild/Frame 51.png";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { client } from "@/sanity/lib/client";

interface Data {
  category: string;
  img?: string;
  des: string;
  title: string;
  date: string;
  video?: string;
}

interface Project {
  title: string;
  img?: string;
  date: string;
  status: string;
  des: string;
  fundedBy: string;
}

interface Events {
  title: string;
  img?: string;
  date: string;
  status: string;
  des: string;
  timeLeft?: string;
}

const projectsCategory = ["All Projects", "Ongoing", "Completed"];
const eventsCategory = ["All Events", "Ongoing", "Upcoming"];

const Page = () => {
  const [highlightData, setHighlightData] = useState<Data | null>(null);
  const [featuredStoryData, setFeaturedStoryData] = useState<Data | null>(null);
  const [latestNewsData, setLatestNewsData] = useState<Data | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [events, setEvents] = useState<Events[]>([]);
  const [activeProjectCategory, setActiveProjectCategory] = useState(0);
  const [activeEventCategory, setActiveEventCategory] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to create URL slug
  const createSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };

  // Helper function to extract YouTube video ID
  const getYouTubeEmbedUrl = (url: string): string => {
    try {
      const videoId = url.match(
        /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([^&\n?#]+)/
      )?.[1];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    } catch {
      return url;
    }
  };

  // Helper function to format date
  const formatDate = (dateString: string): string => {
    if (!dateString) return "Date unavailable";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;

      return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  // Smooth scroll handler
  const handleScrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Fetch only ONE item per category: Highlight, Featured Stories, Latest News
  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch only 1 highlight (most recent)
        const highlightResult = await client.fetch(`
          *[_type == "newsUpdate" && category == "highlight"] | order(date desc)[0...1]{
            title,
            category,
            date,
            des,
            "img": img.asset->url,
            video
          }
        `);
        setHighlightData(
          highlightResult && highlightResult.length > 0
            ? highlightResult[0]
            : null
        );

        // Fetch only 1 featured story (most recent)
        const featuredResult = await client.fetch(`
          *[_type == "newsUpdate" && category == "FEATURED_STORIES"] | order(date desc)[0...1]{
            title,
            category,
            date,
            des,
            "img": img.asset->url,
            video
          }
        `);
        setFeaturedStoryData(
          featuredResult && featuredResult.length > 0 ? featuredResult[0] : null
        );

        // Fetch only 1 latest news (most recent)
        const latestResult = await client.fetch(`
          *[_type == "newsUpdate" && category == "LATEST_NEWS"] | order(date desc)[0...1]{
            title,
            category,
            date,
            des,
            "img": img.asset->url,
            video
          }
        `);
        setLatestNewsData(
          latestResult && latestResult.length > 0 ? latestResult[0] : null
        );
      } catch (err) {
        console.error("Error fetching updates:", err);
        setError("Failed to load updates");
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, []);

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = `
        *[_type == "project"] | order(date desc) {
          title,
          date,
          status,
          des,
          fundedBy,
          "img": img.asset->url,
        }`;

        const result: Project[] = await client.fetch(query);
        setProjects(result || []);
      } catch (error) {
        console.error("Error fetching projects from Sanity:", error);
      }
    };

    fetchProjects();
  }, []);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const query = `
        *[_type == "event"] | order(date desc) {
          title,
          date,
          status,
          des,
          timeLeft,
          "img": img.asset->url,
        }`;

        const result: Events[] = await client.fetch(query);
        setEvents(result || []);
      } catch (error) {
        console.error("Error fetching events from Sanity:", error);
      }
    };

    fetchEvents();
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
          (event) => event.status === eventsCategory[activeEventCategory]
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
              className={`lg:ml-30 text-justify text-lg lg:text-xl text-[#4E4E4E] ${antiquaFont.className}`}
            >
              To share the latest news, activities, and milestones from your
              organization — keeping visitors informed about ongoing advocacy,
              events, and community progress.
            </p>
          </div>
        </section>
      </Container>

      {/* Hero Section */}
      <section className="relative w-full mt-6 sm:mt-8 md:mt-10">
        <Image
          src={hero}
          alt="fellowship-hero"
          width={1000}
          height={600}
          className="w-full h-[350px] sm:h-[500px] md:h-[600px] lg:h-full object-cover"
          priority
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
              onClick={handleScrollToProjects}
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
          className={`flex gap-3 sm:gap-5 text-xs sm:text-base font-semibold mt-5 sm:mt-10 ${poppins.className}`}
        >
          <Link
            href="/"
            className="hover:text-[#FF951B] transition-colors uppercase"
          >
            HOME
          </Link>
          <span>||</span>
          <p className="text-[#818181] uppercase">Sparc Update</p>
        </section>
      </Container>

      {/* Data Content Section */}
      <Container>
        {loading ? (
          <div className="flex justify-center items-center h-64 my-20">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF951B]"></div>
              <p className={`text-xl ${poppins.className}`}>
                Loading updates...
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64 my-20">
            <p className={`text-xl text-red-600 ${poppins.className}`}>
              {error}
            </p>
          </div>
        ) : (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-0 mb-8 sm:mb-10 mt-15 border border-gray-300 sm:mt-20">
            {/* Left Column - Highlight (ONLY 1 ITEM) */}
            <div className="border-r border-gray-300 relative">
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

              <div className="p-6 pt-8">
                {highlightData ? (
                  <Link
                    href={`/sparc-update/${createSlug(highlightData.title)}`}
                    className="cursor-pointer group"
                  >
                    {highlightData.img && (
                      <div className="relative w-full h-[250px] lg:h-[300px] mb-4 overflow-hidden">
                        <Image
                          src={highlightData.img}
                          alt={highlightData.title || "Highlight image"}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <h2
                      className={`text-xl lg:text-2xl font-bold mb-3 group-hover:text-[#FF951B] leading-tight ${poppins.className}`}
                    >
                      {highlightData.title}
                    </h2>
                    <p
                      className={`text-xs text-[#4D4D4D] mb-4 uppercase ${poppins.className}`}
                    >
                      {formatDate(highlightData.date)}
                    </p>
                    <p
                      className={`text-lg lg:text-xl text-gray-700 mb-4 leading-relaxed ${antiquaFont.className}`}
                    >
                      {highlightData.des}
                    </p>
                    <button
                      className={`${poppins.className} group-hover:text-[#FF951B] transition-colors`}
                    >
                      Read More <span>→</span>
                    </button>
                  </Link>
                ) : (
                  <p
                    className={`text-center text-[#4D4D4D] ${poppins.className}`}
                  >
                    No highlights available
                  </p>
                )}
              </div>
            </div>

            {/* Right Column - Featured Stories & Latest News (ONLY 1 ITEM EACH) */}
            <div className="relative">
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
                  FEATURED STORIES
                </h3>
              </div>

              <div className="p-6 lg:pt-8 lg:border-0 border-t border-gray-300">
                {featuredStoryData ? (
                  <Link
                    href={`/sparc-update/${createSlug(featuredStoryData.title)}`}
                    className="mb-6 group cursor-pointer"
                  >
                    {featuredStoryData.img && (
                      <div className="relative w-full h-[300px] mb-3 overflow-hidden">
                        <Image
                          src={featuredStoryData.img}
                          alt={
                            featuredStoryData.title || "Featured story image"
                          }
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <h3
                      className={`text-base group-hover:text-[#FF951B] lg:text-2xl font-bold mb-2 leading-tight ${poppins.className}`}
                    >
                      {featuredStoryData.title}
                    </h3>
                    <p
                      className={`text-lg text-[#4D4D4D] mb-3 ${antiquaFont.className}`}
                    >
                      {featuredStoryData.des.length > 100
                        ? `${featuredStoryData.des.substring(0, 100)}...`
                        : featuredStoryData.des}
                    </p>
                    <div className="flex justify-between items-center">
                      <p
                        className={`text-xs text-[#4D4D4D] uppercase ${poppins.className}`}
                      >
                        {formatDate(featuredStoryData.date)}
                      </p>
                      <button
                        className={`${poppins.className} group-hover:text-[#FF951B] transition-colors`}
                      >
                        Read More <span>→</span>
                      </button>
                    </div>
                  </Link>
                ) : (
                  <p
                    className={`text-center text-[#4D4D4D] ${poppins.className}`}
                  >
                    No featured stories available
                  </p>
                )}
              </div>

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
                  LATEST NEWS
                </h3>
              </div>

              <div className="p-6 border-t border-gray-300">
                {latestNewsData ? (
                  <div className="group cursor-pointer">
                    <div className="relative w-full h-[300px] mb-3 overflow-hidden">
                      {latestNewsData.video ? (
                        <iframe
                          src={getYouTubeEmbedUrl(latestNewsData.video)}
                          className="w-full h-full"
                          title={latestNewsData.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : latestNewsData.img ? (
                        <Image
                          src={latestNewsData.img}
                          alt={latestNewsData.title || "Latest news image"}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                    <h3
                      className={`text-xl lg:text-2xl group-hover:text-[#FF951B] font-bold mb-2 leading-tight ${poppins.className}`}
                    >
                      {latestNewsData.title}
                    </h3>
                    <p
                      className={`text-lg text-[#4D4D4D]  mb-3 ${antiquaFont.className}`}
                    >
                      {latestNewsData.des.length > 80
                        ? `${latestNewsData.des.substring(0, 80)}...`
                        : latestNewsData.des}
                    </p>
                    <div className="flex justify-between items-center">
                      <p
                        className={`text-xs text-[#4D4D4D]  uppercase ${poppins.className}`}
                      >
                        {formatDate(latestNewsData.date)}
                      </p>
                      {latestNewsData.video ? (
                        <Link
                          href={latestNewsData.video}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-sm font-medium flex items-center gap-2 group-hover:text-[#FF951B] transition-colors ${poppins.className}`}
                        >
                          Watch Video <span>→</span>
                        </Link>
                      ) : (
                        <Link
                          href={`/sparc-update/${createSlug(latestNewsData.title)}`}
                          className={`text-sm font-medium flex items-center gap-2 group-hover:text-[#FF951B] transition-colors ${poppins.className}`}
                        >
                          Read More <span>→</span>
                        </Link>
                      )}
                    </div>
                  </div>
                ) : (
                  <p
                    className={`text-center text-[#4D4D4D]  ${poppins.className}`}
                  >
                    No latest news available
                  </p>
                )}
              </div>
            </div>
          </section>
        )}
      </Container>

      {/* Funding and project update section */}
      <Container>
        <section id="projects" className="my-12 sm:my-16 md:my-20">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <h2
              className={`text-2xl lg:text-5xl font-bold mb-3 ${poppins.className}`}
            >
              FUNDING & PROJECT UPDATES
            </h2>
            <p
              className={`mb-3 lg:mb-4 text-base lg:text-lg ${antiquaFont.className} text-[#4D4D4D] `}
            >
              Each update reflects our commitment to accountability,
              collaboration, and positive impact across Indigenous regions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 py-6 sm:py-8 md:py-10 gap-2 sm:gap-0">
            {projectsCategory.map((cat, index) => (
              <div
                key={index}
                className="flex items-center justify-center lg:border-b-2 lg:border-gray-300"
              >
                <button
                  onClick={() => setActiveProjectCategory(index)}
                  className={`${poppins.className} cursor-pointer py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl font-semibold hover:text-[#FF951B] transition-colors ${
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8 sm:mb-10 gap-4 sm:gap-5">
            {combineProjects && combineProjects.length > 0 ? (
              combineProjects.map((project, index) => (
                <Link
                  href={`/sparc-update/${createSlug(project.title)}`}
                  key={`project-${index}`}
                  className="relative"
                >
                  <div className="border cursor-pointer border-gray-300 group p-3 lg:p-4 rounded-lg lg:h-[550px]">
                    {project.img && (
                      <div className="relative w-full h-[250px] sm:h-[300px] mb-3 sm:mb-4 overflow-hidden rounded-lg">
                        <Image
                          src={project.img}
                          alt={project.title || "Project image"}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="mt-4 sm:mt-5 space-y-2 sm:space-y-3">
                      <h2
                        className={`${poppins.className} text-base sm:text-lg font-semibold group-hover:text-[#FF951B]`}
                      >
                        {project.title}
                      </h2>
                      <p
                        className={`${antiquaFont.className} text-sm text-[#4D4D4D]   sm:text-base text-justify line-clamp-3`}
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
                        <p className={`${poppins.className}`}>
                          {formatDate(project.date)}
                        </p>
                        <span className="hidden sm:inline">|</span>
                        <p className={`${poppins.className}`}>
                          Funded By {project.fundedBy}
                        </p>
                      </div>
                      <div className="h-10">
                        <button
                          className={`text-sm sm:text-md mt-3 sm:mt-5 cursor-pointer ${poppins.className} flex items-center gap-2 group-hover:text-[#FF951B] transition-all duration-400`}
                        >
                          View Report <IoIosArrowRoundForward size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className={`text-gray-500 ${poppins.className}`}>
                  No projects available
                </p>
              </div>
            )}
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

          <div className="grid grid-cols-1 sm:grid-cols-3 py-6 sm:py-8 md:py-10 gap-2 sm:gap-0">
            {eventsCategory.map((cat, index) => (
              <div
                key={index}
                className="flex items-center justify-center lg:border-b-2 lg:border-gray-300"
              >
                <button
                  onClick={() => setActiveEventCategory(index)}
                  className={`${poppins.className} cursor-pointer py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl font-semibold hover:text-[#FF951B] transition-colors ${
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8 sm:mb-10 gap-4 sm:gap-5">
            {combineEvents && combineEvents.length > 0 ? (
              combineEvents.map((event, index) => (
                <Link
                  href={`/sparc-update/${createSlug(event.title)}`}
                  key={`event-${index}`}
                  className="relative"
                >
                  <div className="border cursor-pointer border-gray-300 p-3 lg:p-4 group rounded-lg lg:h-[550px]">
                    {event.img && (
                      <div className="relative w-full h-[250px] lg:h-[300px] mb-3 sm:mb-4 overflow-hidden rounded-lg">
                        <Image
                          src={event.img}
                          alt={event.title || "Event image"}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="mt-4 sm:mt-5 space-y-2 sm:space-y-3">
                      <h2
                        className={`${poppins.className} text-base group-hover:text-[#ff951b] lg:text-lg font-semibold`}
                      >
                        {event.title}
                      </h2>
                      <p
                        className={`${antiquaFont.className} text-sm text-[#4D4D4D]  lg:text-base text-justify line-clamp-3`}
                      >
                        {event.des}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 lg:gap-3 text-[#6B6B6B] text-xs">
                        <p
                          className={`font-bold ${
                            event.status === "Upcoming"
                              ? "text-[#36133B]"
                              : "text-[#018F44]"
                          } ${poppins.className}`}
                        >
                          {event.status}
                        </p>
                        <span className="hidden sm:inline">|</span>
                        <p className={`${poppins.className}`}>
                          {formatDate(event.date)}
                        </p>
                        {event.timeLeft && (
                          <>
                            <span className="hidden sm:inline">|</span>
                            <p className={`${poppins.className}`}>
                              {event.timeLeft} Left
                            </p>
                          </>
                        )}
                      </div>
                      <div className="h-10">
                        <button
                          className={`transition-all duration-400 text-sm lg:text-md mt-3 sm:mt-5 cursor-pointer ${poppins.className} flex items-center gap-2 group-hover:text-[#ff951b]`}
                        >
                          View Report <IoIosArrowRoundForward size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className={`text-gray-500 ${poppins.className}`}>
                  No events available
                </p>
              </div>
            )}
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
