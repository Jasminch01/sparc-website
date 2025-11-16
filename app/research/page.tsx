"use client"
import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";
import hero from "@/public/Research/hero.png"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiSolidLeaf, BiWorld } from "react-icons/bi";
import { FaLanguage, FaSearch } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";
import { TbDownload, TbGenderFemale } from "react-icons/tb";

const categories = [
    {
        title: 'Building Movements',
        icon: <BiWorld />
    },
    {
        title: 'Gender and Social Justice',
        icon: <TbGenderFemale />
    },
    {
        title: 'Training and Workshop',
        icon: <BiSolidLeaf />
    },
    {
        title: 'Language and Education',
        icon: <FaLanguage />
    }
]
interface Projects {
    img: string,
    title: string,
    duration: string,
    des: string,
    status: string,
    author: string,
    category: string
}

const Page = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [activeCategory, setActiveCategory] = useState("Building Movements")
    const [projects, setProjects] = useState<Projects[]>([])


    // Fetch projects data
    useEffect(() => {
        fetch('/Research/projects.json')
            .then(res => res.json())
            .then(data => setProjects(data))
    }, [])

    // Filter the project based on category 

    const ongoingProjects = projects.filter(pro =>
        pro.category.toLowerCase().includes(activeCategory.toLowerCase()) &&
        pro.status.toLowerCase() === 'ongoing'
    );
    const completedProjects = projects.filter(pro =>
        pro.category.toLowerCase().includes(activeCategory.toLowerCase()) &&
        pro.status.toLowerCase() === 'completed'
    );

    return (
        <div className="mt-15">
            <Container>
                {/* Top Section */}
                <section className="flex justify-between gap-20">
                    <div className="w-1/2">
                        <h2 className={`text-5xl max-w-2xl font-extrabold ${poppins.className}`}>EXPLORING <span className="text-[#FF951B]">KNOWLEDGE</span> THROUGH RESEARCH</h2>
                    </div>
                    <div className="w-1/2">
                        <p className={`ml-30 text-justify text-lg ${antiquaFont.className}`}>To showcase research projects, findings, and collaborations that advance understanding of Indigenous rights, culture, environment, and community well-being.</p>
                    </div>
                </section>
            </Container>

            {/* Hero Section */}
            <section className="relative w-full">
                <Image src={hero} alt="fellowship-hero" width={1000} height={600} className="w-full" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center  text-white">
                    <h2 className={`text-4xl font-bold mb-4 ${poppins.className}`}>OUR RESEARCH</h2>
                    <p className={`mb-4 text-lg max-w-2xl mx-auto ${antiquaFont.className}`}>
                        Our research amplifies Indigenous voices, documents cultural wisdom, and supports evidence-based advocacy for equality and sustainability
                    </p>
                    <div className="flex flex-col items-center justify-center mt-15 cursor-pointer">
                        <button className={`bg-[#FF951B] px-10 py-6 rounded-full text-sm ${poppins.className}`}>
                            COLLABORATE WITH US
                        </button>

                    </div>
                </div>
            </section>

            {/* Breadcrup Section */}
            <Container>
                <section className={`flex justify-between  ${poppins.className} py-10`}>
                    <div className="flex gap-5">
                        <Link href='/'>Home</Link> <span>||</span>
                        <p className="text-[#818181] uppercase" >INDIGENOUS ARCHIVE</p>
                    </div>
                    <div className="border-2 border-gray-300 rounded-md flex items-center ">
                        <input type="text" placeholder="Search here" className="px-5 py-2 outline-none"
                        />
                        <FaSearch className="mr-2 text-gray-400" />
                    </div>
                </section>
            </Container>

            <Container>
                <h2 className={`${poppins.className} text-[44px] font-bold`}>Research Focus Area</h2>
                <section className="my-10">
                    {/* Category container */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-3  overflow-hidden transition-all duration-300 items-center">
                        {categories.map((item, index) => {
                            return (
                                <div key={index} onClick={() => { setActiveIndex(index); setActiveCategory(item.title) }} className={`px-8 py-3 rounded-full cursor-pointer transition flex items-center gap-2 ${poppins.className} ${activeIndex === index ? "border-gray-700 border bg-gray-200"
                                    : "border-gray-200 bg-gray-100"}`}>
                                    {item.icon}{item.title}
                                </div>
                            );
                        })}
                    </div>
                </section>


                {/* Want to show catery.title and icon */}
                <h2 className={`flex items-center gap-2 text-3xl font-semibold justify-center mb-10 ${poppins.className}`}>
                    {categories[activeIndex].icon}
                    {categories[activeIndex].title}
                </h2>

            </Container>


            {/* Project Content will be here */}
            <Container>
                <div className="flex justify-between items-center py-10">
                    <h2 className={`${poppins.className} text-4xl font-bold uppercase`}>Ongoing Research Projects</h2>
                    <div className="flex items-center gap-2">
                        <select name="" id="" className={`${poppins.className} border border-gray-300 rounded-sm px-4 py-2`}>
                            <option value="modified">Data Modified</option>
                            <option value="original">Original</option>
                        </select>
                        <select name="" id="" className={`${poppins.className} border border-gray-300 rounded-sm px-4 py-2`}>
                            <option value="2021-2022">2021-2022</option>
                            <option value="2022-2023">2022-2023</option>
                            <option value="2023-2024">2023-2024</option>
                            <option value="2024-2025">2024-2025</option>
                        </select>
                    </div>
                </div>
                <section className="pb-10">
                    {ongoingProjects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {ongoingProjects.map((project, index) => (
                                <div key={index} className='relative'>
                                    <div className='border-2 border-gray-300 p-4 rounded-lg group'>
                                        <Image src={project.img} alt={project.title} height={400} width={400} />
                                        <div className='mt-5 space-y-3'>
                                            <h2 className={`${poppins.className} text-lg font-semibold `}>{project.title}</h2>

                                            <div className='flex items-center gap-5 text-[#6B6B6B]'>
                                                <p className={`font-bold text-xs ${project.status === 'Ongoing' ? 'text-[#F26522]' : 'text-[#018F44]'} ${poppins.className}`}>{project.status}</p>|
                                                <p className={`text-xs ${poppins.className}`}>{project.author}</p>|
                                                <p className={`text-xs ${poppins.className}`}>Funded By {project.duration}</p>
                                            </div>
                                            <p className={`${antiquaFont.className} text-justify`}>{project.des}</p>
                                            <div className="flex items-center gap-5">
                                                <button className={`text-md mt-5 cursor-pointer bg-[#36133B] rounded-full py-2 px-5 text-white  ${poppins.className} flex items-center gap-2`}>View Report <IoIosArrowRoundForward size={20} /></button>
                                                <button className={`text-md mt-5 cursor-pointer border rounded-full py-2 px-5 ${poppins.className} flex items-center gap-2`}>Download PDF <TbDownload size={20} /></button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className={`text-gray-500 text-xl ${poppins.className}`}>
                                No projects found in this category.
                            </p>
                        </div>
                    )}
                </section>
            </Container>

            {/* Completed */}
            <Container>
                <div className="flex justify-between items-center py-10">
                    <h2 className={`${poppins.className} text-4xl font-bold uppercase`}>Completed Research Projects</h2>
                    <div className="flex items-center gap-2">
                        <select name="" id="" className={`${poppins.className} border border-gray-300 rounded-sm px-4 py-2`}>
                            <option value="modified">Data Modified</option>
                            <option value="original">Original</option>
                        </select>
                        <select name="" id="" className={`${poppins.className} border border-gray-300 rounded-sm px-4 py-2`}>
                            <option value="2021-2022">2021-2022</option>
                            <option value="2022-2023">2022-2023</option>
                            <option value="2023-2024">2023-2024</option>
                            <option value="2024-2025">2024-2025</option>
                        </select>
                    </div>
                </div>
                <section className="pb-20">
                    {completedProjects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {completedProjects.map((project, index) => (
                                <div key={index} className='relative'>
                                    <div className='border-2 border-gray-300 p-4 rounded-lg group'>
                                        <Image src={project.img} alt={project.title} height={400} width={400} />
                                        <div className='mt-5 space-y-3'>
                                            <h2 className={`${poppins.className} text-lg font-semibold `}>{project.title}</h2>

                                            <div className='flex items-center gap-5 text-[#6B6B6B]'>
                                                <p className={`font-bold text-xs ${project.status === 'Ongoing' ? 'text-[#F26522]' : 'text-[#018F44]'} ${poppins.className}`}>{project.status}</p>|
                                                <p className={`text-xs ${poppins.className}`}>{project.author}</p>|
                                                <p className={`text-xs ${poppins.className}`}>Funded By {project.duration}</p>
                                            </div>
                                            <p className={`${antiquaFont.className} text-justify`}>{project.des}</p>
                                            <div className="flex items-center gap-5">
                                                <button className={`text-md mt-5 cursor-pointer bg-[#36133B] rounded-full py-2 px-5 text-white  ${poppins.className} flex items-center gap-2`}>View Report <IoIosArrowRoundForward size={20} /></button>
                                                <button className={`text-md mt-5 cursor-pointer border rounded-full py-2 px-5 ${poppins.className} flex items-center gap-2`}>Download PDF <TbDownload size={20} /></button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className={`text-gray-500 text-xl ${poppins.className}`}>
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