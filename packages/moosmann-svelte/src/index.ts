import { writable, derived } from "svelte/store";
import { GenericLocale, LocaleMap, translator } from "moosmann";

export async function makeTranslationStore<Schema extends GenericLocale>(
    defaultLocale: string,
    locales: LocaleMap<Schema>
) {
    const translatorFactory = translator(locales);
    const localeKeys = translatorFactory.localeKeys;
    const defaultTranslator = await translatorFactory.loadLocale(defaultLocale);

    const locale = writable(defaultLocale);

    const t = derived(
        [locale],
        ([locale], set) => {
            translatorFactory
                .loadLocale(locale)
                .then((translator) => set(translator));
        },
        defaultTranslator
    );

    return { locale, t, localeKeys };
}
