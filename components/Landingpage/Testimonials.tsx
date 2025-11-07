'use client';
import Image from 'next/image';
import comma from '../../public/Testimonials/comma.png'
import { poppins } from '../utils/font';
import dynamic from 'next/dynamic';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const testimonials = [
    {
        icon: comma,
        des: 'Joining this movement lead community workshops empowering other women to stand up for their rights."',
        testimoniName: 'Sadia',
        designation: 'Founder @ Migelko'
    },
    {
        icon: comma,
        des: 'Joining this movement lead community workshops empowering other women to stand up for their rights."',
        testimoniName: 'Sadia',
        designation: 'Founder @ Migelko'
    },
    {
        icon: comma,
        des: 'Joining this movement lead community workshops empowering other women to stand up for their rights."',
        testimoniName: 'Sadia',
        designation: 'Founder @ Migelko'
    },
    {
        icon: comma,
        des: 'Joining this movement lead community workshops empowering other women to stand up for their rights."',
        testimoniName: 'Sadia',
        designation: 'Founder @ Migelko'
    },
    {
        icon: comma,
        des: 'Joining this movement lead community workshops empowering other women to stand up for their rights."',
        testimoniName: 'Sadia',
        designation: 'Founder @ Migelko'
    },
];

const Testimonials = () => {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
        ]
    };

    return (
        <div className='max-w-7xl mx-auto my-20'>
            <style jsx global>{`
                .slick-dots {
                    bottom: -40px;
                }
                
                .slick-dots li button:before {
                    font-size: 14px;
                    color: #9CA3AF;
                    opacity: 1;
                }
                
                .slick-dots li.slick-active button:before {
                    color: #F26522;
                    opacity: 1;
                    font-size: 16px;
                }
                
                .slick-dots li button:hover:before {
                    color: #F26522;
                    opacity: 0.7;
                }
            `}</style>

            <div className='text-center max-w-xl mx-auto space-y-5'>
                <h2 className={`${poppins.className} font-bold text-3xl`}>WHAT PEOPLE SAY</h2>
                <p className='text-[#454545]' style={{ fontFamily: 'Book Antiqua' }}>
                    Community development is often linked with community work or community planning, and may involve stakeholders, foundations.
                </p>
            </div>

            <div className='slider-container mt-10'>
                <Slider {...settings}>
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className='p-1'>
                            <div className='border border-[#F26522] p-10 flex flex-col items-center gap-5'>
                                <Image src={testimonial.icon} alt='icon' width={50} height={50} className='object-contain' />
                                <p style={{ fontFamily: 'Book Antiqua' }}>{testimonial.des}</p>
                                <div className={`${poppins.className} flex flex-col items-center`}>
                                    <h2 className='text-[#FF951B]'>{testimonial.testimoniName}</h2>
                                    <p className='text-[#4B4B4B] text-sm'>{testimonial.designation}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Testimonials;