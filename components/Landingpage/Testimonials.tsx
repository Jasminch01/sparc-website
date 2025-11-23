"use client";
import Image from "next/image";
import comma from "../../public/Testimonials/comma.png";
import { antiquaFont, poppins } from "../utils/font";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    icon: comma,
    des: 'Joining this movement lead community workshops empowering other women to stand up for their rights."',
    testimoniName: "Sadia",
    designation: "Founder @ Migelko",
  },
  {
    icon: comma,
    des: 'Joining this movement lead community workshops empowering other women to stand up for their rights."',
    testimoniName: "Sadia",
    designation: "Founder @ Migelko",
  },
  {
    icon: comma,
    des: 'Joining this movement lead community workshops empowering other women to stand up for their rights."',
    testimoniName: "Sadia",
    designation: "Founder @ Migelko",
  },
  {
    icon: comma,
    des: 'Joining this movement lead community workshops empowering other women to stand up for their rights."',
    testimoniName: "Sadia",
    designation: "Founder @ Migelko",
  },
  {
    icon: comma,
    des: 'Joining this movement lead community workshops empowering other women to stand up for their rights."',
    testimoniName: "Sadia",
    designation: "Founder @ Migelko",
  },
];

const Testimonials = () => {
  return (
    <div className="max-w-7xl mx-auto my-12 md:my-16 lg:my-20 px-5 lg:px-10 xl:px-0">
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
        <h2
          className={`${poppins.className} font-black text-2xl lg:text-4xl`}
        >
          WHAT PEOPLE SAY
        </h2>
        <p
          className={`text-[#454545] text-lg lg:text-xl leading-relaxed px-4 ${antiquaFont.className}`}
        >
          Community development is often linked with community work or community
          planning, and may involve stakeholders, foundations.
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
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          className="testimonial-swiper"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="border-2 border-[#F26522] rounded-lg p-6 md:p-8 lg:p-10 flex flex-col items-center gap-4 md:gap-5 h-full min-h-[300px] md:min-h-80 hover:shadow-lg transition-shadow">
                <Image
                  src={testimonial.icon}
                  alt="quote icon"
                  width={50}
                  height={50}
                  className="object-contain w-10 h-10 md:w-12 md:h-12"
                />
                <p
                  className="text-center text-sm md:text-base lg:text-lg leading-relaxed grow"
                  style={{ fontFamily: '"Book Antiqua", serif' }}
                >
                  {testimonial.des}
                </p>
                <div
                  className={`${poppins.className} flex flex-col items-center mt-auto`}
                >
                  <h3 className="text-[#FF951B] font-bold text-lg lg:text-xl">
                    {testimonial.testimoniName}
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
    </div>
  );
};

export default Testimonials;