import Image from "next/image";
import logo from "../../public/Header/Sparce-logo.png";
import Buttons from "./Button/Buttons";
import Navbar from "./Nav/Navbar";
import { Poppins } from "next/font/google";
import Container from "../Container";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});
const Header = () => {
    return (
        <div className={`${poppins.className}`}>
            <Container>
                {/* Top Section */}
                <section className="flex items-center justify-between mt-[33px] gap-6">
                    <div className="shrink-0">
                        <Image
                            src={logo}
                            alt="sparc-logo"
                            width={149}
                            height={84}
                            className="w-[149px] h-[84px]"
                        />
                    </div>

                    <div className="">
                        <Navbar />
                    </div>

                    <div className="shrink-0">
                        <Buttons />
                    </div>
                </section>

                {/* Bottom Section */}
                <section className='flex flex-col lg:flex-row items-center lg:gap-50 mt-10'>
                    <div className='lg:max-w-xl text-center lg:text-left'>
                        <h2 className='font-extrabold text-2xl lg:text-[51px] '>THE CHT <span className='text-[#FF951B]'>INDIGENOUS</span> WOMANIFESTO</h2>
                    </div>
                    <div>
                        <p style={{ fontFamily: '"Book Antiqua",  serif' }} className='lg:ml-15 w-full lg:w-auto text-center lg:text-left'>Empowering indigenous women and communities to rise against systemic oppression, reclaim their voices.</p>
                    </div>
                </section>
            </Container>
        </div>
    );
};

export default Header;
