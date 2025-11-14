"use client"
import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";
import hero from "@/public/reports/reports-hero.png"
import one from "@/public/reports/reports-1.png"
import two from "@/public/reports/reports-2.png"
import three from "@/public/reports/reports-3.png"
import icon from "@/public/reports/icon.png"
import Image from "next/image";
const reports = [
    {
        title: 'KAMLA BHASIN - SPARC FELLOWSHIP: A LONG - TERM ENDEAVOUR',
        writtenon: '13 October, 2025',
        des: 'The Kamla Bhasin Fellowship, an initiative of SPaRC, aims to recognize and empower women advocates who fearlessly champion the cause of gender equality, raise their voices against violence against women, and challenge patriarchal dominance in their own lives or in the lives of other women, be it through their writings, by creating awareness in society or through any other means of activism. With this aim, SPaRC identifies and honors women residing in the Chittagong Hill Tracts who have actively worked to combat violence against women and gender inequality. Through this initiative, SPaRC seeks to provide recognition and support to these courageous advocates and inspire others to follow suit with its slogan – “Courage is Contagious”.',
        img: one
    },
    {
        title: 'KAMLA BHASIN - SPARC FELLOWSHIP: A LONG - TERM ENDEAVOUR',
        writtenon: '13 October, 2025',
        des: 'The Kamla Bhasin Fellowship, an initiative of SPaRC, aims to recognize and empower women advocates who fearlessly champion the cause of gender equality, raise their voices against violence against women, and challenge patriarchal dominance in their own lives or in the lives of other women, be it through their writings, by creating awareness in society or through any other means of activism. With this aim, SPaRC identifies and honors women residing in the Chittagong Hill Tracts who have actively worked to combat violence against women and gender inequality. Through this initiative, SPaRC seeks to provide recognition and support to these courageous advocates and inspire others to follow suit with its slogan – “Courage is Contagious”.',
        img: two
    },
    {
        title: 'KAMLA BHASIN - SPARC FELLOWSHIP: A LONG - TERM ENDEAVOUR',
        writtenon: '13 October, 2025',
        des: 'The Kamla Bhasin Fellowship, an initiative of SPaRC, aims to recognize and empower women advocates who fearlessly champion the cause of gender equality, raise their voices against violence against women, and challenge patriarchal dominance in their own lives or in the lives of other women, be it through their writings, by creating awareness in society or through any other means of activism. With this aim, SPaRC identifies and honors women residing in the Chittagong Hill Tracts who have actively worked to combat violence against women and gender inequality. Through this initiative, SPaRC seeks to provide recognition and support to these courageous advocates and inspire others to follow suit with its slogan – “Courage is Contagious”.',
        img: three
    }
]
const page = () => {
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
                    <p className={`mb-4 text-lg max-w-2xl mx-auto${antiquaFont.className}`}>
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

            {/* Reports section */}
            <section id="reports" className='max-w-5xl mx-auto space-y-10 mt-20 mb-20'>
                {reports.map((rep, index) =>
                    <div key={index} className="flex flex-col gap-5">
                        <h2 className={`text-4xl font-bold mb-4 ${poppins.className}`}>{rep.title}</h2>
                        <p className={` ${poppins.className}`}>{rep.writtenon}</p>
                        <p className={`mb-4 text-lg text-justify ${antiquaFont.className}`}>{rep.des}</p>
                        <Image src={rep.img} alt={rep.title} height={600} width={1000} />
                    </div>
                )}
            </section>

        </div>
    );
};

export default page;