"use client";
import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";
import hero from "@/public/rebuild/hero.png";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { client } from "@/sanity/lib/client";
// 1. Import useTranslation
import { useTranslation } from "react-i18next";

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

// NOTE: Category names are kept as is, per user request to only use keys in the JSON.
const projectsCategory = ["All Projects", "Ongoing", "Completed"];
const eventsCategory = ["All Events", "Ongoing", "Upcoming"];

const Page = () => {
  // 2. Initialize useTranslation
  const { t } = useTranslation();

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
    // NOTE: Keeping the logic as is, using 'en-US' locale as a default
    // or assuming t('locale') provides it, but not including the translation key itself.
    if (!dateString) return 'Date unavailable';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;

      // Using a fallback 'en-US' locale since `t('locale', 'en-US')` key is not in the provided JSON
      return date.toLocaleDateString('en-US', {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
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
        // NOTE: Keeping the default error message as the key is not in JSON
        setError("Failed to load updates");
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, []); // Removed [t] from dependency array as per JSON scope

  // Fetch projects when category or page changes
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setProjectsLoading(true);
        const categoryMap: { [key: number]: string } = {
          0: "all",
          1: "Ongoing",
          2: "Completed",
        };

        const status = categoryMap[activeProjectCategory];
        const result = await fetchProjectsPaginated(status, projectPage, 6);
        setProjects(result.data);
        setProjectTotalPages(result.totalPages);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setProjectsLoading(false);
      }
    };

    fetchProjects();
  }, [activeProjectCategory, projectPage]);

  // Fetch events when category or page changes
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setEventsLoading(true);
        const categoryMap: { [key: number]: string } = {
          0: "all",
          1: "Ongoing",
          2: "Upcoming",
        };

        const status = categoryMap[activeEventCategory];
        const result = await fetchEventsPaginated(status, eventPage, 6);
        setEvents(result.data);
        setEventTotalPages(result.totalPages);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setEventsLoading(false);
      }
    };

    fetchEvents();
  }, [activeEventCategory, eventPage]);

  // Reset to page 1 when category changes
  useEffect(() => {
    setProjectPage(1);
  }, [activeProjectCategory]);

  useEffect(() => {
    setEventPage(1);
  }, [activeEventCategory]);

  // Helper functions

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

  const handleScrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Pagination component
  const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
  }: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }) => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-[#FF951B] text-white hover:bg-orange-400"
          } ${poppins.className}`}
        >
          Previous
        </button>

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
              {/* 1. Translate Main Header Title */}
              {t('sparc_update_page.title', 'SPARC UPDATE')}
            </h2>
          </div>
          <div className="w-full lg:w-1/2">
            <p
              className={`lg:ml-30 text-justify text-lg lg:text-xl text-[#4E4E4E] ${antiquaFont.className}`}
            >
              {/* 2. Translate Main Header Description */}
              {t('sparc_update_page.description', "To share the latest news, activities, and milestones from your organization — keeping visitors informed about ongoing advocacy, events, and community progress.")}
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
            {/* 3. Translate Hero Title */}
            {t('sparc_update_page.hero.title', 'SPARC UPDATE')}
          </h2>
          <p
            className={`mb-3 text-lg lg:text-xl max-w-2xl mx-auto px-2 ${antiquaFont.className}`}
          >
            {/* 4. Translate Hero Description */}
            {t('sparc_update_page.hero.description', "Stay connected with the latest updates from our organization — from local initiatives to global advocacy for Indigenous rights.")}
          </p>
          <div className="flex flex-col items-center justify-center mt-6 sm:mt-8 md:mt-10">
            <button
              onClick={handleScrollToProjects}
              className={`bg-[#FF951B] px-6 md:px-10 py-3 sm:py-4 md:py-5 rounded-full cursor-pointer text-xs lg:text-lg font-semibold hover:bg-orange-400 transition-colors ${poppins.className}`}
            >
              {/* 5. Translate Hero Button */}
              {t('sparc_update_page.hero.button', 'VIEW PROJECTS')}
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
            {/* 6. Translate Breadcrumb Home */}
            {t('sparc_update_page.breadcrumb.title', 'HOME')}
          </Link>
          <span>||</span>
          {/* NOTE: t('sparce_update_page.title', 'Sparc Update') is not in JSON, but using the default. */}
          <p className="text-[#818181] uppercase">{t('sparc_update_page.title', 'Sparc Update')}</p>
        </section>
      </Container>

      {/* Highlighted Event Section */}
      <Container>
        {loading ? (
          <div className="flex justify-center items-center h-64 my-20">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF951B]"></div>
              <p className={`text-xl ${poppins.className}`}>
                {/* NOTE: Keeping default message for missing key */}
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
            {/* Left Column - Highlighted Event */}
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
                  HIGHLIGHT EVENT
                </h3>
              </div>

              <div className="p-6 pt-8">
                {highlightedEvent ? (
                  <Link
                    href={`/sparc-update/${highlightedEvent.title}`}
                    className="cursor-pointer group"
                  >
                    {highlightedEvent.img && (
                      <div className="relative w-full h-[250px] lg:h-[300px] mb-4 overflow-hidden">
                        <Image
                          src={highlightData.img}
                          // NOTE: Keeping default alt for missing key
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
                      {highlightedEvent.title}
                    </h2>
                    <p
                      className={`text-xs text-[#4D4D4D] mb-4 uppercase ${poppins.className}`}
                    >
                      {formatDate(highlightedEvent.date)}
                    </p>
                    <div
                      className={`text-lg lg:text-xl text-gray-700 mb-4 leading-relaxed ${antiquaFont.className}`}
                    >
                      <PortableText value={highlightedEvent.description} />
                    </div>
                    <button
                      className={`${poppins.className} group-hover:text-[#FF951B] transition-colors`}
                    >
                      {/* NOTE: Keeping default text for missing key */}
                      Read More <span>→</span>
                    </button>
                  </Link>
                ) : (
                  <p
                    className={`text-center text-[#4D4D4D] ${poppins.className}`}
                  >
                    No highlighted event available
                  </p>
                )}
              </div>
            </div>

            {/* Right Column - Highlighted Projects */}
            <div className="relative">
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
                  HIGHLIGHTED PROJECTS
                </h3>
              </div>

              {highlightedProjects.length > 0 ? (
                highlightedProjects.map((project, index) => (
                  <div
                    key={project._id}
                    className={`p-6 lg:pt-8 ${
                      index === 0 ? "" : "border-t border-gray-300"
                    }`}
                  >
                    {featuredStoryData.img && (
                      <div className="relative w-full h-[300px] mb-3 overflow-hidden">
                        <Image
                          src={featuredStoryData.img}
                          // NOTE: Keeping default alt for missing key
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
                      {project.projectImage && (
                        <div className="relative w-full h-[300px] mb-3 overflow-hidden">
                          <Image
                            src={project.projectImage}
                            alt={project.title || "Highlighted project"}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <h3
                        className={`text-base group-hover:text-[#FF951B] lg:text-2xl font-bold mb-2 leading-tight ${poppins.className}`}
                      >
                        {/* NOTE: Keeping default text for missing key */}
                        Read More <span>→</span>
                      </button>
                    </div>
                  </Link>
                ) : (
                  <p
                    className={`text-center text-[#4D4D4D] ${poppins.className}`}
                  >
                    {/* NOTE: Keeping default text for missing key */}
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
                          // NOTE: Keeping default alt for missing key
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
                      className={`text-lg text-[#4D4D4D]  mb-3 ${antiquaFont.className}`}
                    >
                      {latestNewsData.des.length > 80
                        ? `${latestNewsData.des.substring(0, 80)}...`
                        : latestNewsData.des}
                    </p>
                    <div className="flex justify-between items-center">
                      <p
                        className={`text-xs text-[#4D4D4D]  uppercase ${poppins.className}`}
                      >
                        <PortableText value={project.description} />
                      </div>
                      <div className="flex justify-between items-center">
                        <p
                          className={`text-xs text-[#4D4D4D] uppercase ${poppins.className}`}
                        >
                          {/* NOTE: Keeping default text for missing key */}
                          Watch Video <span>→</span>
                        </Link>
                      ) : (
                        <Link
                          href={`/sparc-update/${createSlug(latestNewsData.title)}`}
                          className={`text-sm font-medium flex items-center gap-2 group-hover:text-[#FF951B] transition-colors ${poppins.className}`}
                        >
                          {/* NOTE: Keeping default text for missing key */}
                          Read More <span>→</span>
                        </button>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="p-6 pt-8">
                  <p
                    className={`text-center text-[#4D4D4D]  ${poppins.className}`}
                  >
                    {/* NOTE: Keeping default text for missing key */}
                    No latest news available
                  </p>
                </div>
              )}
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
              {/* 7. Translate Funding & Project Updates Header */}
              {t('sparc_update_page.updates_section.projects_header', 'FUNDING & PROJECT UPDATES')}
            </h2>
            <p
              className={`mb-3 lg:mb-4 text-base lg:text-lg ${antiquaFont.className} text-[#4D4D4D]`}
            >
              {/* 8. Translate Funding & Project Updates Description */}
              {t('sparc_update_page.updates_section.projects_description', 'Each update reflects our commitment to accountability, collaboration, and positive impact across Indigenous regions.')}
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
                  className={`${poppins.className} cursor-pointer py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl font-semibold hover:text-[#FF951B] transition-colors ${activeProjectCategory === index
                    ? "border-b-2 border-black"
                    : ""
                    }`}
                >
                  {/* NOTE: Project Category names are kept as original strings */}
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
                          // NOTE: Keeping default alt for missing key
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
                        className={`${antiquaFont.className} text-sm text-[#4D4D4D]   sm:text-base text-justify line-clamp-3`}
                      >
                        {project.des}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[#6B6B6B] text-xs">
                        <p
                          className={`font-bold ${project.status === "Ongoing"
                            ? "text-[#F26522]"
                            : "text-[#018F44]"
                            } ${poppins.className}`}
                        >
                          {/* NOTE: Project status is kept as original string/variable content */}
                          {project.status.toLowerCase()}
                        </p>
                        <span className="hidden sm:inline">|</span>
                        <p className={`${poppins.className}`}>
                          {formatDate(project.date)}
                        </p>
                        <span className="hidden sm:inline">|</span>
                        <p className={`${poppins.className}`}>
                          {/* NOTE: Funded By is kept as original string/variable content */}
                          {project.fundedBy}
                        </p>
                      </div>
                      <div className="h-10">
                        <button
                          className={`text-sm sm:text-md mt-3 sm:mt-5 cursor-pointer ${poppins.className} flex items-center gap-2 group-hover:text-[#FF951B] transition-all duration-400`}
                        >
                          {/* NOTE: Keeping default text for missing key */}
                          View Report <IoIosArrowRoundForward size={20} />
                        </button>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <p className={`text-gray-500 ${poppins.className}`}>
                      No projects available
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className={`text-gray-500 ${poppins.className}`}>
                  {/* NOTE: Keeping default text for missing key */}
                  No projects available
                </p>
              </div>

              {/* Projects Pagination */}
              <Pagination
                currentPage={projectPage}
                totalPages={projectTotalPages}
                onPageChange={setProjectPage}
              />
            </>
          )}
        </section>
      </Container>

      {/* Event Announcement */}
      <Container>
        <section className="my-12 sm:my-16 md:my-20">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 ${poppins.className}`}
            >
              {/* 9. Translate Event Announcements Header */}
              {t('sparc_update_page.updates_section.events_header', 'EVENT ANNOUNCEMENTS')}
            </h2>
            <p
              className={`mb-3 sm:mb-4 text-base sm:text-lg ${antiquaFont.className} text-gray-700`}
            >
              {/* 10. Translate Event Announcements Description */}
              {t('sparc_update_page.updates_section.events_description', 'Explore our latest gatherings, campaigns, and community programs supporting Indigenous voices')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 py-6 sm:py-8 md:py-10 gap-2 sm:gap-0">
            {eventsCategory.map((cat, index) => (
              <div
                key={`event-cat-${index}`}
                className="flex items-center justify-center lg:border-b-2 lg:border-gray-300"
              >
                <button
                  onClick={() => setActiveEventCategory(index)}
                  className={`${poppins.className} cursor-pointer py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl font-semibold hover:text-[#FF951B] transition-colors ${activeEventCategory === index
                    ? "border-b-2 border-black"
                    : ""
                    }`}
                >
                  {/* NOTE: Event Category names are kept as original strings */}
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
                          // NOTE: Keeping default alt for missing key
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
                        className={`${antiquaFont.className} text-sm text-[#4D4D4D]  lg:text-base text-justify line-clamp-3`}
                      >
                        {event.des}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 lg:gap-3 text-[#6B6B6B] text-xs">
                        <p
                          className={`font-bold ${event.status === "Upcoming"
                            ? "text-[#36133B]"
                            : "text-[#018F44]"
                            } ${poppins.className}`}
                        >
                          {/* NOTE: Event status is kept as original string/variable content */}
                          {event.status.toLowerCase()}
                        </p>
                        <span className="hidden sm:inline">|</span>
                        <p className={`${poppins.className}`}>
                          {formatDate(event.date)}
                        </p>
                        {event.timeLeft && (
                          <>
                            <span className="hidden sm:inline">|</span>
                            <p className={`${poppins.className}`}>
                              {/* NOTE: Time Left is kept as original string/variable content */}
                              {event.timeLeft}
                            </p>
                          </>
                        )}
                      </div>
                      <div className="h-10">
                        <button
                          className={`transition-all duration-400 text-sm lg:text-md mt-3 sm:mt-5 cursor-pointer ${poppins.className} flex items-center gap-2 group-hover:text-[#ff951b]`}
                        >
                          {/* NOTE: Keeping default text for missing key */}
                          View Report <IoIosArrowRoundForward size={20} />
                        </button>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <p className={`text-gray-500 ${poppins.className}`}>
                      No events available
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className={`text-gray-500 ${poppins.className}`}>
                  {/* NOTE: Keeping default text for missing key */}
                  No events available
                </p>
              </div>

              {/* Events Pagination */}
              <Pagination
                currentPage={eventPage}
                totalPages={eventTotalPages}
                onPageChange={setEventPage}
              />
            </>
          )}
        </section>
      </Container>
    </div>
  );
};

export default Page;