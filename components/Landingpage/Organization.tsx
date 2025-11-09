import Image from "next/image";
import logoOne from "../../public/Organization/logo 1.png";
import logoTwo from "../../public/Organization/logo 2.png";
import logoThree from "../../public/Organization/logo 3.png";
import logoFour from "../../public/Organization/logo 4.png";
import logoFive from "../../public/Organization/logo 5.png";

const Logos = [logoOne, logoThree, logoTwo, logoFour, logoFive];

const Organization = () => {
  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-10 xl:px-0">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8 my-10 md:my-12 lg:my-16">
        {Logos.map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center p-4 hover:scale-105 transition-transform duration-300"
          >
            <Image
              src={logo}
              alt={`organization-logo-${index + 1}`}
              className="object-contain w-full h-20 sm:h-24 md:h-28 lg:h-32"
              width={600}
              height={600}
            />
          </div>
        ))}
      </div>
      <hr className="border-gray-300" />
    </div>
  );
};

export default Organization;
