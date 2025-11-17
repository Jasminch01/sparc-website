import Image from "next/image";
import { antiquaFont, poppins, rowanFont } from "../utils/font";

const Partnership = () => {
  return (
    <div className={`w-full md:py-20 px-5 xl:px-0 ${poppins.className}`}>
      <div className="xl:ml-32">
        <h1 className="font-bold text-3xl lg:text-4xl mb-16 text-center lg:text-left">
          HOW TO BECOME A PARTNER
        </h1>

        <div className="space-y-10 lg:space-y-0">
          {/* Step 1 */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start xl:space-x-24">
            <div className="lg:flex hidden lg:flex-col items-center lg:items-center">
              <span
                className={`text-6xl font-black text-orange-400 ${rowanFont.className}`}
              >
                1
              </span>
              <div
                className="hidden lg:block w-0.5 h-32 xl:h-60"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, #9ca3af 0px, #9ca3af 10px, transparent 10px, transparent 20px)",
                }}
              ></div>
            </div>

            <div className="shrink-0">
              <div className="size-32 xl:size-44 relative">
                <Image
                  src="/how-to-partner/step1.png"
                  fill
                  alt="Submit Partnership Proposal"
                  className="object-contain"
                />
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left lg:pt-8 mt-10 lg:mt-0">
              <h2 className="font-bold text-2xl xl:text-3xl lg:mb-3">
                Submit a Partnership Proposal
              </h2>
              <p className={`text-gray-600 text-lg xl:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 ${antiquaFont.className}`}>
                Share your organization&apos;s goals and areas of interest. We
                welcome proposals supporting advocacy, education, gender
                equality, and cultural sustainability.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start xl:space-x-24">
            <div className="lg:flex hidden lg:flex-col items-center lg:items-center">
              <span
                className={`text-5xl font-bold text-orange-400 ${rowanFont.className}`}
              >
                2
              </span>
              <div
                className="hidden lg:block w-0.5 h-32 xl:h-60"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, #9ca3af 0px, #9ca3af 10px, transparent 10px, transparent 20px)",
                }}
              ></div>
            </div>

            <div className="shrink-0">
              <div className="size-32 xl:size-44 relative">
                <Image
                  src="/how-to-partner/step2.png"
                  fill
                  alt="Consultation and Review"
                  className="object-contain"
                />
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left lg:pt-8 mt-10 lg:mt-0">
              <h2 className="font-bold text-2xl lg:text-3xl lg:mb-3">
                Consultation & Review
              </h2>
              <p className={` text-lg xl:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 ${antiquaFont.className}`}>
                Our team carefully reviews each proposal in discussion with
                Indigenous community representatives to ensure cultural
                relevance and mutual benefit.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start xl:space-x-24">
            <div className="lg:flex hidden lg:flex-col items-center lg:items-center gap-4 lg:gap-0">
              <span
                className={`text-5xl font-bold text-orange-400 ${rowanFont.className}`}
              >
                3
              </span>
            </div>

            <div className="shrink-0">
              <div className="size-32 xl:size-44 relative">
                <Image
                  src="/how-to-partner/step3.png"
                  fill
                  alt="Agreement and Implementation"
                  className="object-contain"
                />
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left lg:pt-8 lg:mt-0 mt-10">
              <h2 className="font-bold text-2xl xl:text-3xl lg:mb-3">
                Agreement & Implementation
              </h2>
              <p className={` text-lg xl:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 ${antiquaFont.className}`}>
                Once approved, we sign a formal agreement and begin
                collaborative action — from research and workshops to community
                programs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partnership;
