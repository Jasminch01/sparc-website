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

// Internal slug generator
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
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        setLoading(true);
        setNotFound(false);

        const data: Update[] = await client.fetch(`
          *[_type == "newsUpdate"] | order(date desc){
            title,
            category,
            date,
            des,
            "img": img.asset->url,
            video
          }
        `);

        setUpdates(data);

        if (!data.find((d) => makeSlug(d.title) === slug)) {
          setNotFound(true);
        }
      } catch (err) {
        console.error("Error fetching updates:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, [slug]);

  const filterData = updates.find((d) => makeSlug(d.title) === slug);

  if (loading) {
    return (
      <Container>
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className={`${poppins.className} text-sm sm:text-base text-gray-600`}>
            Loading...
          </p>
        </div>
      </Container>
    );
  }

  if (notFound || !filterData) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center">
          <h1 className={`text-2xl font-bold ${poppins.className}`}>Update Not Found</h1>
          <p className={`text-gray-600 ${antiquaFont.className}`}>
            The SPARC update you are looking for does not exist.
          </p>
          <Link
            href="/sparc-update"
            className={`mt-4 inline-block bg-[#36133B] text-white px-6 py-3 rounded-full hover:bg-[#4a1a50] transition-colors ${poppins.className}`}
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
      <div
        className={`flex uppercase items-center gap-2 sm:gap-3 lg:gap-5 my-5 lg:my-10 ${poppins.className} text-[8px] sm:text-xs lg:text-base flex-wrap`}
      >
        <Link href="/" className="font-bold hover:text-gray-600 transition-colors">
          HOME
        </Link>
        <span className="text-gray-400">||</span>
        <Link href="/sparc-update" className="font-bold hover:text-gray-600 transition-colors">
          SPARC-UPDATE
        </Link>
        <span className="text-gray-400">||</span>
        <p className="text-[#818181] break-all">{slug}</p>
      </div>

      <div className="mb-20 sm:mb-32 lg:mb-40">
        {/* Featured Image */}
        <div className="relative w-full aspect-video overflow-hidden rounded-lg">
          <Image
            src={filterData.img}
            alt={filterData.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            priority
          />
        </div>

        {/* Title & Date */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-5 mt-6 sm:mt-8 lg:mt-10">
          <h1 className={`${poppins.className} text-base sm:text-lg lg:text-xl xl:text-2xl font-medium leading-tight`}>
            {filterData.title}
          </h1>
          <p className={`${poppins.className} text-xs sm:text-sm text-gray-600 whitespace-nowrap`}>
            {filterData.date}
          </p>
        </div>

        {/* Description */}
        <p className={`${antiquaFont.className} text-sm sm:text-base lg:text-lg leading-relaxed mt-4 sm:mt-5 text-gray-700`}>
          {filterData.des}
        </p>

        {/* Video */}
        {filterData.video && (
          <div className="relative w-full aspect-video mt-6 sm:mt-8 lg:mt-10 rounded-lg overflow-hidden">
            <iframe
              src={filterData.video}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              title="Video content"
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default Page;