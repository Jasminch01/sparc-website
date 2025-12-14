"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";
import Link from "next/link";

// interface for Blog
interface Blog {
  title: string;
  description: string;
  date: string;
  writtenBy: string;
  img: string;
  category: string;
  longdes: string;
  subcategory: string;
  status: string;
  type: 'blog';
}

// interface for Story
interface Story {
  title: string;
  des: string;
  date: string;
  img: string;
  category: string;
  type: 'story';
  _id: string;
}

// Combined type
type CombinedItem = Blog | Story;

const Stories = () => {
  const [combinedData, setCombinedData] = useState<CombinedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch blogs
        const blogsQuery = `*[_type == "blog"] | order(date desc) {
          title,
          description,
          date,
          writtenBy,
          "img": img.asset->url,
          category,
          longdes,
          subcategory,
          status
        }`;
        const blogsData = await client.fetch(blogsQuery);
        const blogsWithType = blogsData.map((blog: Blog) => ({ ...blog, type: 'blog' as const }));

        // Fetch stories
        const storiesQuery = `*[_type == "newsUpdate" && category == "FEATURED_STORIES"] | order(date desc) {
          _id,
          title,
          des,
          date,
          "img": img.asset->url,
          category
        }`;
        const storiesData = await client.fetch(storiesQuery);
        const storiesWithType = storiesData.map((story: Story) => ({ ...story, type: 'story' as const }));

        // Take 2 blogs and 1 story
        const twoBlogs = blogsWithType.slice(0, 2);
        const oneStory = storiesWithType.slice(0, 1);
        
        // Combine and sort by date
        const combined = [...twoBlogs, ...oneStory].sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        setCombinedData(combined);
      } catch (error) {
        console.error("Error fetching data from Sanity:", error);
        setError("Failed to load content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  // Format date helper
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Get description based on type
  const getDescription = (item: CombinedItem): string => {
    if (item.type === 'blog') {
      return item.description || '';
    } else {
      return item.des || '';
    }
  };

  // Get link based on type
  const getLink = (item: CombinedItem): string => {
    if (item.type === 'blog') {
      return `/blogs/${createSlug(item.title)}`;
    } else {
      return `/sparc-update/${createSlug(item.title)}`;
    }
  };

  return (
    <div className="bg-[#36133B] py-12 md:py-16 lg:py-20">
      <Container>
        <div className="">
          {/* Header Section */}
          <div className="text-center max-w-2xl mx-auto text-white space-y-3 md:space-y-4 mb-10 md:mb-12 lg:mb-16">
            <h2
              className={`${poppins.className} font-bold xl:text-4xl md:text-3xl text-2xl `}
            >
              STORIES AND NEWS
            </h2>
            <p
              className={`text-lg lg:text-xl leading-relaxed px-4 ${antiquaFont.className}`}
            >
              Community development is often linked with community work or
              community planning, and may involve stakeholders, foundations.
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center text-white text-lg py-10">
              Loading content...
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center text-red-400 text-lg py-10">
              {error}
            </div>
          )}

          {/* No Content State */}
          {!loading && !error && combinedData.length === 0 && (
            <div className="text-center text-white text-lg py-10">
              No content available at the moment.
            </div>
          )}

          {/* Content Cards - Only show 3 items */}
          {!loading && !error && combinedData.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-6">
              {combinedData.slice(0, 3).map((item, index) => (
                <Link 
                  href={getLink(item)}
                  key={`${item.type}-${index}`}
                  className="flex flex-col bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group cursor-pointer "
                >
                  <div className="relative w-full h-[200px] sm:h-[220px] md:h-60 lg:h-[260px]">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div
                    className={`bg-white py-5 md:py-6 px-6 md:px-8 lg:px-10 space-y-3 md:space-y-4 lg:space-y-5 grow flex flex-col ${poppins.className} `}
                  >
                    <div className="flex items-center justify-between">
                      <p className={`text-[#767676] text-xs sm:text-sm`}>
                        {formatDate(item.date)}
                      </p>
                     
                    </div>
                    <h2
                      className={`font-extrabold text-lg lg:text-xl group-hover:text-[#FF7F00] transition-all duration-300 leading-tight`}
                    >
                      {item.title}
                    </h2>
                    <p
                      className={`text-lg lg:text-xl text-justify leading-relaxed text-[#4D4D4D] grow ${antiquaFont.className}`}
                    >
                      {getDescription(item) ? getDescription(item).slice(0, 190) : 'No description available'}
                    </p>
                    <div className="h-10">
                      <button
                        className={`text-[#FF7F00] group-hover:px-5 group-hover:py-2 cursor-pointer text-sm md:text-base  group-hover:bg-[#cc6600] group-hover:text-white  transition-all duration-400 w-fit pb-1`}
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Stories;