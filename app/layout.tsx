import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight : ['400', '500', '600', "700"]
});

export const metadata: Metadata = {
  title: "Sparc",
  description: "A simple website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/Overview/logocopy.png" sizes="64*64"></link>
      <body
        className={`${poppins.variable} font-sans `}
      >
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
