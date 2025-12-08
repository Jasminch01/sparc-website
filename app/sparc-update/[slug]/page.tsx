"use client";
import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Update {
  title: string;
  category: string;
  date: string;
  des: string;
  img: string;
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

// Unified slug generator   
const createSlug = (title: string): string => {
  if (!title) return "";
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
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

const Page = () => {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const [contentItem, setContentItem] = useState<
    Update | Project | Events | null
  >(null);
  const [contentType, setContentType] = useState<
    "update" | "project" | "event" | null
  >(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [relatedEvents, setRelatedEvents] = useState<Events[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [updatesData, projectsData, eventsData] = await Promise.all([
          client.fetch<Update[]>(`
            *[_type == "newsUpdate"] | order(date desc){
              title,
              category,
              date,
              des,
              "img": img.asset->url,
              video
            }
          `),
          client.fetch<Project[]>(`
            *[_type == "project"] | order(date desc) {
              title,
              date,
              status,
              des,
              fundedBy,
              "img": img.asset->url,
            }
          `),
          client.fetch<Events[]>(`
            *[_type == "event"] | order(date desc) {
              title,
              date,
              status,
              des,
              timeLeft,
              "img": img.asset->url,
            }
          `),
        ]);

        // 🔥 Type-safe matchedItem
        let matchedItem: Update | Project | Events | undefined =
          updatesData.find(
            (item) => createSlug(item.title) === slug
          );

        let type: "update" | "project" | "event" | null = matchedItem
          ? "update"
          : null;

        if (!matchedItem) {
          matchedItem = projectsData.find(
            (item) => createSlug(item.title) === slug
          );
          type = matchedItem ? "project" : null;
        }

        if (!matchedItem) {
          matchedItem = eventsData.find(
            (item) => createSlug(item.title) === slug
          );
          type = matchedItem ? "event" : null;
        }

        setContentItem(matchedItem || null);
        setContentType(type);

        setRelatedProjects(
          projectsData
            .filter((p) => createSlug(p.title) !== slug)
            .slice(0, 3)
        );

        setRelatedEvents(
          eventsData
            .filter((e) => createSlug(e.title) !== slug)
            .slice(0, 3)
        );
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchAllData();
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <Container>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF951B] mx-auto mb-4"></div>
            <p className={`${poppins.className} text-sm sm:text-base text-gray-600`}>
              Loading...
            </p>
          </div>
        </div>
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center">
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
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center">
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

  return (
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

        <span className="text-[#818181] break-all" aria-current="page">
          {slug}
        </span>
      </nav>

      <article className="mb-12 sm:mb-16 lg:mb-20">
        {contentItem.img && (
          <div className="relative w-full aspect-video overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={contentItem.img}
              alt={`Featured image for ${contentItem.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              priority
            />
          </div>
        )}

        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-5 mt-6 sm:mt-8 lg:mt-10">
          <h1
            className={`${poppins.className} text-base sm:text-lg lg:text-xl xl:text-2xl font-medium leading-tight`}
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

        {/* Category or Status */}
        <div className="mt-4 flex flex-wrap gap-2">
          {contentType === "update" && (contentItem as Update).category && (
            <span
              className={`${poppins.className} inline-block px-3 py-1 text-xs font-medium bg-[#36133B] text-white rounded-full`}
            >
              {(contentItem as Update).category}
            </span>
          )}

          {contentType === "project" && (
            <>
              <span
                className={`${poppins.className} inline-block px-3 py-1 text-xs font-medium rounded-full ${(contentItem as Project).status === "Ongoing"
                    ? "bg-[#F26522] text-white"
                    : "bg-[#018F44] text-white"
                  }`}
              >
                {(contentItem as Project).status}
              </span>
              <span
                className={`${poppins.className} inline-block px-3 py-1 text-xs font-medium bg-gray-200 text-gray-700 rounded-full`}
              >
                Funded by: {(contentItem as Project).fundedBy}
              </span>
            </>
          )}

          {contentType === "event" && (
            <>
              <span
                className={`${poppins.className} inline-block px-3 py-1 text-xs font-medium rounded-full ${(contentItem as Events).status === "Upcoming"
                    ? "bg-[#36133B] text-white"
                    : "bg-[#018F44] text-white"
                  }`}
              >
                {(contentItem as Events).status}
              </span>
              {(contentItem as Events).timeLeft && (
                <span
                  className={`${poppins.className} inline-block px-3 py-1 text-xs font-medium bg-[#FF951B] text-white rounded-full`}
                >
                  {(contentItem as Events).timeLeft} Left
                </span>
              )}
            </>
          )}
        </div>

        {/* Description */}
        <div
          className={`${antiquaFont.className} text-sm sm:text-base lg:text-lg leading-relaxed mt-4 sm:mt-5 text-gray-700 whitespace-pre-line`}
        >
          {contentItem.des}
        </div>

        {/* Video section */}
        {contentType === "update" && (contentItem as Update).video && (
          <div className="relative w-full aspect-video mt-6 sm:mt-8 lg:mt-10 rounded-lg overflow-hidden bg-gray-900">
            <iframe
              src={getYouTubeEmbedUrl((contentItem as Update).video!)}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              title={`Video: ${contentItem.title}`}
              loading="lazy"
            />
          </div>
        )}
      </article>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="mb-12 sm:mb-16 lg:mb-20">
          <h2 className={`${poppins.className} text-xl sm:text-2xl font-semibold mb-6`}>
            Related Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProjects.map((project, index) => (
              <Link
                href={`/sparc-update/${createSlug(project.title)}`}
                key={index}
                className="border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
              >
                {project.img && (
                  <div className="relative w-full aspect-video bg-gray-100">
                    <Image
                      src={project.img}
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
                  <p
                    className={`${antiquaFont.className} text-sm text-gray-600 mb-3 line-clamp-2`}
                  >
                    {project.des}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className={poppins.className}>
                      {formatDate(project.date)}
                    </span>
                    <span
                      className={`${poppins.className} px-2 py-1 rounded ${project.status === "Ongoing"
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

      {/* Upcoming Events */}
      {relatedEvents.length > 0 && (
        <section className="mb-20 sm:mb-32 lg:mb-40">
          <h2 className={`${poppins.className} text-xl sm:text-2xl font-semibold mb-6`}>
            Upcoming Events
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedEvents.map((event, index) => (
              <Link
                href={`/sparc-update/${createSlug(event.title)}`}
                key={index}
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
                  <p
                    className={`${antiquaFont.className} text-sm text-gray-600 mb-3 line-clamp-2`}
                  >
                    {event.des}
                  </p>

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
  );
};

export default Page;
