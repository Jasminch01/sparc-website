import teamOne from '../../public/Team/team 1.png'
import teamTwo from '../../public/Team/team 2.png'
import teamThree from '../../public/Team/team 3.png'
import teamFour from '../../public/Team/team 4.png'
import leaf from '../../public/Team/Leaf.png'
import Image from 'next/image'
import { poppins } from '../utils/font'

const teamMembers = [
    {
        name: 'Arthur Morgan',
        designation: 'Social Worker, MD ',
        img: teamOne
    },
    {
        name: 'Arthur Morgan',
        designation: 'Social Worker, MD ',
        img: teamTwo
    },
    {
        name: 'Arthur Morgan',
        designation: 'Social Worker, MD ',
        img: teamThree
    },
    {
        name: 'Arthur Morgan',
        designation: 'Social Worker, MD ',
        img: teamFour
    },
]

const Team = () => {
    return (
        <div className='max-w-7xl mx-auto my-20'>
            {/* Top Section  */}
            <section className='flex items-center'>
                <div className='w-1/2 '>
                    <div className='w-[360px] space-y-3'>
                        <div className='flex gap-2'>
                            <h2 style={{ fontFamily: '"Rowan' }} className='text-6xl font-bold mt-5'>O1</h2>
                            <Image src={leaf} alt='team-leaf' width={25} height={25} className='object-contain' />
                        </div>
                        <hr className='text-gray-400 border' />
                        <p className={`${poppins.className} font-bold text-[42px]`}>MEET THE TEAM</p>
                    </div>
                </div>
                <div className='w-1/2'>
                    <p className='text-justify text-lg'  style={{ fontFamily: '"Book Antiqua' }}>Strong voices. Bold visions. Meet the women and allies driving equality and empowerment forward. Our strength lies in unity. The incredible women and allies in our team are at the heart of everything we do — leading initiatives, empowering communities, and standing firm for justice and equality.</p>
                </div>
            </section>

            {/* Bottom Section */}
            <section className='mt-15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'>
                {teamMembers.map((team, index) =>
                    <div key={index}>
                        <Image src={team.img} alt={team.name} width={400} height={400} className='object-contain' />
                        <div className='mt-3'>
                            <h2 className={`${poppins.className} font-bold text-xl`}>{team.name}</h2>
                            <p style={{ fontFamily: '"Book Antiqua' }}>{team.designation}</p>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Team;