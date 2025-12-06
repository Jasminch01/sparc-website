"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdOutlineFileDownload } from "react-icons/md";
import { client } from "@/sanity/lib/client";
import { antiquaFont, poppins } from "../utils/font";

// Define the interface for the fetched data structure
interface Project {
  _id: string;
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  status: string;
  duration: string;
  fundedBy: string;
  image: string;
}

interface Tab {
  id: string;
  label: string;
}

interface ResearchProjectsData {
  projects: Project[];
  tabs: Tab[];
}

const ResearchProjects = () => {
  const defaultTab = "Building Movements";
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [data, setData] = useState<ResearchProjectsData>({ projects: [], tabs: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResearchData = async () => {
      try {
        setLoading(true);

        // Fetch all research projects
        const query = `
          *[_type == "research"] | order(date desc) {
            _id,
            title,
            date,
            category,
            description,
            status,
            duration,
            fundedBy,
            "image": image.asset->url,
            "id": _id
          }
        `;

        const projects: Project[] = await client.fetch(query);

        // Dynamically generate unique tabs based on project categories
        const tabs: Tab[] = Array.from(new Set(projects.map(p => p.category))).map(c => ({
          id: c,
          label: c,
        }));

        setData({ projects, tabs });

        // Set initial active tab
        const initialActiveTab = tabs.find(t => t.id === defaultTab)?.id || tabs[0]?.id || "";
        setActiveTab(initialActiveTab);

      } catch (error) {
        console.error("Error fetching research data from Sanity:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResearchData();
  }, []);

  // Filter projects by category
  const filteredProjects = data.projects.filter(
    (project) => project.category === activeTab
  );
  const ongoingProjects = filteredProjects.filter(
    (project) => project.status === "Ongoing"
  );
  const completedProjects = filteredProjects.filter(
    (project) => project.status === "Completed"
  );

  if (loading) {
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
        <div className="lg:flex gap-3 flex-wrap grid grid-cols-2">
          {data.tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 rounded-full cursor-pointer bg-[#F6F6F6] text-sm sm:text-base font-medium transition-all ${activeTab === tab.id ? "border border-gray-400" : "border border-transparent"
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

        {/* Ongoing Projects */}
        {ongoingProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide">
              Ongoing Research Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {ongoingProjects.map((project, idx) => (
                <Link
                  href={`/our-research/${project.title.toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^\w\-]+/g, "")
                    .replace(/\-\-+/g, "-")
                    .replace(/^-+/, "")
                    .replace(/-+$/, "")}`}
                  key={idx}
                  className="border border-gray-200 rounded-lg p-6 group bg-white block"
                >
                  <div>
                    <Image
                      src={project.image}
                      alt="project-image"
                      width={300}
                      height={300}
                      className="w-full"
                    />
                  </div>
                  <div className={`mt-5 ${poppins.className}`}>
                    <h3 className="text-lg group-hover:text-[#ff951b] transition-colors duration-300 font-bold mb-3 text-gray-900">
                      {project.title}
                    </h3>
                    <div className="text-xs text-gray-500 mb-4 flex space-x-1">
                      <p className="mb-1">
                        <span className="font-semibold">Status:</span> {project.status}
                      </p>
                      <p>|</p>
                      <p className="mb-1">
                        <span className="font-semibold">Duration:</span> {project.duration}
                      </p>
                      <p>|</p>
                      <p>
                        <span className="font-semibold">Author:</span> {project.fundedBy}
                      </p>
                    </div>
                    <p className={`text-[18px] leading-relaxed mb-4 line-clamp-2 ${antiquaFont.className}`}>
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <button className="cursor-pointer group-hover:bg-[#ff951b] lg:px-6 lg:py-3 p-4 bg-[#36133B] rounded-full text-sm font-semibold text-white transition-colors duration-300">
                        View Report →
                      </button>
                      <button className="lg:px-6 lg:py-3 p-4 border-[#36133B] border hover:bg-[#36133B] hover:text-white cursor-pointer rounded-full text-sm font-semibold transition-colors flex items-center space-x-0 lg:space-x-5">
                        <p>Download PDF</p>
                        <MdOutlineFileDownload size={20} />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Completed Projects */}
        {completedProjects.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide">
              Completed Research Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedProjects.map((project, idx) => (
                <Link
                  href={`/our-research/${project.title.toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^\w\-]+/g, "")
                    .replace(/\-\-+/g, "-")
                    .replace(/^-+/, "")
                    .replace(/-+$/, "")}`}
                  key={idx}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white block"
                >
                  <div>
                    <Image
                      src={project.image}
                      alt="project-image"
                      width={300}
                      height={300}
                      className="w-full"
                    />
                  </div>
                  <div className={`mt-5 ${poppins.className}`}>
                    <h3 className="text-lg font-bold mb-3 text-gray-900">{project.title}</h3>
                    <div className="text-xs text-gray-500 mb-4 flex space-x-1">
                      <p className="mb-1">
                        <span className="font-semibold">Status:</span> {project.status}
                      </p>
                      <p>|</p>
                      <p className="mb-1">
                        <span className="font-semibold">Duration:</span> {project.duration}
                      </p>
                      <p>|</p>
                      <p>
                        <span className="font-semibold">Author:</span> {project.fundedBy}
                      </p>
                    </div>
                    <p className={`text-[18px] leading-relaxed mb-4 line-clamp-2 ${antiquaFont.className}`}>
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <button className="px-6 py-3 bg-[#36133B] rounded-full text-sm font-semibold text-white transition-colors">
                        View Report →
                      </button>
                      <button className="px-6 py-3 border-[#36133B] border rounded-full text-sm font-semibold transition-colors flex items-center gap-x-5">
                        <p>Download PDF</p>
                        <MdOutlineFileDownload size={20} />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {ongoingProjects.length === 0 && completedProjects.length === 0 && (
          <div className="text-center py-12 h-screen flex justify-center items-center">
            <p className="text-gray-500 text-lg">No projects found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResearchProjects;