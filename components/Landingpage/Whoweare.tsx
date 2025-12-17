"use client" // Assuming this component needs to be client-side due to i18n hooks and potential interactivity

import iconOne from "../../public/Whoweare/icon.png";
import iconTwo from "../../public/Whoweare/icon 2.png";
import imageOne from "../../public/Whoweare/Image 1.png";
import imageTwo from "../../public/Whoweare/Image 2.png";
import imageThree from "../../public/Whoweare/Image 3.png";
import imageFour from "../../public/Whoweare/Image 4.png";
import Image from "next/image";
import { useTranslation } from "react-i18next"; // Import useTranslation
import { antiquaFont, poppins } from "../utils/font";
import Container from "../Container";

const images = [imageFour, imageOne];
const imagesTwo = [imageThree, imageTwo];

const Whoweare = () => {
    // 1. Initialize the translation hook
    const { t } = useTranslation();

    return (
        <Container>
            <div className="flex flex-col lg:flex-row my-10 md:my-16 lg:my-20 gap-10 lg:gap-20">
                {/* Left Section */}
                <section className="space-y-6 md:space-y-8 lg:space-y-10 w-full lg:w-1/2">
                    {/* First Div (WHO WE ARE) */}
                    <div className="space-y-3">
                        <h2
                            className={`${poppins.className} font-extrabold text-2xl md:text-3xl xl:text-4xl`}
                        >
                            {/* Translated: WHO WE ARE */}
                            {t('whoweare.title')}
                        </h2>
                        <p
                            className={`text-lg lg:text-xl text-justify text-[#2B2B2B] ${antiquaFont.className}`}
                        >
                            {/* Translated: WHO WE ARE description */}
                            {t('whoweare.description')}
                        </p>
                    </div>

                    {/* Second Div (WHAT WE STAND FOR) */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <Image
                                src={iconOne}
                                alt="icon-one"
                                height={50}
                                width={50}
                                className="object-contain h-10 md:h-12 w-10 md:w-12"
                            />
                            <h2
                                className={`${poppins.className} font-extrabold text-xl md:text-2xl lg:text-3xl`}
                            >
                                {/* Translated: WHAT WE STAND FOR */}
                                {t('whatwestandfor.title')}
                            </h2>
                        </div>
                        <p
                            className={`text-lg lg:text-xl text-[#2B2B2B]  ${antiquaFont.className}`}
                        >
                            {/* Translated: WHAT WE STAND FOR description */}
                            {t('whatwestandfor.description')}
                        </p>
                    </div>

                    {/* Third Div (WHERE WE ARE HEADED) */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <Image
                                src={iconTwo}
                                alt="icon-two"
                                height={50}
                                width={50}
                                className="object-contain h-10 md:h-12 w-10 md:w-12"
                            />
                            <h2
                                className={`${poppins.className} font-extrabold text-xl md:text-2xl lg:text-3xl`}
                            >
                                {/* Translated: WHERE WE ARE HEADED */}
                                {t('whatweareheaded.title')}
                            </h2>
                        </div>
                        <p className={`text-lg lg:text-xl text-[#2B2B2B] ${antiquaFont.className}`}>
                            {/* Translated: WHERE WE ARE HEADED description */}
                            {t('whatweareheaded.description')}
                        </p>
                    </div>
                </section>

                {/* Right Section (Image Gallery - no text translation needed here) */}
                <section className="flex gap-2 md:gap-3 w-full lg:w-1/2">
                    <div className="flex flex-col gap-2 md:gap-3 w-1/2">
                        {images.map((img, index) => (
                            <div key={index}>
                                <Image
                                    src={img}
                                    alt="images"
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
                                    alt="images"
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