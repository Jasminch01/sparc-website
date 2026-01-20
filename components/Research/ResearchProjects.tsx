/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { antiquaFont, jost } from "../utils/font";
import {
  getResearchCategories,
  getResearchProjects,
  ResearchProject,
  ResearchResponse,
} from "@/sanity/queries/researchQueries";

interface Tab {
  id: string;
  label: string;
}

const ResearchProjects = () => {
  const defaultTab = "Building Movements";
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [ongoingProjects, setOngoingProjects] = useState<ResearchProject[]>([]);
  const [completedProjects, setCompletedProjects] = useState<ResearchProject[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [currentOngoingPage, setCurrentOngoingPage] = useState(1);
  const [currentCompletedPage, setCurrentCompletedPage] = useState(1);
  const [totalOngoing, setTotalOngoing] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const itemsPerPage = 3;

  // Fetch categories for tabs
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getResearchCategories();
        const tabsData: Tab[] = categories.map((c) => ({
          id: c,
          label: c,
        }));
        setTabs(tabsData);

        // Set initial active tab
        const initialActiveTab =
          tabsData.find((t) => t.id === defaultTab)?.id ||
          tabsData[0]?.id ||
          "";
        setActiveTab(initialActiveTab);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch projects when filters change
  useEffect(() => {
    const fetchProjects = async () => {
      if (!activeTab) return;

      try {
        setLoading(true);
        // Fetch ongoing projects for this specific category
        const ongoingResponse: ResearchResponse = await getResearchProjects({
          category: activeTab,
          status: "Ongoing",
          page: currentOngoingPage,
          pageSize: itemsPerPage,
        });

        // Fetch completed projects for this specific category
        const completedResponse: ResearchResponse = await getResearchProjects({
          category: activeTab,
          status: "Completed",
          page: currentCompletedPage,
          pageSize: itemsPerPage,
        });

        // Set the data
        setOngoingProjects(ongoingResponse.projects || []);
        setCompletedProjects(completedResponse.projects || []);
        setTotalOngoing(ongoingResponse.total || 0);
        setTotalCompleted(completedResponse.total || 0);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setOngoingProjects([]);
        setCompletedProjects([]);
        setTotalOngoing(0);
        setTotalCompleted(0);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [activeTab, currentOngoingPage, currentCompletedPage]);

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentOngoingPage(1);
    setCurrentCompletedPage(1);
  }, [activeTab]);

  const totalOngoingPages = Math.ceil(totalOngoing / itemsPerPage);
  const totalCompletedPages = Math.ceil(totalCompleted / itemsPerPage);

  const handleOngoingPageChange = (pageNumber: number) => {
    setCurrentOngoingPage(pageNumber);
    // window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCompletedPageChange = (pageNumber: number) => {
    setCurrentCompletedPage(pageNumber);
    // window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Helper function to extract description text
  const getDescriptionText = (description: any[]): string => {
    if (!description || !Array.isArray(description)) return "";

    return description
      .filter((block) => block._type === "block")
      .map(
        (block) =>
          block.children
            ?.filter((child: any) => child._type === "span")
            .map((child: any) => child.text)
            .join("") || "",
      )
      .join(" ");
  };

  // Show loading state
  if (
    loading &&
    ongoingProjects.length === 0 &&
    completedProjects.length === 0
  ) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 h-screen">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="flex gap-3 mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 bg-gray-200 rounded-full w-40"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg p-6">
                <div className="h-4 bg-gray-200 rounded w-20 mb-3"></div>
                <div className="h-6 bg-gray-200 rounded w-full mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="mb-12">
        <p className="text-sm font-semibold text-gray-600 mb-6 tracking-wider">
          RESEARCH FOCUS AREA
        </p>

        {/* Tabs */}
        <div className="lg:flex gap-3 flex-wrap grid grid-cols-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 rounded-full cursor-pointer bg-[#F6F6F6] text-sm sm:text-base font-medium transition-all ${
                activeTab === tab.id
                  ? "border border-gray-400"
                  : "border border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Section */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-10">{activeTab}</h2>

        {/* Ongoing Projects - Only render if there are ongoing projects */}
        {totalOngoing > 0 && (
          <div className="mb-16">
            <h3
              className={`text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide ${jost.className}`}
            >
              Ongoing Research Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {ongoingProjects.map((project) => (
                <Link
                  href={`/our-research/${project.title}`}
                  key={project._id}
                  className="border border-gray-200 rounded-lg p-6 group bg-white block"
                >
                  <div className="relative w-full h-[200px] mb-4">
                    <Image
                      src={project.image?.asset?.url || "/placeholder.jpg"}
                      alt={project.image?.alt || project.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className={`mt-5 ${jost.className}`}>
                    <h3 className="text-lg group-hover:text-[#ff951b] transition-colors duration-300 font-bold mb-3 text-gray-900">
                      {project.title}
                    </h3>
                    <div className="text-xs text-gray-500 mb-4 flex space-x-1 flex-wrap">
                      <p className="mb-1">
                        <span className="font-semibold">Status:</span>{" "}
                        {project.status}
                      </p>
                      <p>|</p>
                      <p className="mb-1">
                        <span className="font-semibold">Duration:</span>{" "}
                        {project.duration}
                      </p>
                      <p>|</p>
                      <p>
                        <span className="font-semibold">Author:</span>{" "}
                        {project.fundedBy}
                      </p>
                    </div>
                    <p
                      className={`text-[18px] leading-relaxed mb-4 line-clamp-2 text-[#6d6b6b] ${antiquaFont.className}`}
                    >
                      {getDescriptionText(project.description).slice(0, 190)}
                    </p>
                    <div className="flex items-center justify-between">
                      <button className="cursor-pointer group-hover:bg-[#ff951b] lg:px-6 lg:py-3 p-4 bg-[#36133B] rounded-full text-sm font-semibold text-white transition-colors duration-300">
                        View Report →
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination for Ongoing Projects */}
            {totalOngoingPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() =>
                    handleOngoingPageChange(currentOngoingPage - 1)
                  }
                  disabled={currentOngoingPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                >
                  Previous
                </button>

                {Array.from({ length: totalOngoingPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handleOngoingPageChange(page)}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        currentOngoingPage === page
                          ? "bg-[#36133B] text-white border-[#36133B]"
                          : "border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}

                <button
                  onClick={() =>
                    handleOngoingPageChange(currentOngoingPage + 1)
                  }
                  disabled={currentOngoingPage === totalOngoingPages}
                  className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}

        {/* Completed Projects - Only render if there are completed projects */}
        {totalCompleted > 0 && (
          <div>
            <h3
              className={`text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide ${jost.className}`}
            >
              Completed Research Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedProjects.map((project) => (
                <Link
                  href={`/our-research/${project.title}`}
                  key={project._id}
                  className="border group border-gray-200 rounded-lg p-6 bg-white block"
                >
                  <div className="relative w-full h-[200px] mb-4">
                    <Image
                      src={project.image?.asset?.url || "/placeholder.jpg"}
                      alt={project.image?.alt || project.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className={`mt-5 ${jost.className}`}>
                    <h3 className="text-lg group-hover:text-[#ff951b] transition-colors duration-300 font-bold mb-3 text-gray-900">
                      {project.title}
                    </h3>
                    <div className="text-xs text-gray-500 mb-4 flex space-x-1 flex-wrap">
                      <p className="mb-1">
                        <span className="font-semibold">Status:</span>{" "}
                        {project.status}
                      </p>
                      <p>|</p>
                      <p className="mb-1">
                        <span className="font-semibold">Duration:</span>{" "}
                        {project.duration}
                      </p>
                      <p>|</p>
                      <p>
                        <span className="font-semibold">Author:</span>{" "}
                        {project.fundedBy}
                      </p>
                    </div>
                    <p
                      className={`text-[18px] leading-relaxed mb-4 line-clamp-2 text-[#6d6b6b] ${antiquaFont.className}`}
                    >
                      {getDescriptionText(project.description).slice(0, 190)}
                    </p>
                    <div className="flex items-center justify-between">
                      <button className="px-6 duration-300 group-hover:text-white group-hover:bg-[#ff951b] py-3 bg-[#36133B] rounded-full text-sm font-semibold text-white transition-colors">
                        View Report →
                      </button>

                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination for Completed Projects */}
            {totalCompletedPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() =>
                    handleCompletedPageChange(currentCompletedPage - 1)
                  }
                  disabled={currentCompletedPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                >
                  Previous
                </button>

                {Array.from(
                  { length: totalCompletedPages },
                  (_, i) => i + 1,
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => handleCompletedPageChange(page)}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      currentCompletedPage === page
                        ? "bg-[#36133B] text-white border-[#36133B]"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() =>
                    handleCompletedPageChange(currentCompletedPage + 1)
                  }
                  disabled={currentCompletedPage === totalCompletedPages}
                  className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}

        {/* Empty State - Only show if BOTH ongoing and completed are empty */}
        {!loading && totalOngoing === 0 && totalCompleted === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No projects found for {activeTab}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResearchProjects;
