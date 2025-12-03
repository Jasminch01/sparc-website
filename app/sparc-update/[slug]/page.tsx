"use client"
import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Data {
    category: string;
    img: string;
    des: string;
    title: string;
    date: string;
    video: string;
    slug: string
}

const Page = () => {
    const { slug } = useParams();
    const [data, setData] = useState<Data[]>([]);

    useEffect(() => {
        const fetchUpdates = async () => {
            try {
                const data = await client.fetch(`
          *[_type == "newsUpdate"] | order(date desc){
            title,
            category,
            date,
            des,
           "slug": slug.current,
           "img": img.asset->url,
            video
          }
        `);
                setData(data);
            } catch (err) {
                console.error("Error fetching updates:", err);
            }
        };

        fetchUpdates();
    }, []);

    const filterData = data.find((d) => d.slug === slug);


    return (
        <Container>
            <div>
                {/* BreadCrump */}
                <div className={`flex uppercase items-center gap-5 my-5 lg:my-10  ${poppins.className} text-[8px] lg:text-base`}>
                    <Link href='/' className="font-bold">HOME</Link><span>||</span>
                    <Link href='/sparc-update' className="font-bold">SPARC-UPDATE</Link><span>||</span>
                    <p className="text-[#818181]">{slug}</p>
                </div>

                {filterData ? (
                    <div>
                        <Image src={filterData.img} alt={filterData.title} width={1000} height={600} className="w-full object-cover" />
                        <div className="flex items-center justify-between gap-5 ">
                            <h1 className={`${poppins.className} w-64 sm:w-[700px] mt-10 mb-5 text-sm sm:text-lg`}>{filterData.title}</h1>
                            <p className={`${poppins.className} text-sm sm:text-lg`}>{filterData.date}</p>
                        </div>
                        <p className={`${antiquaFont.className} text-sm sm:text-lg`}>{filterData.des}</p>

                        {/* Example: embed video safely */}
                        {filterData.video && (
                            <iframe
                                src={filterData.video}
                                width="560"
                                height="315"
                                allowFullScreen
                            />
                        )}
                    </div>
                ) : (
                    <p className={`text-center ${poppins.className}`}>Loading...</p>
                )}
            </div>
        </Container>
    );
};

export default Page;
