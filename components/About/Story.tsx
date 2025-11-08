import React from "react";
import Container from "../Container";
import Image from "next/image";
import { antiquaFont, poppins } from "../utils/font";

const Story = () => {
  return (
    <div className={`my-10 ${poppins.className}`}>
      <Container>
        <div className="flex flex-col gap-y-8 md:gap-y-10 lg:gap-y-5 px-4 md:px-6 lg:px-0">
          {/* First Section */}
          <div className="flex flex-col lg:flex-row lg:space-x-20 gap-y-6 lg:gap-y-0">
            {/* Images */}
            <div className="flex flex-col sm:flex-row gap-5 w-full lg:w-1/2">
              <Image
                src={"/About/our-story1.png"}
                alt="our-story-image"
                width={500}
                height={500}
                className="w-full sm:w-1/2 lg:w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[380px] object-cover"
              />
              <Image
                src={"/About/our-story2.png"}
                alt="our-story-image"
                width={500}
                height={500}
                className="w-full sm:w-1/2 lg:w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[380px] object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <p className="text-2xl md:text-3xl font-black mb-3 md:mb-4">
                OUR STORY
              </p>
              <p
                className={`${antiquaFont.className} leading-relaxed text-base md:text-lg lg:text-xl text-[#2B2B2B] text-justify`}
              >
                SPaRC is an indigenous women-led feminist organization
                established in chittagong Hill Tracts (CHT), Bangladesh. SPaRC
                works with a spacific focus on indigenous women, girls and
                communities who are often ignored, have no access to resurces
                and are survivors of communal attack, conflict, violance Against
                Women, Gender Based Violance, and systematic oppression such as
                misinformation, intergenerational trauma and suffering.
              </p>
            </div>
          </div>

          {/* Second Section */}
          <div className="flex flex-col lg:flex-row lg:space-x-20 gap-y-6 lg:gap-y-0">
            {/* Image */}
            <div className="w-full lg:w-1/2">
              <Image
                src={"/About/our-story3.png"}
                alt="our-story-image"
                width={500}
                height={500}
                className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[380px] object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="w-full lg:w-1/2 space-y-5 md:space-y-6">
              <div>
                <div className="flex items-center space-x-3 md:space-x-5 mb-2 md:mb-3">
                  <Image
                    src={"/About/story-icon1.png"}
                    alt="icon"
                    width={50}
                    height={50}
                    className="w-10 h-10 md:w-12 md:h-12 lg:w-[50px] lg:h-[50px]"
                  />
                  <p className="text-xl md:text-2xl font-black">
                    WHAT WE STAND FOR
                  </p>
                </div>
                <p
                  className={`${antiquaFont.className} leading-relaxed text-base md:text-lg lg:text-xl text-[#2B2B2B] text-justify`}
                >
                  To ensure women and girls&apos; social, cultural, economic and
                  political, sexual and spiritual rights without prejudice of
                  any identity such as age, sex, caste, religion, ethnicity or
                  sexual orientation etc.
                </p>
              </div>

              <div>
                <div className="flex items-center space-x-3 md:space-x-5 mb-2 md:mb-3">
                  <Image
                    src={"/About/story-icon2.png"}
                    alt="icon"
                    width={50}
                    height={50}
                    className="w-10 h-10 md:w-12 md:h-12 lg:w-[50px] lg:h-[50px]"
                  />
                  <p className="text-xl md:text-2xl font-black">
                    WHERE WE&apos;RE HEADED
                  </p>
                </div>
                <p
                  className={`${antiquaFont.className} leading-relaxed text-base md:text-lg lg:text-xl text-[#2B2B2B] text-justify`}
                >
                  To create a world where all living beings enjoy their rights
                  with dignity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Story;
