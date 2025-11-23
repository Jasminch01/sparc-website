import iconOne from "../../public/Whoweare/icon.png";
import iconTwo from "../../public/Whoweare/icon 2.png";
import imageOne from "../../public/Whoweare/Image 1.png";
import imageTwo from "../../public/Whoweare/Image 2.png";
import imageThree from "../../public/Whoweare/Image 3.png";
import imageFour from "../../public/Whoweare/Image 4.png";
import Image from "next/image";
import { antiquaFont, poppins } from "../utils/font";
import Container from "../Container";

const images = [imageFour, imageOne];
const imagesTwo = [imageThree, imageTwo];

const Whoweare = () => {
  return (
    <Container>
      <div className="flex flex-col lg:flex-row my-10 md:my-16 lg:my-20 gap-10 lg:gap-20">
        {/* Left Section */}
        <section className="space-y-6 md:space-y-8 lg:space-y-10 w-full lg:w-1/2">
          {/* First Div */}
          <div className="space-y-3">
            <h2
              className={`${poppins.className} font-extrabold text-2xl md:text-3xl xl:text-4xl`}
            >
              WHO WE ARE
            </h2>
            <p
              className={`text-lg lg:text-xl text-justify ${antiquaFont.className}`}
            >
              SPaRC is an indigenous women-led feminist organisation established
              in Chittagong Hill Tracts (CHT), Bangladesh. SPaRC works with a
              specific focus for indigenous women, girls and communities who are
              often ignored, have no access to resources and are survivors of
              communal attack, conflict, Violence Against Women, Gender Based
              Violence, and systematic oppression such as misinformation,
              intergenerational trauma and sufferings.
            </p>
          </div>

          {/* Second Div */}
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
                WHAT WE STAND FOR
              </h2>
            </div>
            <p className={`text-lg lg:text-xl ${antiquaFont.className}`}>
              To ensure women and girls&apos; social, cultural, economic and
              political, sexual and spiritual rights without prejudice of any
              identity such as age, sex, caste, religion, ethnicity or sexual
              orientation etc.
            </p>
          </div>

          {/* Third Div */}
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
                WHERE WE ARE HEADED
              </h2>
            </div>
            <p className={`text-lg lg:text-xl ${antiquaFont.className}`}>
              To create a world where all living beings enjoy their rights with
              dignity.
            </p>
          </div>
        </section>

        {/* Right Section */}
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
