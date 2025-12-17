"use client"
import Link from 'next/link';
import { poppins, antiquaFont } from '@/components/utils/font';

const ThankyouPage = () => {
    return (
        <div className="min-h-screen bg-liner-to-br from-[#36133B] via-[#4a1a50] to-[#36133B] flex items-center justify-center px-4 py-12">
            <div className={`max-w-2xl w-full `}>
                {/* Success Card */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header Section with Icon */}
                    <div className="bg-linear-to-r from-[#FF951B] to-[#ff7b00] px-8 py-12 text-center relative overflow-hidden">
                        {/* Decorative circles */}
                        <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
                        <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-20 translate-y-20"></div>

                        {/* Success Checkmark Animation */}
                        <div className="relative inline-block mb-6">
                            <div className={`w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg`}>
                                <svg className={`w-12 h-12 text-[#FF951B]`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                        </div>

                        <h1 className={`${poppins.className} text-3xl md:text-4xl font-bold text-white mb-3`}>
                            Thank You!
                        </h1>
                        <p className={`${antiquaFont.className} text-lg text-white/90`}>
                            Your donation has been received
                        </p>
                    </div>

                    {/* Content Section */}
                    <div className="px-8 md:px-12 py-10 space-y-6">
                        <div className="text-center space-y-4">
                            <p className={`${poppins.className} text-gray-700 text-lg leading-relaxed`}>
                                We are incredibly grateful for your generous contribution. Your support helps us make a real difference in our community.
                            </p>
                        </div>

                        {/* Impact Message */}
                        <div className="bg-[#36133B]/5 rounded-xl p-6 text-center">
                            <p className={`${poppins.className} text-[#36133B] font-semibold text-lg mb-2`}>
                                Your Impact Matters
                            </p>
                            <p className={`${antiquaFont.className} text-gray-600 text-base`}>
                                Every contribution, no matter the size, creates lasting change and brings hope to those who need it most.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link href="/" className={`${poppins.className} flex-1 bg-[#FF951B] hover:bg-[#d57f1d] text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 text-center shadow-md hover:shadow-lg hover:-translate-y-0.5`}>
                                Return to Homepage
                            </Link>
                            <Link href="/who-we-are" className={`${poppins.className} flex-1 bg-white hover:bg-gray-50 text-[#36133B] font-semibold py-4 px-6 rounded-lg border-2 border-[#36133B] transition-all duration-300 text-center shadow-md hover:shadow-lg hover:-translate-y-0.5`} >
                                Learn More About Us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThankyouPage;