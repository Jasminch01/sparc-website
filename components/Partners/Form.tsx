"use client";
import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Handle form submission here
    alert("Message sent successfully!");
  };

  return (
    <div className="pt-20 mb-40 px-20">
      <p className="text-4xl font-bold text-center mb-20">
        PARTNERSHIP PROPOSAL{" "}
      </p>
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row space-x-6">
          {/* Left side - Form fields */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border bg-[#F0F0F0] border-gray-300 rounded-lg outline-none focus:outline-none transition-all"
              />
            </div>

            <div className="my-5">
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-700"
              >
                Company Name *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#F0F0F0] border border-gray-300 rounded-lg   focus:outline-none transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-[#F0F0F0] focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Right side - Message textarea */}
          <div className="flex-1 flex flex-col">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Leave a Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full flex-1 bg-[#F0F0F0] min-h-[200px] px-4 py-3 border border-gray-300 rounded-lg  focus:outline-none transition-all resize-none"
              placeholder="Enter your message here..."
            />
          </div>
        </div>
        <div className="flex justify-center lg:justify-start">
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-[#36133B] text-white font-semibold rounded-lg hover:bg-[#52195b] transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
