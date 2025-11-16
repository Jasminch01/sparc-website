"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ResearchData } from "../utils/types";
import Image from "next/image";
import { antiquaFont, poppins } from "../utils/font";
import { MdOutlineFileDownload } from "react-icons/md";

const ResearchProjects = () => {
  const [activeTab, setActiveTab] = useState("Building Movements");
  const [data, setData] = useState<ResearchData>({ tabs: [], projects: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/research/data.json")
      .then((res) => res.json())
      .then((jsonData: ResearchData) => {
        setData(jsonData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching research data:", error);
        setLoading(false);
      });
  }, []);

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
      <div className="max-w-7xl mx-auto px-4 py-12">
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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <p className="text-sm font-semibold text-gray-600 mb-6 tracking-wider">
          RESEARCH FOCUS AREA
        </p>

        {/* Tabs */}
        <div className="flex gap-3 flex-wrap">
          {data.tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 rounded-full bg-[#F6F6F6] font-medium transition-all ${activeTab === tab.id
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
        <h2 className="text-3xl font-bold mb-2 text-center">{activeTab}</h2>

        {/* Ongoing Projects */}
        {ongoingProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide">
              Ongoing Research Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ongoingProjects.map((project) => (
                <Link
                  href={`/our-research/${project.id}`}
                  key={project.id}
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
                    <h3 className="text-lg font-bold mb-3 text-gray-900">
                      {project.title}
                    </h3>
                    <div className="text-xs text-gray-500 mb-4 flex space-x-1">
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
                      className={`text-[18px] leading-relaxed mb-4 line-clamp-2 ${antiquaFont.className}`}
                    >
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <button className=" px-6 py-3 bg-[#36133B] rounded-full text-sm font-semibold text-white transition-colors">
                        View Report →
                      </button>
                      <button className=" px-6 py-3 border-[#36133B] border rounded-full text-sm font-semibold  transition-colors flex items-center gap-x-5">
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
              {completedProjects.map((project) => (
                <Link
                  href={`/our-research/${project.id}`}
                  key={project.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white block"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                      {project.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="text-sm text-gray-500 mb-4">
                    <p className="mb-1">
                      <span className="font-semibold">Duration:</span>{" "}
                      {project.duration}
                    </p>
                    <p>
                      <span className="font-semibold">Location:</span>{" "}
                      {project.location}
                    </p>
                  </div>

                  <span className="text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors">
                    View Details →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {ongoingProjects.length === 0 && completedProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResearchProjects;
