// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./locales/en/translation.json";
import translationRU from "./locales/ru/translation.json";

const resources = {
  en: { translation: translationEN },
  ru: { translation: translationRU },
};

const language = localStorage.getItem("i18nextLng");

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    detection: {
      order: ["querystring", "cookie", "navigator"],
      caches: [],
    },
    fallbackLng: language || "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
