"use client";
import Image from "next/image";
import logo from "../../public/Header/Sparce-logo.png";
import Buttons from "./Button/Buttons";
import Navbar from "./Nav/Navbar";
import { IoClose, IoMenu } from "react-icons/io5";
import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { poppins } from "../utils/font";
import Container from "../Container";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  // Close menu when route changes
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMenuOpen(false);
      prevPathnameRef.current = pathname;
    }
  }, [pathname]);

  // Handle body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  // Handle header shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-white transition-shadow duration-300 ${scrolled ? "shadow-md" : ""
        }`}
    >
      <Container>
        <div className={`${poppins.className}`}>
          <section className="flex items-center justify-between h-16 sm:h-20 lg:h-24 gap-4">
            {/* Logo - Responsive sizing */}
            <div
              className="shrink-0 cursor-pointer"
              onClick={() => {
                router.push("/");
                setMenuOpen(false);
              }}
            >
              <Image
                src={logo}
                alt="sparc-logo"
                width={149}
                height={84}
                className="w-20 h-11 lg:w-32 lg:h-18 xl:w-[140px] xl:h-20"
                priority
              />
            </div>

            {/* Desktop Navigation */}
            <nav
              className="hidden xl:flex flex-1 justify-center"
              aria-label="Main navigation"
            >
              <Navbar />
            </nav>

            {/* Desktop Buttons */}
            <div className="shrink-0 hidden xl:block">
              <Buttons />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="flex xl:hidden items-center justify-center w-10 h-10 sm:w-12 sm:h-12 cursor-pointer hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-all duration-200"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
            >
              <IoMenu className="text-2xl sm:text-3xl text-gray-700" />
            </button>

            {/* Mobile Menu Overlay */}
            <div
              onClick={() => setMenuOpen(false)}
              className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300 xl:hidden ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              aria-hidden={!menuOpen}
              role="button"
              tabIndex={-1}
            />

            {/* Mobile Menu Drawer */}
            <aside
              className={`fixed xl:hidden top-0 left-0 h-full w-80 sm:w-96 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out ${menuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
              aria-label="Mobile navigation"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 sm:px-6 h-16 sm:h-20 border-b border-gray-200 bg-linear-to-r from-gray-50 to-white">
                <Image
                  src={logo}
                  alt="sparc-logo"
                  width={149}
                  height={84}
                  className="w-20 h-11 sm:w-24 sm:h-14 cursor-pointer"
                  onClick={() => {
                    router.push("/");
                    setMenuOpen(false);
                  }}
                />
                <button
                  className="flex items-center justify-center w-10 h-10 cursor-pointer hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-all duration-200"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close navigation menu"
                >
                  <IoClose className="text-2xl sm:text-3xl text-gray-700" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex flex-col h-[calc(100%-4rem)] sm:h-[calc(100%-5rem)]">
                <nav
                  className="flex-1 overflow-y-auto px-5 sm:px-6 py-6 space-y-2 overscroll-contain"
                  aria-label="Mobile navigation menu"
                >
                  <Navbar />
                </nav>

                {/* Mobile Buttons - at bottom of drawer */}
                <div className="px-5 sm:px-6 py-5 border-t border-gray-200 bg-gray-50">
                  <Buttons />
                </div>
              </div>
            </aside>
          </section>
        </div>
      </Container>
    </header>
  );
};

export default Header;