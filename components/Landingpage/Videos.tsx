"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Container from "../Container";
// Added notoBengali to imports
import { antiquaFont, jost, notoBengali } from "../utils/font";
import { useTranslation } from "react-i18next";

const videos = [
    {
        id: 1,
        url: "https://www.youtube.com/embed/Gbzbg2U48Nk",
        title: "Video 1"
    },
    {
        id: 2,
        url: "https://www.youtube.com/embed/Gbzbg2U48Nk",
        title: "Video 2"
    },
    {
        id: 3,
        url: "https://www.youtube.com/embed/Gbzbg2U48Nk",
        title: "Video 3"
    },
    {
        id: 4,
        url: "https://www.youtube.com/embed/Gbzbg2U48Nk",
        title: "Video 4"
    }
];

const Videos = () => {
    // Destructure i18n to check current language
    const { t, i18n } = useTranslation();
    const isBn = i18n.language === 'BN' || i18n.language === 'bn';

    const componentTitle = t('videos.title', 'VIDEOS');
    const componentDescription = t('videos.description', 'Strong voices. Bold visions. Meet the women and allies driving equality and empowerment forward. Our strength lies in unity.');

    return (
        <div className={`bg-[#36133B] py-10 md:py-16 lg:py-24 xl:py-32 lg:mt-10 relative ${isBn ? notoBengali.className : ""}`}>
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

                    {/* Video Slider */}
                    <div className="relative px-12">
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={30}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            loop={true}
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
                                <SwiperSlide key={video.id}>
                                    <div className="w-full aspect-video">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={video.url}
                                            title={video.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="rounded-md shadow-lg w-full h-full"
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
                .video-swiper .swiper-button-next,
                .video-swiper .swiper-button-prev {
                    color: #FF951B;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                }

                .video-swiper .swiper-button-next:after,
                .video-swiper .swiper-button-prev:after {
                    font-size: 20px;
                }
                .video-swiper .swiper-pagination-bullet-active {
                    background: #FF951B;
                    opacity: 1;
                }

                .video-swiper {
                    padding-bottom: 50px;
                }
            `}</style>
        </div>
    );
};

export default Videos;