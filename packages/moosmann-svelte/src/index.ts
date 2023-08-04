import { GenericLocale, LocaleMap, Translator, moosmann } from "moosmann";
import { derived, readonly, writable } from "svelte/store";

export function moosmannStores<Schema extends GenericLocale>(
    initialLocale: string,
    locales: LocaleMap<Schema>
) {
    const moosmannInstance = moosmann(locales);

    // Array of available locales
    const localeKeys = moosmannInstance.localeKeys;

    // Stores the current locale
    const locale = writable<string>(initialLocale);

    // Gets set to 'true' when the inital locale is loaded
    const isInitialized = writable(false);

    // Counts the currently loading locales
    const currentlyLoadingLocales = writable(0);

    const t = writable<Translator<Schema>>(() => {
        throw new Error("[moosmann-svelte] Not yet initialized!");
    });

    locale.subscribe((locale) => {
        currentlyLoadingLocales.update((v) => v + 1);

        moosmannInstance
            .loadLocale(locale)
            .then((translator) => {
                t.set(translator);
                isInitialized.set(true);
            })
            .catch(console.error)
            .finally(() => currentlyLoadingLocales.update((v) => v - 1));
    });

    return {
        locale,
        t: readonly(t),
        localeKeys,
        isInitialized: readonly(isInitialized),
        isLoading: derived([currentlyLoadingLocales], ([c]) => c !== 0),
    };
}
