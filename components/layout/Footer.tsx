import Image from 'next/image';
import logo from "../../public/Overview/logocopy.png";
import vector from '../../public/Whatwedo/Vector.png';
import Link from 'next/link';
import { poppins } from '../utils/font';

const navs = ['Who we are', 'Stories', 'Partners', 'Work with us', 'Resources', 'Blog'];
const bottomBar = ['Tearms & Conditions', 'Privacy Policy', 'Accessibility', 'Legal']
const Footer = () => {
    return (
        <div className='bg-[#3E1A43] text-white'>
            <div className='max-w-7xl mx-auto py-10 flex flex-col gap-10'>
                <Image src={logo} alt='logo' height={80} width={180} className='object-contain' />
                <div className='flex justify-between items-start  gap-6'>
                    <div className='grid grid-cols-3 gap-5'>
                        {navs.map((btn, index) => (
                            <Link style={{ fontFamily: '"Nunito" ,serif' }} key={index} href={`/${btn.toLowerCase().replace(/\s+/g, '-')}`} className='text-xl' >
                                {btn}
                            </Link>
                        ))}
                    </div>

                    <div>
                        <h2 className={`font-semibold mb-2 text-lg ${poppins.className}`}>Get the freshest news from us</h2>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className='flex   rounded overflow-hidden'>
                                <input type="email" placeholder='Your email address' className={`px-3 py-2 w-64 outline-none bg-white text-gray-900 ${poppins.className}`} />
                                <button type='submit' className={`bg-[#FF951B] border border-[#FF951B] text-white px-4 py-2 hover:bg-gray-800 transition ${poppins.className}`}>
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>


                </div>
                {/* Bottom Section */}
                <div className='flex justify-between items-center gap-2 mt-8'>
                    <div className='flex gap-5'>
                        {bottomBar.map((bottom, index) =>
                            <div style={{fontFamily:'"Book Antiqua'}} key={index} className='border-r-2 pr-4'>
                                {bottom}
                            </div>
                        )}
                    </div>
                    <Image src={vector} alt='vector' width={20} height={20} />
                    <p style={{fontFamily:'"Book Antiqua'}} className='text-sm'>Sparce 2025. All rights reserved.</p>
                </div>
                <hr />
            </div>
        </div>
    );
};

export default Footer;
