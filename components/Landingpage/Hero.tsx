import Image from "next/image";
import Hero_img from '../../public/Hero/Hero_Img.png'
import overlay from '../../public/Hero/Vector 10.png'

import { Poppins } from "next/font/google";
const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '600', '700']
})
const Hero = () => {
    return (
        <div className={`my-5 relative ${poppins.className}`}>
            <Image src={Hero_img} alt="hero-img" height={800} width={1000} className="w-full h-[250px] lg:h-auto relative" />
            {/* Clip Path Wave */}
            {/* This position will be absolute */}
            <div className="absolute left-0 right-0 bottom-0 overflow-hidden w-full">
                <Image src={overlay} alt="overlay-image" width={1000} height={600} className="object-contain w-full" />
            </div>

            {/* Absoulute Test */}
            <div className="absolute left-0 right-0 bottom-[8%] sm:bottom-[10%] md:bottom-[12%] lg:bottom-[15%] px-10 w-lg text-white">
                <p className="font-extrabold lg:text-5xl mb-5">PROTEST FOR EQUALITY</p>
                <p style={{ fontFamily: '"Book Antiqua",  serif ' }} className="mb-5">Empowering indigenous women and communities to rise against systemic oppression, reclaim their voices.</p>
                <button className="border-b-2 cursor-pointer">Read More</button>
            </div>
        </div>
    );
};

export default Hero;