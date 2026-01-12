"use client"

import iconOne from "../../public/Whoweare/icon.png";
import iconTwo from "../../public/Whoweare/icon 2.png";
import imageOne from "../../public/Whoweare/Image 1.png";
import imageTwo from "../../public/Whoweare/Image 2.png";
import imageThree from "../../public/Whoweare/Image 3.png";
import imageFour from "../../public/Whoweare/Image 4.png";
import Image from "next/image";
import { useTranslation } from "react-i18next";
// Added notoBengali to imports
import { antiquaFont, jost, notoBengali } from "../utils/font";
import Container from "../Container";

const images = [imageFour, imageOne];
const imagesTwo = [imageThree, imageTwo];

const Whoweare = () => {
    // 1. Initialize the translation hook and language check
    const { t, i18n } = useTranslation();
    const isBn = i18n.language === 'BN' || i18n.language === 'bn';

    return (
        <Container>
            {/* Applied conditional font class to the main wrapper */}
            <div className={`flex flex-col lg:flex-row my-10 md:my-16 lg:my-20 gap-10 lg:gap-20 ${isBn ? notoBengali.className : ""}`}>
                {/* Left Section */}
                <section className="space-y-6 md:space-y-8 lg:space-y-10 w-full lg:w-1/2">
                    {/* First Div (WHO WE ARE) */}
                    <div className="space-y-6">
                        <h2
                            className={`${isBn ? notoBengali.className : jost.className} font-extrabold text-2xl md:text-4xl xl:text-5xl`}
                        >
                            {t('whoweare.title')}
                        </h2>
                        <p
                            className={`text-lg lg:text-xl text-justify text-[#6d6b6b] ${isBn ? notoBengali.className : antiquaFont.className}`}
                        >
                            {t('whoweare.description')}
                        </p>
                    </div>

                    {/* Second Div (WHAT WE STAND FOR) */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Image
                                src={iconOne}
                                alt="icon-one"
                                height={50}
                                width={50}
                                className="object-contain h-10 md:h-12 w-10 md:w-12"
                            />
                            <h2
                                className={`${isBn ? notoBengali.className : jost.className} font-extrabold text-xl md:text-2xl lg:text-4xl`}
                            >
                                {t('whatwestandfor.title')}
                            </h2>
                        </div>
                        <p
                            className={`text-lg lg:text-xl text-[#6d6b6b] ${isBn ? notoBengali.className : antiquaFont.className}`}
                        >
                            {t('whatwestandfor.description')}
                        </p>
                    </div>

                    {/* Third Div (WHERE WE ARE HEADED) */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Image
                                src={iconTwo}
                                alt="icon-two"
                                height={50}
                                width={50}
                                className="object-contain h-10 md:h-12 w-10 md:w-12"
                            />
                            <h2
                                className={`${isBn ? notoBengali.className : jost.className} font-extrabold text-xl md:text-2xl lg:text-4xl`}
                            >
                                {t('whatweareheaded.title')}
                            </h2>
                        </div>
                        <p className={`text-lg lg:text-xl text-[#6d6b6b] ${isBn ? notoBengali.className : antiquaFont.className}`}>
                            {t('whatweareheaded.description')}
                        </p>
                    </div>
                </section>

                {/* Right Section (Image Gallery) */}
                <section className="flex gap-2 md:gap-3 w-full lg:w-1/2">
                    <div className="flex flex-col gap-2 md:gap-3 w-1/2">
                        {images.map((img, index) => (
                            <div key={index}>
                                <Image
                                    src={img}
                                    alt="gallery-image-1"
                                    height={600}
                                    width={600}
                                    className="object-cover w-full h-auto rounded-sm"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-2 md:gap-3 w-1/2">
                        {imagesTwo.map((img, index) => (
                            <div key={index}>
                                <Image
                                    src={img}
                                    alt="gallery-image-2"
                                    height={600}
                                    width={600}
                                    className="object-cover w-full h-auto rounded-sm"
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </Container>
    );
};

export default Whoweare;