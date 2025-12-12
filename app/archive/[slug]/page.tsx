"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";
import { client } from "@/sanity/lib/client";

interface Data {
  _id: string;
  img: string;
  title: string;
  des: string;
  date: string;
  category: string;
  longdes: string;
}

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

// Convert TITLE → SLUG internally
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
  const [filteredData, setFilteredData] = useState<Data | null>(null);
  const [relatedStories, setRelatedStories] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch ALL posts from Sanity
        const allPosts: Data[] = await client.fetch(`
          *[_type == "archivePost"]{
            _id,
            title,
            "img": img.asset->url,
            des,
            date,
            category,
            longdes
          }
        `);

        // Find current article using INTERNAL SLUG
        const mainArticle = allPosts.find(
          (post) => makeSlug(post.title) === slug
        );

        setFilteredData(mainArticle || null);

        // Generate related posts
        const related = allPosts
          .filter((post) => post._id !== mainArticle?._id)
          .slice(0, 3);

        setRelatedStories(related);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // If article is missing
  if (!filteredData) {
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
          className={`text-xl lg:text-3xl uppercase text-center font-semibold flex items-center justify-center ${poppins.className}`}
        >
          {filteredData.category}
        </span>

        <section
          className={`flex justify-between uppercase text-xs md:text-base font-semibold ${poppins.className} py-10 lg:py-15`}
        >
          <div className="flex gap-2 lg:gap-5 ">
            <Link href="/" className="hover:underline">
              HOME
            </Link>
            <span>||</span>
            <p className="text-[#818181] ">INDIGENOUS ARCHIVE</p>
            <span>||</span>
            <h2 className="text-[#818181] line-clamp-1">
              {filteredData.title}
            </h2>
          </div>
        </section>
      </Container>

      <article className="max-w-7xl mx-auto px-4">
        <h1
          className={`text-2xl md:text-3xl lg:text-4xl font-bold mt-2 mb-4 ${poppins.className}`}
        >
          {filteredData.title}
        </h1>

        <p className={`text-gray-500 mb-6 ${poppins.className}`}>
          {formatDate(filteredData.date)}
        </p>

        <Image
          src={filteredData.img}
          alt={filteredData.title}
          width={1000}
          height={1000}
          className="w-full object-cover max-h-[60vh]"
        />

        <p
          className={`text-[#252525] xl:text-xl text-lg ${antiquaFont.className} py-5 whitespace-pre-line text-[#252525]`}
        >
          {filteredData.longdes}
        </p>

        {/* Related Stories */}
        <div className="mt-16 mb-40">
          <h2
            className={`text-2xl font-semibold mb-8 text-center ${poppins.className}`}
          >
            Related Stories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedStories.map((story) => (
              <Link
                key={story._id}
                href={`/archive/${makeSlug(story.title)}`}
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
                    className={`text-lg group-hover:text-[#ff951b] duration-300 font-semibold leading-snug transition-colors ${poppins.className}`}
                  >
                    {story.title}
                  </h3>

                  <p className={`text-lg text-[#252525] ${antiquaFont.className}`}>
                    {story.des}
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
