import { poppins } from "../utils/font";
import wwdOne from '../../public/Whatwedo/wwd 1.png'
import wwdTwo from '../../public/Whatwedo/wwd 2.png'
import wwdThree from '../../public/Whatwedo/wwd 3.png'
// import vectorImage from '../../public/Whatwedo/Vector.png'
import Image from "next/image";

const whatwedoes = [
    {
        img: wwdOne,
        title: 'Dismantle Patriarchy'
    },
    {
        img: wwdTwo,
        title: 'Busting Myth & Misinformation'
    },
    {
        img: wwdThree,
        title: 'Capacity Building : Indigenous & Feminist Perspective'
    },
]
const Whatwedo = () => {
    return (
        <div className="bg-[#36133B] py-15  relative ">
            <div className="max-w-7xl mx-auto flex flex-col gap-10 mb-10">
                <div className="text-center text-white">
                    <h2 className={`${poppins.className} text-4xl`}>WHAT WE DO</h2>
                    <p style={{ fontFamily: '"Book Antiqua' }} className="text-lg">To create a world where all living beings enjoy their rights with dignity.</p>
                </div>
                {/* Image section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {whatwedoes.map((wwd, index) =>
                        <div key={index} className="flex items-center flex-col bg-[#772E82] text-center py-10 gap-5 rounded-2xl">
                            <div className="grow flex items-center justify-center">
                                <Image
                                    src={wwd.img}
                                    alt={wwd.title}
                                    width={80}
                                    height={80}
                                    className="object-contain"
                                />
                            </div>
                            <h1 className={`text-white ${poppins.className} `}>{wwd.title}</h1>
                        </div>
                    )}
                </div>
            </div>

            {/* Vector Image */}
            {/* <Image className="absolute w-full hidden lg:block " src={vectorImage} alt="vector-image" width={1000} height={600} /> */}
        </div>
    );
};

export default Whatwedo;