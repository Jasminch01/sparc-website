"use client";
import React, { useState } from "react";
import { jost, notoBengali } from "../utils/font";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";

const Form = () => {
  const { t, i18n } = useTranslation();
  const isBn = i18n.language === "bn" || i18n.language === "BN";

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error(
        t(
          "partnership_form.validation_error",
          "Please fill in all required fields.",
        ),
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionDate = new Date().toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      });

      // Send email using EmailJS with type indicator
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const emailResult = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, // Same template for both
        {
          submission_type: "partnership",
          submission_type_label: "Partnership Proposal",
          email_icon: "🤝",
          email_subtitle: "New partnership opportunity!",
          from_name: formData.name,
          from_email: formData.email,
          company: formData.company || "Not provided",
          message: formData.message,
          submission_date: submissionDate,
          to_email: process.env.NEXT_PUBLIC_RECIPIENT_EMAIL,
          // Conditional flags
          if_volunteer: false,
          if_partnership: true,
          if_company: formData.company ? true : false,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );

      // Save to Sanity
      const sanityResponse = await fetch("/api/submit-proposal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!sanityResponse.ok) {
        throw new Error("Failed to save to Sanity");
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const sanityResult = await sanityResponse.json();
      toast.success(
        t(
          "partnership_form.success_message",
          "Your message has been sent successfully!",
        ),
      );

      setFormData({
        name: "",
        company: "",
        email: "",
        message: "",
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error(
        t(
          "partnership_form.error_message",
          "An error occurred while submitting the form. Please try again later.",
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="partnership-form"
      className={`md:pt-20 xl:mb-40 mb-20 md:px-20 px-5 md:pb-32 ${isBn ? notoBengali.className : jost.className}`}
    >
      <Toaster />
      <p className="lg:text-4xl text-3xl font-bold text-center md:mb-20 mb-14">
        {t("partnership_form.title", "PARTNERSHIP PROPOSAL")}
      </p>

      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row xl:space-x-6">
          {/* Left side - Form fields */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2 uppercase"
              >
                {t("partnership_form.fields.name_label", "Your Name")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 border bg-[#F0F0F0] border-gray-300 rounded-lg outline-none focus:outline-none transition-all ${isBn ? notoBengali.className : ""}`}
              />
            </div>

            <div className="my-5">
              <label
                htmlFor="company"
                className="block text-sm font-semibold text-gray-700 uppercase"
              >
                {t("partnership_form.fields.company_label", "Company Name")}
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-[#F0F0F0] border border-gray-300 rounded-lg focus:outline-none transition-all ${isBn ? notoBengali.className : ""}`}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2 uppercase"
              >
                {t("partnership_form.fields.email_label", "Email")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-[#F0F0F0] focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Right side - Message textarea */}
          <div className="flex-1 flex flex-col mt-5 lg:mt-0">
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-gray-700 mb-2 uppercase"
            >
              {t("partnership_form.fields.message_label", "Leave a Message")}{" "}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className={`w-full flex-1 bg-[#F0F0F0] min-h-[260px] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all resize-none ${isBn ? notoBengali.className : ""}`}
            />
          </div>
        </div>

        <div className="flex justify-start">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`md:px-8 md:py-5 px-5 py-4 text-sm md:text-base bg-[#36133B] text-white font-semibold rounded-full hover:bg-[#52195b] transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer uppercase ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting
              ? t("partnership_form.submitting", "SUBMITTING...")
              : t("partnership_form.button", "SUBMIT PROPOSAL")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
