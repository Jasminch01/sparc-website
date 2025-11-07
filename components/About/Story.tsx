import React from "react";
import Container from "../Container";
import Image from "next/image";
import { antiquaFont, poppins } from "../utils/font";

const Story = () => {
  return (
    <div className={`my-10 ${poppins.className}`}>
      <Container>
        <div className="flex flex-col gap-y-5">
          <div className="flex space-x-20">
            <div className="flex gap-5 w-full">
              <Image
                src={"/About/our-story1.png"}
                alt="our-story-image"
                width={500}
                height={500}
                className="h-[380px]"
              />
              <Image
                src={"/About/our-story2.png"}
                alt="our-story-image"
                width={500}
                height={500}
                className="h-[380px]"
              />
            </div>
            <div className="w-full flex flex-col justify-center">
              <p className="text-3xl font-black mb-4">OUR STORY</p>
              <p
                className={`${antiquaFont.className} leading-12 text-xl text-[#2B2B2B] text-justify`}
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
          <div className="flex space-x-20">
            <div className="flex gap-5 w-full">
              <Image
                src={"/About/our-story3.png"}
                alt="our-story-image"
                width={500}
                height={500}
                className="w-full h-[380px]"
              />
            </div>
            <div className="w-full space-y-5">
              <div>
                <div className="flex items-center space-x-5">
                  <Image
                    src={"/About/story-icon1.png"}
                    alt="icon"
                    width={50}
                    height={50}
                  />
                  <p className="text-2xl font-black">WHAT WE STAND FOR</p>
                </div>
                <p
                  className={`${antiquaFont.className} leading-12 text-xl text-[#2B2B2B] text-justify`}
                >
                  To ensure women and girls’ social, cultural, economic and
                  political, sexual and spiritual rights  without prejudice of
                  any identity such as age, sex, caste, religion, ethnicity or
                  sexual orientation  etc.
                </p>
              </div>
              <div>
                <div className="flex items-center space-x-5">
                  <Image
                    src={"/About/story-icon2.png"}
                    alt="icon"
                    width={50}
                    height={50}
                  />
                  <p className="text-2xl font-black mb-2">WHERE WE’RE HEADED</p>
                </div>
                <p
                  className={`${antiquaFont.className} leading-12 text-xl text-[#2B2B2B] text-justify`}
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
