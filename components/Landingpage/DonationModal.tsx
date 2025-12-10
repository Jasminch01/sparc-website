import React, { useState, ChangeEvent, useEffect } from 'react';
import bikashLogo from '../../public/donation/BKash-Icon-Logo.wine 1.png';
import bracLogo from '../../public/donation/brac.png';
import nagadLogo from '../../public/donation/Nagad-Logo.wine 1.png';
import upayLogo from '../../public/donation/Upay_logo_freekaj 1.png';
import visalogo from '../../public/donation/visa.png';
import master from '../../public/donation/mastercard.png';
import ucb from '../../public/donation/ucb-bank-seeklogo 1.png';
import paypal from '../../public/donation/paypal-seeklogo 1.png';
import Image, { StaticImageData } from 'next/image';

interface FormData {
  name: string;
  transactionId: string;
  honoredName: string;
  donatedFor: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  accountNumber: string;
  bankName: string;
  branchName: string;
  referenceNumber: string;
  email: string;
  paypalTransactionId: string;
}

type PaymentType = 'mobile' | 'card' | 'bank' | 'paypal';
type PaymentColor = 'pink' | 'orange' | 'blue' | 'red';

interface PaymentDetail {
  name: string;
  color: PaymentColor;
  img: StaticImageData;
  type: PaymentType;
  numbers: string[];
  fields: (keyof FormData)[];
}

type PaymentMethod =
  | 'bkash'
  | 'nagad'
  | 'upay'
  | 'mastercard'
  | 'visa'
  | 'ucb'
  | 'bracbank'
  | 'paypal';

interface FieldConfig {
  placeholder: string;
  type: string;
  maxLength?: number;
}

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('bkash');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    transactionId: '',
    honoredName: '',
    donatedFor: '',
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    accountNumber: '',
    bankName: '',
    branchName: '',
    referenceNumber: '',
    email: '',
    paypalTransactionId: ''
  });

  // ESC key closes modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // PAYMENT DETAILS
  const paymentDetails: Record<PaymentMethod, PaymentDetail> = {
    bkash: {
      name: 'Bkash',
      color: 'pink',
      img: bikashLogo,
      type: 'mobile',
      numbers: ['01871888764', '01871888764'],
      fields: ['name', 'transactionId', 'honoredName', 'donatedFor']
    },
    nagad: {
      name: 'Nagad',
      color: 'orange',
      img: nagadLogo,
      type: 'mobile',
      numbers: ['01712345678', '01712345678'],
      fields: ['name', 'transactionId', 'honoredName', 'donatedFor']
    },
    upay: {
      name: 'Upay',
      color: 'blue',
      img: upayLogo,
      type: 'mobile',
      numbers: ['01898765432', '01898765432'],

      fields: ['name', 'transactionId', 'honoredName', 'donatedFor']
    },
    mastercard: {
      name: '',
      color: 'red',
      img: master,
      type: 'card',
      numbers: [],

      fields: [
        'cardNumber',
        'cardHolder',
        'expiryDate',
        'cvv',
        'honoredName',
        'donatedFor'
      ]
    },
    visa: {
      name: '',
      color: 'blue',
      img: visalogo,
      type: 'card',
      numbers: [],

      fields: [
        'cardNumber',
        'cardHolder',
        'expiryDate',
        'cvv',
        'honoredName',
        'donatedFor'
      ]
    },
    ucb: {
      name: '',
      color: 'red',
      img: ucb,
      type: 'bank',
      numbers: [
        'Account: 1234567890123',
        'Account Name: Donation Fund',
        'Branch: Gulshan, Dhaka'
      ],

      fields: [
        'name',
        'accountNumber',
        'bankName',
        'branchName',
        'referenceNumber',
        'honoredName',
        'donatedFor'
      ]
    },
    bracbank: {
      name: '',
      color: 'blue',
      img: bracLogo,
      type: 'bank',
      numbers: [
        'Account: 9876543210987',
        'Account Name: Donation Fund',
        'Branch: Dhanmondi, Dhaka'
      ],

      fields: [
        'name',
        'accountNumber',
        'bankName',
        'branchName',
        'referenceNumber',
        'honoredName',
        'donatedFor'
      ]
    },
    paypal: {
      name: '',
      color: 'blue',
      img: paypal,
      type: 'paypal',
      numbers: ['Email: donations@example.com'],

      fields: ['name', 'email', 'paypalTransactionId', 'honoredName', 'donatedFor']
    }
  };

  const currentPayment = paymentDetails[selectedMethod];

  // Input change formatting
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const name = e.target.name as keyof FormData;

    if (name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (value.length > 19) value = value.slice(0, 19);
    }

    if (name === 'expiryDate') {
      value = value.replace(/\D/g, '');
      if (value.length >= 2) value = value.slice(0, 2) + '/' + value.slice(2, 4);
      if (value.length > 5) value = value.slice(0, 5);
    }

    if (name === 'cvv') value = value.replace(/\D/g, '').slice(0, 3);

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', { method: selectedMethod, ...formData });
    alert('Payment submitted successfully!');
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const getColorClasses = (color: PaymentColor, isSelected: boolean): string => {
    const colors: Record<PaymentColor, string> = {
      pink: isSelected ? 'border-pink-500 bg-pink-50' : 'border-gray-200',
      orange: isSelected ? 'border-orange-500 bg-orange-50' : 'border-gray-200',
      blue: isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200',
      red: isSelected ? 'border-red-500 bg-red-50' : 'border-gray-200'
    };
    return colors[color];
  };

  const getButtonColorClasses = (color: PaymentColor): string => {
    const colors: Record<PaymentColor, string> = {
      pink: 'bg-pink-500 hover:bg-pink-600',
      orange: 'bg-orange-400 hover:bg-orange-500',
      blue: 'bg-blue-500 hover:bg-blue-600',
      red: 'bg-red-500 hover:bg-red-600'
    };
    return colors[color];
  };

  // NEW FUNCTION TO CONDITIONALLY APPLY IMAGE SIZE CLASSES
  const getImageSizeClasses = (method: PaymentMethod): string => {
    const customSizes: PaymentMethod[] = [
      'bracbank',
      'ucb',
      'mastercard',
      'visa',
      'paypal'
    ];

    // Apply different classes for wider/flatter logos
    if (customSizes.includes(method)) {
      // Example: Max width of 80p, height of 48px (h-12) to contain non-square logos better
      return 'w-auto h-12 ';
    }

    // Default size for square logos like Bkash, Nagad, Upay (w-16, h-16 is 64px)
    return 'w-16 h-16';
  };
  // END NEW FUNCTION

  const MOBILE_METHODS: PaymentMethod[] = ['bkash', 'nagad', 'upay'];
  const CARD_METHODS: PaymentMethod[] = ['mastercard', 'visa'];
  const BANK_METHODS: PaymentMethod[] = ['ucb', 'bracbank'];
  const INTERNATIONAL_METHODS: PaymentMethod[] = ['paypal'];

  const renderFormField = (fieldName: keyof FormData) => {
    const fieldConfig: Record<keyof FormData, FieldConfig> = {
      name: { placeholder: 'Enter Name', type: 'text' },
      transactionId: { placeholder: 'Enter Transaction ID', type: 'text' },
      honoredName: { placeholder: 'Honored Name (Optional)', type: 'text' },
      donatedFor: { placeholder: 'Donated For (Optional)', type: 'text' },
      cardNumber: { placeholder: 'Card Number', type: 'text', maxLength: 19 },
      cardHolder: { placeholder: 'Cardholder Name', type: 'text' },
      expiryDate: { placeholder: 'MM/YY', type: 'text', maxLength: 5 },
      cvv: { placeholder: 'CVV', type: 'password', maxLength: 3 },
      accountNumber: { placeholder: 'Your Account Number', type: 'text' },
      bankName: { placeholder: 'Your Bank Name', type: 'text' },
      branchName: { placeholder: 'Your Branch Name', type: 'text' },
      referenceNumber: { placeholder: 'Transaction Reference Number', type: 'text' },
      email: { placeholder: 'Your Email Address', type: 'email' },
      paypalTransactionId: { placeholder: 'PayPal Transaction ID', type: 'text' }
    };

    const config = fieldConfig[fieldName];

    return (
      <input
        key={fieldName}
        type={config.type}
        name={fieldName}
        placeholder={config.placeholder}
        value={formData[fieldName]}
        onChange={handleInputChange}
        maxLength={config.maxLength}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-pink-500 focus:outline-none"
      />
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg hover:bg-gray-100"
        >
          ✕
        </button>

        <div className="flex w-full gap-4 flex-col lg:flex-row">

          {/* LEFT SIDE — PAYMENT LIST WITH MAP */}
          <div className="w-full lg:w-1/2 rounded-lg bg-white p-6 shadow-lg">
            <h2 className='text-center text-xl mb-5'>Choose Payment Method</h2>
            {/* Category wrapper */}
            {[
              { label: 'Mobile Banking', methods: MOBILE_METHODS },
              { label: 'Card', methods: CARD_METHODS },
              { label: 'Bank Payment', methods: BANK_METHODS },
              { label: 'International', methods: INTERNATIONAL_METHODS }
            ].map((group, i) => (
              <div key={i} className="mb-6">
                <h3 className="mb-3 text-sm font-semibold">{group.label}</h3>

                <div className="flex gap-3 flex-wrap">

                  {group.methods.map((method) => {
                    const item = paymentDetails[method];
                    return (
                      <button
                        key={method}
                        onClick={() => setSelectedMethod(method)}
                        className={`flex items-center gap-2 rounded-lg border-2 px-4 py-3 transition ${getColorClasses(item.color, selectedMethod === method)
                          }`}
                      >
                        <Image
                          src={item.img}
                          alt={item?.name}
                          width={45}
                          height={40}
                          className="object-contain"
                        />
                        <span className="font-medium">{item?.name}</span>
                      </button>
                    );
                  })}

                </div>
              </div>
            ))}

          </div>

          {/* RIGHT SIDE — PAYMENT FORM */}
          <div className="w-full lg:w-1/2 rounded-lg bg-white p-6 shadow-lg overflow-y-auto max-h-[600px]">

            <div className="mb-6 flex flex-col items-center justify-center gap-2">
              <Image
                src={currentPayment.img}
                // Increased size for Next.js Image component optimization
                width={500}
                height={30}
                alt={currentPayment.name}
                // CONDITIONAL CSS APPLIED HERE:
                className={`object-contain  ${getImageSizeClasses(selectedMethod)}`}
              />
              <h2 className="text-2xl font-semibold">{currentPayment.name}</h2>
            </div>
            {currentPayment.numbers.length > 0 && (
              <div className="mb-6 rounded-lg bg-gray-50 p-4 text-center">
                {currentPayment.numbers.map((number, index) => (
                  <div
                    key={index}
                    className={`font-semibold ${index === 0 ? 'text-xl' : 'text-base text-gray-700'
                      }`}
                  >
                    {number}
                  </div>
                ))}
              </div>
            )}

            {/* FORM FIELDS */}
            <div className="space-y-4">
              {currentPayment.fields.map((fieldName) => {
                if (fieldName === 'expiryDate' || fieldName === 'cvv') return null;
                return renderFormField(fieldName);
              })}

              {currentPayment.type === 'card' && (
                <div className="flex gap-3">
                  <div className="w-1/2">{renderFormField('expiryDate')}</div>
                  <div className="w-1/2">{renderFormField('cvv')}</div>
                </div>
              )}
            </div>

            <button
              onClick={handleSubmit}
              className={`mt-6 w-full rounded-lg py-3 font-semibold text-white transition ${getButtonColorClasses(currentPayment.color)
                }`}
            >
              SUBMIT
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default DonationModal;