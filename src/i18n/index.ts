import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/i18n/en/English.json";

const resources = {
  en: {
    translation: en,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
 
});

export default i18n;
