import Image from "next/image";
import overview from "../../public/Overview/overview.png";
import logo from "../../public/Overview/logocopy.png";

const Overview = () => {
    return (
        <div className="relative w-full">
            <Image src={overview} alt="overview" width={1000} height={600} className="object-cover w-full" />
            <div className="absolute inset-0 bg-black/60 z-10"></div>

            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-6">
                <Image src={logo} alt="sparc-logo" width={100} height={100} className="object-contain mb-4" />
                <p style={{ fontFamily: '"Book Antiqua' }} className="max-w-2xl leading-relaxed">
                    We&apos;re an Indigenous feminist organization with a specific focus on
                    indigenous women, girls, and communities who are often ignored, have
                    limited access to resources, and are survivors of attack, conflict,
                    Violence Against Women, Gender-Based Violence, and systemic & structural
                    oppression.
                </p>
            </div>
        </div>
    );
};

export default Overview;
