"use client";
import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Data {
  category: string;
  img: string;
  des: string;
  title: string;
  date: string;
  video: string;
  slug: string;
}

const Page = () => {
  const { slug } = useParams();
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "newsUpdate"] | order(date desc){
            title,
            category,
            date,
            des,
           "slug": slug.current,
           "img": img.asset->url,
            video
          }
        `);
        setData(data);
      } catch (err) {
        console.error("Error fetching updates:", err);
      }
    };

    fetchUpdates();
  }, []);

  const filterData = data.find((d) => d.slug === slug);

  return (
    <Container>
      <div>
        {/* BreadCrumb */}
        <div
          className={`flex uppercase items-center gap-2 sm:gap-3 lg:gap-5 my-5 lg:my-10 ${poppins.className} text-[8px] sm:text-xs lg:text-base flex-wrap`}
        >
          <Link
            href="/"
            className="font-bold hover:text-gray-600 transition-colors"
          >
            HOME
          </Link>
          <span className="text-gray-400">||</span>
          <Link
            href="/sparc-update"
            className="font-bold hover:text-gray-600 transition-colors"
          >
            SPARC-UPDATE
          </Link>
          <span className="text-gray-400">||</span>
          <p className="text-[#818181] break-all">{slug}</p>
        </div>

        {filterData ? (
          <div className="mb-20 sm:mb-32 lg:mb-40">
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

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-5 mt-6 sm:mt-8 lg:mt-10">
              <h1
                className={`${poppins.className} text-base sm:text-lg lg:text-xl xl:text-2xl font-medium leading-tight`}
              >
                {filterData.title}
              </h1>
              <p
                className={`${poppins.className} text-xs sm:text-sm text-gray-600 whitespace-nowrap`}
              >
                {filterData.date}
              </p>
            </div>

            <p
              className={`${antiquaFont.className} text-sm sm:text-base lg:text-lg leading-relaxed mt-4 sm:mt-5 text-gray-700`}
            >
              {filterData.des}
            </p>

            {/* Responsive embedded video */}
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
        ) : (
          <div className="flex items-center justify-center min-h-[50vh]">
            <p
              className={`text-center ${poppins.className} text-sm sm:text-base text-gray-600`}
            >
              Loading...
            </p>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Page;
