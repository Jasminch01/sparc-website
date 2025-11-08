"use client"
import Image from "next/image";
import logo from "../../public/Header/Sparce-logo.png";
import Buttons from "./Button/Buttons";
import Navbar from "./Nav/Navbar";
import { Poppins } from "next/font/google";
import Container from "../Container";
import { IoClose, IoMenu } from "react-icons/io5";
import { useState } from "react";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});
const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    return (
        <div className={`${poppins.className}`}>
            <Container>
                {/* Top Section */}
                <section className="flex items-center justify-between mt-[33px] gap-6">
                    <div className="shrink-0 hidden lg:block">

                        {/*This is for desktop  */}
                        <Image
                            src={logo}
                            alt="sparc-logo"
                            width={149}
                            height={84}
                            className="lg:w-[149px] lg:h-[84px] w-24 h-15"
                        />
                    </div>

                    {/* This is for mobile */}
                    <div className=" lg:hidden  ">

                        {/*This is for desktop  */}
                        <Image
                            src={logo}
                            alt="sparc-logo"
                            width={149}
                            height={84}
                            className="w-20 h-12"
                        />
                    </div>
                    {/* For mobile  */}
                    <IoMenu className="text-3xl block lg:hidden cursor-pointer" onClick={() => setMenuOpen(true)} />
                    {/* Mobile menu overlay */}
                    <div onClick={() => setMenuOpen(false)} className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} `}>

                    </div>
                    {/* Mobile Menu Drawer */}
                    <div className={`fixed lg:hidden top-0 left-0 h-full w-64 bg-white z-50 shadow-2xl transform transition-transform duration-500 ease-in-out ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                        <div className="flex items-center justify-between p-4 border-b border-gray-300">
                            <Image
                                src={logo}
                                alt="sparc-logo"
                                width={149}
                                height={84}
                                className="w-20 h-12"
                            />
                            <IoClose
                                size={26}
                                className="cursor-pointer text-gray-600"
                                onClick={() => setMenuOpen(false)}
                            />
                        </div>
                        <div className="p-4 space-y-4">
                            <Navbar />
                        </div>
                    </div>

                    <div className="hidden lg:block">
                        <Navbar />
                    </div>
                    <div className="shrink-0 hidden lg:block">
                        <Buttons />
                    </div>
                </section>
            </Container>
        </div>
    );
};

export default Header;
