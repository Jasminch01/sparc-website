"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Container from "@/components/Container";
import { antiquaFont, jost } from "@/components/utils/font";
import Link from "next/link";
import { Blog, fetchBlogByTitle } from "@/sanity/queries/blogQueries";
import { PortableText } from "next-sanity";

const BlogPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    // Get the slug string and clean it
    const slugString = Array.isArray(slug) ? slug[0] : slug.toString();
    const cleanedSlug = slugString.split("/").pop() || "";
    const decodedSlug = decodeURIComponent(cleanedSlug);

    const titleFromSlug = decodedSlug.replace(/-/g, " ");

    try {
      const fetchBlog = async () => {
        const blogResponse = await fetchBlogByTitle(titleFromSlug);
        if (blogResponse) {
          setBlog(blogResponse);
          setLoading(false);
        } else {
          setNotFound(true);
        }
      };

      fetchBlog();
    } catch (error) {
      console.log(error);
    }
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <Container>
        <div className="xl:max-w-7xl lg:max-w-6xl mx-auto py-20 text-center">
          <div className="flex h-screen flex-col items-center justify-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF951B]"></div>
          </div>
        </div>
      </Container>
    );
  }

  // Not found
  if (notFound || !blog) {
    return (
      <Container>
        <div className="xl:max-w-7xl lg:max-w-6xl mx-auto py-20 text-center">
          <h1
            className={`text-3xl font-bold text-gray-800 mb-4 ${jost.className}`}
          >
            Blog Not Found
          </h1>
          <p className={`text-gray-600 mb-6 ${antiquaFont.className} text-lg`}>
            The blog post you are looking for does not exist.
          </p>
          <Link
            href="/blogs"
            className={`inline-block bg-[#36133B] text-white px-6 py-3 rounded-full hover:bg-[#4a1a50] transition-colors ${jost.className} font-semibold`}
          >
            Back to Blogs
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      {/* Breadcrumb */}
      <div
        className={`flex uppercase items-center gap-5 my-5 lg:my-10 ${jost.className} text-[8px] lg:text-base`}
      >
        <Link href="/" className="font-bold hover:text-[#FF951B]">
          HOME
        </Link>
        <span>||</span>
        <Link href="/blogs" className="font-bold hover:text-[#FF951B]">
          BLOGS
        </Link>
        <span>||</span>
        <p className="text-[#818181] truncate max-w-xs lg:max-w-md">
          {blog.title}
        </p>
      </div>

      <div className="xl:max-w-7xl lg:max-w-6xl mx-auto py-5 mb-40">
        {/* Title */}
        <h1
          className={`text-2xl lg:text-4xl font-bold mb-5 ${jost.className}`}
        >
          {blog.title}
        </h1>

        {/* Description */}
        <p className={`${antiquaFont.className} text-[#505050] text-lg mb-5`}>
          {blog.subtitle}
        </p>

        {/* Meta Info */}
        <div
          className={`flex flex-col md:flex-row md:items-center justify-between gap-3 text-sm ${jost.className} mb-10`}
        >
          <div className="flex items-center gap-3 flex-wrap">
            <p className="text-gray-500">
              Written by{" "}
              <span className="text-black font-semibold">{blog.writtenBy}</span>
            </p>
            <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs">
              {blog.category}
            </span>
          </div>

          <p className="text-sm md:text-base text-gray-600">
            {new Date(blog.date).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Feature Image */}
        {blog.img && (
          <div className="mb-10">
            <Image
              src={blog.img}
              alt={blog.title}
              width={1200}
              height={600}
              className="rounded-lg object-cover w-full h-auto"
            />
          </div>
        )}

        {/* Long Description */}
        <div
          className={`text-[#6d6b6b] text-lg lg:text-xl ${antiquaFont.className} leading-relaxed whitespace-pre-line`}
        >
          <PortableText
            value={blog.description}
            components={{
              block: {
                normal: ({ children }) => <p className="mb-4">{children}</p>,
              },
            }}
          />
        </div>
      </div>
    </Container>
  );
};

export default BlogPage;
