import { moosmannStores } from "moosmann-svelte";

import en from "./locales/en";

export const { t, locale, localeKeys } = await moosmannStores("en", {
    en: en,
    de: () => import("./locales/de"),
});
