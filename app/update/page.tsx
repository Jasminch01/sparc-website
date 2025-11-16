"use client"
import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";
import hero from "@/public/rebuild/hero.png"
import frame from "@/public/rebuild/Frame 51.png"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

interface Data {
    category: string,
    img: string,
    des: string,
    title: string,
    date: string,
    video: string
}
interface Project {
    title: string,
    img: string,
    date: string,
    status: string,
    des: string,
    fundedBy: string

}
interface Events {
    title: string,
    img: string,
    date: string,
    status: string,
    des: string,
    timeLeft: string

}

const projectsCategory = ['All Projects', 'Ongoing', 'Completed']
const eventsCategory = ['All Events', 'Ongoing', 'Upcoming']

const Page = () => {
    const [data, setData] = useState<Data[]>([])
    const [projects, setProjects] = useState<Project[]>([])
    const [events, setEvents] = useState<Events[]>([])
    const [activeProjectCategory, setActiveProjectCategory] = useState(0)
    const [activeEventCategory, setActiveEventCategory] = useState(0)


    // Fetch the data 
    useEffect(() => {
        fetch('/rebuild/update.json')
            .then(res => res.json())
            .then(data => setData(data))
    }, [])

    // Fetch the projects

    useEffect(() => {
        fetch('/rebuild/projects.json')
            .then(res => res.json())
            .then(data => setProjects(data))
    }, [])

    // Fetch events data
    useEffect(() => {
        fetch('/rebuild/events.json')
            .then(res => res.json())
            .then(data => setEvents(data))
    }, [])

    const combineProjects = projectsCategory[activeProjectCategory] === "All Projects" ? projects
        : projects.filter(project => project.status === projectsCategory[activeProjectCategory]);


    const combineEvents = eventsCategory[activeEventCategory] === "All Events" ? events
        : events.filter(project => project.status === eventsCategory[activeEventCategory]);



    return (
        <div className="mt-15">
            <Container>
                {/* Top Section */}
                <section className="flex justify-between gap-20">
                    <div className="w-1/2">
                        <h2 className={`text-5xl max-w-2xl font-extrabold ${poppins.className}`}>REBUILDING COMMUNITIES</h2>
                    </div>
                    <div className="w-1/2">
                        <p className={`ml-30 text-justify text-lg ${antiquaFont.className}`}>To share the latest news, activities, and milestones from your organization — keeping visitors informed about ongoing advocacy, events, and community progress.</p>
                    </div>
                </section>
            </Container>

            {/* Hero Section */}
            <section className="relative w-full">
                <Image src={hero} alt="fellowship-hero" width={1000} height={600} className="w-full" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center  text-white">
                    <h2 className={`text-4xl font-bold mb-4 ${poppins.className}`}>SPARC UPDATE</h2>
                    <p className={`mb-4 text-lg max-w-2xl mx-auto ${antiquaFont.className}`}>
                        Stay connected with the latest updates from our organization — from local initiatives to global advocacy for Indigenous rights.
                    </p>
                    <div className="flex flex-col items-center justify-center mt-10 cursor-pointer">
                        <button className={`bg-[#FF951B] px-10 py-5 rounded-full cursor-pointer text-sm ${poppins.className}`}>
                            View Projects
                        </button>
                    </div>
                </div>
            </section>

            {/* Breadcrup Section */}
            <Container>
                <section className={`flex gap-5  ${poppins.className} py-10`}>
                    <Link href='/'>Home</Link> <span>||</span>
                    <p className="text-[#818181] uppercase" >Sparc Update</p>
                </section>
            </Container>


            {/* Data Content Section */}
            <Container>
                <section className="grid grid-cols-2 gap-8 mb-10">
                    {/* Left Column - Highlight */}
                    <div>
                        <div className="bg-[#303030] text-white px-4 py-2 inline-block mb-6">
                            <h3 className={`text-sm font-semibold tracking-wide ${poppins.className}`}>HIGHLIGHT</h3>
                        </div>
                        {data.filter(item => item.category === "highlight").map((item, index) => (
                            <div key={index} className="mb-8">
                                <div className="relative w-full h-[400px] mb-4">
                                    <Image
                                        src={item.img}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h2 className={`text-2xl font-bold mb-3 ${poppins.className}`}>{item.title}</h2>
                                <p className={`text-sm text-gray-600 mb-4 ${poppins.className}`}>{item.date}</p>
                                <p className={`text-base text-justify mb-4 leading-relaxed ${antiquaFont.className}`}>{item.des}</p>
                                <Link href={`/update/${item.title.replace(/\s+/g, '-').toLowerCase()}`} className={`text-sm font-medium flex items-center gap-2 ${poppins.className}`}>
                                    Read More <span>→</span>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Right Column - Featured Stories */}
                    <div>
                        <div className="bg-[#E5E5E5] px-4 py-2 inline-block mb-6">
                            <h3 className={`text-sm font-semibold tracking-wide ${poppins.className}`}>FEATURED_STORIES</h3>
                        </div>
                        <div className="space-y-6">
                            {data.filter(item => item.category === "FEATURED_STORIES").map((item, index) => (
                                <div key={index} className="border-b border-gray-400 pb-6 last:border-b-0">
                                    <div className="relative w-full h-[250px] mb-4">
                                        <Image
                                            src={item.img}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <h3 className={`text-xl font-bold mb-2 ${poppins.className}`}>{item.title}</h3>
                                    <p className={`text-sm text-gray-600 mb-3 ${antiquaFont.className}`}>{item.des.substring(0, 100)}...</p>
                                    <div className="flex justify-between items-center">
                                        <p className={`text-xs text-gray-500 ${poppins.className}`}>{item.date}</p>
                                        <Link href={`/update/${item.title.replace(/\s+/g, '-').toLowerCase()}`} className={`text-sm font-medium flex items-center gap-2 ${poppins.className}`}>
                                            Read More <span>→</span>
                                        </Link>
                                    </div>
                                </div>
                            ))}

                            {/* Latest News Section */}
                            <div className="mt-8">
                                <div className="bg-[#E5E5E5] px-4 py-2 inline-block mb-6">
                                    <h3 className={`text-sm font-semibold tracking-wide ${poppins.className}`}>LATEST_NEWS</h3>
                                </div>
                                {data.filter(item => item.category === "LATEST_NEWS").map((item, index) => (
                                    <div key={index}>
                                        <div className="relative w-full h-[250px] mb-4">
                                            {item.img ? (
                                                <Image
                                                    src={item.img}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <iframe
                                                    src="https://www.youtube.com/embed/OFAXpf9wxgI"
                                                    className="w-full h-full"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                />
                                            )}


                                        </div>
                                        <h3 className={`text-xl font-bold mb-2 ${poppins.className}`}>{item.title}</h3>
                                        <p className={`text-sm text-gray-600 mb-3 ${antiquaFont.className}`}>{item.des.substring(0, 80)}...</p>
                                        <div className="flex justify-between items-center">
                                            <p className={`text-xs text-gray-500 ${poppins.className}`}>{item.date}</p>
                                            <Link href="https://www.youtube.com/embed/OFAXpf9wxgI" className={`text-sm font-medium flex items-center gap-2 ${poppins.className}`}>
                                                Watch Video <span>→</span>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </Container>

            {/* Funding and project update section */}
            <Container>
                <section className="my-20">
                    <div className='text-center w-2xl mx-auto'>
                        <h2 className={`text-4xl font-bold mb-4 ${poppins.className}`}>FUNDING & PROJECT UPDATES</h2>
                        <p className={`mb-4 text-lg  ${antiquaFont.className} text-gray-500`}>Each update reflects our commitment to accountability, collaboration, and positive impact across Indigenous regions.</p>
                    </div>

                    {/* project Category */}
                    <div className='grid grid-cols-1 lg:grid-cols-3 py-10 '>
                        {projectsCategory.map((cat, index) =>
                            <div key={index} className='flex items-center justify-center border-b-2 border-gray-300'>
                                <button onClick={() => setActiveProjectCategory(index)} className={`${poppins.className} cursor-pointer py-5 text-xl font-semibold ${activeProjectCategory === index ? 'border-b-2' : ''}`}>{cat}</button>
                            </div>
                        )}

                    </div>

                    {/* projects Section */}
                    <div className='grid grid-cols-1 lg:grid-cols-3 mb-10 gap-5 '>
                        {combineProjects.map((project, index) => {
                            return (
                                <div key={index} className='relative'>
                                    <div className='border-2 border-gray-300 p-4 rounded-lg group'>
                                        <Image src={project.img} alt={project.title} height={400} width={400} />
                                        <div className='mt-5 space-y-3'>
                                            <h2 className={`${poppins.className} text-lg font-semibold w-xs`}>{project.title}</h2>
                                            <p className={`${antiquaFont.className} text-justify`}>{project.des}</p>
                                            <div className='flex items-center gap-5 text-[#6B6B6B]'>
                                                <p className={`font-bold text-xs ${project.status === 'Ongoing' ? 'text-[#F26522]' : 'text-[#018F44]'} ${poppins.className}`}>{project.status}</p>|
                                                <p className={`text-xs ${poppins.className}`}>{project.date}</p>|
                                                <p className={`text-xs ${poppins.className}`}>Funded By {project.fundedBy}</p>
                                            </div>
                                            <button className={`text-md mt-5 cursor-pointer ${poppins.className} flex items-center gap-2`}>View Report <IoIosArrowRoundForward size={20} /></button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </Container>

            {/* Event Announcement */}
            <Container>
                <section className="my-20">
                    <div className='text-center w-2xl mx-auto'>
                        <h2 className={`text-4xl font-bold mb-4 ${poppins.className}`}>EVENT ANNOUNCEMENTS</h2>
                        <p className={`mb-4 text-lg  ${antiquaFont.className} text-gray-500`}>Explore our latest gatherings, campaigns, and community programs supporting Indigenous voices</p>
                    </div>

                    {/* project Category */}
                    <div className='grid grid-cols-1 lg:grid-cols-3 py-10 '>
                        {eventsCategory.map((cat, index) =>
                            <div key={index} className='flex items-center justify-center border-b-2 border-gray-300'>
                                <button onClick={() => setActiveEventCategory(index)} className={`${poppins.className} cursor-pointer py-5 text-xl font-semibold ${activeEventCategory === index ? 'border-b-2' : ''}`}>{cat}</button>
                            </div>
                        )}

                    </div>

                    {/* projects Section */}
                    <div className='grid grid-cols-1 lg:grid-cols-3 mb-10 gap-5 '>
                        {combineEvents.map((project, index) => {
                            return (
                                <div key={index} className='relative'>
                                    <div className='border-2 border-gray-300 p-4 rounded-lg group'>
                                        <Image src={project.img} alt={project.title} height={400} width={400} />
                                        <div className='mt-5 space-y-3'>
                                            <h2 className={`${poppins.className} text-lg font-semibold w-xs`}>{project.title}</h2>
                                            <p className={`${antiquaFont.className} text-justify`}>{project.des}</p>
                                            <div className='flex items-center gap-5 text-[#6B6B6B]'>
                                                <p className={`font-bold text-xs ${project.status === 'Upcoming' ? 'text-[#36133B]' : 'text-[#018F44]'} ${poppins.className}`}>{project.status}</p>|
                                                <p className={`text-xs ${poppins.className}`}>{project.date}</p>|
                                                <p className={`text-xs ${poppins.className}`}> {project.timeLeft} Left</p>
                                            </div>
                                            <button className={`text-md mt-5 cursor-pointer ${poppins.className} flex items-center gap-2`}>View Report <IoIosArrowRoundForward size={20} /></button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
                <Image src={frame} alt="frame" width={600} height={400} className="w-full my-30"/>
            </Container>
        </div>
    );
};

export default Page;