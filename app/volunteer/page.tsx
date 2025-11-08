import { antiquaFont, poppins } from '@/components/utils/font';
import vector from '../../public/Volunteer/vector.png'
import hero from '../../public/Volunteer/volunteer-hero-image.png'
import countryimage from '../../public/Volunteer/country-image.png'
import Image from "next/image";
import Container from '@/components/Container';
import icon from '../../public/Volunteer/icon.png'

const opinions = [
    { title: 'Support community workshops and awareness programs', icon: icon },
    { title: 'Organize campaigns on women’s rights and cultural preservation', icon: icon },
    { title: 'Share stories that inspire change across generations', icon: icon },
]

const page = () => {
    return (
        <div className="relative">
            {/* Top Part */}
            <div className="max-w-7xl mx-auto flex">
                <div className="w-1/2 pr-8 pt-16">
                    <h2 className={`uppercase text-4xl font-extrabold mb-6 max-w-md ${poppins.className}`}>
                        Apply today to become a <span className="text-orange-500">volunteer</span>
                    </h2>
                    <p className={`text-[#4E4E4E] ${antiquaFont.className} text-lg leading-relaxed`}>
                        Every action counts when it comes to protecting the rights, voices, and dignity of Indigenous women. By volunteering with us
                    </p>
                </div>
                <div className="w-1/2 mt-15">
                    <form id='form' action="" className="z-30 absolute bg-white rounded-xl px-12 py-10 border border-gray-200 w-[500px]">
                        <h2 className={`text-center mb-8 text-xl font-bold text-gray-800 uppercase tracking-wide ${poppins.className}`}>Become a volunteer</h2>
                        <div className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 bg-white text-sm"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 bg-white text-sm"
                                />
                            </div>
                            <div>
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 bg-white text-sm"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Address"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 bg-white text-sm"
                                />
                            </div>
                            <div>
                                <textarea
                                    placeholder="Message"
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 bg-white resize-none text-sm"
                                />
                            </div>
                            <button type="submit" className="w-full bg-[#FF951B] text-white font-semibold py-3 px-6 rounded-full uppercase tracking-wide text-sm">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="relative">
                {/* Middle Part */}
                <Image src={vector} alt="vector-image" width={1000} height={600} className="z-20 w-full absolute top-[-45px]" />
                {/* Bottom part */}
                <Image src={hero} alt="hero" width={1000} height={600} className="relative z-10 object-contain w-full mt-20" />
            </div>


            {/* Why Volunteers */}
            <Container>
                <div className='flex py-20'>
                    <div className='w-1/2'>
                        <Image src={countryimage} alt='country-image' width={500} height={400} className=' ' />
                    </div>
                    <div className='w-1/2 space-y-5 mt-20'>
                        <h2 className={`${poppins.className} text-4xl font-extrabold`}>WHY VOLUNTEERS WITH US?</h2>
                        <p className={`${antiquaFont.className} text-[#2B2B2B] text-lg`}>Empowerment begins with awareness — and change begins with you.As a volunteer, you’ll help raise voices that deserve to be heard, support community-led initiatives, and advocate for justice, education, and equality for Indigenous women.</p>
                        <div className='space-y-5'>
                            <h2 className={`font-semibold ${poppins.className} text-xl`}>Through your time and passion, you can help:</h2>
                            <ul className='space-y-5'>
                                {opinions.map((op, index) =>
                                    <div key={index} className='flex items-center gap-3'>
                                        <Image src={op.icon} alt={op.title} height={10} width={20} className='' />
                                        <p className={`${antiquaFont.className}`}>{op.title}</p>
                                    </div>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default page;