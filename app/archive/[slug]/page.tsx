"use client"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";

interface Data {
    img: string;
    title: string;
    des: string;
    date: string;
    category: string;
    longdes: string;
}

const Page = () => {
    const { slug } = useParams();
    const [data, setData] = useState<Data[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch data
    useEffect(() => {
        fetch('/Archive/data.json')
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
                setLoading(false);
            });
    }, []);

    // Convert slug back to title format for comparison
    const slugString = Array.isArray(slug) ? slug[0] : slug;
    const titleFromSlug = slugString?.replace(/-/g, ' ');

    // Filter data by slug
    const filteredData = data.find(d =>
        d.title.toLowerCase() === titleFromSlug?.toLowerCase()
    );

    // Get related stories (exclude current article, limit to 3)
    const relatedStories = data
        .filter(d => d.title !== filteredData?.title)
        .slice(0, 3);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Loading...</p>
            </div>
        );
    }

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
                <span className={`text-xl lg:text-3xl uppercase text-center font-semibold flex items-center justify-center ${poppins.className}`}>
                    {filteredData.category}
                </span>

                <section className={`flex justify-between ${poppins.className} py-10 lg:py-15`}>
                    <div className="flex gap-2 lg:gap-5 text-xs">
                        <Link href='/' className="hover:underline">Home</Link>
                        <span>||</span>
                        <p className="text-[#818181] uppercase">INDIGENOUS ARCHIVE</p>
                        <span>||</span>
                        <h2 className="text-[#818181]">{slug}</h2>
                    </div>
                </section>
            </Container>

            <article className="max-w-5xl mx-auto px-4">
                <h1 className="text-3xl font-bold mt-2 mb-4">{filteredData.title}</h1>
                <p className={`text-gray-500 mb-6 ${poppins.className}`}>{filteredData.date}</p>
                <Image
                    src={filteredData.img}
                    alt={filteredData.title}
                    width={1000}
                    height={1000}
                    className="w-full"
                />

                <p className={`text-[#252525] ${antiquaFont.className} py-5`}>
                    {filteredData.longdes}
                </p>

                {/* Related Stories */}
                <div className="mt-16 mb-10">
                    <h2 className={`text-2xl font-semibold mb-8 text-center ${poppins.className}`}>
                        Related Stories
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relatedStories.map((story, index) => (
                            <Link key={index} href={`/archive/${story.title.replace(/\s+/g, '-').toLowerCase()}`} className="group">
                                <div className="overflow-hidden">
                                    <Image
                                        src={story.img}
                                        alt={story.title}
                                        width={400}
                                        height={300}
                                        className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <h3 className={`mt-4 text-base font-medium leading-snug group-hover:text-[#36133B] transition-colors ${poppins.className}`}>
                                    {story.title}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </article>
        </div>
    );
};

export default Page;