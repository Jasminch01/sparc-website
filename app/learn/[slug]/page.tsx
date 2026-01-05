"use client";
import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Course, getCoursesByCategory } from "@/sanity/queries/courseQueries";
import icon from "@/public/Learn/icon.png";

const learnCategory = [
  "Culture and Advocacy",
  "Indigenous History",
  "Sovereignty and Resilience",
  "Anthropology",
];

const CourseDetailPage = () => {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("id");
  
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      try {
        // Fetch courses from all categories
        let foundCourse: Course | null = null;
        
        for (const category of learnCategory) {
          const data = await getCoursesByCategory(category, 1, 100); // Fetch more courses per category
          const match = data.courses.find((c: Course) => c._id === courseId);
          
          if (match) {
            foundCourse = match;
            break;
          }
        }
        
        setCourse(foundCourse);
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (isLoading) {
    return (
      <Container>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-xl">Loading...</div>
        </div>
      </Container>
    );
  }

  if (!course) {
    return (
      <Container>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h1 className={`text-3xl font-bold mb-4 ${poppins.className}`}>
            Course Not Found
          </h1>
          <Link 
            href="/learn"
            className="text-[#5B1E63] hover:underline"
          >
            Back to Courses
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <div className="mt-10 sm:mt-12 md:mt-15">
      <Container>
        {/* Breadcrumb */}
        <section
          className={`flex gap-5 my-10 ${poppins.className} font-semibold text-xs md:text-base`}
        >
          <Link href="/" className="hover:text-[#FF951B]">
            HOME
          </Link>
          <span>||</span>
          <Link href="/learn" className="hover:text-[#FF951B]">
            LEARN FROM US
          </Link>
          <span>||</span>
          <p className="text-[#818181]">{course.title}</p>
        </section>

        {/* Course Content */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          {/* Left Column - Image and Basic Info */}
          <div>
            <Image
              src={course.img}
              alt={course.imgAlt || course.title}
              height={600}
              width={600}
              className="w-full h-auto rounded-lg shadow-lg"
            />
            
            <div className="mt-6 flex items-center gap-5">
              <p
                className={`bg-[#FFE8CE] border-2 rounded-sm border-[#FFE8CE] font-bold text-lg text-[#F26522] px-8 py-2 ${poppins.className}`}
              >
                {course.rating}
              </p>
              <p
                className={`border-2 border-gray-300 px-8 py-2 rounded-sm text-lg ${poppins.className}`}
              >
                {course.itemsSold} Sold
              </p>
            </div>

            <p className={`${poppins.className} font-bold text-3xl mt-6`}>
              {course.price} BDT
            </p>
          </div>

          {/* Right Column - Details */}
          <div>
            <h1
              className={`text-3xl lg:text-5xl font-bold mb-6 ${poppins.className}`}
            >
              {course.title}
            </h1>
            
            <p
              className={`text-lg lg:text-xl mb-8 text-justify ${antiquaFont.className}`}
            >
              {course.subtitle}
            </p>

            {/* What You'll Learn */}
            {course.whatYouLearn && course.whatYouLearn.length > 0 && (
              <div className="mb-8">
                <h3
                  className={`${poppins.className} font-bold text-2xl mb-4`}
                >
                  What you&apos;ll learn
                </h3>
                <div className="space-y-3">
                  {course.whatYouLearn.map((item, i) => (
                    <div
                      key={i}
                      className={`${antiquaFont.className} text-lg flex items-start gap-3`}
                    >
                      <Image
                        src={icon}
                        alt="icon"
                        height={15}
                        width={20}
                        className="mt-1"
                      />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Enroll Button */}
            <button
              onClick={() => course.form && window.open(course.form, "_blank")}
              className={`bg-[#5B1E63] rounded-full px-12 py-4 text-white text-lg font-semibold hover:bg-[#7a2887] transition-all duration-300 transform hover:scale-105 ${poppins.className}`}
            >
              Enroll Now
            </button>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default CourseDetailPage;