import iconOne from '../../public/Whoweare/icon.png'
import iconTwo from '../../public/Whoweare/icon 2.png'
import imageOne from '../../public/Whoweare/Image 1.png'
import imageTwo from '../../public/Whoweare/Image 2.png'
import imageThree from '../../public/Whoweare/Image 3.png'
import imageFour from '../../public/Whoweare/Image 4.png'
import Image from 'next/image'
import { poppins } from '../utils/font'

const images = [imageFour, imageOne]
const imagesTwo = [imageThree, imageTwo]

const Whoweare = () => {
    return (
        <div className='flex max-w-7xl mx-auto my-20 gap-20'>
            {/* Left Section */}
            <section className='space-y-10 w-1/2'>
                {/* First Div */}
                <div className='space-y-3'>
                    <h2 className={`${poppins.className} font-extrabold text-5xl`}>WHO WE ARE</h2>
                    <p  className='text-xl text-justify' style={{ fontFamily: '"Book Antiqua",  serif' }}>
                        SPaRC is an indigenous women-led feminist organisation established in Chittagong Hill Tracts (CHT), Bangladesh.
                        SPaRC works with a specific focus for indigenous women, girls and communities who are often ignored,
                        have no access to resources and are survivors of communal attack, conflict, Violence Against Women,
                        Gender Based Violence, and systematic oppression such as misinformation, intergenerational trauma and sufferings.
                    </p>

                </div>
                {/* Second Div */}

                <div>
                    <div className='flex items-center space-y-3'>
                        <Image src={iconOne} alt='icon-one' height={50} width={50} className='object-contain h-12' />
                        <h2  className={`${poppins.className} font-extrabold text-3xl`}>WHAT WE STAND FOR</h2>
                    </div>
                    <p  className='text-xl' style={{ fontFamily: '"Book Antiqua",  serif' }}>To ensure women and girls’ social, cultural, economic and political, sexual and spiritual rights  without prejudice of any identity such as age, sex, caste, religion, ethnicity or sexual orientation  etc.</p>
                </div>

                {/* Third Div */}
                <div>
                    <div className='flex items-center space-y-3'>
                        <Image src={iconTwo} alt='icon-two' height={50} width={50} className='object-contain h-12' />
                        <h2 className={`${poppins.className} font-extrabold text-3xl`} >WHERE WE ARE HEADED</h2>
                    </div>
                    <p className='text-xl' style={{ fontFamily: '"Book Antiqua",  serif' }}>To create a world where all living beings enjoy their rights with dignity.  </p>
                </div>
            </section>


            {/* Right Section */}
            <section className='flex gap-3 w-1/2'>
                <div className='flex flex-col gap-3'>
                    {images.map((img, index) =>
                        <div key={index} className='space-y-2'>
                            <Image src={img} alt='images' height={600} width={600} className='object-contain ' />
                        </div>
                    )}
                </div>

                <div className='flex flex-col gap-3'>
                    {imagesTwo.map((img, index) =>
                        <div key={index}>
                            <Image src={img} alt='images' height={600} width={600} className='object-contain ' />
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Whoweare;