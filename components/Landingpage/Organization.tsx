import Image from 'next/image'
import logoOne from '../../public/Organization/logo 1.png'
import logoTwo from '../../public/Organization/logo 2.png'
import logoThree from '../../public/Organization/logo 3.png'
import logoFour from '../../public/Organization/logo 4.png'
import logoFive from '../../public/Organization/logo 5.png'

const Logos = [logoOne, logoThree, logoTwo, logoFour, logoFive]
const Organization = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5  my-10'>
                {Logos.map((logo, index) =>
                    <div key={index}>
                        <Image src={logo} alt='organization-logo' className='object-contain h-32' width={600} height={600} />
                    </div>
                )}

            </div>
            <hr className='text-gray-300' />
        </div>
    );
};

export default Organization;