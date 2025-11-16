"use client";

import { useEffect, useState } from "react";
import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";
import Image from "next/image";

interface Partner {
  logo: string;
  image: string;
  about: string;
  link: string;
}

const Page = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/Partners/partners.json")
      .then((res) => res.json())
      .then((data) => {
        setPartners(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching partners:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container>
        <div className="text-center py-20">
          <p className="text-2xl">Loading partners...</p>
        </div>
      </Container>
    );
  }

  return (
    <div>
      <div className="w-full relative h-[50vh] sm:h-[70vh] md:h-[80vh] lg:h-screen">
        <Image
          src={"/Partners/banner.png"}
          width={1920}
          height={1080}
          alt="about-image"
          className="w-full h-full object-cover"
          priority
        />

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4  md:px-0 xl:mt-60 mt-20">
          <h1
            className={`text-2xl md:text-4xl font-black md:mb-4 text-center ${poppins.className}`}
          >
            OUR PARTNERS
          </h1>
          <p
            className={`text-base md:text-xl text-center max-w-2xl lg:max-w-3xl ${antiquaFont.className}`}
          >
            Our research amplifies Indigenous voices, documents cultural wisdom,
            and supports evidence-based advocacy for equality and sustainability
          </p>
          <div className="md:mt-10 mt-5">
            <button className="md:py-5 md:px-6 p-3 font-semibold rounded-full bg-[#FF951B] text-sm md:text-lg">
              BECOME A PARTNER
            </button>
          </div>
        </div>
      </div>
      <Container>
        <div className="px-5 md:px-0 py-20">
          <p className="xl:text-4xl md:text-3xl text-2xl font-bold text-center">
            OUR PARTNERS SO FAR
          </p>

          <div className="py-10 md:py-20">
            <div className="grid grid-cols-1 gap-8 lg:gap-12">
              {partners.map((partner, index) => (
                <div key={index} className="p-6 md:p-12 lg:p-20 border rounded">
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 lg:gap-20">
                    <Image
                      src={partner.logo}
                      alt="partner logo"
                      width={300}
                      height={300}
                      className="w-full max-w-[100px] md:max-w-[250px] lg:max-w-[300px] h-auto object-contain"
                    />
                    <Image
                      src={partner.image}
                      alt="partner image"
                      width={500}
                      height={500}
                      className="w-full max-w-[200px] md:max-w-[250px] lg:max-w-[500px] h-auto object-contain"
                    />
                  </div>
                  <div className="my-6 md:my-10">
                    <p
                      className={`${antiquaFont.className} text-justify text-base md:text-lg`}
                    >
                      {partner.about}
                    </p>
                  </div>
                  <div className="text-center">
                    <a
                      href={partner.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button
                        className={`px-6 md:px-8 py-3 md:py-4 bg-[#36133B] rounded-full text-white ${poppins.className} hover:bg-[#4a1a50] transition-colors cursor-pointer`}
                      >
                        Visit Partner Website
                      </button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Page;
