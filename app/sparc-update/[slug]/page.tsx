"use client"
import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";
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
}

const Page = () => {
    const { slug } = useParams();
    const [data, setData] = useState<Data[]>([]);

    useEffect(() => {
        fetch("/rebuild/update.json")
            .then((res) => res.json())
            .then((data) => setData(data));
    }, []);

    const filterData = data.find(
        (d) => d.title.replace(/\s+/g, "-").toLowerCase() === slug
    );

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
                        <div className="flex items-center gap-5 justify-between">
                            <h1 className={`${poppins.className} w-64 sm:w-full mt-10 mb-5 text-sm sm:text-lg`}>{filterData.title}</h1>
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
