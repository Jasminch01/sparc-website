// lib/sanity/queries/paymentQueries.ts

import { groq } from "next-sanity";
import { client } from "../lib/client";

// TypeScript interfaces for the payment data
export interface MobileAccountNumber {
  accountNumber: string;
}

export interface BankTransferData {
  accountName: string;
  bankName: string;
  branchName: string;
  accountNumber: string;
  swiftCode: string;
  routingNumber: string;
}

export interface MobileBankingData {
  mobileProvider: "bkash" | "nagad" | "upay" | "rocket";
  mobileAccountNumbers: MobileAccountNumber[];
}

export interface PayPalData {
  paypalEmail: string;
}

export interface PaymentMethod {
  _id: string;
  paymentType: "bankTransfer" | "mobileBanking" | "paypal";
  // Bank Transfer fields
  accountName?: string;
  bankName?: string;
  branchName?: string;
  accountNumber?: string;
  swiftCode?: string;
  routingNumber?: string;
  // Mobile Banking fields
  mobileProvider?: "bkash" | "nagad" | "upay" | "rocket";
  mobileAccountNumbers: MobileAccountNumber[]; // Required array, not optional
  // PayPal fields
  paypalEmail?: string;
}

// Query to get all payment methods
export const paymentMethodsQuery = groq`
  *[_type == "paymentMethod"] {
    _id,
    paymentType,
    accountName,
    bankName,
    branchName,
    accountNumber,
    swiftCode,
    routingNumber,
    mobileProvider,
    "mobileAccountNumbers": coalesce(mobileAccountNumbers[] {
      accountNumber
    }, []),
    paypalEmail
  }
`;

// Query to get payment methods by type
export const paymentMethodsByTypeQuery = (type: string) => groq`
  *[_type == "paymentMethod" && paymentType == "${type}"] {
    _id,
    paymentType,
    accountName,
    bankName,
    branchName,
    accountNumber,
    swiftCode,
    routingNumber,
    mobileProvider,
    "mobileAccountNumbers": coalesce(mobileAccountNumbers[] {
      accountNumber
    }, []),
    paypalEmail
  }
`;

// Fetch all payment methods
export async function getAllPaymentMethods(): Promise<PaymentMethod[]> {
  try {
    const data = await client.fetch(paymentMethodsQuery);
    return data;
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    return [];
  }
}

// Fetch payment methods by type
export async function getPaymentMethodsByType(
  type: "bankTransfer" | "mobileBanking" | "paypal"
): Promise<PaymentMethod[]> {
  try {
    const query = groq`
      *[_type == "paymentMethod" && paymentType == $type] {
        _id,
        paymentType,
        accountName,
        bankName,
        branchName,
        accountNumber,
        swiftCode,
        routingNumber,
        mobileProvider,
        "mobileAccountNumbers": coalesce(mobileAccountNumbers[] {
          accountNumber
        }, []),
        paypalEmail
      }
    `;
    const data = await client.fetch(query, { type });
    return data;
  } catch (error) {
    console.error(`Error fetching ${type} payment methods:`, error);
    return [];
  }
}

// Fetch mobile banking methods by provider
export async function getMobileBankingByProvider(
  provider: "bkash" | "nagad" | "upay" | "rocket"
): Promise<PaymentMethod | null> {
  try {
    const query = groq`
      *[_type == "paymentMethod" && paymentType == "mobileBanking" && mobileProvider == $provider][0] {
        _id,
        paymentType,
        mobileProvider,
        "mobileAccountNumbers": coalesce(mobileAccountNumbers[] {
          accountNumber
        }, [])
      }
    `;
    const data = await client.fetch(query, { provider });
    return data;
  } catch (error) {
    console.error(`Error fetching ${provider} details:`, error);
    return null;
  }
}

// Fetch bank transfer methods
export async function getBankTransferMethods(): Promise<PaymentMethod[]> {
  return getPaymentMethodsByType("bankTransfer");
}

// Fetch all mobile banking methods
export async function getMobileBankingMethods(): Promise<PaymentMethod[]> {
  return getPaymentMethodsByType("mobileBanking");
}

// Fetch PayPal methods
export async function getPayPalMethods(): Promise<PaymentMethod[]> {
  return getPaymentMethodsByType("paypal");
}

// NEW: Fetch mobile banking methods by provider with all account details
export async function getMobileBankingAccountsByProvider(
  provider: "bkash" | "nagad" | "upay" | "rocket"
): Promise<MobileAccountNumber[]> {
  try {
    const query = groq`
      *[_type == "paymentMethod" && paymentType == "mobileBanking" && mobileProvider == $provider][0] {
        "accounts": coalesce(mobileAccountNumbers[] {
          accountNumber
        }, [])
      }
    `;
    const data = await client.fetch(query, { provider });
    return data?.accounts || [];
  } catch (error) {
    console.error(`Error fetching ${provider} accounts:`, error);
    return [];
  }
}

// NEW: Get total count of mobile accounts for a provider
export async function getMobileAccountCount(
  provider: "bkash" | "nagad" | "upay" | "rocket"
): Promise<number> {
  try {
    const query = groq`
      *[_type == "paymentMethod" && paymentType == "mobileBanking" && mobileProvider == $provider][0] {
        "count": count(coalesce(mobileAccountNumbers, []))
      }
    `;
    const data = await client.fetch(query, { provider });
    return data?.count || 0;
  } catch (error) {
    console.error(`Error fetching ${provider} account count:`, error);
    return 0;
  }
}

// NEW: Validate if a mobile account exists
export async function validateMobileAccount(
  provider: "bkash" | "nagad" | "upay" | "rocket",
  accountNumber: string
): Promise<boolean> {
  try {
    const query = groq`
      *[_type == "paymentMethod" && 
        paymentType == "mobileBanking" && 
        mobileProvider == $provider &&
        $accountNumber in coalesce(mobileAccountNumbers[].accountNumber, [])][0] {
        _id
      }
    `;
    const data = await client.fetch(query, { provider, accountNumber });
    return !!data;
  } catch (error) {
    console.error(`Error validating ${provider} account:`, error);
    return false;
  }
}
