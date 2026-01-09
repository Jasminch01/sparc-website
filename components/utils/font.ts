import { Noto_Sans_Bengali, Poppins } from "next/font/google";
import localFont from "next/font/local";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const antiquaFont = localFont({
  src: [
    {
      path: "../../app/fonts/bookantiqua.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../app/fonts/bookantiqua_bold.ttf",
      weight: "700",
      style: "bold",
    },
  ],
});

export const rowanFont = localFont({
  src: [
    {
      path: "../../app/fonts/Rowan-Bold.otf",
      weight: "700",
      style: "bold",
    },
  ],
});
export const notoBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "700"],
  variable: "--font-bengali",
});
