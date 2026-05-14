import i18n from "i18next";

import LanguageDetector from "i18next-browser-languagedetector";

import { initReactI18next } from "react-i18next";

import ptCommon from "../locales/pt/common/common.json";
import enCommon from "../locales/en/common/common.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      pt: {
        "common": ptCommon,
      },

      en: {
        "common": enCommon,
      },
    },

    fallbackLng: "en",

    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;