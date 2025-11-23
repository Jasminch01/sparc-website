"use client"
import Container from '@/components/Container';
import { antiquaFont, poppins } from '@/components/utils/font';
import hero from "@/public/Learn/hero.png"
import icon from "@/public/Learn/icon.png"
import banner from "@/public/Learn/ggds 1.png"
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

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
};


const learnCategory = ['Culture and Advocacy', 'Indigenous History', 'Sovereignty and Resilience', 'Anthropology']

const Page = () => {
    const router = useRouter();
    const [courses, setCourses] = useState<Course[]>([])
    const [activeCategory, setActiveCategory] = useState(0)
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isHoveringPopup, setIsHoveringPopup] = useState(false);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const coursesPerPage = 4;
    const [isMobile, setIsMobile] = useState(false);

    // Check if mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Fetch the courses from json
    useEffect(() => {
        fetch('/Learn/learn.json')
            .then(res => res.json())
            .then(data => setCourses(data))
            .catch(error => console.error('Error fetching courses:', error))
    }, [])

    // Filter data based on active category
    const filteredCourses = courses.filter(course => course.category === learnCategory[activeCategory]);

    // Calculate pagination
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
    const startIndex = currentPage * coursesPerPage;
    const endIndex = startIndex + coursesPerPage;
    const currentCourses = filteredCourses.slice(startIndex, endIndex);

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1);
        }
    };

    // Reset to first page when category changes
    useEffect(() => {
        const timeout = setTimeout(() => setCurrentPage(0), 0);
        return () => clearTimeout(timeout);
    }, [activeCategory]);

    // Handle course click
    const handleCourseClick = (course: Course, index: number) => {
        if (isMobile) {
            const slug = course.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            router.push(`/learn/${slug}?id=${index}`);
        }
    };

    return (
        <div className='mt-10 sm:mt-12 md:mt-15 overflow-hidden'>
            <Container>
                {/* Top Section */}
                <section className="flex flex-col lg:flex-row justify-between gap-6 sm:gap-8 lg:gap-20">
                    <div className="w-full lg:w-1/2">
                        <h2 className={`text-2xl sm:text-3xl text-center lg:text-start md:text-4xl lg:text-5xl max-w-2xl font-extrabold leading-tight  ${poppins.className}`}>
                            LEARN <span className='text-[#ff951b]'>ANYTHING</span>, EVERYTHING
                        </h2>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <p className={`lg:ml-30 text-justify text-base sm:text-lg ${antiquaFont.className}`}>
                            Learning their history and present challenges is the first step toward justice, equality, and empowerment.
                        </p>
                    </div>
                </section>
            </Container>

            {/* Hero Section */}
            <section className="relative w-full ">
                <Image
                    src={hero}
                    alt="fellowship-hero"
                    width={1000}
                    height={600}
                    className="w-full h-[300px] sm:h-[500px] md:h-[600px] lg:h-full object-cover"
                />
                <div className="absolute top-1/2 lg:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-full px-4">
                    <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 ${poppins.className}`}>
                        LEARN
                    </h2>
                    <p className={`mb-3 sm:mb-4 text-sm sm:text-base md:text-2xl max-w-2xl mx-auto px-2 ${antiquaFont.className}`}>
                        Our reports and publications highlight the voices, experiences, and resilience of Indigenous women across communities.
                    </p>

                </div>
            </section>

            {/* Breadcrumb Section */}
            <Container>
                <section className={`flex gap-5 my-10 lg:my-20 ${poppins.className} font-semibold text-xs md:text-base`}>
                    <Link href='/'>HOME</Link> <span>||</span>
                    <p className="text-[#818181] uppercase " >Learn from us</p>
                </section>
            </Container>


            {/* Learn Section */}
            <Container>
                <section>
                    <div className=''>
                        <h2 className={`text-2xl lg:text-4xl font-bold mb-4 ${poppins.className}`}>LEARN TO KNOW BETTER</h2>
                        <p className={`mb-4 text-lg  ${antiquaFont.className} text-gray-500`}>Program offers valuable real-world experience for passionate individuals. </p>
                    </div>

                    {/* Course Category */}
                    <div className='grid grid-cols-1 lg:grid-cols-4 my-5 lg:my-10'>
                        {learnCategory.map((cat, index) =>
                            <div key={index} className='border-b-2 border-gray-300'>
                                <button onClick={() => setActiveCategory(index)} className={`${poppins.className} cursor-pointer py-5 text-sm lg:text-xl font-semibold transition-all duration-300 ${activeCategory === index ? 'border-b-2 border-[#FF951B] text-[#FF951B]' : 'hover:text-[#FF951B]'}`}>{cat}</button>
                            </div>
                        )}
                    </div>


                    {/* Navigation Buttons */}
                    {filteredCourses.length > coursesPerPage && (
                        <div className='flex justify-end items-center gap-4 mb-10'>
                            <button onClick={handlePrev}
                                disabled={currentPage === 0}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${poppins.className} ${currentPage === 0
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-[#5B1E63] text-white hover:bg-[#7a2887]'
                                    }`}>
                                <IoArrowBack />
                                Previous
                            </button>

                            <button onClick={handleNext}
                                disabled={currentPage === totalPages - 1}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${poppins.className} ${currentPage === totalPages - 1
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-[#5B1E63] text-white hover:bg-[#7a2887]'
                                    }`}>
                                Next
                                <IoArrowForward />
                            </button>
                        </div>
                    )}
                    {/* Courses Section */}
                    <div className='grid grid-cols-1 lg:grid-cols-4 mb-10 gap-5'>
                        {currentCourses.map((course, index) => {
                            const isLastInRow = (index + 1) % 4 === 0;
                            const isHovered = hoveredIndex === index;
                            return (
                                <div key={index} className='relative'>
                                    <div className={`border p-4 rounded-lg transition-all duration-300 ${isMobile ? 'cursor-pointer' : ''} ${isHovered
                                        ? 'border-[#FF951B] shadow-lg scale-105 bg-orange-50/30'
                                        : 'border-gray-200 hover:border-gray-400'
                                        }`}
                                        onClick={() => handleCourseClick(course, index)}
                                        onMouseEnter={() => {
                                            if (!isMobile) {
                                                if (hoverTimeoutRef.current) {
                                                    clearTimeout(hoverTimeoutRef.current);
                                                }
                                                setHoveredIndex(index);
                                            }
                                        }}
                                        onMouseLeave={() => {
                                            if (!isMobile) {
                                                hoverTimeoutRef.current = setTimeout(() => {
                                                    if (!isHoveringPopup) {
                                                        setHoveredIndex(null);
                                                    }
                                                }, 200);
                                            }
                                        }}>
                                        <div className={`transition-all duration-300 ${isHovered ? 'opacity-90' : 'opacity-100'}`}>
                                            <Image src={course.img} alt={course.title} height={400} width={400} />
                                            <div className='mt-5 space-y-3'>
                                                <h2 className={`${poppins.className} text-lg font-semibold`}>{course.title}</h2>
                                                <p className={`${antiquaFont.className} text-justify`}>{course.des}</p>
                                                <div className='flex items-center gap-5'>
                                                    <p className={`bg-[#FFE8CE] border-2 rounded-sm border-[#FFE8CE] font-bold text-sm text-[#F26522] px-6 py-1 ${poppins.className}`}>{course.rating}</p>
                                                    <p className={`border-2 border-gray-300 px-6 py-1 rounded-sm text-sm ${poppins.className}`}>{course.itemsSold} Sold</p>
                                                </div>
                                                <p className={`${poppins.className} font-bold`}>{course.price} BDT</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hovered content with smooth transitions */}
                                    {!isMobile && (
                                        <div className={`absolute py-10 z-50 hidden lg:block top-[-3] ${isLastInRow ? 'right-full mr-4' : 'left-full ml-4'} w-80 p-5 bg-white shadow-2xl rounded-lg border-2 border-[#FF951B] transition-all duration-300 ease-in-out ${isHovered
                                            ? 'opacity-100 scale-100 visible translate-x-0'
                                            : 'opacity-0 scale-95 invisible translate-x-4'
                                            }`}
                                            onMouseEnter={() => {
                                                if (hoverTimeoutRef.current) {
                                                    clearTimeout(hoverTimeoutRef.current);
                                                }
                                                setIsHoveringPopup(true);
                                            }}
                                            onMouseLeave={() => {
                                                setIsHoveringPopup(false);
                                                setHoveredIndex(null);
                                            }}>
                                            {/* Arrow pointing to the card - with smooth appearance */}
                                            <div className={`absolute top-8 ${isLastInRow ? '-right-2' : '-left-2'} w-0 h-0 border-t-10 border-t-transparent border-b-10 border-b-transparent ${isLastInRow ? 'border-l-8 border-l-[#FF951B]' : 'border-r-8 border-r-[#FF951B]'} transition-all duration-300`}></div>

                                            <h2 className={`${poppins.className} text-xl font-bold mb-2 text-[#5B1E63]`}>{course.title}</h2>
                                            <p className={`${antiquaFont.className} text-[#2B2B2B] text-justify mb-3`}>
                                                {course.longDes}
                                            </p>
                                            <h3 className={`${poppins.className} font-semibold text-sm mb-1`}>
                                                What you&apos;ll learn
                                            </h3>
                                            <div className="space-y-1">
                                                {course.whatYouLearn.map((item, i) => (
                                                    <div key={i} className={`${antiquaFont.className} text-sm flex items-center gap-2 transition-all duration-200 delay-${i * 50}`}>
                                                        <Image src={icon} alt='icon' height={10} width={15} />
                                                        <p>{item}</p>
                                                    </div>
                                                ))}
                                                <button className='flex justify-center mx-auto bg-[#5B1E63] rounded-full px-10 py-2 text-white mt-5 cursor-pointer hover:bg-[#7a2887] transition-all duration-300 transform hover:scale-105'>Enroll Now</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <hr className='mb-10 text-gray-300' />
                    {/* Learn page is updated */}

                </section>

                <section className='mb-20'>
                    <Image src={banner} alt='banner' width={1000} height={600} className='w-full' />
                </section>
            </Container>

        </div>
    );
};

export default Page;