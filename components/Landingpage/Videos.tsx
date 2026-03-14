"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Container from "../Container";
import { antiquaFont, jost, notoBengali } from "../utils/font";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getAllVideos, Video } from "@/sanity/queries/videoQueries";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";


const Videos = () => {
  const { t, i18n } = useTranslation();
  const isBn = i18n.language === "BN" || i18n.language === "bn";

  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true);
      try {
        const data = await getAllVideos();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const getYouTubeEmbedUrl = (url: string) => {
    const regExp =
      /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^&?/]+)/;
    const match = url.match(regExp);
    return match ? `https://www.youtube.com/embed/${match[1]}` : "";
  };

  const componentTitle = t("videos.title", "VIDEOS");
  const componentDescription = t(
    "videos.description",
    "Strong voices. Bold visions. Meet the women and allies driving equality and empowerment forward. Our strength lies in unity.",
  );

  if (isLoading) {
    return (
      <div
        className={`bg-[#36133B] py-10 md:py-16 lg:py-24 xl:py-32 lg:mt-10 relative ${isBn ? notoBengali.className : ""}`}
      >
        <Container>
          <div className="text-center text-white">
            <div className="mb-8 md:mb-10 lg:mb-12 space-y-6">
              <div className="h-12 bg-white/20 rounded-lg max-w-md mx-auto animate-pulse"></div>
              <div className="h-6 bg-white/20 rounded-lg max-w-2xl mx-auto animate-pulse"></div>
            </div>
            <div className="relative px-12">
              <div className="w-full aspect-video bg-white/20 rounded-md animate-pulse"></div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <div
      className={`bg-[#36133B] py-10 md:py-16 lg:py-24 xl:py-32 lg:mt-10 relative ${isBn ? notoBengali.className : ""}`}
    >
      <Container>
        <div className="text-center text-white">
          <div className="mb-8 md:mb-10 lg:mb-12 space-y-6">
            <h2
              className={`font-black xl:text-5xl md:text-3xl text-2xl ${isBn ? notoBengali.className : jost.className}`}
            >
              {componentTitle}
            </h2>
            <p
              className={`text-lg lg:text-xl mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed ${isBn ? notoBengali.className : antiquaFont.className}`}
            >
              {componentDescription}
            </p>
          </div>

          {/* Video Slider Wrapper */}
          <div className="relative px-4 sm:px-12 lg:px-20 group">
            {/* Custom Navigation Buttons */}
            <div className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer text-[#FF951B] hover:text-white transition-all hidden md:flex items-center justify-center">
              <IoChevronBack size={48} />
            </div>
            <div className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer text-[#FF951B] hover:text-white transition-all hidden md:flex items-center justify-center">
              <IoChevronForward size={48} />
            </div>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={videos.length > 1}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 1,
                  spaceBetween: 30,
                },
              }}
              className="video-swiper"
            >
              {videos.map((video) => (
                <SwiperSlide key={video._id} className="pb-10">
                  <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl border-4 border-white/10">
                    <iframe
                      width="100%"
                      height="100%"
                      src={getYouTubeEmbedUrl(video.url)}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </Container>

      {/* Global Styles */}
      <style jsx global>{`
        .video-swiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5);
        }
        .video-swiper .swiper-pagination-bullet-active {
          background: #ff951b;
          opacity: 1;
        }

        .video-swiper {
          padding-bottom: 20px;
        }

        .swiper-button-disabled {
          opacity: 0.3;
          cursor: not-allowed !important;
        }
      `}</style>
    </div>
  );
};

export default Videos;
