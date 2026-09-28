import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./en.json";
import fr from "./fr.json";

/**
 * Config i18n FR par defaut, EN secondaire.
 */
if (!i18n.isInitialized) {
  void i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: { fr: { translation: fr }, en: { translation: en } },
      fallbackLng: "fr",
      supportedLngs: ["fr", "en"],
      interpolation: { escapeValue: false },
    });
}

export default i18n;
