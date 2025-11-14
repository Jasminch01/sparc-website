import Container from "@/components/Container";
import { antiquaFont, poppins } from "@/components/utils/font";
import fellowshipHero from "@/public/fellowship/fellowship-hero.png"
import aboutOne from "@/public/fellowship/about.png"
import aboutTwo from "@/public/fellowship/abouttwo.png"
import icon from "@/public/fellowship/icon.png"
import follower from "@/public/fellowship/follower.png"
import women from "@/public/fellowship/women.png"
import Image from "next/image";

const requirements = [
    {
        icon: icon,
        title: 'Open to all Indigenous individuals (18+)'
    },
    {
        icon: icon,
        title: 'Must have a demonstrated commitment to community service or research'
    },
    {
        icon: icon,
        title: 'Fellowship duration: 6–12 months'
    },
    {
        icon: icon,
        title: 'Provides stipend and mentorship support'
    },
]
const page = () => {
    return (
        <div className="mt-15">
            <Container>
                {/* Top Section */}
                <section className="flex justify-between gap-20">
                    <div className="w-1/2">
                        <h2 className={`text-5xl max-w-2xl font-extrabold ${poppins.className}`}>THE FELLOWSHIP IS OPEN TO <span className="text-[#FF951B]">INDIGENOUS </span>YOUTH</h2>
                    </div>
                    <div className="w-1/2">
                        <p className={`ml-30 text-justify text-lg ${antiquaFont.className}`}>Our Fellowship Program supports individuals dedicated to protecting Indigenous rights, documenting histories, and building stronger communities.</p>
                    </div>
                </section>
            </Container>

            {/* Hero Section */}
            <section className="relative w-full">
                <Image src={fellowshipHero} alt="fellowship-hero" width={1000} height={600} className="w-full" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center  text-white">
                    <h2 className={`text-4xl font-bold mb-4 ${poppins.className}`}>FELLOWSHIP</h2>
                    <p className={`mb-4 text-lg max-w-2xl mx-auto${antiquaFont.className}`}>
                        Gain hands-on experience and make an impact through our internship program.
                    </p>
                    <button className={`bg-[#FF951B] text-white px-8 py-3 rounded-full text-sm ${poppins.className}`}>
                        APPLY NOW
                    </button>
                </div>
            </section>

            {/*About  Section */}

            <section className="mt-25 max-w-6xl mx-auto space-y-10">
                <div className="space-y-5">
                    <h2 className={`text-4xl font-bold ${poppins.className}`}>ABOUT THE FELLOWSHIP</h2>
                    <p className={`${antiquaFont.className} text-justify text-lg`}>This fellowship provides mentorship, training, and funding to individuals passionate about cultural heritage, gender equity, environmental justice, and Indigenous education. To help address these challenges, our Early Career Fellowship empowers a new, diverse generation of Internet champions who will bridge the gap between technology and policy, becoming advocates for the open, globally connected, secure, and trustworthy Internet.</p>
                </div>
                <div className="flex gap-5">
                    <Image src={aboutOne} alt="aboutone" width={600} height={400} />
                    <Image src={aboutTwo} alt="abouttwo" width={530} height={400} />
                </div>
            </section>
            {/* Program Section */}
            <section className="mt-15  max-w-6xl mx-auto space-y-5">
                <h2 className={`${poppins.className} text-4xl font-bold `}>ABOUT THE PROGRAM</h2>
                <p className={`${antiquaFont.className} text-justify text-lg`}>The Indigenous Fellowship Program is designed to empower emerging leaders from Indigenous communities through mentorship, research support, and cultural advocacy training. The program provides fellows with the resources and guidance needed to preserve traditional knowledge, document community histories, and lead initiatives that strengthen Indigenous rights and representation. Through collaboration, storytelling, and field-based projects, fellows contribute to building a more inclusive and equitable future for their people.</p>
            </section>

            {/* Eligible Section */}
            <section className="max-w-6xl mx-auto mt-15 space-y-5">
                <h2 className={`text-4xl font-bold ${poppins.className}`}>WHO IS ELIGIBLE TO APPLY?</h2>
                <p className={`${antiquaFont.className} text-justify text-lg`}>The fellowship is open to Indigenous individuals who are passionate about community development, cultural preservation, and social advocacy.</p>
                <div>
                    <h3 className={`${antiquaFont.className} text-[#363636] text-justify text-lg`}>Candidates with the following are welcome to apply:</h3>
                    <ul>
                        {requirements.map((req, index) =>
                            <div key={index} className="flex items-center gap-4 my-5 ">
                                <Image src={req.icon} alt={req.title} width={20} height={20} />
                                <li className={`${antiquaFont.className} text-justify text-lg`}>{req.title}</li>
                            </div>
                        )}
                    </ul>
                </div>
            </section>

            {/* Follows Section */}
            <section className="max-w-6xl mx-auto mt-15 space-y-10">
                <h2 className={`text-4xl font-bold ${poppins.className}`}>MEET THE FELLOWS</h2>
                <div className="flex gap-20">
                    <Image src={follower} alt="follwer" width={333} height={200} />
                    <Image src={follower} alt="follwer" width={333} height={200} />
                    <Image src={follower} alt="follwer" width={333} height={200} />
                </div>
                <hr className="text-gray-300" />
            </section>


            {/*Career Section */}
            <section className="mt-15 mb-30 rounded-md max-w-6xl mx-auto bg-gray-100 flex items-center border border-gray-200">
                <div className="w-full lg:w-1/2">
                    <Image src={women} alt="women" width={450} height={300} />
                </div>
                <div className="w-full lg:w-1/2 space-y-10">
                    <h2 className={`text-[#2D2D2D] ${poppins.className} font-bold text-3xl w-lg`}>YOUR CAREER JOURNEY BEGINS HERE. LEARN, GROW</h2>
                    <p className={`${antiquaFont.className} text-justify text-lg`}>Indigenous young people who are emerging leaders, learners, or activists working to preserve their culture and rights.</p>
                    <button className={`${poppins.className} bg-[#36133B] text-white cursor-pointer px-8 py-3 rounded-full`}>Apply Now</button>
                </div>
            </section>
        </div>
    );
};

export default page;