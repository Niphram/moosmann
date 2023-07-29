import { moosmannStores } from "moosmann-svelte";

export const { t, locale, localeKeys, isInitialized } = moosmannStores("en", {
    en: () => import("./locales/en"),
    de: () => import("./locales/de"),
});
