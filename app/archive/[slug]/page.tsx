"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import { antiquaFont, jost } from "@/components/utils/font";
import {
  ArchiveData,
  fetchArchiveBySlug,
  fetchRelatedArchives,
} from "@/sanity/queries/archiveQueries";
import { PortableText } from "next-sanity";

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const Page = () => {
  const { slug } = useParams();
  const [relatedStories, setRelatedStories] = useState<ArchiveData[]>([]);
  const [archive, setArchives] = useState<ArchiveData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    // Get the slug string and clean it
    const slugString = Array.isArray(slug) ? slug[0] : slug.toString();
    const cleanedSlug = slugString.split("/").pop() || "";
    const decodedSlug = decodeURIComponent(cleanedSlug);

    const titleFromSlug = decodedSlug.replace(/-/g, " ");

    try {
      const fetchBlog = async () => {
        const blogResponse = await fetchArchiveBySlug(titleFromSlug);
        const relatedStories = await fetchRelatedArchives(
          archive?._id as string,
          archive?.category
        );

        if (blogResponse) {
          setArchives(blogResponse);
          setRelatedStories(relatedStories);
          setLoading(false);
        } else {
          // setNotFound(true);
        }
      };

      fetchBlog();
    } catch (error) {
      console.log(error);
    }
  }, [archive?._id, archive?.category, slug]);

  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // If article is missing
  if (!archive) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p>Article not found</p>
        <Link href="/archive" className="text-blue-600 hover:underline">
          Back to Archive
        </Link>
      </div>
    );
  }

  return (
    <div className="lg:my-20 my-10">
      <Container>
        <span
          className={`text-xl lg:text-3xl uppercase text-center font-semibold flex items-center justify-center ${jost.className}`}
        >
          {archive.category}
        </span>

        <section
          className={`flex justify-between uppercase text-xs md:text-base font-semibold ${jost.className} py-10 lg:py-15`}
        >
          <div className="flex gap-2 lg:gap-5 ">
            <Link href="/" className="hover:underline">
              HOME
            </Link>
            <span>||</span>
            <p className="text-[#818181] ">INDIGENOUS ARCHIVE</p>
            <span>||</span>
            <h2 className="text-[#818181] line-clamp-1">{archive.title}</h2>
          </div>
        </section>
      </Container>

      <article className="max-w-7xl mx-auto px-4">
        <h1
          className={`text-2xl md:text-3xl lg:text-4xl font-bold mt-2 mb-4 ${jost.className}`}
        >
          {archive.title}
        </h1>

        <p className={`text-gray-500 mb-6 ${jost.className}`}>
          {formatDate(archive.date)}
        </p>

        <Image
          src={archive.img}
          alt={archive.title}
          width={1000}
          height={1000}
          className="w-full object-cover max-h-[60vh]"
        />

        <div
          className={`text-[#6d6b6b] xl:text-xl text-lg ${antiquaFont.className} py-5 whitespace-pre-line `}
        >
          <PortableText
            value={archive.description}
            components={{
              block: {
                normal: ({ children }) => <p className="mb-4">{children}</p>,
              },
            }}
          />
        </div>

        {/* Related Stories */}
        <div className="mt-16 mb-40">
          <h2
            className={`text-2xl font-semibold mb-8 text-center ${jost.className}`}
          >
            Related Stories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedStories.map((story) => (
              <Link
                key={story._id}
                href={`/archive/${story.title}`}
                className="border border-gray-300 rounded-sm p-5 group"
              >
                <div className="overflow-hidden">
                  <Image
                    src={story.img}
                    alt={story.title}
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-sm object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="mt-4 space-y-2">
                  <h3
                    className={`text-lg group-hover:text-[#ff951b] duration-300 font-semibold leading-snug transition-colors ${jost.className}`}
                  >
                    {story.title}
                  </h3>

                  <p
                    className={`text-lg text-[#6d6b6b] ${antiquaFont.className}`}
                  >
                    {story.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default Page;
