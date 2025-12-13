"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";
import Link from "next/link";

// interface for Story
interface Story {
    _id: string;
    title: string;
    img: string;
    date: string;
    description: string;
}

const Page = () => {
    const [stories, setStories] = useState<Story[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedStories, setExpandedStories] = useState<Set<string>>(new Set());

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const query = `*[_type == "story"] | order(publishedAt desc) {
          _id,
          title,
          "img": image.asset->url,
          date,
          description
        }`;

                const data = await client.fetch(query);
                setStories(data || []);
            } catch (error) {
                console.error("Error fetching data from Sanity:", error);
                setError("Failed to load stories. Please try again later.");
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

    // Toggle expand/collapse for a story
    const toggleExpand = (storyId: string, e: React.MouseEvent) => {
        e.preventDefault(); // Prevent Link navigation
        e.stopPropagation(); // Stop event bubbling
        setExpandedStories(prev => {
            const newSet = new Set(prev);
            if (newSet.has(storyId)) {
                newSet.delete(storyId);
            } else {
                newSet.add(storyId);
            }
            return newSet;
        });
    };

    // Truncate description
    const truncateDescription = (text: string, maxLength: number = 150): string => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength).trim() + "...";
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
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF7F00] mx-auto mb-4"></div>
                            Loading stories...
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="text-center text-red-400 text-lg py-10">
                            {error}
                        </div>
                    )}

                    {/* Story Cards */}
                    {!loading && !error && stories.length === 0 && (
                        <div className="text-center text-white text-lg py-10">
                            No stories available at the moment.
                        </div>
                    )}

                    {!loading && !error && stories.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-6">
                            {stories.map((story) => {
                                const isExpanded = expandedStories.has(story._id);
                                const needsTruncation = story.description.length > 150;

                                return (
                                    <div
                                        key={story._id}
                                        className="flex flex-col bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group"
                                    >
                                        <Link href={`/stories-news/${createSlug(story.title)}`}>
                                            <div className="relative w-full h-[200px] sm:h-[220px] md:h-60 lg:h-[260px] cursor-pointer">
                                                <Image
                                                    src={story.img}
                                                    alt={story.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        </Link>

                                        <div
                                            className={`bg-white py-5 md:py-6 px-6 md:px-8 lg:px-10 space-y-3 md:space-y-4 lg:space-y-5 grow flex flex-col ${poppins.className}`}
                                        >
                                            <p className={`text-[#767676] text-xs sm:text-sm`}>
                                                {formatDate(story.date)}
                                            </p>

                                            <Link href={`/stories-news/${createSlug(story.title)}`}>
                                                <h2
                                                    className={`font-extrabold text-lg lg:text-xl group-hover:text-[#FF7F00] transition-all duration-300 leading-tight cursor-pointer`}
                                                >
                                                    {story.title}
                                                </h2>
                                            </Link>

                                            <p
                                                className={`text-base lg:text-lg text-justify leading-relaxed text-[#4D4D4D] grow ${antiquaFont.className}`}
                                            >
                                                {isExpanded || !needsTruncation
                                                    ? story.description
                                                    : truncateDescription(story.description)}
                                            </p>

                                            <div className="flex items-center justify-between gap-3 pt-2">
                                                {needsTruncation && (
                                                    <button
                                                        onClick={(e) => toggleExpand(story._id, e)}
                                                        className={`text-[#36133B] hover:text-[#FF7F00] font-semibold text-sm transition-colors ${poppins.className}`}
                                                    >
                                                        {isExpanded ? "Show Less ▲" : "Read More ▼"}
                                                    </button>
                                                )}

                                                <Link
                                                    href={`/stories-news/${createSlug(story.title)}`}
                                                    className={`text-[#FF7F00] hover:px-5 hover:py-2 cursor-pointer text-sm md:text-base hover:bg-[#cc6600] hover:text-white transition-all duration-300 w-fit ${poppins.className} font-semibold ml-auto`}
                                                >
                                                    View Details →
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default Page;