import Image from "next/image";
import Hero_img from '../../public/Hero/Hero_Img.png'
const Hero = () => {
    return (
        <div className="mt-10 relative">
            <Image src={Hero_img} alt="hero-img" height={800} width={800} className="w-full relative" />
            {/* Clip Path Wave */}
            {/* This position will be absolute */}
            <div className="absolute left-0 right-0 bottom-0">
                <svg className="brightness-75" viewBox="0 0 1440 320"><path fill="rgba(0, 0, 0, 0.55)" d="M0,0L0,80.9C300,-200,1140,400,480,80C640,107,800,213,960,245.3C1120,277,1280,235,1360,213.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
            </div>

            {/* Absoulute Test */}
            <div className="absolute left-0 right-0 bottom-1/7 px-10 w-lg text-white ">
                <p className="font-extrabold text-5xl">PROTEST FOR EQUALITY</p>
                <p>Empowering indigenous women and communities to rise against systemic oppression, reclaim their voices.</p>
            </div>
        </div>
    );
};

export default Hero;