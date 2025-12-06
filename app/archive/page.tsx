"use client";
import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";
import hero from "@/public/Archive/hero.png";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaAnglesDown } from "react-icons/fa6";
import { IoIosArrowRoundForward } from "react-icons/io";

interface Data {
  _id: string;
  img: string;
  title: string;
  des: string;
  date: string;
  category: string;
}

const categories: string[] = [
  "Historical Records",
  "Community Stories",
  "News and Update",
];

const Page = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("Historical Records");
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch data from Sanity
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const query = `*[_type == "archivePost"] | order(date desc) {
          _id,
          title,
          "img": img.asset->url,
          des,
          date,
          category,
        }`;

        const result = await client.fetch(query);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter data by category and search
  const filterdData = data.filter((d) => {
    const matchesCategory = d.category
      ?.toLowerCase()
      .includes(activeCategory.toLowerCase());
    const matchesSearch =
      searchTerm === "" ||
      d.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.des?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="mt-10 md:mt-15">
      <Container>
        {/* Top Section */}
        <section className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-10">
          <div className="w-full lg:w-1/2">
            <h2
              className={`text-xl md:text-3xl lg:text-[45px] text-center lg:text-start max-w-2xl font-extrabold leading-tight ${poppins.className}`}
            >
              <span className="text-[#FF951B]">INDIGENOUS KNOWLEDGE</span> FOR
              FUTURE GENERATIONS
            </h2>
          </div>
          <div className="w-full lg:w-1/2">
            <p
              className={`lg:ml-30 text-justify text-lg lg:text-xl ${antiquaFont.className}`}
            >
              Explore stories, documents, and visual archives celebrating the
              heritage, resilience, and identity of Indigenous communities
              worldwide
            </p>
          </div>
        </section>
      </Container>

      {/* Hero Section */}
      <section className="relative w-full">
        <Image
          src={hero}
          alt="indospeak-hero"
          width={1000}
          height={600}
          className="w-full h-[350px] md:h-[500px] lg:h-full object-cover"
        />
        <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-full px-4">
          <h2
            className={`text-2xl lg:text-4xl font-bold mb-2 lg:mb-4 ${poppins.className}`}
          >
            INDIGENOUS ARCHIVE
          </h2>
          <p
            className={`lg:mb-4 text-lg lg:text-xl max-w-2xl mx-auto px-2 ${antiquaFont.className}`}
          >
            Explore stories, documents, and visual archives celebrating the
            heritage, resilience, and identity of Indigenous communities
            worldwide.
          </p>
          <div
            onClick={() => {
              document
                .getElementById("data")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex flex-col items-center justify-center lg:mt-30 cursor-pointer"
          >
            <button
              className={`text-[#FF951B] px-6 py-2 lg:px-8 lg:py-3 rounded-full text-sm lg:text-lg font-semibold ${poppins.className}`}
            >
              SCROLL DOWN
            </button>
            <FaAnglesDown className="animate-bounce" size={24} />
          </div>
        </div>
      </section>

      {/* Breadcrumb & Search Section */}
      <Container>
        <section
          className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 ${poppins.className} my-5 lg:my-20 font-semibold`}
        >
          <div className="flex gap-3 md:gap-5 text-xs md:text-base py-5 lg:py-0">
            <Link href="/" className="hover:text-[#FF951B] transition-colors">
              HOME
            </Link>
            <span>||</span>
            <p className="text-[#818181] uppercase">INDIGENOUS ARCHIVE</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md flex items-center w-full md:w-auto">
            <input
              type="text"
              placeholder="Search here"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 md:px-5 py-2 outline-none w-full text-sm md:text-base"
            />
            <FaSearch className="mr-2 text-gray-400" />
          </div>
        </section>
      </Container>

      <Container>
        <section id="data" className="my-6 md:my-8 lg:my-10">
          {/* Category container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 overflow-hidden transition-all duration-300 items-center">
            {categories.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setActiveIndex(index);
                    setActiveCategory(item);
                  }}
                  className={`px-4 md:px-6 lg:px-8 py-2 md:py-3 rounded-full cursor-pointer transition flex items-center justify-center gap-2 text-sm md:text-base ${poppins.className
                    } ${activeIndex === index
                      ? "border-gray-700 border bg-gray-200"
                      : "border-gray-200 bg-gray-100 hover:bg-gray-200"
                    }`}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </section>
      </Container>

      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 py-6 md:py-8 lg:py-10">
          <h2
            className={`flex items-center gap-2 text-2xl md:text-3xl lg:text-4xl font-semibold ${poppins.className}`}
          >
            {activeCategory}
          </h2>
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              <select
                name=""
                id=""
                className={`${poppins.className} border border-gray-300 rounded-sm pl-3 md:pl-4 pr-8 md:pr-10 py-2 text-sm md:text-base focus:outline-none w-full md:w-auto cursor-pointer appearance-none uppercase`}
              >
                <option value="modified">Data Modified</option>
                <option value="original">Original</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 md:px-3 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <div className="relative w-full md:w-auto">
              <select
                name=""
                id=""
                className={`${poppins.className} border border-gray-300 rounded-sm pl-3 md:pl-4 pr-8 md:pr-10 py-2 text-sm lg:text-base focus:outline-none w-full md:w-auto cursor-pointer appearance-none`}
              >
                <option value="2021-2022">2021-2022</option>
                <option value="2022-2023">2022-2023</option>
                <option value="2023-2024">2023-2024</option>
                <option value="2024-2025">2024-2025</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 md:px-3 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <section className="pb-8 lg:pb-32">
          {loading ? (
            <div className="text-center h-screen flex justify-center items-center">
              <p
                className={`text-gray-500 text-lg md:text-xl ${poppins.className}`}
              >
                Loading...
              </p>
            </div>
          ) : filterdData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {filterdData.map((project) => (
                <Link href={`/archive/${project.title.toLowerCase()
                  .replace(/\s+/g, '-')
                  .replace(/[^\w\-]+/g, '')
                  .replace(/\-\-+/g, '-')
                  .replace(/^-+/, '')
                  .replace(/-+$/, '')}`} key={project._id}>
                  <div className="relative h-full group">
                    <div className="border border-gray-300 p-3 md:p-4 rounded-lg h-full flex flex-col">
                      <div className="relative w-full h-[250px] md:h-[250px] mb-3 md:mb-4 shrink-0">
                        <Image
                          src={project.img}
                          alt={project.title}
                          width={500}
                          height={500}
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div className="mt-4 lg:mt-5 space-y-2 lg:space-y-3 grow flex flex-col">
                        <h2
                          className={`${poppins.className} text-base lg:text-lg font-semibold line-clamp-2`}
                        >
                          {project.title}
                        </h2>
                        <p
                          className={`${poppins.className} text-[#6B6B6B] text-xs lg:text-sm`}
                        >
                          {formatDate(project.date)}
                        </p>
                        <p
                          className={`${antiquaFont.className} text-justify text-[#4D4D4D] text-sm md:text-base line-clamp-3 grow`}
                        >
                          {project.des}
                        </p>
                        <button
                          className={`${poppins.className} flex items-center gap-2 mt-3 lg:mt-5 text-[#36133B] cursor-pointer group-hover:text-[#ff951b] transition-colors text-sm md:text-base pt-auto`}
                        >
                          Read More <IoIosArrowRoundForward size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center h-screen flex justify-center items-center">
              <p
                className={`text-gray-500 text-lg md:text-xl ${poppins.className}`}
              >
                No projects found in this category.
              </p>
            </div>
          )}
        </section>
      </Container>
    </div>
  );
};

export default Page;
