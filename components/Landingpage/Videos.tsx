// import Image from "next/image";
// import vectorImage from '../../public/Whatwedo/Vector.png'
import { poppins } from "../utils/font";

const Videos = () => {
    return (
        <div className="bg-[#36133B] py-10 lg:py-20 lg:mt-10 relative ">
            <div className="text-center text-white lg:mt-10">
                <h2 className={`font-extrabold mb-4 text-4xl ${poppins.className}`}>VIDEOS</h2>
                <p style={{fontFamily:'"Book Antiqua'}} className="text-xl mb-8 max-w-2xl mx-auto ">
                    Strong voices. Bold visions. Meet the women and allies driving equality and empowerment forward.
                    Our strength lies in unity.
                </p>

                {/* Embedded YouTube video */}
                <div className="flex justify-center">
                    <iframe
                        width="700"
                        height="315"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-md shadow-lg"
                    ></iframe>
                </div>

                {/* Vector Image */}
                {/* <Image className="absolute top-[-60px] w-full hidden lg:block" src={vectorImage} alt="vector-image" width={1000} height={600} /> */}
            </div>
        </div>
    );
};

export default Videos;
