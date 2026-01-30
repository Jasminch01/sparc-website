"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { jost, poppins } from "../utils/font";
import Container from "../Container";
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

        {/* Fellowship Grid */}
        <div className="mt-12">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((skeleton) => (
                <div
                  key={skeleton}
                  className="animate-pulse flex flex-col items-center"
                >
                  <div className="w-full aspect-3/4 bg-gray-300 mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded w-32 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                </div>
              ))}
            </div>
          ) : fellowshipMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {fellowshipMembers.map((member) => (
                <div
                  key={member._id}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="relative w-full aspect-3/4 mb-4 overflow-hidden transition-transform duration-300">
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
              ))}
            </div>
          ) : (
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
