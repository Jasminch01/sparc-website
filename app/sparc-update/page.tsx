"use client";
import Container from "@/components/Container";
import { antiquaFont, jost } from "@/components/utils/font";
import hero from "@/public/rebuild/hero.png";
import frame from "@/public/rebuild/Frame 51.png";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import {
  fetchHighlightedEvent,
  fetchEventsPaginated,
  type EventData,
} from "@/sanity/queries/eventQueries";
import {
  fetchHighlightedProjects,
  fetchProjectsPaginated,
  type ProjectData,
} from "@/sanity/queries/projectQueries";
import { PortableText } from "next-sanity";
import { useTranslation } from "react-i18next";

const projectsCategory = ["All Projects", "Ongoing", "Completed"];
const eventsCategory = ["All Events", "Ongoing", "Upcoming"];

const Page = () => {
  const [highlightedEvent, setHighlightedEvent] = useState<EventData | null>(
    null
  );
  const [highlightedProjects, setHighlightedProjects] = useState<ProjectData[]>(
    []
  );
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [events, setEvents] = useState<EventData[]>([]);
  const [activeProjectCategory, setActiveProjectCategory] = useState(0);
  const [activeEventCategory, setActiveEventCategory] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination states
  const [projectPage, setProjectPage] = useState(1);
  const [eventPage, setEventPage] = useState(1);
  const [projectTotalPages, setProjectTotalPages] = useState(1);
  const [eventTotalPages, setEventTotalPages] = useState(1);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [eventsLoading, setEventsLoading] = useState(false);

  const {t} = useTranslation()

  

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch highlighted event and projects
        const [highlightEvent, highlightProjs] = await Promise.all([
          fetchHighlightedEvent(),
          fetchHighlightedProjects(),
        ]);

        setHighlightedEvent(highlightEvent);
        setHighlightedProjects(highlightProjs);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

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
          } ${jost.className}`}
        >
          Previous
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 rounded ${
                currentPage === page
                  ? "bg-[#FF951B] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } ${jost.className}`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-[#FF951B] text-white hover:bg-orange-400"
          } ${jost.className}`}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="mt-10 sm:mt-12 md:mt-15">
      <Container>
        {/* Top Section */}
        <section className="flex flex-col lg:flex-row justify-between gap-6 sm:gap-8 lg:gap-20">
          <div className="w-full lg:w-1/2">
            <h2
              className={`text-2xl text-center lg:text-start lg:text-5xl max-w-2xl font-extrabold leading-tight ${jost.className}`}
            >
             {t('sparc_update_page.title')}
            </h2>
          </div>
          <div className="w-full lg:w-1/2">
            <p
              className={`lg:ml-30 text-justify text-lg lg:text-xl text-[#6d6b6b] ${antiquaFont.className}`}
            >
             {t('sparc_update_page.description')}
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
            className={`text-2xl lg:text-5xl font-bold mb-3 ${jost.className}`}
          >
          {t("sparc_update_page.hero.title")} 
          </h2>
          <p
            className={`mb-3 text-lg lg:text-xl max-w-2xl mx-auto px-2 ${antiquaFont.className}`}
          >
            {t("sparc_update_page.hero.description")}
          </p>
          <div className="flex flex-col items-center justify-center mt-6 sm:mt-8 md:mt-10">
            <button
              onClick={handleScrollToProjects}
              className={`bg-[#FF951B] px-6 md:px-10 py-3 sm:py-4 md:py-5 rounded-full cursor-pointer text-xs lg:text-lg font-semibold hover:bg-orange-400 transition-colors ${jost.className}`}
            >
              {t("sparc_update_page.hero.button")}
            </button>
          </div>
        </div>
      </section>

      {/* Breadcrumb Section */}
      <Container>
        <section
          className={`flex gap-3 sm:gap-5 text-xs sm:text-base font-semibold mt-5 sm:mt-10 ${jost.className}`}
        >
          <Link
            href="/"
            className="hover:text-[#FF951B] transition-colors uppercase"
          >
            {t("sparc_update_page.breadcrumb.title")}
          </Link>
          <span>||</span>
          <p className="text-[#818181] uppercase">{t("sparc_update_page.hero.title")}</p>
        </section>
      </Container>

      {/* Highlighted Event Section */}
      <Container>
        {loading ? (
          <div className="flex justify-center items-center h-64 my-20">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF951B]"></div>
              <p className={`text-xl ${jost.className}`}>
                Loading updates...
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64 my-20">
            <p className={`text-xl text-red-600 ${jost.className}`}>
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
                  className={`text-xs sm:text-sm font-semibold tracking-wider ${jost.className}`}
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
                          src={highlightedEvent.img}
                          alt={highlightedEvent.title || "Highlight event"}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <h2
                      className={`text-xl lg:text-2xl font-bold mb-3 group-hover:text-[#FF951B] leading-tight ${jost.className}`}
                    >
                      {highlightedEvent.title}
                    </h2>
                    <p
                      className={`text-xs text-[#4D4D4D] mb-4 uppercase ${jost.className}`}
                    >
                      {formatDate(highlightedEvent.date)}
                    </p>
                    <div
                      className={`text-lg lg:text-xl text-[#6d6b6b] mb-4 leading-relaxed ${antiquaFont.className}`}
                    >
                      <PortableText value={highlightedEvent.description} />
                    </div>
                    <button
                      className={`${jost.className} group-hover:text-[#FF951B] transition-colors`}
                    >
                      Read More <span>→</span>
                    </button>
                  </Link>
                ) : (
                  <p
                    className={`text-center text-[#4D4D4D] ${jost.className}`}
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
                  className={`text-xs sm:text-sm font-semibold tracking-wider ${jost.className}`}
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
                    <Link
                      href={`/sparc-update/${project.title}`}
                      className="group cursor-pointer"
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
                        className={`text-base group-hover:text-[#FF951B] lg:text-2xl font-bold mb-2 leading-tight ${jost.className}`}
                      >
                        {project.title}
                      </h3>
                      <div
                        className={`text-lg text-[#6d6b6b] mb-3 line-clamp-3 ${antiquaFont.className}`}
                      >
                        <PortableText value={project.description} />
                      </div>
                      <div className="flex justify-between items-center">
                        <p
                          className={`text-xs text-[#6d6b6b] uppercase ${jost.className}`}
                        >
                          {formatDate(project.date)}
                        </p>
                        <button
                          className={`${jost.className} group-hover:text-[#FF951B] transition-colors`}
                        >
                          Read More <span>→</span>
                        </button>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="p-6 pt-8">
                  <p
                    className={`text-center text-[#6d6b6b] ${jost.className}`}
                  >
                    No highlighted projects available
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
              className={`text-2xl lg:text-5xl font-bold mb-3 ${jost.className}`}
            >
              {t("sparc_update_page.updates_section.projects_header")}
            </h2>
            <p
              className={`mb-3 lg:mb-4 text-base lg:text-lg ${antiquaFont.className} text-[#4D4D4D]`}
            >
              {t("sparc_update_page.updates_section.projects_description")}
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
                  className={`${jost.className} cursor-pointer py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl font-semibold hover:text-[#FF951B] transition-colors ${
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

          {projectsLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF951B]"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8 sm:mb-10 gap-4 sm:gap-5">
                {projects && projects.length > 0 ? (
                  projects.map((project) => (
                    <Link
                      href={`/sparc-update/${project.title}`}
                      key={`project-${project._id}`}
                      className="relative"
                    >
                      <div className="border cursor-pointer border-gray-300 group p-3 lg:p-4 rounded-lg lg:h-[550px]">
                        {project.projectImage && (
                          <div className="relative w-full h-[250px] sm:h-[300px] mb-3 sm:mb-4 overflow-hidden rounded-lg">
                            <Image
                              src={project.projectImage}
                              alt={project.title || "Project image"}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="mt-4 sm:mt-5 space-y-2 sm:space-y-3">
                          <h2
                            className={`${jost.className} text-base sm:text-lg font-semibold group-hover:text-[#FF951B]`}
                          >
                            {project.title}
                          </h2>
                          <div
                            className={`${antiquaFont.className} text-sm text-[#6d6b6b] sm:text-base text-justify line-clamp-3`}
                          >
                            <PortableText value={project.description} />
                          </div>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[#6d6b6b] text-xs">
                            <p
                              className={`font-bold ${
                                project.status === "Ongoing"
                                  ? "text-[#F26522]"
                                  : "text-[#018F44]"
                              } ${jost.className}`}
                            >
                              {project.status}
                            </p>
                            <span className="hidden sm:inline">|</span>
                            <p className={`${jost.className}`}>
                              {formatDate(project.date)}
                            </p>
                            <span className="hidden sm:inline">|</span>
                            <p className={`${jost.className}`}>
                              Funded By {project.fundedBy}
                            </p>
                          </div>
                          <div className="h-10">
                            <button
                              className={`text-sm sm:text-md mt-3 sm:mt-5 cursor-pointer ${jost.className} flex items-center gap-2 group-hover:text-[#FF951B] transition-all duration-400`}
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
                    <p className={`text-gray-500 ${jost.className}`}>
                      No projects available
                    </p>
                  </div>
                )}
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
              className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 ${jost.className}`}
            >
              {t("sparc_update_page.updates_section.events_header")}
            </h2>
            <p
              className={`mb-3 sm:mb-4 text-base sm:text-lg ${antiquaFont.className} text-gray-500`}
            >
               {t("sparc_update_page.updates_section.events_description")}
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
                  className={`${jost.className} cursor-pointer py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl font-semibold hover:text-[#FF951B] transition-colors ${
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

          {eventsLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF951B]"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8 sm:mb-10 gap-4 sm:gap-5">
                {events && events.length > 0 ? (
                  events.map((event) => (
                    <Link
                      href={`/sparc-update/${event.title}`}
                      key={`event-${event._id}`}
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
                            className={`${jost.className} text-base group-hover:text-[#ff951b] lg:text-lg font-semibold`}
                          >
                            {event.title}
                          </h2>
                          <div
                            className={`${antiquaFont.className} text-sm text-[#6d6b6b] lg:text-base text-justify line-clamp-3`}
                          >
                            <PortableText value={event.description} />
                          </div>
                          <div className="flex flex-wrap items-center gap-2 lg:gap-3 text-[#6d6b6b] text-xs">
                            <p
                              className={`font-bold ${
                                event.status === "Upcoming"
                                  ? "text-[#36133B]"
                                  : "text-[#018F44]"
                              } ${jost.className}`}
                            >
                              {event.status}
                            </p>
                            <span className="hidden sm:inline">|</span>
                            <p className={`${jost.className}`}>
                              {formatDate(event.date)}
                            </p>
                            {event.timeLeft && (
                              <>
                                <span className="hidden sm:inline">|</span>
                                <p className={`${jost.className}`}>
                                  {event.timeLeft} Left
                                </p>
                              </>
                            )}
                          </div>
                          <div className="h-10">
                            <button
                              className={`transition-all duration-400 text-sm lg:text-md mt-3 sm:mt-5 cursor-pointer ${jost.className} flex items-center gap-2 group-hover:text-[#ff951b]`}
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
                    <p className={`text-gray-500 ${jost.className}`}>
                      No events available
                    </p>
                  </div>
                )}
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
