import Image from "next/image";
import highlightImage from '../../public/Highlight/highlight.png'
import { poppins } from "../utils/font";
import vectorImage from '../../public/Whatwedo/Vector.png'
import vector from '../../public/Whatwedo/Vector.png'

const Highlights = () => {
    return (
        <div className="relative">
            {/* First Image - Applied responsive top offset: small overlap on mobile, large on desktop */}
            <Image
                className="absolute w-full top-[-140px] sm:top-[-150px] md:top-[-155px] lg:top-[-175px] "
                src={vectorImage}
                alt="vector-image"
                width={1000}
                height={600}
            />
            <div className="mt-30 max-w-7xl mx-auto ">
                <h2 className={`${poppins.className} text-center font-bold text-[45px]`}>HIGHLIGHTS</h2>
                <div className="flex gap-10 py-10">
                    <div className="w-1/2">
                        <Image src={highlightImage} alt="highlight-image" width={600} height={100} className="object-contain " />
                    </div>
                    <div className="space-y-5 w-1/2">
                        <h2 className={`${poppins.className}  font-bold text-[40px]`}>Chittagong Hill Tracts : <br /> Indigenous people at risk</h2>
                        <p className="text-justify" style={{ fontFamily: '"Book Antiqua' }}>Empowering indigenous women and communities to rise against systemic oppression, reclaim their voices Empowering indigenous women and communities to rise against systemic oppression, reclaim their voicesEmpowering indigenous women and communities to rise against systemic oppression, reclaim their voices Empowering
                        </p>
                        <button className={`bg-[#36133B] cursor-pointer rounded-[33px] text-white px-10 py-3 ${poppins.className}`}>Read More</button>
                    </div>
                </div>
            </div>
            {/* Second Image - Keeping z-index and addressing the previous issue with a moderate bottom offset */}
            <Image
                id="bottom-vector-image"
                className="absolute w-full md:bottom-[-70px] lg:bottom-[-120px] xl:bottom-[-140px] 2xl:bottom-[-161px] z-10"
                src={vector}
                alt="vector-image"
                width={700}
                height={700}
            />
        </div>
    );
};

export default Highlights;