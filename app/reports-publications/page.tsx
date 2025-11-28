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
        pathTitle: 'KAMLA BHASIN FELLOWSHIP',
        writtenon: '13 October, 2025',
        des: 'The Kamla Bhasin Fellowship, an initiative of SPaRC, aims to recognize and empower women advocates who fearlessly champion the cause of gender equality, raise their voices against violence against women, and challenge patriarchal dominance in their own lives or in the lives of other women, be it through their writings, by creating awareness in society or through any other means of activism. With this aim, SPaRC identifies and honors women residing in the Chittagong Hill Tracts who have actively worked to combat violence against women and gender inequality. Through this initiative, SPaRC seeks to provide recognition and support to these courageous advocates and inspire others to follow suit with its slogan – "Courage is Contagious".',
        img: one,
        category: 'reports',
        date: '2020-2021',
        imgDes: 'A group photo after the Kamla Bhasin Fellowship (Bangladesh) 2017 award ceremony. '
    },
    {
        title: 'KAMLA BHASIN - SPARC FELLOWSHIP: A LONG - TERM ENDEAVOUR',
        writtenon: '13 October, 2025',
        pathTitle: 'KAMLA BHASIN FELLOWSHIP',
        des: 'The Kamla Bhasin Fellowship, an initiative of SPaRC, aims to recognize and empower women advocates who fearlessly champion the cause of gender equality, raise their voices against violence against women, and challenge patriarchal dominance in their own lives or in the lives of other women, be it through their writings, by creating awareness in society or through any other means of activism. With this aim, SPaRC identifies and honors women residing in the Chittagong Hill Tracts who have actively worked to combat violence against women and gender inequality. Through this initiative, SPaRC seeks to provide recognition and support to these courageous advocates and inspire others to follow suit with its slogan – "Courage is Contagious".',
        img: two,
        category: 'reports',
        date: '2020-2021',
        imgDes: 'A group photo after the Kamla Bhasin Fellowship (Bangladesh) 2017 award ceremony. '
    },
    {
        title: 'KAMLA BHASIN - SPARC FELLOWSHIP: A LONG - TERM ENDEAVOUR',
        pathTitle: 'KAMLA BHASIN FELLOWSHIP',
        writtenon: '13 October, 2025',
        des: 'The Kamla Bhasin Fellowship, an initiative of SPaRC, aims to recognize and empower women advocates who fearlessly champion the cause of gender equality, raise their voices against violence against women, and challenge patriarchal dominance in their own lives or in the lives of other women, be it through their writings, by creating awareness in society or through any other means of activism. With this aim, SPaRC identifies and honors women residing in the Chittagong Hill Tracts who have actively worked to combat violence against women and gender inequality. Through this initiative, SPaRC seeks to provide recognition and support to these courageous advocates and inspire others to follow suit with its slogan – "Courage is Contagious".',
        img: three,
        category: 'reports',
        date: '2020-2021',
        imgDes: 'A group photo after the Kamla Bhasin Fellowship (Bangladesh) 2017 award ceremony. '
    },

    //publications
    {
        title: 'THE SILENCE THEY LEFT BEHIND STILL BLEEDS',
        pathTitle: 'THE SILENCE THEY LEFT BEHIND STILL BLEEDS',
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
        pathTitle: 'THE SILENCE THEY LEFT BEHIND STILL BLEEDS',
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
        pathTitle: 'THE SILENCE THEY LEFT BEHIND STILL BLEEDS',
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

    // Find the filtered category and date from the array of objects
    const combineCategoryandDate = reports_publications.filter(f => f.category === activeCategory && f.date === activeYear)

    return (
        <div className="mt-10 sm:mt-12 md:mt-15">
            <Container>
                {/* Top Section */}
                <section className="flex flex-col lg:flex-row justify-between gap-6 sm:gap-8 lg:gap-20">
                    <div className="w-full lg:w-1/2">
                        <h2 className={`text-2xl sm:text-4xl text-center lg:text-start md:text-4xl lg:text-[51px] max-w-2xl font-extrabold leading-tight ${poppins.className}`}>
                            KNOWLEDGE THAT <span className="text-[#FF951B]">INSPIRE </span>CHANGE
                        </h2>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <p className={`lg:ml-30 text-justify text-md md:text-xl ${antiquaFont.className}`}>
                            Every project we run begins with one goal — to uplift Indigenous women and their communities through action, awareness, and empowerment.
                        </p>
                    </div>
                </section>
            </Container>

            {/* Hero Section */}
            <section className="relative w-full">
                <Image src={hero} alt="fellowship-hero" width={1000} height={600} className="w-full h-[300px] sm:h-[500px] md:h-[600px] lg:h-full object-cover" />
                <div className="absolute top-2/3 sm:top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-full px-4">
                    <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 ${poppins.className}`}>
                        REPORTS AND PUBLICATIONS
                    </h2>
                    <p className={`mb-3 sm:mb-4 text-sm sm:text-base md:text-xl max-w-2xl mx-auto px-2 ${antiquaFont.className}`}>
                        Our reports and publications highlight the voices, experiences, and resilience of Indigenous women across communities.
                    </p>
                    <div
                        onClick={() => {
                            document.getElementById("reports")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="flex flex-col items-center justify-center mt-6 sm:mt-10 md:mt-20 lg:mt-30 cursor-pointer">
                        <button className={`text-[#FF951B] px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full text-xs lg:text-lg ${poppins.className}`}>
                            SCROLL DOWN
                        </button>
                        <Image src={icon} alt="icon" width={40} height={40} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 animate-bounce" />
                    </div>
                </div>
            </section>

            {/* Breadcrumb & Filter Section */}
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 my-6 lg:my-20 ">
                    {/* Breadcrumb */}
                    <section className={`flex gap-3 sm:gap-5 py-5 lg:py-0 text-xs sm:text-base font-semibold ${poppins.className}`}>
                        <Link href='/' className="hover:text-[#FF951B] transition-colors uppercase font-semibold">Home</Link>
                        <span>||</span>
                        <p className="text-[#818181] uppercase">Reports and Publications</p>
                    </section>

                    {/* Sorting buttons */}
                    <section className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-stretch sm:items-center w-full md:w-auto">
                        <select
                            onChange={(e) => setActiveCategory(e.target.value)}
                            className="border border-[#B7B7B7] rounded-sm py-2 px-3 sm:px-4 text-sm sm:text-base w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-[#FF951B]">
                            <option value="reports">ANNUAL REPORTS</option>
                            <option value="publications">PUBLICATIONS</option>
                        </select>
                        <select
                            onChange={(e) => setActiveYear(e.target.value)}
                            className="border border-[#B7B7B7] rounded-sm py-2 px-3 sm:px-4 text-sm sm:text-base w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-[#FF951B]">
                            <option value="2020-2021">2020-2021</option>
                            <option value="2024-2025">2024-2025</option>
                        </select>
                    </section>
                </div>
            </Container>

            {/* Reports section */}
            <section id="reports" className='w-full max-w-5xl mx-auto space-y-8 sm:space-y-10 mt-10 sm:mt-15 md:mt-20 mb-12 sm:mb-16 md:mb-20 px-4 sm:px-6 lg:px-8'>
                {combineCategoryandDate.length === 0 ? (
                    <span className={`text-center block text-lg sm:text-xl ${poppins.className}`}>
                        No Data Found!
                    </span>
                ) : (
                    combineCategoryandDate.map((rep, index) => (
                        <div key={index} className="flex flex-col gap-4 sm:gap-5 mb-12 sm:mb-16 md:mb-20">
                            {rep.category === 'publications' ? (
                                <div className="space-y-4 sm:space-y-5">
                                    <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 ${poppins.className}`}>
                                        {rep.title}
                                    </h2>
                                    <p className={`${poppins.className} uppercase text-sm sm:text-base`}>
                                        <span className="text-[#6B6B6B]">Written on</span> {rep.writtenon}
                                    </p>
                                    <div className="flex flex-col md:flex-row justify-between items-start gap-6 sm:gap-8 mt-4 sm:mt-5">
                                        <div className="w-full md:w-1/2">
                                            <Image
                                                src={rep.img}
                                                alt={rep.title}
                                                height={200}
                                                width={400}
                                                className="w-full h-auto rounded-lg shadow-md"
                                            />
                                        </div>
                                        <div className={`${antiquaFont.className} w-full md:w-1/2 space-y-3 sm:space-y-4 md:space-y-5 text-sm sm:text-base`}>
                                            <h2>
                                                <span className="text-[#272727] font-semibold text-base sm:text-lg">Publisher</span>: {rep.publisher}
                                            </h2>
                                            <h2>
                                                <span className="font-semibold text-base sm:text-lg">Author</span>: {rep.author}
                                            </h2>
                                            <h2>
                                                <span className="font-semibold text-base sm:text-lg">Publication Language</span>: {rep.publicationLanguage}
                                            </h2>
                                            <h2>
                                                <span className="font-semibold text-base sm:text-lg">Release Year</span>: {rep.relaseYear}
                                            </h2>
                                            <h2>
                                                <span className="font-semibold text-base sm:text-lg">Release Month | Day</span>: {rep.releaseMonth}
                                            </h2>
                                            <p className={`mb-3 sm:mb-4 text-base sm:text-lg text-justify`}>
                                                {rep.des}
                                            </p>
                                            <Link href={`/reports-publications/${rep.pathTitle?.replace(/\s+/g, '-').toLowerCase()}`} className="bg-[#36133B] hover:bg-[#ff951b] px-4 sm:px-6 py-2 rounded-full cursor-pointer text-white text-sm sm:text-base transition-colors w-full sm:w-auto">
                                                Read More
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-3 sm:space-y-4">
                                    <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 ${poppins.className}`}>
                                        {rep.title}
                                    </h2>
                                    <p className={`${poppins.className} text-sm sm:text-base`}>
                                        {rep.writtenon}
                                    </p>
                                    <p className={`mb-3 sm:mb-4 text-base sm:text-lg text-justify ${antiquaFont.className}`}>
                                        {rep.des}
                                    </p>
                                    <Image
                                        src={rep.img}
                                        alt={rep.title}
                                        height={600}
                                        width={1000}
                                        className="w-full h-auto rounded-lg shadow-md"
                                    />
                                    <p className={`${antiquaFont.className} mt-3 sm:mt-5 text-sm sm:text-base text-gray-600 italic`}>
                                        {rep.imgDes}
                                    </p>
                                    <Link href={`/reports-publications/${rep.pathTitle?.replace(/\s+/g, '-').toLowerCase()}`} className="bg-[#36133B] hover:bg-[#ff951b] cursor-pointer text-white px-4 sm:px-6 py-2 mt-3 rounded-full text-sm sm:text-base  transition-colors w-full sm:w-auto">
                                        Read More
                                    </Link>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </section>
        </div>
    );
};

export default Page;