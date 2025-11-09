"use client";
import Image from "next/image";
import comma from "../../public/Testimonials/comma.png";
import { poppins } from "../utils/font";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

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
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 420, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto my-12 md:my-16 lg:my-20 px-5 lg:px-10 xl:px-0">
      <style jsx global>{`
        .slick-dots {
          bottom: -40px;
        }

        .slick-dots li button:before {
          font-size: 12px;
          color: #9ca3af;
          opacity: 1;
        }

        @media (min-width: 640px) {
          .slick-dots li button:before {
            font-size: 14px;
          }
        }

        .slick-dots li.slick-active button:before {
          color: #f26522;
          opacity: 1;
          font-size: 14px;
        }

        @media (min-width: 640px) {
          .slick-dots li.slick-active button:before {
            font-size: 16px;
          }
        }

        .slick-dots li button:hover:before {
          color: #f26522;
          opacity: 0.7;
        }

        @media (max-width: 640px) {
          .slick-dots {
            bottom: -30px;
          }
        }
      `}</style>

      {/* Header Section */}
      <div className="text-center max-w-xl mx-auto space-y-3 md:space-y-4 lg:space-y-5 mb-10 md:mb-12 lg:mb-16">
        <h2
          className={`${poppins.className} font-black xl:text-4xl md:text-3xl text-2xl `}
        >
          WHAT PEOPLE SAY
        </h2>
        <p
          className="text-[#454545] text-base md:text-lg leading-relaxed px-4"
          style={{ fontFamily: '"Book Antiqua", serif' }}
        >
          Community development is often linked with community work or community
          planning, and may involve stakeholders, foundations.
        </p>
      </div>

      {/* Testimonials Slider */}
      <div className="slider-container pb-12 md:pb-16">
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="px-2 md:px-3">
              <div className="border-2 border-[#F26522] rounded-lg p-6 sm:p-8 md:p-10 flex flex-col items-center gap-4 md:gap-5 h-full min-h-[280px] sm:min-h-[300px] md:min-h-80 hover:shadow-lg transition-shadow">
                <Image
                  src={testimonial.icon}
                  alt="quote icon"
                  width={50}
                  height={50}
                  className="object-contain w-10 h-10 sm:w-12 sm:h-12 md:w-[50px] md:h-[50px]"
                />
                <p
                  className="text-center text-sm sm:text-base md:text-lg leading-relaxed grow"
                  style={{ fontFamily: '"Book Antiqua", serif' }}
                >
                  {testimonial.des}
                </p>
                <div
                  className={`${poppins.className} flex flex-col items-center mt-auto`}
                >
                  <h3 className="text-[#FF951B] font-bold text-base sm:text-lg md:text-xl">
                    {testimonial.testimoniName}
                  </h3>
                  <p className="text-[#4B4B4B] text-xs sm:text-sm md:text-base">
                    {testimonial.designation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;
