"use client"
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { IoArrowBack, IoStar } from 'react-icons/io5';
import { client } from '@/sanity/lib/client';
import Container from '@/components/Container';
import { antiquaFont, poppins } from '@/components/utils/font';

type Course = {
    title: string;
    des: string;
    category: string;
    itemsSold: number;
    img: string;
    price: string;
    updated: string;
    longDes: string;
    rating: string;
    whatYouLearn: string[];
    form: string; // Google Form URL
};

const Page = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const data = await client.fetch(`
                    *[_type == "learn"]{
                        title,
                        des,
                        longDes,
                        category,
                        itemsSold,
                        rating,
                        price,
                        updated,
                        whatYouLearn,
                        form,
                        "img": img.asset->url
                    }
                `);

                const courseId = searchParams.get('id');
                if (courseId && data[parseInt(courseId)]) {
                    const courseData = data[parseInt(courseId)];
                    // Format the date if it exists
                    if (courseData.updated) {
                        const date = new Date(courseData.updated);
                        const options: Intl.DateTimeFormatOptions = {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        };
                        courseData.updated = date.toLocaleDateString('en-US', options);
                    }
                    setCourse(courseData);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching course:", error);
                setLoading(false);
            }
        };

        fetchCourse();
    }, [searchParams]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5B1E63]"></div>
            </div>
        );
    }

    if (!course) {
        return (
            <Container>
                <div className="min-h-screen flex flex-col items-center justify-center">
                    <p className={`text-xl mb-4 ${poppins.className}`}>Course not found</p>
                    <button
                        onClick={() => router.push('/learn')}
                        className={`bg-[#5B1E63] text-white px-6 py-3 rounded-lg ${poppins.className}`}
                    >
                        Back to Courses
                    </button>
                </div>
            </Container>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header with Back Button */}
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <Container>
                    <div className="py-4 flex items-center gap-4">
                        <button
                            onClick={() => router.push('/learn')}
                            className="p-2 hover:bg-gray-100 rounded-full transition"
                        >
                            <IoArrowBack className="text-2xl text-[#5B1E63]" />
                        </button>
                        <h1 className={`text-lg font-semibold truncate ${poppins.className}`}>
                            Course Details
                        </h1>
                    </div>
                </Container>
            </div>

            {/* Course Image */}
            <div className="relative w-full h-64 bg-gray-200">
                <Image
                    src={course.img}
                    alt={course.title}
                    fill
                    className="object-cover"
                />
            </div>

            <Container>
                <div className="py-6 space-y-6">
                    {/* Category Badge */}
                    <div>
                        <span className={`inline-block bg-purple-100 text-[#5B1E63] px-4 py-1 rounded-full text-sm font-medium ${poppins.className}`}>
                            {course.category}
                        </span>
                    </div>

                    {/* Course Title */}
                    <h1 className={`text-2xl font-bold text-gray-900 ${poppins.className}`}>
                        {course.title}
                    </h1>

                    {/* Rating and Sold */}
                    <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center gap-2 bg-[#FFE8CE] border-2 border-[#FFE8CE] rounded-md px-4 py-2">
                            <IoStar className="text-[#F26522]" />
                            <span className={`font-bold text-[#F26522] ${poppins.className}`}>
                                {course.rating}
                            </span>
                        </div>
                        <div className={`border-2 border-gray-300 rounded-md px-4 py-2 ${poppins.className}`}>
                            {course.itemsSold} Sold
                        </div>
                    </div>

                    {/* Short Description */}
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <p className={`text-gray-700 text-justify leading-relaxed ${antiquaFont.className}`}>
                            {course.des}
                        </p>
                    </div>

                    {/* Detailed Description */}
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h2 className={`text-xl font-bold mb-3 text-[#5B1E63] ${poppins.className}`}>
                            About This Course
                        </h2>
                        <p className={`text-gray-700 text-justify leading-relaxed ${antiquaFont.className}`}>
                            {course.longDes}
                        </p>
                    </div>

                    {/* What You'll Learn */}
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h2 className={`text-xl font-bold mb-4 text-[#5B1E63] ${poppins.className}`}>
                            What You&apos;ll Learn
                        </h2>
                        <div className="space-y-3">
                            {course.whatYouLearn.map((item, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="mt-1 shrink-0">
                                        <div className="w-5 h-5 rounded-full bg-[#5B1E63] flex items-center justify-center">
                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p className={`text-gray-700 flex-1 ${antiquaFont.className}`}>
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Course Info */}
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h2 className={`text-xl font-bold mb-4 text-[#5B1E63] ${poppins.className}`}>
                            Course Information
                        </h2>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className={`text-gray-600 ${poppins.className}`}>Last Updated</span>
                                <span className={`font-semibold ${poppins.className}`}>{course.updated}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className={`text-gray-600 ${poppins.className}`}>Students Enrolled</span>
                                <span className={`font-semibold ${poppins.className}`}>{course.itemsSold}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className={`text-gray-600 ${poppins.className}`}>Category</span>
                                <span className={`font-semibold ${poppins.className}`}>{course.category}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Fixed Bottom Bar with Price and Enroll Button */}
            <div className=" border-gray-200 ">
                <Container>
                    <div className="py-4 bg-white px-5 flex items-center justify-between gap-4">
                        <div>
                            <p className={`text-sm text-gray-600 ${poppins.className}`}>Price</p>
                            <p className={`text-2xl font-bold text-[#5B1E63] ${poppins.className}`}>
                                {course.price} BDT
                            </p>
                        </div>
                        <button
                            onClick={() => course.form && window.open(course.form, '_blank')}
                            className={`bg-[#5B1E63] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#7a2887] transition-all duration-300 shadow-md ${poppins.className}`}>
                            Enroll Now
                        </button>
                    </div>
                </Container>
            </div>

            {/* Spacer for fixed bottom bar */}
            <div className="h-24"></div>
        </div>
    );
};

export default Page;