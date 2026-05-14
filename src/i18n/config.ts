import i18n from "i18next";

import LanguageDetector from "i18next-browser-languagedetector";

import { initReactI18next } from "react-i18next";

import ptCommon from "../locales/pt/common/common.json";
import enCommon from "../locales/en/common/common.json";
import ptHome from "../locales/pt/Home/home.json";
import enHome from "../locales/en/Home/home.json";
import ptSection1 from "../locales/pt/Sections/section1.json";
import enSection1 from "../locales/en/Sections/section1.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      pt: {
        "common": ptCommon,
        "home": ptHome,
        "sections/section1": ptSection1,
      },

      en: {
        "common": enCommon,
        "home": enHome,
        "sections/section1": enSection1,
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