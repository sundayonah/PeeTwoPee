import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import hi from "../translations/hi.json"
import fr from "../translations/fr.json"
import zh from "../translations/zh.json"
import en from "../translations/en.json"
import ru from "../translations/ru.json"
import vi from "../translations/vi.json"

// const apiKey = "WLLhAJq8nWzkHWPx5xMGCg";
// const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`;

i18next
  // .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    // fallbackLng: "en",

    // ns: ["default"],
    // defaultNS: "default",
 
    // supportedLngs: ["en","fr","zh","hi"],
    resources: {
      en: {
        translation: en,
      },
      zh: {
        translation: zh,
      },
      fr: {
        translation: fr,
      },
      hi : {
        translation:hi
      },
      ru : {
        translation:ru
      },
      vi : {
        translation:vi
      }
    },
    // backend: {
    //   loadPath: loadPath
    // }
  })