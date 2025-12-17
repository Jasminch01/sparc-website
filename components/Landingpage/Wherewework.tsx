"use client";
import Image from "next/image";
import map from "../../public/Wherewework/map.png";
import { antiquaFont, poppins } from "../utils/font";
import Container from "../Container";
import { useTranslation } from "react-i18next"; 

const Wherewework = () => {
    const { t } = useTranslation();

    // 1. Fetch main title and description
    const componentTitle = t('wherewework.title', 'WHERE WE WORK');
    const componentDescription = t('wherewework.description', 'Community development is often linked with community work or community planning, and may involve stakeholders, foundations,');

    // 2. Fetch the nested array of indicator titles
    // We use returnObjects: true to get the array structure
    const indicatorData = t('wherewework.country', { returnObjects: true }) as { title: string }[];

    // 3. Safely access the two indicator titles from the array
    const indicatorWorked = indicatorData?.[0]?.title || 'Countries We Have Worked';
    const indicatorBelong = indicatorData?.[1]?.title || 'Where We Belong';

    return (
        <div className="my-20">
            <Container>
                <div className="text-center mx-auto mb-20 space-y-5">
                    <h2
                        className={`${poppins.className} font-black xl:text-4xl md:text-3xl text-2xl `}
                    >
                        {/* Display Translated Title */}
                        {componentTitle}
                    </h2>
                    <p
                        className={`text-[#6D6D6D] lg:text-xl text-lg max-w-xl mx-auto ${antiquaFont.className}`}
                    >
                        {/* Display Translated Description */}
                        {componentDescription}
                    </p>
                </div>
                
                <Image
                    src={map}
                    alt="map"
                    height={600}
                    width={1000}
                    className="object-contain w-full"
                />

                {/* Indicator */}
                <div className={`mt-10 space-y-2 ${antiquaFont.className}`}>
                    <div className="flex items-center gap-5">
                        <div className="w-5 h-5 bg-[#802390] text-lg font-bold "></div>
                        <p>
                            {/* Display Translated Indicator 1: "আমরা যে দেশগুলিতে কাজ করেছি" */}
                            {indicatorWorked}
                        </p>
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="w-5 h-5 bg-[#FF951B] text-lg font-bold"></div>
                        <p>
                            {/* Display Translated Indicator 2: "আমরা যেখানে আছি" */}
                            {indicatorBelong}
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Wherewework;