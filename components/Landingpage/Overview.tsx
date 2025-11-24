import Image from "next/image";
import overview from "../../public/Overview/overview.png";
import logo from "../../public/Overview/logocopy.png";

const Overview = () => {
  return (
    <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] xl:h-[700px]">
      <Image
        src={overview}
        alt="overview"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-5 lg:px-10 xl:px-0">
        <Image
          src={logo}
          alt="sparc-logo"
          width={100}
          height={100}
          className="object-contain w-16 md:size-24 lg:size-32 mb-4 md:mb-6 lg:mb-8"
        />
        <p
          style={{ fontFamily: '"Book Antiqua", serif' }}
          className="max-w-xs md:max-w-lg lg:max-w-2xl xl:max-w-3xl leading-relaxed text-lg md:text-lg lg:text-xl"
        >
          We&apos;re an Indigenous feminist organization with a specific focus
          on indigenous women, girls, and communities who are often ignored,
          have limited access to resources, and are survivors of attack,
          conflict, Violence Against Women, Gender-Based Violence, and systemic
          & structural oppression.
        </p>
      </div>
    </div>
  );
};

export default Overview;
