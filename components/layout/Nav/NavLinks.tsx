import { poppins } from "@/components/utils/font";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const navs = [
  { title: "WHO WE ARE", path: "/who-we-are" },
  { title: "OPPORTUNITY", icon: IoIosArrowDown },
  { title: "STORIES", icon: IoIosArrowDown },
  { title: "RESOURCES", icon: IoIosArrowDown },
  { title: "PARTNERS", icon: IoIosArrowDown },
  { title: "LEARN FROM US", path: "/learn" },
  { title: "BLOG", path: "/blogs" },
];

const opportunities = [
  { title: "Volunteer", path: "/volunteer" },
  { title: "Be a Intern", path: "/be-a-intern" },
  { title: "Fellowship", path: "/fellowship" },
];

const resources = [
  { title: "Reports and Publications", path: "/reports-publications" },
  { title: "Rebuild Communities", path: "/rebuild-communities" },
  { title: "Indigenous Archive", path: "/archive" },
  { title: "Our Research", path: "/our-research" },
];

const stories = [{ title: "Indespeak", path: "/indespeak" }];
const partner = [
  { title: "How to partner", path: "/how-to-partner" },
  { title: "Partners", path: "/partners" },
];

const dropdownContent: Record<string, typeof opportunities> = {
  OPPORTUNITY: opportunities,
  RESOURCES: resources,
  STORIES: stories,
  PARTNERS: partner,
};

const NavLinks = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = (index: number) => {
    if (window.innerWidth >= 1280) {
      setActiveIndex(index);
    }
  };

  const handleClick = (index: number) => {
    if (window.innerWidth < 1280) {
      setActiveIndex(activeIndex === index ? null : index);
    }
  };

  return (
    <div ref={dropdownRef} className={`relative  ${poppins.className}`} onMouseLeave={()=>setActiveIndex(null)}>
      <div className="flex flex-col xl:flex-row xl:items-center gap-1 xl:gap-6 py-5">
        {navs.map((nav, i) => {
          const isActive = activeIndex === i;
          const Icon = nav.icon;
          const hasDropdown = !!Icon;
          const dropdownItems = hasDropdown ? dropdownContent[nav.title] : [];

          return (
            <div key={i}
              className="relative w-full xl:w-auto"
              onMouseEnter={() => handleMouseEnter(i)}>
              {hasDropdown ? (
                <button
                  onClick={() => handleClick(i)}
                  className={`flex items-center justify-between w-full xl:w-auto px-3 xl:px-0 py-3 xl:py-2 text-sm font-medium transition-all duration-200 ${isActive
                    ? "text-[#FF951B] bg-orange-50 xl:bg-transparent"
                    : "text-gray-700 hover:text-[#FF951B] hover:bg-gray-50 xl:hover:bg-transparent"
                    }`}>
                  <span className="tracking-wide">{nav.title}</span>
                  <span className={`transition-transform duration-300 ease-out ${isActive ? "rotate-180" : "rotate-0"}`}>
                    <Icon className="text-lg" />
                  </span>
                </button>
              ) : (
                <Link
                  href={nav.path || "#"}
                  className="flex items-center w-full xl:w-auto px-3 xl:px-0 py-3 xl:py-2 text-xs font-medium text-gray-700 hover:text-[#FF951B] hover:bg-gray-50 xl:hover:bg-transparent transition-all duration-200 tracking-wide" >
                  {nav.title}
                </Link>
              )}

              {/* Dropdown */}
              {isActive && hasDropdown && (
                <div
                  className={`xl:absolute left-0 xl:mt-5 w-full xl:w-56 bg-white xl:border xl:border-gray-100 overflow-hidden transition-all duration-300 ease-out ${isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
                  onMouseLeave={() => setActiveIndex(null)} >
                  <div>
                    {dropdownItems.map((item, idx) => (
                      <Link
                        onClick={() => setActiveIndex(null)}
                        href={item.path}
                        key={idx}
                        className="block  px-4 xl:px-5 py-2.5 xl:py-3 text-sm text-gray-700 hover:bg-[#36133B] hover:text-white transition-colors duration-200 border-l-3 border-transparent hover:border-l-[#FF951B] ml-4 xl:ml-0 xl:border-l-0">
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NavLinks;
