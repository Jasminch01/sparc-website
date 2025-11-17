"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import Container from "@/components/Container";
import Image from "next/image";
import { antiquaFont, poppins } from "@/components/utils/font";
import { Project, ResearchData } from "@/components/utils/types";

const ResearchDetailsPage = () => {
  const params = useParams();
  const id = params.id;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/research/data.json")
      .then((res) => res.json())
      .then((data: ResearchData) => {
        const selectedProject = data.projects.find((p) => p.id === Number(id));
        setProject(selectedProject || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching project:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="animate-pulse">
          <div className="h-6 sm:h-8 bg-gray-200 rounded w-1/2 sm:w-1/4 mb-6 sm:mb-8"></div>
          <div className="h-10 sm:h-12 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-5 sm:h-6 bg-gray-200 rounded w-3/4 mb-6 sm:mb-8"></div>
          <div className="space-y-3 sm:space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">
          Project Not Found
        </h1>
        <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
          The research project you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/our-research"
          className="text-blue-600 hover:text-blue-700 font-semibold text-sm sm:text-base inline-flex items-center gap-2"
        >
          ← Back to Research Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-48">
      <div className={`py-8 md:py-12 lg:py-16 ${poppins.className}`}>
        <p className="text-center font-bold text-4xl">
          ONGOING RESEARCH PROJECTS
        </p>
        <Container>
          <div className="my-20">
            <section className={`flex gap-5  ${poppins.className}`}>
              <Link href="/">Home</Link> <span>||</span>
              <Link href="/our-research" className="uppercase">
                Our Research
              </Link>
              <span>||</span>
              <p className="text-[#818181] uppercase">{project.title}</p>
            </section>
          </div>

          {/* Header Section */}
          <div className="space-y-4 sm:space-y-5">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
              {project.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
              <span className="font-medium">13 OCTOBER 1999</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="my-8 sm:my-10 lg:my-12 rounded-lg overflow-hidden shadow-lg">
            <Image
              alt={project.title}
              src={project.image}
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="space-y-8 sm:space-y-12 lg:space-y-16">
            {/* Project Overview */}
            <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 lg:p-10 shadow-sm">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">
                Project Overview
              </h2>
              <p
                className={`${antiquaFont.className} text-base sm:text-lg lg:text-xl leading-10 `}
              >
                {project.description}
              </p>
            </section>

            {/* Project Details */}
            <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 lg:p-10 shadow-sm">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8 lg:mb-10">
                Project Details
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
                {/* Left Column */}
                <div className="space-y-6 sm:space-y-8">
                  {/* Status */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Status</h3>
                    <p
                      className={`text-lg text-[#E47A00] ${antiquaFont.className}`}
                    >
                      {project.status}
                    </p>
                  </div>

                  {/* Duration */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Duration</h3>
                    <p className={`text-lg ${antiquaFont.className}`}>
                      {project.duration}
                    </p>
                  </div>

                  {/* Authors */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Authors</h3>
                    <ul className="space-y-1">
                      {project.authors.map((author, index) => (
                        <li
                          key={index}
                          className={`text-lg ${antiquaFont.className}`}
                        >
                          {author}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Objectives */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-3">Objectives</h3>
                    <ul
                      className={`space-y-2 sm:space-y-3 ${antiquaFont.className}`}
                    >
                      {project.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Image
                            src={"/research/right.svg"}
                            width={50}
                            height={50}
                            alt="svg-icon"
                            className="size-6"
                          />
                          <span
                            className={`text-lg leading-relaxed ${antiquaFont.className}`}
                          >
                            {objective}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6 sm:space-y-8">
                  {/* Location */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Location</h3>
                    <p className={`text-lg ${antiquaFont.className}`}>
                      {project.location}
                    </p>
                  </div>

                  {/* Funded By */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Funded By</h3>
                    <p className={`text-lg ${antiquaFont.className}`}>
                      {project.fundedBy}
                    </p>
                  </div>

                  {/* Researchers */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Researchers</h3>
                    <ul className="space-y-1">
                      {project.researchers.map((researcher, index) => (
                        <li
                          key={index}
                          className={`text-lg ${antiquaFont.className}`}
                        >
                          {researcher}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Methodology */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Methodology</h3>
                    <p className={`text-lg ${antiquaFont.className}`}>
                      {project.methodology}
                    </p>
                  </div>

                  {/* Impact */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Impact</h3>
                    <p
                      className={`text-lg leading-relaxed ${antiquaFont.className}`}
                    >
                      {project.impact}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ResearchDetailsPage;
