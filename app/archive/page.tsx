"use client"
import Container from '@/components/Container';
import { antiquaFont, poppins } from '@/components/utils/font';
import hero from "@/public/Archive/hero.png"
import icon from "@/public/reports/icon.png"
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoIosArrowRoundForward } from 'react-icons/io';


interface Data {
    img: string,
    title: string,
    des: string,
    date: string,
    category: string
}
const categories: string[] = [
    'Historical Records',
    'Community Stories',
    'News and Update',
]
const Page = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [activeCategory, setActiveCategory] = useState("Historical Records")
    const [data, setData] = useState<Data[]>([])


    // Fetch  data
    useEffect(() => {
        fetch('/Archive/data.json')
            .then(res => res.json())
            .then(data => setData(data))
    }, [])

    // Filter data
    const filterdData = data.filter(d =>
        d.category.toLowerCase().includes(activeCategory.toLowerCase())

    );

    return (
        <div className='mt-15'>
            <Container>
                {/* Top Section */}
                <section className="flex justify-between gap-10">
                    <div className="w-1/2 ">
                        <h2 className={`text-[45px] max-w-2xl font-extrabold ${poppins.className}`}>
                            <span className='text-[#FF951B]'>INDIGENOUS KNOWLEDGE</span> FOR FUTURE GENERATIONS</h2>
                    </div>
                    <div className="w-1/2 ">
                        <p className={`ml-30 text-justify text-lg ${antiquaFont.className}`}>Explore stories, documents, and visual archives celebrating the heritage, resilience, and identity of Indigenous communities worldwide</p>
                    </div>
                </section>
            </Container>
            {/* Hero Section */}
            <section className="relative w-full">
                <Image src={hero} alt="indospeak-hero" width={1000} height={600} className="w-full" />
                <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center  text-white">
                    <h2 className={`text-4xl font-bold mb-4 ${poppins.className}`}>INDIGENOUS ARCHIVE</h2>
                    <p className={`mb-4 text-lg max-w-2xl mx-auto ${antiquaFont.className}`}>
                        Explore stories, documents, and visual archives celebrating the heritage, resilience, and identity of Indigenous communities worldwide.
                    </p>
                    <div onClick={() => {
                        document.getElementById("data")?.scrollIntoView({ behavior: "smooth" });
                    }} className="flex flex-col items-center justify-center mt-30 cursor-pointer">
                        <button className={`text-[#FF951B] px-8 py-3 rounded-full text-sm ${poppins.className}`}>
                            SCROLL DOWN
                        </button>
                        <Image src={icon} alt="icon" width={40} height={40} />
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
                <section id='data' className="my-10">
                    {/* Category container */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-3  overflow-hidden transition-all duration-300 items-center">
                        {categories.map((item, index) => {
                            return (
                                <div key={index} onClick={() => { setActiveIndex(index); setActiveCategory(item) }} className={`px-8 py-3 rounded-full cursor-pointer transition flex items-center gap-2 ${poppins.className} ${activeIndex === index ? "border-gray-700 border bg-gray-200"
                                    : "border-gray-200 bg-gray-100"}`}>
                                    {item}
                                </div>
                            );
                        })}
                    </div>
                </section>
            </Container>

            <Container>
                <div className="flex justify-between items-center py-10">
                    <h2 className={`flex items-center gap-2 text-4xl font-semibold justify-center  ${poppins.className}`}>
                        {activeCategory}
                    </h2>
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
                    {filterdData.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filterdData.map((project, index) => (
                                <div key={index} className='relative'>
                                    <div className='border-2 border-gray-300 p-4 rounded-lg group'>
                                        <Image src={project.img} alt={project.title} height={400} width={400} />
                                        <div className='mt-5 space-y-3'>
                                            <h2 className={`${poppins.className} text-lg font-semibold `}>{project.title}</h2>
                                            <p className={`${poppins.className} text-[#6B6B6B]`}>{project.date}</p>
                                            <p className={`${antiquaFont.className} text-justify text-[#4D4D4D]`}>{project.des}</p>
                                        </div>
                                        <Link href={`/archive/${project.title.replace(/\s+/g,'-').toLowerCase()}`} className={`${poppins.className} flex items-center gap-2 mt-5 text-[#36133B] cursor-pointer`}>Read More <IoIosArrowRoundForward size={20} /> </Link>
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