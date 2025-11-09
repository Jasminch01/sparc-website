"use client"
import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface Blogs {
    title: string,
    description: string,
    date: string,
    writtenBy: string,
    img: string,
    category: string,
    longdes: string
}

const categories = ['All', 'Jum Cultivation', 'Jum', 'Hill News', 'Photography', 'Indigenous Opinion', 'CHT People', 'Hill Tracts']

const BlogPage = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [startIndex, setStartIndex] = useState(0)
    const [blogs, setBlogs] = useState<Blogs[]>([]);

    const [activeCategory, setActiveCategory] = useState("All")

    const visibleCount = 6
    const visibleCategories = categories.slice(startIndex, startIndex + visibleCount)

    // Helper function for prv button
    const handleBack = () => {
        if (startIndex > 0) {
            setStartIndex((prev) => prev - 1)
        }
    }

    // Helper function for next button
    const handleNext = () => {
        if (startIndex + visibleCount < categories.length) {
            setStartIndex((prev) => prev + 1)
        }
    }

    // Blogs fetching
    useEffect(() => {
        fetch('/Blogs/Blogs.json')
            .then(res => res.json())
            .then(data => setBlogs(data))
    }, [])

    // Make a filter button to render the filter category data 
    const filteredButton = activeCategory === 'All' ? blogs : blogs.filter((blog) => blog.category.toLowerCase() === activeCategory.toLowerCase()
    );

    return (
        <div>
            <Container>
                <section className="flex justify-between items-center mt-10 mb-10 ">
                    <h2 className={`${poppins.className} font-extrabold text-5xl`}>BLOG</h2>
                    <div className="flex items-center border border-gray-300 rounded-full px-3 py-2 bg-white">
                        <input type="text" placeholder="Search..." className="px-2 py-1 text-gray-700 outline-none" />
                        <FaSearch className="text-gray-400 cursor-pointer hover:text-gray-600 transition" />
                    </div>
                </section>

                <hr className="mb-10 text-gray-300 " />

                {/* Category section */}
                <section className="relative flex justify-center mb-15 items-center">
                    {/* Category container */}
                    <div className="flex gap-3  overflow-hidden transition-all duration-300 items-center px-10">
                        {visibleCategories.map((category, index) => {
                            const realIndex = startIndex + index;
                            return (
                                <div key={realIndex} onClick={() => { setActiveIndex(realIndex); setActiveCategory(category) }} className={`px-8 py-2 rounded-full cursor-pointer transition ${poppins.className} ${activeIndex === realIndex ? "border-gray-700 border bg-gray-200"
                                    : "border-gray-200 bg-gray-100"}`}>
                                    {category}
                                </div>
                            );
                        })}
                    </div>

                    {/* Prev Button (absolute) */}
                    <button onClick={handleBack} disabled={startIndex === 0} className={`absolute left-0 transition ${startIndex === 0 ? "cursor-not-allowed opacity-50" : "block cursor-pointer"}`}>
                        <IoIosArrowBack size={20} />
                    </button>

                    {/* Next Button (absolute) */}
                    <button onClick={handleNext} disabled={startIndex + visibleCategories.length >= categories.length} className={`absolute right-0 ${startIndex + visibleCategories.length >= categories.length ? "cursor-not-allowed opacity-50" : "block cursor-pointer"}`} >
                        <IoIosArrowForward size={20} />
                    </button>
                </section>

                {/* This is blogs section where the blogs will load based on activeCategory */}
                <section className="my-10 max-w-4xl mx-auto">
                    {filteredButton.length > 0 ? (
                        filteredButton.map((blog, index) => (
                            <Link href={`/blogs/${blog.title.replace(/\s+/g, '-').toLowerCase()}`} key={index} className="flex flex-col md:flex-row gap-5 pb-5 py-5 border-b-2 border-gray-300">
                                <div className="flex-1 space-y-3">
                                    <p className={`text-gray-500 text-sm ${poppins.className}`}>
                                        Written by <span className="text-black">{blog.writtenBy}</span>
                                    </p>
                                    <h2 className={`text-3xl font-bold mb-2 max-w-xl ${poppins.className}`}>
                                        {blog.title}
                                    </h2>
                                    <p className={`text-gray-700 mb-2 max-w-[500px] ${antiquaFont.className}`}>
                                        {blog.description}
                                    </p>
                                    <p className={`text-gray-500 text-sm ${poppins.className}`}>{blog.date}</p>
                                </div>

                                <div>
                                    <Image
                                        src={blog.img}
                                        alt={blog.title}
                                        height={400}
                                        width={250}
                                        className="object-cover"
                                    />
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No blogs found for this category.</p>
                    )}
                </section>
            </Container>
        </div>
    );
};

export default BlogPage;