"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { antiquaFont, poppins } from "@/components/utils/font";
import { useEffect, useState } from "react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import Container from "@/components/Container";
import { IoArrowBack } from "react-icons/io5";

interface ReportDetail {
  _id: string;
  title: string;
  writtenOn: string;
  des: string;
  img: string;
  category: "reports" | "publications";
  date: string;
  imgDes?: string;
  publisher?: string;
  author?: string;
  publicationLanguage?: string;
  financialSupportBy?: string;
  releaseYear?: number;
  releaseMonth?: string;
}

// Function to convert title → slug internally
const makeSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

const Page = () => {
  const params = useParams();
  const slug = params?.slug as string | undefined;

  const [data, setData] = useState<ReportDetail | null>(null);
  const [relatedItems, setRelatedItems] = useState<ReportDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setNotFound(false);

        // Fetch all reports and publications
        const allData: ReportDetail[] = await client.fetch(`
          *[_type == "reports"] | order(writtenOn desc) {
            _id,
            title,
            writtenOn,
            des,
            "img": img.asset->url,
            category,
            date,
            imgDes,
            publisher,
            author,
            publicationLanguage,
            financialSupportBy,
            releaseYear,
            releaseMonth
          }
        `);

        // Safety check
        if (!allData || allData.length === 0) {
          setNotFound(true);
          return;
        }

        // Find the current item using internal slug
        const currentItem = allData.find(
          (item) => makeSlug(item.title) === slug
        );

        if (!currentItem) {
          setNotFound(true);
        } else {
          setData(currentItem);

          // Get related items (same category, same date range, exclude current)
          const related = allData
            .filter(
              (item) =>
                item.category === currentItem.category &&
                item.date === currentItem.date &&
                item._id !== currentItem._id
            )
            .slice(0, 3);
          setRelatedItems(related);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  // Format date helper
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

  // Loading state
  if (loading) {
    return (
      <Container>
        <div className="max-w-7xl mx-auto py-20 text-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF951B]"></div>
            <p className={`text-xl text-gray-600 ${poppins.className}`}>
              Loading content...
            </p>
          </div>
        </div>
      </Container>
    );
  }

  // Not found
  if (notFound || !data) {
    return (
      <Container>
        <div className="max-w-7xl mx-auto py-20 text-center">
          <h1
            className={`text-3xl font-bold text-gray-800 mb-4 ${poppins.className}`}
          >
            Content Not Found
          </h1>
          <p
            className={`text-gray-600 mb-6 ${antiquaFont.className} text-lg`}
          >
            The report or publication you are looking for does not exist or has
            been removed.
          </p>
          <Link
            href="/reports-publications"
            className={`inline-flex items-center gap-2 bg-[#36133B] text-white px-6 py-3 rounded-full hover:bg-[#4a1a50] transition-colors ${poppins.className} font-semibold`}
          >
            <IoArrowBack /> Back to Reports & Publications
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="max-w-7xl mx-auto py-10 md:py-16 lg:py-20">
        {/* Breadcrumb */}
        <div
          className={`flex gap-3 sm:gap-5 mb-6 lg:mb-8 text-xs sm:text-sm ${poppins.className} font-semibold flex-wrap items-center`}
        >
          <Link
            href="/"
            className="hover:text-[#FF951B] transition-colors uppercase"
          >
            HOME
          </Link>
          <span className="text-gray-400">||</span>
          <Link
            href="/reports-publications"
            className="hover:text-[#FF951B] transition-colors uppercase"
          >
            REPORTS & PUBLICATIONS
          </Link>
          <span className="text-gray-400">||</span>
          <p className="text-[#818181] uppercase">{data.category}</p>
        </div>

        {/* Content */}
        <div className="space-y-6 lg:space-y-8">
          {/* Category Badge */}
          <div className="mb-4">
            <span
              className={`inline-block px-4 py-2 ${data.category === "reports"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-purple-100 text-purple-600"
                } rounded-full text-sm font-semibold uppercase ${poppins.className}`}
            >
              {data.category}
            </span>
          </div>

          {/* Title */}
          <h1
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${poppins.className}`}
          >
            {data.title}
          </h1>

          {/* Meta Info */}
          <div
            className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 pb-6 border-b border-gray-200 ${poppins.className}`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
              <span className="text-gray-600">
                Written on:{" "}
                <span className="text-black font-semibold">
                  {formatDate(data.writtenOn)}
                </span>
              </span>
            </div>
            <div className="text-sm text-gray-600">
              Date Range: <span className="font-semibold">{data.date}</span>
            </div>
          </div>

          {/* Description */}
          <p
            className={`text-lg lg:text-xl leading-relaxed text-gray-700 ${antiquaFont.className}`}
          >
            {data.des}
          </p>

          {/* Featured Image */}
          {data.img && (
            <div className="w-full rounded-lg overflow-hidden">
              <Image
                src={data.img}
                alt={data.title}
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
              {data.imgDes && (
                <p
                  className={`mt-3 text-sm text-gray-600 italic ${antiquaFont.className}`}
                >
                  {data.imgDes}
                </p>
              )}
            </div>
          )}

          {/* Publications-specific Information */}
          {data.category === "publications" && (
            <div className="bg-gray-50 rounded-lg p-6 lg:p-8 space-y-4 border border-gray-200">
              <h2
                className={`text-xl lg:text-2xl font-bold mb-4 ${poppins.className}`}
              >
                Publication Details
              </h2>
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${antiquaFont.className} text-base lg:text-lg`}
              >
                {data.author && (
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-700">Author:</span>
                    <span className="text-gray-600">{data.author}</span>
                  </div>
                )}
                {data.publisher && (
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-700">Publisher:</span>
                    <span className="text-gray-600">{data.publisher}</span>
                  </div>
                )}
                {data.publicationLanguage && (
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-700">Language:</span>
                    <span className="text-gray-600">
                      {data.publicationLanguage}
                    </span>
                  </div>
                )}
                {data.releaseYear && (
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-700">
                      Release Year:
                    </span>
                    <span className="text-gray-600">{data.releaseYear}</span>
                  </div>
                )}
                {data.releaseMonth && (
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-700">
                      Release Month:
                    </span>
                    <span className="text-gray-600">{data.releaseMonth}</span>
                  </div>
                )}
                {data.financialSupportBy && (
                  <div className="flex flex-col md:col-span-2">
                    <span className="font-bold text-gray-700">
                      Financial Support By:
                    </span>
                    <span className="text-gray-600">
                      {data.financialSupportBy}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Related Items */}
        {relatedItems && relatedItems.length > 0 && (
          <div className="mt-16 lg:mt-20 pt-12 border-t border-gray-200">
            <h2
              className={`text-2xl lg:text-3xl font-bold mb-8 ${poppins.className}`}
            >
              Related {data.category === "reports" ? "Reports" : "Publications"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedItems.map((item) => (
                <Link
                  href={`/reports-publications/${makeSlug(item.title)}`}
                  key={item._id}
                  className="group"
                >
                  <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    {item.img && (
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={item.img}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <span
                        className={`inline-block px-3 py-1 ${item.category === "reports"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-purple-100 text-purple-600"
                          } rounded-full text-xs font-semibold mb-2 uppercase ${poppins.className}`}
                      >
                        {item.category}
                      </span>
                      <h3
                        className={`text-lg font-bold mb-2 group-hover:text-[#FF951B] transition-colors line-clamp-2 ${poppins.className}`}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={`text-sm text-gray-600 line-clamp-2 ${antiquaFont.className}`}
                      >
                        {item.des}
                      </p>
                      <p
                        className={`text-xs text-gray-500 mt-3 ${poppins.className}`}
                      >
                        {formatDate(item.writtenOn)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Page;