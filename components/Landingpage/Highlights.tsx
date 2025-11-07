import Image from "next/image";
import highlightImage from '../../public/Highlight/highlight.png'
import { poppins } from "../utils/font";

const Highlights = () => {
    return (
        <div className="mt-30 max-w-7xl mx-auto">
            <h2 className={`${poppins.className} text-center font-bold text-[45px]`}>HIGHLIGHTS</h2>
            <div className="flex gap-10 py-10">
                <Image src={highlightImage} alt="highlight-image" width={600} height={100} className="object-contain " />
                <div className="space-y-5">
                    <h2 className={`${poppins.className}  font-bold text-[40px]`}>Chittagong Hill Tracts : <br /> Indigenous people at risk</h2>
                    <p className="text-justify" style={{fontFamily:'"Book Antiqua'}}>Empowering indigenous women and communities to rise against systemic oppression, reclaim their voices Empowering indigenous women and communities to rise against systemic oppression, reclaim their voicesEmpowering indigenous women and communities to rise against systemic oppression, reclaim their voices Empowering
                    </p>
                    <button  className={`bg-[#36133B] cursor-pointer rounded-[33px] text-white px-10 py-3 ${poppins.className}`}>Read More</button>
                </div>
            </div>
        </div>
    );
};

export default Highlights;