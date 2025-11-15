"use client"
import Container from '@/components/Container';
import { antiquaFont, poppins } from '@/components/utils/font';
import hero from "@/public/indespeak/hero.png"
import icon from "@/public/reports/icon.png"
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';

interface Indespeak {
    title: string,
    des: string,
    img: string,
    writtenOn: string,
    imgAlt: string,
    imgName: string
}

const Page = () => {
    const [activeYear, setActiveYear] = useState('2016-2017')
    const [indiSpeakData, setIndeSpeakData] = useState<Indespeak[]>([])
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);


    //  Fetch the data from array json
    useEffect(() => {
        fetch('/indespeak/indispeak.json')
            .then(res => res.json())
            .then(data => setIndeSpeakData(data))
    }, [])

    // Filter the data based on year

    const filteredData = indiSpeakData.filter(item => {
        const itemYear = item.writtenOn.slice(-4);
        const [start, end] = activeYear.split("-");

        return itemYear >= start && itemYear <= end;
    });

    return (
        <div className='mt-15'>
            <Container>
                {/* Top Section */}
                <section className="flex justify-between">
                    <div className="w-1/2">
                        <h2 className={`text-5xl max-w-2xl font-extrabold ${poppins.className}`}>STORIES OF <span className='text-[#FF951B]'>RESISTANCE</span></h2>
                    </div>
                    <div className="w-1/2">
                        <p className={`ml-30 text-justify text-lg ${antiquaFont.className}`}>Stories of Resistance is a robust and meaningful collection, weaving threads of the personal, professional and political into a vibrant tapestry of becoming</p>
                    </div>
                </section>
            </Container>

            {/* Hero Section */}
            <section className="relative w-full">
                <Image src={hero} alt="indospeak-hero" width={1000} height={600} className="w-full" />
                <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center  text-white">
                    <h2 className={`text-4xl font-bold mb-4 ${poppins.className}`}>INDISPEAK</h2>
                    <p className={`mb-4 text-lg max-w-2xl mx-auto ${antiquaFont.className}`}>
                        Explore stories, documents, and visual archives celebrating the heritage, resilience, and identity of Indigenous communities worldwide.
                    </p>
                    <div onClick={() => {
                        document.getElementById("reports")?.scrollIntoView({ behavior: "smooth" });
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
                <div className="flex justify-between items-center mt-10">
                    <section className={`flex gap-5  ${poppins.className}`}>
                        <Link href='/'>Home</Link> <span>||</span>
                        <p className="text-[#818181] uppercase" >Indispeak</p>
                    </section>

                    {/* Sorting button */}
                    <section className="flex gap-5 items-center">
                        <select onChange={(e) => setActiveYear(e.target.value)} name="" id="" className={`border border-[#B7B7B7] rounded-sm py-2 px-4 ${poppins.className}`}>
                            <option value="2016-2017">2016-2017</option>
                            <option value="2017-2018">2017-2018</option>
                            <option value="2024-2025">2024-2025</option>
                        </select>

                    </section>
                </div>
            </Container>

            {/* Indispeak content section */}
            <Container>
                <section className='flex flex-col gap-10 my-20'>
                    {filteredData.map((ids, index) =>
                        <div key={index} className='flex flex-col'>
                            <div className='flex justify-between '>
                                <div className='w-2/3 space-y-5'>
                                    <h2 className={`uppercase ${poppins.className} font-bold text-[44px]`}>{ids.title}</h2>
                                    <p className={`text-[#6B6B6B] ${antiquaFont.className} uppercase`}>Written on {ids.writtenOn}</p>
                                    <p className={`${antiquaFont.className} w-2xl text-xl text-justify`}>
                                        {expandedIndex === index
                                            ? ids.des
                                            : ids.des.slice(0, 869) + (ids.des.length > 200 ? "..." : "")}
                                    </p>
                                    <div className='w-20'>
                                        <div className='flex items-center gap-2 cursor-pointer'>
                                            <div
                                                onClick={() =>
                                                    setExpandedIndex(expandedIndex === index ? null : index)
                                                }
                                                className="flex items-center gap-2 cursor-pointer w-20">
                                                <button className={`text-lg ${antiquaFont.className}`}>
                                                    {expandedIndex === index ? " Less" : "Expand"}
                                                </button>
                                                <IoMdArrowDropdown className={`mt-1 transition-transform duration-300 ${expandedIndex === index ? "rotate-180" : ""  }`}
                                                />
                                            </div>
                                            <hr className="text-gray-400" />

                                            <IoMdArrowDropdown className='mt-1' />
                                        </div>
                                        <hr className='text-gray-400 ' />
                                    </div>
                                </div>
                                <div className='w-1/3'>
                                    <Image src={ids.img} alt={ids.title} width={450} height={600} className='' />
                                    <h2 className={`${antiquaFont.className} mt-4`}>{ids?.imgName}</h2>
                                    <p className={`${antiquaFont.className}  text-[#252525] font-bold text-md`}>{ids.imgAlt}</p>
                                </div>
                            </div>

                            <hr className='my-10 text-gray-300' />
                        </div>
                    )}
                </section>
            </Container>

        </div>
    );
};

export default Page;