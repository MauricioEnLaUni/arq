import i18next from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resources from "./i18n/resources";

export default i18next.use(initReactI18next).init({ resources, lng: "es" });
