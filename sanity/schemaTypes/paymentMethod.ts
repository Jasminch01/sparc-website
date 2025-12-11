/* eslint-disable @typescript-eslint/no-explicit-any */
// schemas/paymentMethod.ts

import { defineField, defineType } from "sanity";

export default defineType({
  name: "paymentMethod",
  title: "Payment Methods",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Method Name",
      type: "string",
      description: "Name shown to users (e.g., Bkash, Nagad, PayPal)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Payment Category",
      type: "string",
      options: {
        list: [
          { title: "Mobile Banking", value: "mobile" },
          { title: "Bank Payment", value: "bank" },
          { title: "International", value: "international" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "color",
      title: "Theme Color",
      type: "string",
      options: {
        list: [
          { title: "Pink", value: "pink" },
          { title: "Orange", value: "orange" },
          { title: "Blue", value: "blue" },
          { title: "Red", value: "red" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    // Mobile Banking Fields
    defineField({
      name: "mobileNumbers",
      title: "Mobile Account Numbers",
      type: "array",
      of: [{ type: "string" }],
      description: "Phone numbers for mobile banking (e.g., 01871888764)",
      hidden: ({ parent }) => parent?.category !== "mobile",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const category = (context.parent as any)?.category;
          if (category === "mobile" && (!value || value.length === 0)) {
            return "At least one mobile number is required for mobile banking";
          }
          return true;
        }),
    }),
    // Bank Payment Fields
    defineField({
      name: "bankDetails",
      title: "Bank Account Details",
      type: "object",
      hidden: ({ parent }) => parent?.category !== "bank",
      fields: [
        {
          name: "accountNumber",
          title: "Account Number",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "accountName",
          title: "Account Name",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "bankName",
          title: "Bank Name",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "branchName",
          title: "Branch Name",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "swiftCode",
          title: "SWIFT/BIC Code",
          type: "string",
          description: "Optional - for international transfers",
        },
        {
          name: "routingNumber",
          title: "Routing Number",
          type: "string",
          description: "Optional - if applicable",
        },
      ],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const category = (context.parent as any)?.category;
          if (category === "bank" && !value) {
            return "Bank account details are required for bank payment";
          }
          return true;
        }),
    }),
    // International Payment Fields
    defineField({
      name: "internationalDetails",
      title: "International Payment Details",
      type: "object",
      hidden: ({ parent }) => parent?.category !== "international",
      fields: [
        {
          name: "email",
          title: "Payment Email",
          type: "string",
          description: "E.g., PayPal email address",
          validation: (Rule) => Rule.email(),
        },
        {
          name: "additionalInfo",
          title: "Additional Information",
          type: "text",
          rows: 2,
          description: "Any other details users need to know",
        },
      ],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const category = (context.parent as any)?.category;
          if (category === "international" && !value?.email) {
            return "Payment email is required for international payments";
          }
          return true;
        }),
    }),
    defineField({
      name: "formFields",
      title: "Required Form Fields",
      type: "array",
      of: [
        {
          type: "string",
          options: {
            list: [
              { title: "Name", value: "name" },
              { title: "Transaction ID", value: "transactionId" },
              { title: "Honored Name", value: "honoredName" },
              { title: "Donated For", value: "donatedFor" },
              { title: "Account Number", value: "accountNumber" },
              { title: "Bank Name", value: "bankName" },
              { title: "Branch Name", value: "branchName" },
              { title: "Reference Number", value: "referenceNumber" },
              { title: "Email", value: "email" },
              { title: "PayPal Transaction ID", value: "paypalTransactionId" },
            ],
          },
        },
      ],
      description: "Select which form fields users must fill out",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Enable or disable this payment method",
      initialValue: true,
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      description: "Order in which this method appears (lower numbers first)",
      initialValue: 0,
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: "instructions",
      title: "Payment Instructions",
      type: "text",
      rows: 3,
      description: "Additional instructions for users (optional)",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "logo",
      isActive: "isActive",
    },
    prepare(selection) {
      const { title, subtitle, media, isActive } = selection;
      return {
        title: title,
        subtitle: `${subtitle} ${isActive ? "✓" : "✗ Inactive"}`,
        media: media,
      };
    },
  },
});

// Type definitions for use in your Next.js app
interface BankDetails {
  accountNumber: string;
  accountName: string;
  bankName: string;
  branchName: string;
  swiftCode?: string;
  routingNumber?: string;
}

interface InternationalDetails {
  email: string;
  additionalInfo?: string;
}

export interface PaymentMethod {
  _id: string;
  _type: "paymentMethod";
  name: string;
  logo: {
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  category: "mobile" | "bank" | "international";
  color: "pink" | "orange" | "blue" | "red";
  mobileNumbers?: string[];
  bankDetails?: BankDetails;
  internationalDetails?: InternationalDetails;
  formFields: Array<
    | "name"
    | "transactionId"
    | "honoredName"
    | "donatedFor"
    | "accountNumber"
    | "bankName"
    | "branchName"
    | "referenceNumber"
    | "email"
    | "paypalTransactionId"
  >;
  isActive: boolean;
  sortOrder?: number;
  instructions?: string;
}

// Type for the fetched data with image URL
export interface PaymentMethodWithUrl extends Omit<PaymentMethod, "logo"> {
  logoUrl: string;
}