"use client";
// Added notoBengali to the imports
import { useTranslation, Trans } from "react-i18next";
import { antiquaFont, jost, notoBengali } from "@/components/utils/font";
import hero from "../../public/Volunteer/banner.png";
import countryimage from "../../public/Volunteer/country-image.png";
import Image from "next/image";
import Container from "@/components/Container";
import icon from "../../public/Volunteer/icon.png";
import whatyouwillgainimage from "../../public/Volunteer/gain-image.png";
import emailjs from "@emailjs/browser";
import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
}

const Page = () => {
  const { t, i18n } = useTranslation();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.message
    ) {
      toast.error(
        t(
          "volunteer_page.form.validation_error",
          "Please fill in all required fields",
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

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const emailResult = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          submission_type: "volunteer",
          submission_type_label: "Volunteer Application",
          email_icon: "🤝",
          email_subtitle: "Someone wants to join your team!",
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          address: formData.address,
          message: formData.message,
          submission_date: submissionDate,
          to_email: process.env.NEXT_PUBLIC_RECIPIENT_EMAIL,
          if_volunteer: true,
          if_partnership: false,
          if_company: false,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );

      // Save to Sanity
      const sanityResponse = await fetch("/api/submit-volunteer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!sanityResponse.ok) {
        throw new Error("Failed to save to Sanity");
      }

      const sanityResult = await sanityResponse.json();
      console.log("Data saved to Sanity:", sanityResult);
      toast.success(
        t(
          "volunteer_page.form.success_message",
          "Application submitted successfully!",
        ),
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        t(
          "volunteer_page.form.error_message",
          "Failed to submit application. Please try again.",
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  // Detect if the active language is Bengali
  const isBn = i18n.language === "BN" || i18n.language === "bn";

  // --- Fetch Translations ---
  const heroTitleKey = "volunteer_page.hero_section.title";
  const heroDescription = t("volunteer_page.hero_section.description");

  const formHeading = t("volunteer_page.form.heading");
  const namePlaceholder = t("volunteer_page.form.name_placeholder");
  const emailPlaceholder = t("volunteer_page.form.email_placeholder");
  const phonePlaceholder = t("volunteer_page.form.phone_placeholder");
  const addressPlaceholder = t("volunteer_page.form.address_placeholder");
  const messagePlaceholder = t("volunteer_page.form.message_placeholder");
  const submitButtonText = t("volunteer_page.form.submit_button");

  const whyTitle = t("volunteer_page.why_volunteer_section.title");
  const whyDescription = t("volunteer_page.why_volunteer_section.description");
  const whySubtitle = t("volunteer_page.why_volunteer_section.subtitle");
  const whyList = t("volunteer_page.why_volunteer_section.list", {
    returnObjects: true,
  }) as string[];

  const gainTitle = t("volunteer_page.gain_section.title");
  const gainDescription = t("volunteer_page.gain_section.description");
  const gainSubtitle = t("volunteer_page.gain_section.subtitle");
  const gainList = t("volunteer_page.gain_section.list", {
    returnObjects: true,
  }) as string[];

  const ctaButtonText = t("volunteer_page.final_call_to_action");

  const opinions = whyList.map((title) => ({ title, icon }));
  const gain = gainList.map((title) => ({ title, icon }));

  return (
    <div
      className={`relative mt-8 lg:mt-15 ${isBn ? notoBengali.className : ""}`}
    >
      <Toaster />
      <Container>
        <div>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">
            <div className="w-full lg:w-1/2 lg:pr-8 px-5 lg:px-0">
              <h2
                className={`uppercase font-black text-3xl sm:text-4xl lg:text-[48px] mb-4 sm:mb-6 max-w-xl ${isBn ? notoBengali.className : jost.className}`}
              >
                <Trans
                  i18nKey={heroTitleKey}
                  defaults="Apply today to become a <1>volunteer</1>"
                  components={{
                    1: <span className="text-orange-400" />,
                  }}
                />
              </h2>
              <p
                className={`text-[#4E4E4E] ${isBn ? notoBengali.className : antiquaFont.className} text-lg leading-relaxed lg:text-xl`}
              >
                {heroDescription}
              </p>
            </div>

            <div className=" lg:hidden w-full">
              <Image
                src={hero}
                alt="hero-img"
                height={800}
                width={1000}
                className="w-full h-[300px] md:h-[500px] lg:h-[600px] xl:h-[700px] object-cover"
              />
            </div>

            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
              <form
                id="form"
                onSubmit={handleSubmit}
                className="relative lg:absolute z-30 bg-white rounded-xl px-6 lg:px-12 py-8 lg:py-10 border border-gray-200 w-full sm:max-w-md lg:w-[500px] shadow-lg"
              >
                <h2
                  className={`text-center mb-6 lg:mb-8 text-lg lg:text-xl font-bold text-gray-800 uppercase tracking-wide ${isBn ? notoBengali.className : jost.className}`}
                >
                  {formHeading}
                </h2>
                <div
                  className={`space-y-4 ${isBn ? notoBengali.className : ""}`}
                >
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={namePlaceholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-sm"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={emailPlaceholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-sm"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={phonePlaceholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-sm"
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder={addressPlaceholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-sm"
                    required
                  />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={messagePlaceholder}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white resize-none text-sm"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-[#FF951B] cursor-pointer hover:bg-orange-400 text-white font-semibold py-3 px-6 rounded-full uppercase tracking-wide text-sm transition duration-200 disabled:opacity-50 ${isBn ? notoBengali.className : ""}`}
                  >
                    {isSubmitting ? "Sending..." : submitButtonText}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>

      <div className="relative w-full">
        <Image
          src={hero}
          alt="hero-img"
          height={800}
          width={1000}
          className="w-full hidden lg:flex h-[300px] md:h-[500px] lg:h-[600px] xl:h-[700px] object-cover"
        />
      </div>

      <Container>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 py-12 lg:py-20">
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <Image
              src={countryimage}
              alt="country-image"
              width={500}
              height={400}
              className="w-full max-w-md lg:max-w-none h-auto object-contain"
            />
          </div>
          <div className="w-full lg:w-1/2 space-y-4 sm:space-y-5 lg:mt-20">
            <h2
              className={`${isBn ? notoBengali.className : jost.className} text-2xl lg:text-4xl font-extrabold`}
            >
              {whyTitle}
            </h2>
            <p
              className={`${isBn ? notoBengali.className : antiquaFont.className} text-[#6d6b6b] leading-relaxed text-lg xl:text-xl`}
            >
              {whyDescription}
            </p>
            <div className="space-y-4 lg:space-y-5 pt-4">
              <h2
                className={`font-semibold ${isBn ? notoBengali.className : jost.className} text-xl lg:text-2xl`}
              >
                {whySubtitle}
              </h2>
              <ul className="space-y-3 sm:space-y-5">
                {opinions.map((op, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Image
                      src={op.icon}
                      alt={op.title}
                      height={20}
                      width={20}
                      className="mt-1 shrink-0"
                    />
                    <p
                      className={`${isBn ? notoBengali.className : antiquaFont.className} text-[#6d6b6b] text-lg lg:text-xl`}
                    >
                      {op.title}
                    </p>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>

      <Container>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-12 sm:mb-16 lg:mb-20">
          <div className="w-full lg:w-1/2 space-y-4 sm:space-y-5 order-2 lg:order-1">
            <h2
              className={`${isBn ? notoBengali.className : jost.className} text-2xl lg:text-4xl font-black`}
            >
              {gainTitle}
            </h2>
            <p
              className={`${isBn ? notoBengali.className : antiquaFont.className} text-[#6d6b6b] text-lg lg:text-xl leading-relaxed`}
            >
              {gainDescription}
            </p>
            <div className="space-y-4 sm:space-y-5 pt-4">
              <h2
                className={`font-semibold ${isBn ? notoBengali.className : jost.className} text-xl lg:text-2xl`}
              >
                {gainSubtitle}
              </h2>
              <ul className="space-y-3 sm:space-y-5">
                {gain.map((op, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Image
                      src={op.icon}
                      alt={op.title}
                      height={10}
                      width={20}
                      className="mt-1 shrink-0"
                    />
                    <p
                      className={`${isBn ? notoBengali.className : antiquaFont.className} text-[#6d6b6b] text-lg lg:text-xl`}
                    >
                      {op.title}
                    </p>
                  </div>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end order-1 lg:order-2">
            <Image
              src={whatyouwillgainimage}
              alt="gain-image"
              width={700}
              height={400}
              className="w-full max-w-md lg:max-w-none h-auto object-contain"
            />
          </div>
        </div>
      </Container>

      <div className="flex items-center justify-center mb-12 sm:mb-15 px-4">
        <Link
          href={"#form"}
          className={`bg-[#FF951B] px-6 py-4 lg:px-8 lg:py-5 font-semibold text-sm lg:text-lg text-white rounded-full cursor-pointer hover:bg-orange-400 transition duration-200 ${isBn ? notoBengali.className : jost.className}`}
        >
          {ctaButtonText}
        </Link>
      </div>
    </div>
  );
};

export default Page;
