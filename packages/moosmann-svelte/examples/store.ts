import { makeTranslationStore } from "moosmann-svelte";

import en from "./locales/en";

export const { t, locale, localeKeys } = await makeTranslationStore("en", {
    en: en,
    de: () => import("./locales/de"),
});
