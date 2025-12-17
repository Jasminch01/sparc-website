"use client"
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./public/TranslationData/EnglishData.json";
import bn from "./public/TranslationData/BanglaData.json";

i18n.use(initReactI18next).init({
    resources: {
        EN: { translation: en },
        BN: { translation: bn },
    },
    lng: 'EN',
    fallbackLng: "EN",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;