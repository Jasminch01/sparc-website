"use client";
import { poppins } from "../utils/font";
import wwdOne from "../../public/Whatwedo/wwd 1.png";
import wwdTwo from "../../public/Whatwedo/wwd 2.png";
import wwdThree from "../../public/Whatwedo/wwd 3.png";
import vectorImage from "../../public/Whatwedo/white1.png";
import Image, { StaticImageData } from "next/image"; // Import StaticImageData for image types
import Container from "../Container";
import { useTranslation } from "react-i18next"; // Import useTranslation

// Define the interface for a single item coming from the translation JSON
interface TranslatedWhatWeDoItem {
    title: string;
}

// Define the final data structure, combining the translated title and the static image path
interface WhatWeDoItem {
    img: StaticImageData;
    title: string;
}

const Whatwedo = () => {
    const { t } = useTranslation();

    // 1. Fetch translated header texts
    const title = t('whatwedo.title', 'WHAT WE DO');
    const description = t('whatwedo.description', 'To create a world where all living beings enjoy their rights with dignity.');
    
    // 2. Fetch the data array and assert the type for safety
    const translatedData = (t('whatwedo.data', { returnObjects: true }) || []) as TranslatedWhatWeDoItem[];

    // 3. Combine the static image imports with the dynamic translated titles
    const staticImages: StaticImageData[] = [wwdOne, wwdTwo, wwdThree];
    
    // Map the translated data to include the static image paths
    const whatwedoes: WhatWeDoItem[] = translatedData
        .slice(0, staticImages.length) // Use only up to the number of available images
        .map((item, index) => ({
            img: staticImages[index], // Assign image based on index
            title: item.title,       // Use the translated title
        }));

    return (
        <div className="bg-[#36133B] py-12 md:py-15 lg:py-20 relative">
            <Container>
                <div className="flex flex-col gap-8 md:gap-10 pb-0 lg:pb-10">
                    {/* Header Section */}
                    <div className="text-center text-white space-y-3 md:space-y-4">
                        <h2
                            className={`${poppins.className} font-black text-3xl sm:text-4xl md:text-5xl lg:text-4xl`}
                        >
                            {/* Display Translated Title */}
                            {title}
                        </h2>
                        <p
                            style={{ fontFamily: '"Book Antiqua", serif' }}
                            className="text-lg lg:text-xl max-w-3xl mx-auto px-4"
                        >
                            {/* Display Translated Description */}
                            {description}
                        </p>
                    </div>

                    {/* Cards Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
                        {/* Map over the combined data array */}
                        {whatwedoes.map((wwd: WhatWeDoItem, index: number) => (
                            <div
                                key={index}
                                className="flex items-center flex-col bg-[#772E82] text-center py-8 md:py-10 lg:py-12 px-4 gap-4 md:gap-5 rounded-2xl hover:bg-[#8a3596] transition-colors min-h-[220px] md:min-h-[250px]"
                            >
                                <div className="grow flex items-center justify-center">
                                    <Image
                                        src={wwd.img}
                                        alt={wwd.title}
                                        width={80}
                                        height={80}
                                        className="object-contain w-16 h-16 sm:w-20 sm:h-20 md:w-20 md:h-20"
                                    />
                                </div>
                                <h3
                                    className={`text-white text-sm sm:text-base md:text-lg font-semibold leading-snug ${poppins.className}`}
                                >
                                    {/* Display Translated Card Title */}
                                    {wwd.title}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
            
            {/* Bottom Vector Image */}
            <div className="absolute vector-image left-0 right-0 w-full pointer-events-none overflow-hidden bottom">
                <Image
                    className="w-full h-auto object-cover hidden lg:block "
                    src={vectorImage}
                    alt="vector-image"
                    width={1920}
                    height={600}
                />
            </div>
        </div>
    );
};

export default Whatwedo;