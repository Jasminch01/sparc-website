"use client"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";
import Link from "next/link";

interface Blog {
    title: string;
    description: string;
    date: string;
    writtenBy: string;
    img: string;
    category: string;
    slug: string;
    longdes: string
}

const BlogPage = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState<Blog | null>(null);

    useEffect(() => {
        fetch("/Blogs/Blogs.json")
            .then((res) => res.json())
            .then((data: Blog[]) => {
                const selectedBlog = data.find((b) => b.title.replace(/\s+/g, '-').toLowerCase() === slug);
                setBlog(selectedBlog || null);
            });
    }, [slug]);

    if (!blog) {
        return <p className={`text-center mt-20 ${poppins.className}`}>Blog not found.</p>;
    }

    return (
        <Container>
            {/* BreadCrump */}
            <div className={`flex uppercase items-center gap-5 my-5 lg:my-10  ${poppins.className} text-[8px] lg:text-base`}>
                <Link href='/' className="font-bold">HOME</Link><span>||</span>
                <Link href='/blogs' className="font-bold">BLOGS</Link><span>||</span>
                <p className="text-[#818181]">{blog.title}</p>
            </div>

            <div className="max-w-5xl mx-auto py-5 mb-15">
                <h1 className={`text-2xl lg:text-4xl font-bold mb-5 ${poppins.className}`}>{blog.title}</h1>
                <p className={`${antiquaFont.className} text-[#505050] mb-5`}>{blog.description}</p>
                <div className={`flex items-center justify-between text-sm ${poppins.className} mb-10`}>
                    <p className={`text-gray-500 `}>Written by <span className="text-black">{blog.writtenBy}</span></p>
                    <p className="text-sm md:text-base">{blog.date}</p>
                </div>
                <Image
                    src={blog.img}
                    alt={blog.title}
                    width={600}
                    height={200}
                    className="rounded-lg object-contain w-full mb-10"
                />
                <p className={`text-gray-700 text-lg lg:text-xl ${antiquaFont.className} `}>{blog.longdes}</p>
            </div>
        </Container>
    );
};

export default BlogPage;
