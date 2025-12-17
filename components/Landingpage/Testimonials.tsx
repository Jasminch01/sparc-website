"use client";
import Image from "next/image";
import comma from "../../public/Testimonials/comma.png";
import { antiquaFont, poppins } from "../utils/font";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Container from "../Container";
import { useTranslation } from "react-i18next";

interface TestimonialData {
  testimoniname: string;
  designation: string;
  description: string;

}

const Testimonials = () => {
  const { t } = useTranslation();
  const sectionTitle = t('testimonials_components.title', 'WHAT PEOPLE SAY');
  const sectionDescription = t(
    'testimonials_components.description',
    'Community development is often linked with community work or community planning, and may involve stakeholders, foundations.'
  );

  // 2. Fetch the nested array of testimonials using returnObjects: true
  const testimonialsData = t('testimonials_components.testimonials', {
    returnObjects: true,
  }) as TestimonialData[];

  // Use the fetched data for rendering
  const dataToRender = testimonialsData || [];

  return (
    <div className=" my-12 md:my-16 lg:my-20">
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

        {/* Header Section (Using i18n data) */}
        <div className="text-center max-w-xl mx-auto space-y-3 md:space-y-4 lg:space-y-5 mb-10 md:mb-12 lg:mb-16">
          <h2
            className={`${poppins.className} font-black text-2xl lg:text-4xl`}
          >
            {sectionTitle}
          </h2>
          <p
            className={`text-[#454545] text-lg lg:text-xl leading-relaxed px-4 ${antiquaFont.className}`}
          >
            {sectionDescription}
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="">
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
            {/* Using fetched i18n data (dataToRender) */}
            {dataToRender.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="border-2 border-[#F26522] rounded-lg p-6 md:p-8 lg:p-10 flex flex-col items-center gap-4 md:gap-5 h-full min-h-[300px] md:min-h-80 hover:shadow-lg transition-shadow">
                  <Image
                    // Icon is still hardcoded as 'comma' image import
                    src={comma}
                    alt="quote icon"
                    width={50}
                    height={50}
                    className="object-contain w-10 h-10 md:w-12 md:h-12"
                  />
                  <p
                    className="text-center text-sm md:text-base text-[#3A3A3A] lg:text-lg leading-relaxed grow"
                    style={{ fontFamily: '"Book Antiqua", serif' }}
                  >
                    {/* Using i18n data 'description' */}
                    {testimonial.description}
                  </p>
                  <div
                    className={`${poppins.className} flex flex-col items-center mt-auto`}
                  >
                    <h3 className="text-[#FF951B] font-bold text-lg lg:text-xl">
                      {/* Using i18n data 'testimoniname' */}
                      {testimonial.testimoniname}
                    </h3>
                    <p className="text-[#4B4B4B] text-xs lg:text-base">
                      {testimonial.designation}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </div>
  );
};

export default Testimonials;