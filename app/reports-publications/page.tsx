"use client"
import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";
import hero from "@/public/reports/reports-hero.png"
import one from "@/public/reports/reports-1.png"
import two from "@/public/reports/reports-2.png"
import three from "@/public/reports/reports-3.png"
import icon from "@/public/reports/icon.png"
import publicationOne from "@/public/publications/publications1.png"
import publicationTwo from "@/public/publications/publications2.png"
import publicationThree from "@/public/publications/publications3.png"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
const reports_publications = [
    {
        title: 'KAMLA BHASIN - SPARC FELLOWSHIP: A LONG - TERM ENDEAVOUR',
        writtenon: '13 October, 2025',
        des: 'The Kamla Bhasin Fellowship, an initiative of SPaRC, aims to recognize and empower women advocates who fearlessly champion the cause of gender equality, raise their voices against violence against women, and challenge patriarchal dominance in their own lives or in the lives of other women, be it through their writings, by creating awareness in society or through any other means of activism. With this aim, SPaRC identifies and honors women residing in the Chittagong Hill Tracts who have actively worked to combat violence against women and gender inequality. Through this initiative, SPaRC seeks to provide recognition and support to these courageous advocates and inspire others to follow suit with its slogan – “Courage is Contagious”.',
        img: one,
        category: 'reports',
        date: '2020-2021'
    },
    {
        title: 'KAMLA BHASIN - SPARC FELLOWSHIP: A LONG - TERM ENDEAVOUR',
        writtenon: '13 October, 2025',
        des: 'The Kamla Bhasin Fellowship, an initiative of SPaRC, aims to recognize and empower women advocates who fearlessly champion the cause of gender equality, raise their voices against violence against women, and challenge patriarchal dominance in their own lives or in the lives of other women, be it through their writings, by creating awareness in society or through any other means of activism. With this aim, SPaRC identifies and honors women residing in the Chittagong Hill Tracts who have actively worked to combat violence against women and gender inequality. Through this initiative, SPaRC seeks to provide recognition and support to these courageous advocates and inspire others to follow suit with its slogan – “Courage is Contagious”.',
        img: two,
        category: 'reports',
        date: '2020-2021'
    },
    {
        title: 'KAMLA BHASIN - SPARC FELLOWSHIP: A LONG - TERM ENDEAVOUR',
        writtenon: '13 October, 2025',
        des: 'The Kamla Bhasin Fellowship, an initiative of SPaRC, aims to recognize and empower women advocates who fearlessly champion the cause of gender equality, raise their voices against violence against women, and challenge patriarchal dominance in their own lives or in the lives of other women, be it through their writings, by creating awareness in society or through any other means of activism. With this aim, SPaRC identifies and honors women residing in the Chittagong Hill Tracts who have actively worked to combat violence against women and gender inequality. Through this initiative, SPaRC seeks to provide recognition and support to these courageous advocates and inspire others to follow suit with its slogan – “Courage is Contagious”.',
        img: three,
        category: 'reports',
        date: '2020-2021'
    },

    //publications
    {
        title: 'THE SILENCE THEY LEFT BEHIND STILL BLEEDS',
        writtenon: '13 October, 2025',
        publisher: 'SPARC, Indigenous Womenfesto',
        author: 'Tufan Chakma',
        publicationLanguage: 'English',
        financialSupportBy: 'SPARC, Indigenous Womenfesto',
        relaseYear: 2025,
        des: 'Skill-building sessions that provide education, leadership training, and emotional support to Indigenous women in local communities. Volunteer roles: Event assistance, teaching support, translation, and logistics. ',
        img: publicationOne,
        releaseMonth: '19 October',
        category: 'publications',
        date: '2024-2025'
    },
    {
        title: 'THE SILENCE THEY LEFT BEHIND STILL BLEEDS',
        writtenon: '13 October, 2025',
        publisher: 'SPARC, Indigenous Womenfesto',
        author: 'Tufan Chakma',
        publicationLanguage: 'English',
        financialSupportBy: 'SPARC, Indigenous Womenfesto',
        relaseYear: 2025,
        releaseMonth: '19 October',
        des: 'Skill-building sessions that provide education, leadership training, and emotional support to Indigenous women in local communities. Volunteer roles: Event assistance, teaching support, translation, and logistics. ',
        img: publicationTwo,
        category: 'publications',
        date: '2024-2025'
    },
    {
        title: 'THE SILENCE THEY LEFT BEHIND STILL BLEEDS',
        writtenon: '13 October, 2025',
        publisher: 'SPARC, Indigenous Womenfesto',
        author: 'Tufan Chakma',
        publicationLanguage: 'English',
        financialSupportBy: 'SPARC, Indigenous Womenfesto',
        relaseYear: 2025,
        releaseMonth: '19 October',
        des: 'Skill-building sessions that provide education, leadership training, and emotional support to Indigenous women in local communities. Volunteer roles: Event assistance, teaching support, translation, and logistics. ',
        img: publicationThree,
        category: 'publications',
        date: '2024-2025'
    },

]
const Page = () => {
    const [activeCategory, setActiveCategory] = useState('reports')
    const [activeYear, setActiveYear] = useState('2020-2021')


    // Find the filterd category and date from the array of objects

    const combineCategoryandDate = reports_publications.filter(f => f.category === activeCategory && f.date === activeYear)

    return (
        <div className="mt-15">
            <Container>
                {/* Top Section */}
                <section className="flex justify-between gap-20">
                    <div className="w-1/2">
                        <h2 className={`text-5xl max-w-2xl font-extrabold ${poppins.className}`}>KNOWLEDGE THAT  <span className="text-[#FF951B]">INSPIRE </span>CHANGE</h2>
                    </div>
                    <div className="w-1/2">
                        <p className={`ml-30 text-justify text-lg ${antiquaFont.className}`}>Every project we run begins with one goal — to uplift Indigenous women and their communities through action, awareness, and empowerment.</p>
                    </div>
                </section>
            </Container>

            {/* Hero Section */}
            <section className="relative w-full">
                <Image src={hero} alt="fellowship-hero" width={1000} height={600} className="w-full" />
                <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center  text-white">
                    <h2 className={`text-4xl font-bold mb-4 ${poppins.className}`}>REPORTS AND PUBLICATIONS</h2>
                    <p className={`mb-4 text-lg max-w-2xl mx-auto ${antiquaFont.className}`}>
                        Our reports and publications highlight the voices, experiences, and resilience of Indigenous women across communities.
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
                        <p className="text-[#818181] uppercase" >Reports and Publications</p>
                    </section>

                    {/* Sorting button */}
                    <section className="flex gap-5 items-center">
                        <select onChange={(e) => setActiveCategory(e.target.value)} name="" id="" className="border border-[#B7B7B7] rounded-sm py-2 px-4">
                            <option value="reports">ANNUAL REPORTS</option>
                            <option value="publications">PUBLICATIONS</option>
                        </select>
                        <select onChange={(e) => setActiveYear(e.target.value)} name="" id="" className="border border-[#B7B7B7] rounded-sm py-2 px-4">
                            <option value="2020-2021">2020-2021</option>
                            <option value="2024-2025">2024-2025</option>
                        </select>
                    </section>
                </div>
            </Container>

            {/* Reports section */}
            <section id="reports" className='max-w-5xl mx-auto space-y-10 mt-20 mb-20'>
                {combineCategoryandDate.length === 0 ? (
                    <span className={`text-center block ${poppins.className}`}>
                        No Data Found!
                    </span>
                ) : (
                    combineCategoryandDate.map((rep, index) => (
                        <div key={index} className="flex flex-col gap-5 mb-20 ">
                            {rep.category === 'publications' ?
                                <div>
                                    <h2 className={`text-4xl font-bold mb-4 ${poppins.className}`}>{rep.title}</h2>
                                    <p className={`${poppins.className} uppercase`}> <span className="text-[#6B6B6B]">Written on</span>  {rep.writtenon}</p>
                                    <div className="flex justify-between items-center mt-5">
                                        <div className="w-1/2">
                                            <Image src={rep.img} alt={rep.title} height={200} width={400} />
                                        </div>
                                        <div className={`${antiquaFont.className} w-1/2 space-y-5`}>
                                            <h2><span className="text-[#272727] font-semibold text-lg">Publisher</span>: {rep.publisher}</h2>
                                            <h2><span className="font-semibold text-lg">Author</span>:{rep.author}</h2>
                                            <h2><span className="font-semibold text-lg ">Publication Language</span>: {rep.publicationLanguage}</h2>
                                            <h2><span className="font-semibold text-lg">Release Year</span>: {rep.relaseYear}</h2>
                                            <h2><span className="font-semibold text-lg">Release Month | Day </span>: {rep.releaseMonth}</h2>
                                            <p className={`mb-4 text-lg text-justify `}>{rep.des}</p>
                                            <button className="bg-[#36133B] px-6 py-2 rounded-full cursor-pointer text-white">Read More</button>
                                        </div>

                                    </div>
                                </div>
                                :
                                <div>
                                    <h2 className={`text-4xl font-bold mb-4 ${poppins.className}`}>{rep.title}</h2>
                                    <p className={poppins.className}>{rep.writtenon}</p>
                                    <p className={`mb-4 text-lg text-justify ${antiquaFont.className}`}>{rep.des}</p>
                                    <Image src={rep.img} alt={rep.title} height={600} width={1000} />
                                    <button className="self-start bg-[#36133B] text-white px-6 py-2 rounded-full">
                                        Read More
                                    </button>
                                </div>}

                        </div>
                    ))
                )}
            </section>

        </div>
    );
};

export default Page;