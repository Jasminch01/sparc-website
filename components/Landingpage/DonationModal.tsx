"use client";

import { useState } from "react";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { antiquaFont, poppins } from "../utils/font";
import Image from "next/image";
import Link from "next/link";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DonationModal = ({ isOpen, onClose }: DonationModalProps) => {
  const [amount, setAmount] = useState<string>("");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [honoreeName, setHonoreeName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  console.log(honoreeName);

  const predefinedAmounts: number[] = [10, 25, 50, 100, 250, 500];

  const handleAmountSelect = (value: number): void => {
    setAmount(value.toString());
    setCustomAmount("");
  };

  const handleCustomAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setCustomAmount(value);
      setAmount(value);
    }
  };

  const handleSubmit = (): void => {
    // Handle donation submission here
    console.log({
      amount: amount || customAmount,
      honoreeName,
      email,
    });

    // Reset and close
    setAmount("");
    setCustomAmount("");
    setHonoreeName("");
    setEmail("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="flex justify-center items-center space-x-5">
        {/* Modal */}
        <div
          className={` relative bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto pb-10`}
        >
          <div>
            <Image
              src={"/Stories/modal1.png"}
              width={500}
              height={500}
              alt="modal-image"
              className="w-full object-cover"
            />
          </div>
          <div className="px-10 mt-5 space-y-5">
            <div className="flex justify-center ">
              <Image
                src={"/Header/Sparce-logo.png"}
                alt="sparc-logo"
                width={149}
                height={84}
                className="w-20 h-11 lg:w-32 lg:h-18 xl:w-[90px] xl:h-14"
                priority
              />
            </div>
            <p className={`font-semibold text-xl ${poppins.className}`}>
              Every woman deserves safety, dignity, and opportunity
            </p>
            <p className={`text-lg leading-relaxed ${antiquaFont.className}`}>
              Your support can transform lives. SPaRC is an indigenous women-led
              organization working to ensure that women, girls, and marginalized
              communities in the Chittagong Hill Tracts (CHT) can grow, thrive,
              and live free from violence and discrimination. By donating today,
              you’re helping provide essential resources, community education,
              crisis support, and leadership opportunities for women and girls
              who need it most. Together, we can build stronger, safer, and more
              empowered communities across the CHT. Donations can be made using
              mobile banking, debit, or credit card. Your generosity creates
              real change.
            </p>
          <div className={`space-x-5 ${antiquaFont.className} mt-10`}>
            <Link href={"/volunteer"} className="border-b">Volunteer</Link>
            <Link href={"/learn"} className="border-b">Learn with us</Link>
            <Link href={"/be-a-intern"} className="border-b">Be an intern</Link>
          </div>
          </div>
        </div>
        <div
          className={`relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto ${poppins.className} p-10`}
        >
          <div className="flex items-center justify-center space-x-3 mb-10">
            <HiOutlineShieldCheck size={30} color="#007A39" />
            <p className="text-2xl font-semibold">Secure donation</p>
          </div>

          <div className="space-y-6">
            <p className="text-center">
              Choose the amount you would like to contribute
            </p>
            <div>
              <div className="grid grid-cols-3 gap-3 mt-7">
                {predefinedAmounts.map((value: number) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleAmountSelect(value)}
                    className={`py-3 px-4 cursor-pointer rounded-lg border  border-gray-300 text-base transition-all duration-200 ${
                      amount === value.toString() && !customAmount
                        ? "bg-[#FF951B] text-white border-transparent"
                        : " text-gray-700 "
                    }`}
                  >
                    ৳ {value}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
                  ৳
                </span>
                <input
                  id="customAmount"
                  type="text"
                  value={customAmount || amount}
                  onChange={handleCustomAmountChange}
                  placeholder="Enter amount"
                  className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#FF951B] transition-colors duration-200 text-xl"
                />
              </div>
            </div>

            {/* Donor Information */}
            <div className="space-y-4">
              <div className="relative border-2 border-gray-200 rounded-lg transition-colors duration-200 focus-within:border-[#FF951B] pt-3">
                <label
                  htmlFor="designation"
                  className="block text-sm pl-4 text-[#737373] mb-1"
                >
                  Designation
                </label>
                <div className="relative">
                  <select
                    id="designation"
                    // value={designation}
                    // onChange={(e) => setDesignation(e.target.value)}
                    className="w-full px-4 pb-3 bg-transparent focus:outline-none appearance-none cursor-pointer text-gray-900 border-none"
                  >
                    <option value="wherever-needed" className="border-none">
                      Wherever most needed
                    </option>
                    <option value="education" className="border-none">
                      Education Programs
                    </option>
                    <option value="healthcare" className="border-none">
                      Healthcare Initiatives
                    </option>
                    <option value="emergency-relief" className="border-none">
                      Emergency Relief
                    </option>
                    <option value="food-security" className="border-none">
                      Food Security
                    </option>
                    <option value="clean-water" className="border-none">
                      Clean Water Projects
                    </option>
                    <option
                      value="community-development"
                      className="border-none"
                    >
                      Community Development
                    </option>
                    <option value="women-empowerment" className="border-none">
                      Women Empowerment
                    </option>
                  </select>
                  <div className="absolute right-5 top-3 -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="relative border-2 border-gray-200 rounded-lg transition-colors duration-200 focus-within:border-[#FF951B] px-4 py-3">
                <label
                  htmlFor="honoree-name"
                  className="block text-sm text-[#737373] mb-1"
                >
                  Honoree name
                </label>
                <div className="relative">
                  <input
                    value={honoreeName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setHonoreeName(e.target.value)
                    }
                    id="honoree-name"
                    type="text"
                    className="w-full bg-transparent focus:outline-none text-gray-900"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-4 bg-[#FF951B] text-white font-bold rounded-lg hover:bg-[#E88617] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Donate
            </button>
          </div>
        </div>
        {/* Modal */}
      </div>
    </div>
  );
};

export default DonationModal;
