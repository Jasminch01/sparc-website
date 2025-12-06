"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { antiquaFont, poppins } from "@/components/utils/font";
import { useEffect, useState } from "react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";

interface ReportDetail {
  _id: string;
  title: string;
  pathTitle: string;
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
  relaseYear?: number;
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
  const { slug } = useParams();
  const [data, setData] = useState<ReportDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setNotFound(false);

        // Fetch all reports/publications
        const allData: ReportDetail[] = await client.fetch(`
          *[_type == "reports" || _type == "publications"]{
            _id,
            title,
            pathTitle,
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
            relaseYear,
            releaseMonth
          }
        `);

        // Find the current item using internal slug
        const currentItem = allData.find((item) => makeSlug(item.title) === slug);

        if (!currentItem) {
          setNotFound(true);
        } else {
          setData(currentItem);
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

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-5 py-20 text-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF951B]"></div>
          <p className={`text-xl text-gray-600 ${poppins.className}`}>
            Loading content...
          </p>
        </div>
      </div>
    );
  }

  // Not found
  if (notFound || !data) {
    return (
      <div className="max-w-7xl mx-auto px-5 py-20 text-center">
        <h1 className={`text-3xl font-bold text-gray-800 ${poppins.className}`}>
          Content Not Found
        </h1>
        <p className={`mt-4 text-gray-600 ${antiquaFont.className} text-lg`}>
          The content you are looking for does not exist.
        </p>
        <Link
          href="/reports-publications"
          className={`inline-block mt-6 bg-[#36133B] text-white px-6 py-3 rounded-full hover:bg-[#4a1a50] transition-colors ${poppins.className}`}
        >
          Back to Reports & Publications
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-10 xl:px-0 py-10 md:py-16 lg:py-20">
      {/* Breadcrumb */}
      <div className={`flex gap-3 mb-8 text-sm ${poppins.className} font-semibold`}>
        <Link href="/" className="hover:text-[#FF951B] transition-colors">
          HOME
        </Link>
        <span>||</span>
        <Link
          href="/reports-publications"
          className="hover:text-[#FF951B] transition-colors"
        >
          REPORTS & PUBLICATIONS
        </Link>
        <span>||</span>
        <p className="text-[#818181]">{data.category.toUpperCase()}</p>
      </div>

      {/* Content */}
      <div className="space-y-8">
        <h1 className={`text-2xl md:text-4xl lg:text-5xl font-bold ${poppins.className}`}>
          {data.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-5">
            <span className={`${antiquaFont.className} text-sm lg:text-lg`}>
              Written on:{" "}
              {new Date(data.writtenOn).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
            <p
              className={`px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm lg:text-lg ${antiquaFont.className}`}
            >
              {data.category}
            </p>
          </div>
          <div>
            <p className={`${poppins.className} text-sm lg:text-lg`}>
              Date: {data.date}
            </p>
          </div>
        </div>

        <div className="w-full">
          {data.img && (
            <Image
              src={data.img}
              alt={data.title}
              width={1000}
              height={400}
              className="w-full rounded-lg object-cover h-[400px]"
            />
          )}
          {data.imgDes && (
            <p className={`mt-2 text-sm text-gray-500 italic ${antiquaFont.className}`}>
              {data.imgDes}
            </p>
          )}
        </div>

        <div
          className={`text-lg leading-relaxed text-gray-700 ${antiquaFont.className} whitespace-pre-line`}
        >
          {data.des}
        </div>

        {/* Publications-specific fields */}
        {data.category === "publications" && (
          <div
            className={`border-t border-gray-400 pt-8 space-y-3 ${antiquaFont.className} text-lg`}
          >
            {data.author && <p><strong>Author:</strong> {data.author}</p>}
            {data.publisher && <p><strong>Publisher:</strong> {data.publisher}</p>}
            {data.publicationLanguage && <p><strong>Language:</strong> {data.publicationLanguage}</p>}
            {data.financialSupportBy && <p><strong>Financial Support By:</strong> {data.financialSupportBy}</p>}
            {data.relaseYear && <p><strong>Release Year:</strong> {data.relaseYear}</p>}
            {data.releaseMonth && <p><strong>Release Month:</strong> {data.releaseMonth}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
