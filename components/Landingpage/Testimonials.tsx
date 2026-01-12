"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import comma from "../../public/Testimonials/comma.png";
import { antiquaFont, jost, poppins } from "../utils/font";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Container from "../Container";
import { fetchTestimonials, TestimonialData } from "@/sanity/queries/testimonialQueries";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch testimonials from Sanity
  useEffect(() => {
    const loadTestimonials = async () => {
      setLoading(true);
      try {
        const data = await fetchTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error("Failed to load testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  return (
    <div className="my-12 md:my-16 lg:my-20">
      <Container>
        <style jsx global>{`
          .testimonial-swiper {
            padding-bottom: 50px;
          }

          .testimonial-swiper .swiper-pagination {
            bottom: 0 !important;
            position: relative !important;
            margin-top: 40px;
          }

          .testimonial-swiper .swiper-pagination-bullet {
            width: 12px;
            height: 12px;
            background: #9ca3af;
            opacity: 1;
            margin: 0 6px;
          }

          @media (min-width: 640px) {
            .testimonial-swiper .swiper-pagination-bullet {
              width: 14px;
              height: 14px;
            }
          }

          .testimonial-swiper .swiper-pagination-bullet-active {
            background: #f26522;
            width: 14px;
            height: 14px;
          }

          @media (min-width: 640px) {
            .testimonial-swiper .swiper-pagination-bullet-active {
              width: 16px;
              height: 16px;
            }
          }

          @media (max-width: 640px) {
            .testimonial-swiper {
              padding-bottom: 40px;
            }

            .testimonial-swiper .swiper-pagination {
              margin-top: 30px;
            }
          }
        `}</style>

        {/* Header Section */}
        <div className="text-center max-w-xl mx-auto space-y-3 md:space-y-4 lg:space-y-5 mb-10 md:mb-12 lg:mb-16">
          <h2 className={`${jost.className} font-black text-2xl lg:text-4xl`}>
            WHAT PEOPLE SAY
          </h2>
          <p
            className={`text-[#6d6b6b] text-lg lg:text-xl leading-relaxed px-4 ${antiquaFont.className}`}
          >
            Community development is often linked with community work or
            community planning, and may involve stakeholders, foundations.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-10">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#F26522] border-r-transparent"></div>
          </div>
        )}

        {/* Testimonials Slider */}
        {!loading && testimonials.length > 0 && (
          <div>
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
                1280: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
              }}
              className="testimonial-swiper"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial._id}>
                  <div className="border-2 border-[#F26522] rounded-lg p-6 md:p-8 lg:p-10 flex flex-col items-center gap-4 md:gap-5 h-full min-h-[300px] md:min-h-80 hover:shadow-lg transition-shadow">
                    <Image
                      src={comma}
                      alt="quote icon"
                      width={50}
                      height={50}
                      className="object-contain w-10 h-10 md:w-12 md:h-12"
                    />
                    <p
                      className="text-center text-sm md:text-base text-[#6d6b6b] lg:text-lg leading-relaxed grow"
                      style={{ fontFamily: '"Book Antiqua", serif' }}
                    >
                      {testimonial.description}
                    </p>
                    <div
                      className={`${poppins.className} flex flex-col items-center mt-auto`}
                    >
                      <h3 className="text-[#FF951B] font-bold text-lg lg:text-xl">
                        {testimonial.testimoniname}
                      </h3>
                      <p className="text-[#6d6b6b] text-sm md:text-base">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* Empty State */}
        {!loading && testimonials.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No testimonials available.</p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Testimonials;
