"use client";
import React, { useState, useEffect } from "react";
import leaf from "../../public/Team/Leaf.png";
import Image from "next/image";
import { antiquaFont, poppins } from "../utils/font";
import Container from "../Container";
import { client } from "@/sanity/lib/client";
import { useTranslation } from "react-i18next"; // Import useTranslation

interface TeamMember {
    _id: string;
    name: string;
    title: string;
    image: string;
    imageAlt?: string;
    category: string;
}

const Team = () => {
    const { t } = useTranslation(); // Initialize translation hook

    // Fetch translated static texts
    const teamTitle = t('team.title', 'MEET THE TEAM');
    const teamDescription = t('team.description', 'Strong voices. Bold visions. Meet the women and allies driving equality and empowerment forward. Our strength lies in unity. The incredible women and allies in our team are at the heart of everything we do — leading initiatives, empowering communities, and standing firm for justice and equality.');
    const categoryAll = t('team.category_all', 'All');
    const noMembersFound = t('team.no_members_found', 'No team members found in this category.');

    const [activeCategory, setActiveCategory] = useState(categoryAll);
    const [loading, setLoading] = useState(true);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    // Categories will now be initialized with the translated "All" text
    const [categories, setCategories] = useState<string[]>([categoryAll]); 

    // Fetch team members from Sanity
    useEffect(() => {
        const fetchTeamMembers = async () => {
            try {
                setLoading(true);
                const query = `*[_type == "socialWorkerTeam"] | order(_createdAt desc) {
                    _id,
                    name,
                    title,
                    "image": image.asset->url,
                    "imageAlt": image.alt,
                    category
                }`;

                const data = await client.fetch(query);
                setTeamMembers(data);

                // Extract unique categories (These category names come from Sanity and are NOT translated here)
                const uniqueCategories = Array.from(
                    new Set(data.map((member: TeamMember) => member.category))
                ) as string[];
                
                // Set categories with the translated "All" button first
                setCategories([categoryAll, ...uniqueCategories]);
            } catch (error) {
                console.error("Error fetching team members:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeamMembers();
    }, [categoryAll]); // Dependency on categoryAll to re-run on language change

    const handleCategoryClick = (category: string) => {
        setActiveCategory(category);
    };

    const filteredTeam =
        activeCategory === categoryAll
            ? teamMembers
            : teamMembers.filter(
                (member) =>
                    member.category?.toLowerCase() === activeCategory.toLowerCase()
            );

    return (
        <Container>
            <div className="my-12 md:my-16 lg:my-20">
                {/* Top Section */}
                <section className="flex flex-col xl:flex-row items-start xl:items-center gap-8 lg:gap-12 mb-12 md:mb-16 lg:mb-20">
                    <div className="w-full lg:w-1/2">
                        <div className="max-w-md space-y-3 md:space-y-4">
                            <div className="flex gap-2 items-start">
                                <h2
                                    style={{ fontFamily: '"Rowan", serif' }}
                                    className="xl:text-7xl font-bold md:text-5xl text-4xl mt-2 md:mt-5"
                                >
                                    01
                                </h2>
                                <Image
                                    src={leaf}
                                    alt="team-leaf"
                                    width={80}
                                    height={80}
                                    className="object-contain lg:size-28 size-14 md:size-20"
                                />
                            </div>
                            <hr className="border-gray-400 border" />
                            <p
                                className={`${poppins.className} font-bold xl:text-4xl md:text-3xl text-2xl leading-tight`}
                            >
                                {/* Display Translated Title */}
                                {teamTitle}
                            </p>
                        </div>
                    </div>

                    <div className="w-full xl:w-1/2">
                        <p
                            className={`text-justify text-lg lg:text-xl leading-relaxed text-[#4D4D4D] ${antiquaFont.className}`}
                        >
                            {/* Display Translated Description */}
                            {teamDescription}
                        </p>
                    </div>
                </section>

                {/* Category Buttons */}
                <div className="flex flex-wrap gap-3 md:gap-4 mb-8 md:mb-10 justify-center md:justify-start">
                    {categories.map((ct, index) => (
                        <button
                            key={index}
                            onClick={() => handleCategoryClick(ct)}
                            // Ensure comparison uses the translated 'All' value
                            className={`${poppins.className} px-4 md:px-6 py-2 rounded-full text-lg transition-all duration-200 cursor-pointer ${activeCategory === ct
                                    ? "bg-[#772E82] text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-[#772E82] hover:text-white"
                                }`}
                        >
                            {/* Category names from Sanity are displayed here (ct) */}
                            {ct}
                        </button>
                    ))}
                </div>

                {/* Team Grid with improved loading state */}
                <div className="min-h-[500px]">
                    {loading ? (
                        // Loading State (Skeletons)
                        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-6">
                            {[1, 2, 3, 4].map((skeleton) => (
                                <div key={skeleton} className="flex flex-col animate-pulse">
                                    <div className="bg-gray-200 w-full aspect-3/4 rounded-lg"></div>
                                    <div className="mt-3 md:mt-4 space-y-2">
                                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    </div>
                                </div>
                            ))}
                        </section>
                    ) : filteredTeam.length > 0 ? (
                        // Team Members Grid
                        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-6">
                            {filteredTeam.map((team, index) => (
                                <div
                                    key={team._id}
                                    className="flex flex-col opacity-0 animate-fadeIn"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="relative w-full aspect-3/4 rounded-lg overflow-hidden bg-gray-100">
                                        <Image
                                            src={team.image}
                                            alt={team.imageAlt || team.name}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                            className="object-cover"
                                            priority={index < 4}
                                        />
                                    </div>
                                    <div className="mt-3 md:mt-4">
                                        <h2
                                            className={`${poppins.className} font-bold text-lg md:text-xl`}
                                        >
                                            {/* Name (Dynamic from Sanity) */}
                                            {team.name}
                                        </h2>
                                        <p
                                            className="text-sm md:text-base text-gray-600"
                                            style={{ fontFamily: '"Book Antiqua", serif' }}
                                        >
                                            {/* Title (Dynamic from Sanity) */}
                                            {team.title}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </section>
                    ) : (
                        // No Data Found State
                        <div className="text-center py-32">
                            <p
                                className={`text-center text-gray-500 font-medium text-sm ${poppins.className}`}
                            >
                                {/* Display Translated No Members Found Message */}
                                {noMembersFound}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out forwards;
                }
            `}</style>
        </Container>
    );
};

export default Team;