"use client"
import { useParams } from "next/navigation";
import one from "@/public/reports/reports-1.png"
import two from "@/public/reports/reports-2.png"
import three from "@/public/reports/reports-3.png"
import publicationOne from "@/public/publications/publications1.png"
import publicationTwo from "@/public/publications/publications2.png"
import publicationThree from "@/public/publications/publications3.png"
import Image from "next/image";
import { antiquaFont, poppins } from "@/components/utils/font";

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
    const { slug } = useParams()

    // Convert slug to match pathTitle format (replace hyphens with spaces and uppercase)


    // Filter data using pathTitle
    const filteredData = reports_publications.filter(
        (item) => item.pathTitle.replace(/\s+/g, '-').toLowerCase() === slug
    );

    // If no data found, show not found message
    if (!filteredData || filteredData.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-5 py-20 text-center">
                <h1 className="text-3xl font-bold text-gray-800">Content Not Found</h1>
                <p className="mt-4 text-gray-600">
                    The content you are looking for does not exist.
                </p>
            </div>
        );
    }

    // Get the first matching item (assuming pathTitle is unique)
    const data = filteredData[0];

    return (
        <div className="max-w-7xl mx-auto px-5 lg:px-10 xl:px-0 py-10 md:py-16 lg:py-20">
            {/* Display the filtered data */}
            <div className="space-y-8">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
                    {data.title}
                </h1>

                <div className="flex flex-wrap items-center justify-between  gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-5">
                        <span className={`${antiquaFont.className} text-sm lg:text-lg`}>Written on: {data.writtenon}</span>
                        <p className={`px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm lg:text-lg ${antiquaFont.className} text-lg`}>
                            {data.category}
                        </p>
                    </div>
                    <div>
                        <p className={`${poppins.className} text-sm lg:text-lg`}> Date: {data.date}</p>
                    </div>
                </div>

                <div className="w-full">
                    <Image
                        src={data.img.src}
                        alt={data.title}
                        width={1000}
                        height={200}
                        className="w-full rounded-lg object-cover h-[400px]"
                    />
                    {data.imgDes && (
                        <p className="mt-2 text-sm text-gray-500 italic">{data.imgDes}</p>
                    )}
                </div>

                <p className={`text-lg leading-relaxed text-gray-700 ${antiquaFont.className}`}>
                    {data.des}
                </p>

                {/* Show publication-specific fields if category is publications */}
                {data.category === 'publications' && (
                    <div className={`border-t border-gray-400 pt-8 space-y-3 ${antiquaFont.className} text-lg`}>
                        {data.author && <p><strong>Author:</strong> {data.author}</p>}
                        {data.publisher && <p><strong>Publisher:</strong> {data.publisher}</p>}
                        {data.publicationLanguage && (
                            <p><strong>Language:</strong> {data.publicationLanguage}</p>
                        )}
                        {data.financialSupportBy && (
                            <p><strong>Financial Support By:</strong> {data.financialSupportBy}</p>
                        )}
                        {data.relaseYear && (
                            <p><strong>Release Year:</strong> {data.relaseYear}</p>
                        )}
                        {data.releaseMonth && (
                            <p><strong>Release Month:</strong> {data.releaseMonth}</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;