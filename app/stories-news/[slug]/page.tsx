"use client"
import { client } from '@/sanity/lib/client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/Container';
import { antiquaFont, poppins } from '@/components/utils/font';

interface Story {
    _id: string;
    title: string;
    img: string;
    date: string;
    description: string;
}

const Page = () => {
    const { slug } = useParams();
    const [story, setStory] = useState<Story | null>(null);
    const [relatedStories, setRelatedStories] = useState<Story[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch all stories
                const query = `*[_type == "story"] | order(publishedAt desc) {
                    _id,
                    title,
                    "img": image.asset->url,
                    date,
                    description
                }`;

                const data = await client.fetch(query);

                // Find the story that matches the slug
                const foundStory = data.find((story: Story) =>
                    story.title.toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/[^\w\-]+/g, "")
                        .replace(/\-\-+/g, "-")
                        .replace(/^-+/, "")
                        .replace(/-+$/, "") === slug
                );

                if (foundStory) {
                    setStory(foundStory);

                    // Get related stories (excluding current story, max 3)
                    const related = data
                        .filter((s: Story) => s._id !== foundStory._id)
                        .slice(0, 3);
                    setRelatedStories(related);
                } else {
                    setError("Story not found");
                }
            } catch (error) {
                console.error("Error fetching data from Sanity:", error);
                setError("Failed to load story. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchData();
        }
    }, [slug]);

    // Format date helper
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    // Generate slug from title
    const generateSlug = (title: string): string => {
        return title.toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w\-]+/g, "")
            .replace(/\-\-+/g, "-")
            .replace(/^-+/, "")
            .replace(/-+$/, "");
    };

    // Truncate description
    const truncateText = (text: string, maxLength: number): string => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength).trim() + "...";
    };

    // Loading State
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF7F00] mx-auto"></div>
                    <p className={`${poppins.className} mt-4 text-gray-600`}>Loading story...</p>
                </div>
            </div>
        );
    }

    // Error State
    if (error || !story) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Container>
                    <div className="text-center py-20">
                        <h1 className={`${poppins.className} text-3xl font-bold text-gray-800 mb-4`}>
                            {error || "Story not found"}
                        </h1>
                        <p className={`${antiquaFont.className} text-lg text-gray-600 mb-8`}>
                            The story you&apos;re looking for doesn&apos;t exist or has been removed.
                        </p>
                        <Link
                            href="/"
                            className={`${poppins.className} bg-[#FF7F00] text-white px-6 py-3 rounded-lg hover:bg-[#cc6600] transition-colors inline-block`}
                        >
                            Back to Home
                        </Link>
                    </div>
                </Container>
            </div>
        );
    }

    // Main Content
    return (
        <div className="max-w-7xl mx-auto lg:py-10 px-5 lg:px-0">
            {/* Breadcrumb */}
            <nav
                aria-label="Breadcrumb"
                className={`flex uppercase items-center gap-2 sm:gap-3 lg:gap-5 my-5 lg:my-10 ${poppins.className} text-[8px] sm:text-xs lg:text-sm flex-wrap`}
            >
                <Link
                    href="/"
                    className="font-bold hover:text-[#FF951B] transition-colors"
                >
                    HOME
                </Link>
                <span className="text-gray-400">||</span>

                <Link
                    href="/stories-news"
                    className="font-bold hover:text-[#FF951B] transition-colors"
                >
                    STORIES AND NEWS
                </Link>

                <span className="text-gray-400">||</span>

                <span className="text-[#818181] break-all" aria-current="page">
                    {slug}
                </span>
            </nav>

            <article className="bg-white rounded-2xl overflow-hidden">
                {/* Hero Image */}
                <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
                    <Image
                        src={story.img}
                        alt={story.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Content */}
                <div className="py-8 md:py-12 lg:py-16">
                    {/* Date */}
                    <div className={`${poppins.className} text-[#767676] text-sm md:text-base mb-4`}>
                        <time dateTime={story.date}>
                            {formatDate(story.date)}
                        </time>
                    </div>

                    {/* Title */}
                    <h1 className={`${poppins.className} text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight`}>
                        {story.title}
                    </h1>

                    {/* Description */}
                    <div className={`${antiquaFont.className} text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed whitespace-pre-line`}>
                        {story.description}
                    </div>

                    {/* Divider */}
                    <div className="my-12 border-t border-gray-200"></div>

                    {/* Related Stories */}
                    {relatedStories.length > 0 && (
                        <div className="mt-16">
                            <h2 className={`${poppins.className} text-2xl md:text-3xl font-bold text-gray-900 mb-8`}>
                                Related Stories
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                                {relatedStories.map((relatedStory) => (
                                    <Link
                                        key={relatedStory._id}
                                        href={`/stories-news/${generateSlug(relatedStory.title)}`}
                                        className="group"
                                    >
                                        <div className="flex flex-col bg-white rounded-xl overflow-hidden  transition-all border border-gray-200 duration-300 h-full">
                                            <div className="relative w-full h-[200px] sm:h-[220px] md:h-60">
                                                <Image
                                                    src={relatedStory.img}
                                                    alt={relatedStory.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <div className={`p-5 md:p-6 space-y-3 flex flex-col grow ${poppins.className}`}>
                                                <p className="text-[#767676] text-xs sm:text-sm">
                                                    {formatDate(relatedStory.date)}
                                                </p>
                                                <h3 className="font-bold text-base md:text-lg group-hover:text-[#FF7F00] transition-colors leading-tight line-clamp-2">
                                                    {relatedStory.title}
                                                </h3>
                                                <p className={`text-sm md:text-base text-[#4D4D4D] leading-relaxed grow line-clamp-3 ${antiquaFont.className}`}>
                                                    {truncateText(relatedStory.description, 120)}
                                                </p>
                                                <div className="pt-2">
                                                    <span className="text-[#FF7F00] text-sm font-semibold ">
                                                        Read More 
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* View All Stories Link */}
                            <div className="text-center mt-10">
                                <Link
                                    href="/stories-news"
                                    className={`${poppins.className} inline-block bg-[#FF951B] text-white px-8 py-3 rounded-lg hover:bg-[#E88617] transition-colors font-semibold`}
                                >
                                    View All Stories
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </article>
        </div>
    );
};

export default Page;