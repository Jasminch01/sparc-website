"use client";
import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PortableText } from "next-sanity";
import {
  fetchEventByTitle,
  fetchEventsPaginated,
  type EventData,
} from "@/sanity/queries/eventQueries";
import {
  fetchProjectByTitle,
  fetchRelatedProjects,
  type ProjectData,
} from "@/sanity/queries/projectQueries";

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

const Page = () => {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const [contentItem, setContentItem] = useState<
    ProjectData | EventData | null
  >(null);
  const [contentType, setContentType] = useState<"project" | "event" | null>(
    null
  );
  const [relatedProjects, setRelatedProjects] = useState<ProjectData[]>([]);
  const [relatedEvents, setRelatedEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const fetchContent = async () => {
        if (!slug) {
          setError("No slug provided");
          setLoading(false);
          return;
        }

        const cleanedSlug = slug.split("/").pop() || "";
        const decodedSlug = decodeURIComponent(cleanedSlug);

        const titleFromSlug = decodedSlug.replace(/-/g, " ");

        try {
          setLoading(true);
          setError(null);

          let fetchedContent: ProjectData | EventData | null = null;
          let type: "project" | "event" | null = null;

          // Try to fetch as event first
          fetchedContent = await fetchEventByTitle(titleFromSlug);
          if (fetchedContent) {
            type = "event";
          } else {
            // If not found, try as project
            fetchedContent = await fetchProjectByTitle(titleFromSlug);
            if (fetchedContent) {
              type = "project";
            }
          }

          if (!fetchedContent) {
            setError(`Could not find content matching "${slug}"`);
            setLoading(false);
            return;
          }

          setContentItem(fetchedContent);
          setContentType(type);

          // Fetch related content based on type
          if (type === "project") {
            const projectData = fetchedContent as ProjectData;

            // Fetch related projects (same status, exclude current)
            const relatedProjectsData = await fetchRelatedProjects(
              projectData._id,
              projectData.status,
              3
            );

            setRelatedProjects(relatedProjectsData);
            // Clear related events for projects
            setRelatedEvents([]);
          } else {
            const eventData = fetchedContent as EventData;

            // Fetch more events (exclude current)
            const eventsResponse = await fetchEventsPaginated(undefined, 1, 4);
            const filteredEvents = eventsResponse.data
              .filter((e) => e._id !== eventData._id)
              .slice(0, 3);

            setRelatedEvents(filteredEvents);
            // Clear related projects for events
            setRelatedProjects([]);
          }
        } catch (err) {
          console.error("Error fetching content:", err);
          setError(
            "An error occurred while loading the content. Please try again."
          );
        } finally {
          setLoading(false);
        }
      };

      fetchContent();
    } catch (error) {
      console.log(error);
    }
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <Container>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF951B] mx-auto mb-4"></div>
          </div>
        </div>
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h1 className={`text-2xl font-bold ${poppins.className}`}>
            Error Loading Content
          </h1>
          <p className={`text-gray-600 ${antiquaFont.className} max-w-md`}>
            {error}
          </p>
          <Link
            href="/sparc-update"
            className={`mt-4 inline-block bg-[#FF951B] text-white px-6 py-3 rounded-full hover:bg-orange-400 transition-colors ${poppins.className}`}
          >
            Back to SPARC Updates
          </Link>
        </div>
      </Container>
    );
  }

  // Not found state
  if (!contentItem || !contentType) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center">
          <div className="text-gray-400 text-6xl mb-4">📄</div>
          <h1 className={`text-2xl font-bold ${poppins.className}`}>
            Content Not Found
          </h1>
          <p className={`text-gray-600 ${antiquaFont.className} max-w-md`}>
            The page you are looking for does not exist.
          </p>
          <Link
            href="/sparc-update"
            className={`mt-4 inline-block bg-[#FF951B] text-white px-6 py-3 rounded-full hover:bg-orange-400 transition-colors ${poppins.className}`}
          >
            Back to SPARC Updates
          </Link>
        </div>
      </Container>
    );
  }

  const isProject = contentType === "project";
  const projectData = isProject ? (contentItem as ProjectData) : null;
  const eventData = !isProject ? (contentItem as EventData) : null;

  return (
    <div className="my-20">
      <Container>
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className={`flex uppercase items-center gap-2 sm:gap-3 lg:gap-5 my-5 lg:my-10 ${poppins.className} text-[8px] sm:text-xs lg:text-base flex-wrap`}
        >
          <Link
            href="/"
            className="font-bold hover:text-[#FF951B] transition-colors"
          >
            HOME
          </Link>
          <span className="text-gray-400">||</span>

          <Link
            href="/sparc-update"
            className="font-bold hover:text-[#FF951B] transition-colors"
          >
            SPARC-UPDATE
          </Link>

          <span className="text-gray-400">||</span>
          <span className="font-bold text-gray-400">
            {contentType === "project" ? "PROJECTS" : "EVENTS"}
          </span>
          <span className="text-gray-400">||</span>

          <span className="text-[#818181] break-all" aria-current="page">
            {contentItem.title}
          </span>
        </nav>

        <article className="mb-12 sm:mb-16 lg:mb-20">
          {/* Featured Image */}
          {((isProject && projectData?.projectImage) ||
            (!isProject && eventData?.img)) && (
            <div className="relative w-full aspect-video overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={isProject ? projectData!.projectImage! : eventData!.img!}
                alt={`Featured image for ${contentItem.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                priority
              />
            </div>
          )}

          {/* Header */}
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-5 mt-6 sm:mt-8 lg:mt-10">
            <h1
              className={`${poppins.className} text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight`}
            >
              {contentItem.title}
            </h1>
            <time
              dateTime={contentItem.date}
              className={`${poppins.className} text-xs sm:text-sm text-gray-600 whitespace-nowrap`}
            >
              {formatDate(contentItem.date)}
            </time>
          </header>

          {/* Status and Meta Information */}
          <div className="mt-4 flex flex-wrap gap-2">
            {isProject && projectData && (
              <>
                <span
                  className={`${poppins.className} inline-block px-3 py-1 text-xs font-medium rounded-full ${
                    projectData.status === "Ongoing"
                      ? "bg-[#F26522] text-white"
                      : "bg-[#018F44] text-white"
                  }`}
                >
                  {projectData.status}
                </span>
                <span
                  className={`${poppins.className} inline-block px-3 py-1 text-xs font-medium bg-gray-200 text-gray-700 rounded-full`}
                >
                  Funded by: {projectData.fundedBy}
                </span>
              </>
            )}

            {!isProject && eventData && (
              <>
                <span
                  className={`${poppins.className} inline-block px-3 py-1 text-xs font-medium rounded-full ${
                    eventData.status === "Upcoming"
                      ? "bg-[#36133B] text-white"
                      : "bg-[#018F44] text-white"
                  }`}
                >
                  {eventData.status}
                </span>
                {eventData.timeLeft && (
                  <span
                    className={`${poppins.className} inline-block px-3 py-1 text-xs font-medium bg-[#FF951B] text-white rounded-full`}
                  >
                    {eventData.timeLeft} Left
                  </span>
                )}
              </>
            )}
          </div>

          {/* Description */}
          <div
            className={`${antiquaFont.className} text-sm sm:text-base lg:text-lg leading-relaxed mt-6 sm:mt-8 text-gray-700`}
          >
            <PortableText value={contentItem.description} />
          </div>
        </article>

        {/* Related Projects - Only show for projects */}
        {isProject && relatedProjects.length > 0 && (
          <section className="mb-12 sm:mb-16 lg:mb-20">
            <h2
              className={`${poppins.className} text-xl sm:text-2xl font-semibold mb-6`}
            >
              Related Projects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((project) => (
                <Link
                  href={`/sparc-update/${project.title}`}
                  key={project._id}
                  className="border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  {project.projectImage && (
                    <div className="relative w-full aspect-video bg-gray-100">
                      <Image
                        src={project.projectImage}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="p-4">
                    <h3
                      className={`${poppins.className} font-medium text-base mb-2 group-hover:text-[#FF951B]`}
                    >
                      {project.title}
                    </h3>
                    <div
                      className={`${antiquaFont.className} text-sm text-gray-600 mb-3 line-clamp-2`}
                    >
                      <PortableText value={project.description} />
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className={poppins.className}>
                        {formatDate(project.date)}
                      </span>
                      <span
                        className={`${poppins.className} px-2 py-1 rounded ${
                          project.status === "Ongoing"
                            ? "bg-orange-100 text-orange-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Events - Only show for events */}
        {!isProject && relatedEvents.length > 0 && (
          <section className="mb-20 sm:mb-32 lg:mb-40">
            <h2
              className={`${poppins.className} text-xl sm:text-2xl font-semibold mb-6`}
            >
              More Events
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedEvents.map((event) => (
                <Link
                  href={`/sparc-update/${event.title}`}
                  key={event._id}
                  className="border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  {event.img && (
                    <div className="relative w-full aspect-video bg-gray-100">
                      <Image
                        src={event.img}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="p-4">
                    <h3
                      className={`${poppins.className} font-medium text-base mb-2 group-hover:text-[#FF951B]`}
                    >
                      {event.title}
                    </h3>
                    <div
                      className={`${antiquaFont.className} text-sm text-gray-600 mb-3 line-clamp-2`}
                    >
                      <PortableText value={event.description} />
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className={`${poppins.className} text-gray-500`}>
                        {formatDate(event.date)}
                      </span>
                      {event.timeLeft && (
                        <span
                          className={`${poppins.className} px-2 py-1 bg-[#FF951B] text-white rounded`}
                        >
                          {event.timeLeft}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
};

export default Page;
