"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { jost, poppins } from "../utils/font";
import Container from "../Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import {
  FellowshipMember,
  FellowshipSection,
  getAllFellowshipMembers,
  getFellowshipSection,
} from "@/sanity/queries/followshipOfTheYearQuires";

const FollowshipYear = () => {
  const [loading, setLoading] = useState(true);
  const [fellowshipMembers, setFellowshipMembers] = useState<
    FellowshipMember[]
  >([]);
  const [sectionData, setSectionData] = useState<FellowshipSection>({
    sectionTitle: "FELLOWSHIP 2026",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch section settings
        const section = await getFellowshipSection();
        if (section) {
          setSectionData(section);
        }

        // Fetch all fellowship members
        const members = await getAllFellowshipMembers();
        setFellowshipMembers(members);
      } catch (error) {
        console.error("Error fetching fellowship data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`${poppins.className} py-16 bg-white max-w-6xl mx-auto`}>
      <Container>
        <style jsx global>{`
          .fellowship-swiper {
            padding-bottom: 50px;
          }

          .fellowship-swiper .swiper-pagination {
            bottom: 0 !important;
            position: relative !important;
            margin-top: 40px;
          }

          .fellowship-swiper .swiper-pagination-bullet {
            width: 12px;
            height: 12px;
            background: #9ca3af;
            opacity: 1;
            margin: 0 6px;
          }

          @media (min-width: 640px) {
            .fellowship-swiper .swiper-pagination-bullet {
              width: 14px;
              height: 14px;
            }
          }

          .fellowship-swiper .swiper-pagination-bullet-active {
            background: #f26522;
            width: 14px;
            height: 14px;
          }

          @media (min-width: 640px) {
            .fellowship-swiper .swiper-pagination-bullet-active {
              width: 16px;
              height: 16px;
            }
          }

          @media (max-width: 640px) {
            .fellowship-swiper {
              padding-bottom: 40px;
            }

            .fellowship-swiper .swiper-pagination {
              margin-top: 30px;
            }
          }
        `}</style>

        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 mb-12">
          <div className="flex-1">
            <h2
              className={`${jost.className} text-2xl lg:text-4xl font-bold mb-4`}
            >
              {sectionData.sectionTitle}
            </h2>
          </div>
        </div>

        {/* Fellowship Grid/Swiper */}
        <div className="mt-12">
          {/* Loading State */}
          {loading && (
            <div className="text-center py-10">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#F26522] border-r-transparent"></div>
            </div>
          )}

          {/* Fellowship Members Swiper */}
          {!loading && fellowshipMembers.length > 0 && (
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
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
              }}
              className="fellowship-swiper"
            >
              {fellowshipMembers.map((member) => (
                <SwiperSlide key={member._id}>
                  <div className="flex flex-col items-center text-center group">
                    <div className="relative w-full aspect-3/4 mb-4 overflow-hidden transition-transform duration-300 hover:scale-105">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3
                      className={`${jost.className} text-xl font-semibold text-gray-800 mb-1`}
                    >
                      {member.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{member.title}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {/* Empty State */}
          {!loading && fellowshipMembers.length === 0 && (
            <p className="text-center text-gray-600 py-12">
              No fellowship members found.
            </p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default FollowshipYear;
