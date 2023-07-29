import { writable, derived } from "svelte/store";
import { GenericLocale, LocaleMap, moosmann } from "moosmann";

export async function moosmannStores<Schema extends GenericLocale>(
    defaultLocale: string,
    locales: LocaleMap<Schema>
) {
    const translatorFactory = moosmann(locales);
    const localeKeys = translatorFactory.localeKeys;
    const defaultTranslator = await translatorFactory.loadLocale(defaultLocale);

    const locale = writable(defaultLocale);

    const t = derived(
        [locale],
        ([locale], set) => {
            translatorFactory
                .loadLocale(locale)
                .then((translator) => set(translator))
                .catch(console.error);
        },
        defaultTranslator
    );

    return { locale, t, localeKeys };
}
