import Image from 'next/image'
import storyTwo from '../../public/Stories/story 2.png'
import storyThree from '../../public/Stories/story 3.png'
import storyFour from '../../public/Stories/story 4.png'
import { poppins } from '../utils/font'

const stories = [
    {
        img: storyTwo,
        date: '8 OCTOBER, 2025',
        title: 'Indigenous people at risk people at risk',
        des: 'Empowering indigenous women and communities to rise against systemic oppression, reclaim their voices Empowering indigenous women and communities .....'
    },
    {
        img: storyFour,
        date: '8 OCTOBER, 2025',
        title: 'Indigenous people at risk people at risk',
        des: 'Empowering indigenous women and communities to rise against systemic oppression, reclaim their voices Empowering indigenous women and communities .....'
    },
    {
        img: storyThree,
        date: '8 OCTOBER, 2025',
        title: 'Indigenous people at risk people at risk',
        des: 'Empowering indigenous women and communities to rise against systemic oppression, reclaim their voices Empowering indigenous women and communities .....'
    },
]

const Stories = () => {
    return (
        <div className="bg-[#36133B] py-15">
            <div className='max-w-7xl mx-auto'>
                <div className='text-center max-w-xl mx-auto text-white space-y-3'>
                    <h2 className={`${poppins.className} font-bold text-2xl`}>STORIES AND NEWS</h2>
                    <p className='text-md' style={{ fontFamily: '"Book Antiqua' }}>Community development is often linked with community work or community planning, and may involve stakeholders, foundations.</p>
                </div>
                {/* Story Cards */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-15 gap-5 '>
                    {stories.map((story, index) =>
                        <div key={index}>
                            <Image src={story.img} alt={story.title} height={400} width={600} className='object-contain' />
                            <div className='bg-white py-5 rounded-b-xl px-10 space-y-5'>
                                <p className={`text-[#767676] ${poppins.className} text-sm`}>{story.date}</p>
                                <h2 className={`${poppins.className} font-extrabold text-2xl`}>{story.title}</h2>
                                <p className='text-md text-justify leading-tight tracking-tight text-[#4D4D4D]' style={{ fontFamily: '"Book Antiqua' }}>{story.des}</p>
                                <button className={`text-[#FF7F00] border-b ${poppins.className} text-sm`}>Read More</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Stories;