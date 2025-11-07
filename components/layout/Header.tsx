import Image from 'next/image';
import logo from '../../public/Header/Sparce-logo.png'
import Buttons from './Button/Buttons';
import Navbar from './Nav/Navbar';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '700']

})
const Header = () => {
    return (
        <div className={`container mx-auto ${poppins.className}`}>
            {/* Top Section */}
            <section className="flex items-center justify-between mt-[33px] gap-6">
                <div className="shrink-0">
                    <Image
                        src={logo}
                        alt='sparc-logo'
                        width={149}
                        height={84}
                        className='w-[149px] h-[84px]'
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
            <section className='flex items-center gap-50 mt-10'>
                <div className='max-w-xl'>
                    <h2 className='font-extrabold text-[51px]'>THE CHT <span className='text-[#FF951B]'>INDIGENOUS</span> WOMANIFESTO</h2>
                </div>
                <div>
                    <p style={{ fontFamily: '"Book Antiqua",  serif' }} className='ml-15'>Empowering indigenous women and communities to rise against systemic oppression, reclaim their voices.</p>
                </div>
            </section>
        </div>
    );
};

export default Header;
