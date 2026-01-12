import React, { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import bikashLogo from "../../public/donation/bikash.svg";
import nagadLogo from "../../public/donation/nagad.svg";
import upayLogo from "../../public/donation/upai.webp";
import brac from "../../public/donation/brac-bank.png";
import ucb from "../../public/donation/ucb.png";
import paypal from "../../public/donation/paypal.png";
import Image, { StaticImageData } from "next/image";
import { getAllPaymentMethods, PaymentMethod } from "@/sanity/queries/queries";
import { antiquaFont, poppins } from "../utils/font";

interface FormData {
  name: string;
  transactionId: string;
  honoreeName: string;
  message: string;
  bankName: string;
  branchName: string;
  referenceNumber: string;
  email: string;
  paypalTransactionId: string;
  selectedMobileAccount: string;
}

interface FieldConfig {
  placeholder: string;
  type: string;
  maxLength?: number;
  isTextarea?: boolean;
}

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(
    null
  );
  const [showDetails, setShowDetails] = useState(false);
  const [sanityPaymentData, setSanityPaymentData] = useState<PaymentMethod[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    transactionId: "",
    honoreeName: "",
    message: "",
    bankName: "",
    branchName: "",
    referenceNumber: "",
    email: "",
    paypalTransactionId: "",
    selectedMobileAccount: "",
  });

  // Fetch payment data from Sanity
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      setIsLoading(true);
      try {
        const data = await getAllPaymentMethods();
        setSanityPaymentData(data);
        if (data.length > 0) {
          setSelectedPayment(data[0]);
          // Set default mobile account if available
          if (
            data[0].paymentType === "mobileBanking" &&
            data[0].mobileAccountNumbers.length > 0
          ) {
            setFormData((prev) => ({
              ...prev,
              selectedMobileAccount:
                data[0].mobileAccountNumbers[0].accountNumber,
            }));
          }
        }
      } catch (error) {
        console.error("Error loading payment methods:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchPaymentMethods();
      setShowDetails(false);
      // Reset submitting state when modal opens
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // Update selected mobile account when payment method changes
  useEffect(() => {
    if (
      selectedPayment?.paymentType === "mobileBanking" &&
      selectedPayment.mobileAccountNumbers.length > 0
    ) {
      setFormData((prev) => ({
        ...prev,
        selectedMobileAccount:
          selectedPayment.mobileAccountNumbers[0].accountNumber,
      }));
    }
  }, [selectedPayment]);

  // ESC key closes modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Get logo based on payment type and provider
  const getPaymentLogo = (payment: PaymentMethod): StaticImageData => {
    if (payment.paymentType === "mobileBanking") {
      const logoMap: Record<string, StaticImageData> = {
        bkash: bikashLogo,
        nagad: nagadLogo,
        upay: upayLogo,
      };
      return logoMap[payment.mobileProvider || "bkash"] || bikashLogo;
    }

    if (payment.paymentType === "bankTransfer") {
      const bankLogoMap: Record<string, StaticImageData> = {
        brac: brac,
        ucb: ucb,
      };
      return bankLogoMap[payment.bankName || ""];
    }

    if (payment.paymentType === "paypal") {
      return paypal;
    }

    return bikashLogo;
  };

  // Get display name
  const getPaymentName = (payment: PaymentMethod): string => {
    if (payment.paymentType === "mobileBanking") {
      const nameMap: Record<string, string> = {
        bkash: "bKash",
        nagad: "Nagad",
        upay: "Upay",
        rocket: "Rocket",
      };
      return nameMap[payment.mobileProvider || ""] || "Mobile Banking";
    }

    if (payment.paymentType === "bankTransfer") {
      return payment.bankName || "Bank Transfer";
    }

    if (payment.paymentType === "paypal") {
      return "PayPal";
    }

    return "Payment Method";
  };

  // Get payment details to display
  const getPaymentDetails = (payment: PaymentMethod): string[] => {
    if (payment.paymentType === "mobileBanking") {
      if (payment.mobileAccountNumbers.length === 0) {
        return ["No account numbers available"];
      }

      // Show all account numbers separated by comma
      const allNumbers = payment.mobileAccountNumbers
        .map((acc) => acc.accountNumber)
        .join(", ");

      return [allNumbers];
    }

    if (payment.paymentType === "bankTransfer") {
      return [
        `Account Name: ${payment.accountName || "N/A"}`,
        `Account Number: ${payment.accountNumber || "N/A"}`,
        `Bank Name: ${payment.bankName || "N/A"}`,
        `Branch: ${payment.branchName || "N/A"}`,
        `SWIFT Code: ${payment.swiftCode || "N/A"}`,
        `Routing Number: ${payment.routingNumber || "N/A"}`,
      ];
    }

    if (payment.paymentType === "paypal") {
      return payment.paypalEmail
        ? [payment.paypalEmail]
        : ["No PayPal email available"];
    }

    return [];
  };

  // Get form fields based on payment type
  const getFormFields = (payment: PaymentMethod): (keyof FormData)[] => {
    if (payment.paymentType === "mobileBanking") {
      return ["name", "transactionId", "honoreeName", "message"];
    }

    if (payment.paymentType === "bankTransfer") {
      return [
        "name",
        "transactionId",
        "bankName",
        "branchName",
        "referenceNumber",
        "honoreeName",
        "message",
      ];
    }

    if (payment.paymentType === "paypal") {
      return ["name", "email", "paypalTransactionId", "honoreeName", "message"];
    }

    return [];
  };

  // Input change handler
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form
  const validateForm = (): boolean => {
    if (!selectedPayment) return false;

    // Check required fields based on payment type
    if (selectedPayment.paymentType === "mobileBanking") {
      if (!formData.name.trim() || !formData.transactionId.trim()) {
        alert("Please fill in Name and Transaction ID");
        return false;
      }
    }

    if (selectedPayment.paymentType === "bankTransfer") {
      if (
        !formData.name.trim() ||
        !formData.transactionId.trim() ||
        !formData.bankName.trim() ||
        !formData.branchName.trim()
      ) {
        alert("Please fill in all required bank transfer fields");
        return false;
      }
    }

    if (selectedPayment.paymentType === "paypal") {
      if (
        !formData.name.trim() ||
        !formData.email.trim() ||
        !formData.paypalTransactionId.trim()
      ) {
        alert("Please fill in Name, Email and PayPal Transaction ID");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Here you can add your API call to save donation data
      console.log("Form submitted:", {
        paymentMethod: selectedPayment,
        formData,
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form data
      setFormData({
        name: "",
        transactionId: "",
        honoreeName: "",
        message: "",
        bankName: "",
        branchName: "",
        referenceNumber: "",
        email: "",
        paypalTransactionId: "",
        selectedMobileAccount: "",
      });

      // Navigate to thank you page first
      router.push("/thank-you");

      // Then close modal and reset state
      // Small delay to ensure navigation starts before closing
      setTimeout(() => {
        onClose();
        setIsSubmitting(false);
      }, 100);
    } catch (error) {
      console.error("Error submitting donation:", error);
      alert("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handlePaymentSelect = (payment: PaymentMethod) => {
    setSelectedPayment(payment);
    setShowDetails(true);
  };

  const handleBackToList = () => {
    setShowDetails(false);
  };

  // Group payments by type
  const mobileBankingMethods = sanityPaymentData.filter(
    (p) => p.paymentType === "mobileBanking"
  );
  const bankTransferMethods = sanityPaymentData.filter(
    (p) => p.paymentType === "bankTransfer"
  );
  const paypalMethods = sanityPaymentData.filter(
    (p) => p.paymentType === "paypal"
  );

  const renderFormField = (fieldName: keyof FormData) => {
    const fieldConfig: Record<keyof FormData, FieldConfig> = {
      name: { placeholder: "Enter Your Name *", type: "text" },
      transactionId: { placeholder: "Enter Transaction ID *", type: "text" },
      honoreeName: { placeholder: "Honoree Name", type: "text" },
      message: {
        placeholder: "Donate For",
        type: "text",
        isTextarea: true,
      },
      bankName: { placeholder: "Your Bank Name *", type: "text" },
      branchName: { placeholder: "Your Branch Name *", type: "text" },
      referenceNumber: {
        placeholder: "Transaction Reference Number",
        type: "text",
      },
      email: { placeholder: "Your Email Address *", type: "email" },
      paypalTransactionId: {
        placeholder: "PayPal Transaction ID *",
        type: "text",
      },
      selectedMobileAccount: { placeholder: "Select Account", type: "text" },
    };

    const config = fieldConfig[fieldName];

    if (config.isTextarea) {
      return (
        <textarea
          key={fieldName}
          name={fieldName}
          placeholder={config.placeholder}
          value={formData[fieldName]}
          onChange={handleInputChange}
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none resize-none"
        />
      );
    }

    return (
      <input
        key={fieldName}
        type={config.type}
        name={fieldName}
        placeholder={config.placeholder}
        value={formData[fieldName]}
        onChange={handleInputChange}
        maxLength={config.maxLength}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
      />
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-60 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        aria-label="Close modal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="flex w-full gap-4 flex-col lg:flex-row">
          {/* LEFT SIDE — PAYMENT LIST */}
          <div
            className={`w-full lg:w-1/2 rounded-xl bg-white shadow-lg ${showDetails ? "hidden lg:block" : "block"}`}
          >
            <div className="border-b border-gray-300">
              <h2
                className={`text-center text-xl mb-5 font-semibold my-6 ${poppins.className}`}
              >
                Choose Payment Method
              </h2>
            </div>
            <div className="flex items-center">
              <div className={`px-6 md:px-14 mt-10 pb-10 ${poppins.className}`}>
                {isLoading ? (
                  <div className="text-center py-8">
                    Loading payment methods...
                  </div>
                ) : sanityPaymentData.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No payment methods available
                  </div>
                ) : (
                  <div>
                    {/* Mobile Banking */}
                    {mobileBankingMethods.length > 0 && (
                      <div className="mb-6">
                        <h3 className="mb-3 text-base font-semibold text-gray-700">
                          Mobile Banking
                        </h3>
                        <div className="flex gap-3 flex-wrap">
                          {mobileBankingMethods.map((payment) => (
                            <button
                              key={payment._id}
                              onClick={() => handlePaymentSelect(payment)}
                              className={`flex items-center gap-2 rounded-lg border px-4 py-3 transition ${
                                selectedPayment?._id === payment._id
                                  ? "border-[#FF951B]"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <Image
                                src={getPaymentLogo(payment)}
                                alt={getPaymentName(payment)}
                                width={80}
                                height={80}
                                sizes="500px"
                                className="object-contain size-12"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Bank Transfer */}
                    {bankTransferMethods.length > 0 && (
                      <div className="mb-6">
                        <h3 className="mb-3 text-base font-semibold text-gray-700">
                          Bank Transfer
                        </h3>
                        <div className="flex gap-3 flex-wrap">
                          {bankTransferMethods.map((payment) => (
                            <button
                              key={payment._id}
                              onClick={() => handlePaymentSelect(payment)}
                              className={`flex items-center gap-2 rounded-lg border px-4 py-3 transition ${
                                selectedPayment?._id === payment._id
                                  ? "border-[#FF951B]"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <Image
                                src={getPaymentLogo(payment)}
                                alt={getPaymentName(payment)}
                                width={80}
                                height={80}
                                sizes="500px"
                                className="object-contain"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* International Payment */}
                    {paypalMethods.length > 0 && (
                      <div className="mb-6">
                        <h3 className="mb-3 text-base font-semibold text-gray-700">
                          International Payment
                        </h3>
                        <div className="flex gap-3 flex-wrap">
                          {paypalMethods.map((payment) => (
                            <button
                              key={payment._id}
                              onClick={() => handlePaymentSelect(payment)}
                              className={`flex items-center gap-2 rounded-lg border px-4 py-3 transition ${
                                selectedPayment?._id === payment._id
                                  ? "border-[#FF951B]"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <Image
                                src={getPaymentLogo(payment)}
                                alt={getPaymentName(payment)}
                                width={120}
                                height={120}
                                sizes="500px"
                                className="object-contain"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — PAYMENT FORM */}
          <div
            className={`w-full lg:w-1/2 rounded-xl bg-white shadow-lg overflow-y-auto hidden-scrollbar max-h-[600px] ${!showDetails ? "hidden lg:block" : "block"}`}
          >
            {selectedPayment ? (
              <div className="">
                {/* Back Button (Mobile only) */}
                <button
                  onClick={handleBackToList}
                  className="lg:hidden flex items-center gap-2 px-6 py-4 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <span className={poppins.className}>
                    Back to payment methods
                  </span>
                </button>

                <div className="mb-6 flex flex-col items-center justify-center gap-2 py-5">
                  <Image
                    src={getPaymentLogo(selectedPayment)}
                    width={120}
                    height={120}
                    sizes="2000px"
                    alt={getPaymentName(selectedPayment)}
                    className="object-contain h-[100px]"
                  />
                </div>
                <div className="px-6 md:px-14 pb-6">
                  {/* Payment Details */}
                  {selectedPayment.paymentType === "mobileBanking" && (
                    <p
                      className={`text-center px-4 md:px-10 text-[#323232] ${antiquaFont.className} text-base leading-6 mb-3`}
                    >
                      Send money to any of the numbers displayed below and enter
                      the details
                    </p>
                  )}

                  <div className="mb-6">
                    {selectedPayment.paymentType === "bankTransfer" ? (
                      <div className="space-y-2">
                        <p
                          className={`text-center px-4 md:px-10 text-[#323232] ${antiquaFont.className} text-lg leading-6 mb-3`}
                        >
                          Account Details
                        </p>
                        {getPaymentDetails(selectedPayment).map(
                          (detail, index) => {
                            const [label, value] = detail.split(":");

                            return (
                              <div
                                key={index}
                                className={`flex justify-between gap-4 ${poppins.className}`}
                              >
                                <p className="text-[#484848]">{label}:</p>
                                <p className="text-right font-medium">
                                  {value}
                                </p>
                              </div>
                            );
                          }
                        )}
                      </div>
                    ) : (
                      getPaymentDetails(selectedPayment).map(
                        (detail, index) => (
                          <p
                            key={index}
                            className={`${poppins.className} text-center ${
                              selectedPayment.paymentType === "mobileBanking"
                                ? "text-lg md:text-xl font-semibold"
                                : selectedPayment.paymentType === "paypal"
                                  ? "text-base md:text-lg font-medium"
                                  : "text-base"
                            } ${index > 0 ? "mt-1" : ""}`}
                          >
                            {detail}
                          </p>
                        )
                      )
                    )}
                  </div>

                  {/* FORM FIELDS */}
                  <div className={`space-y-4 ${poppins.className}`}>
                    {getFormFields(selectedPayment).map((fieldName) =>
                      renderFormField(fieldName)
                    )}
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`mt-6 w-full rounded-lg py-4 md:py-5 font-semibold text-white transition ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#FF951B] hover:bg-[#d57f1d]"
                    }`}
                  >
                    {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 py-20">
                Please select a payment method
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;
