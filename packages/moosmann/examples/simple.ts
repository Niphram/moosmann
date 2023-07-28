import { translator } from "moosmann";

import en from "./locales/en";

const locales = {
    en: en, // locale "en" will not be included in your compiled output instead of being imported dynamically
    de: () => import("./locales/de"), // de and de-CH will be dynamically imported when they are needed
    "de-CH": () => import("./locales/de-CH"),
};

const i18n = translator(locales);

// You can get a list of available locales
console.log(i18n.localeKeys);

// Loading a locale is always asynchronous and returns a translation-function
const t = await i18n.loadLocale("de-CH");

// The translation function is fully typesafe!
console.log(t("navigation.home"));
console.log(t("greeting", "Moosmann"));
console.log(t("unreadMessages", 5));
