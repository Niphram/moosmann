import {
    callOrValue,
    get,
    type DynamicDefaultImport,
    type Get,
    type NestedKeyof,
    type NonObject,
    type ParametersOrValue,
} from "./utils";

export type GenericLocale = {
    [key: string]: NonObject | GenericLocale;
};

export type LocaleMap<Schema extends object> = Record<
    string,
    DynamicDefaultImport<Schema> | Schema
>;

export function makeTranslator<Schema extends GenericLocale>(locale: Schema) {
    return function t<Key extends NestedKeyof<Schema>>(
        key: Key,
        ...params: ParametersOrValue<Get<Schema, Key>, []>
    ) {
        return callOrValue(get(locale, key), ...params);
    };
}

export type Translator<Schema extends GenericLocale> = ReturnType<
    typeof makeTranslator<Schema>
>;

/**
 * Constructs the moosmann instance.
 *
 * You can pass locales either directly or using a function that dynamically imports.
 *
 * @param localeMap all locales that may be loaded
 */
export function moosmann<Schema extends GenericLocale>(
    localeMap: LocaleMap<Schema>
) {
    const localeMapKeys = Object.keys(localeMap);

    async function loadLocale(localeKey: string) {
        const loadedLocale = localeMap[localeKey];
        if (!loadedLocale) throw new Error("[moosmann] unknown locale");

        const locale =
            typeof loadedLocale === "function"
                ? (await loadedLocale()).default
                : loadedLocale;

        return makeTranslator(locale);
    }

    function loadLocaleSync(localeKey: string) {
        const locale = localeMap[localeKey];
        if (!locale) throw new Error("[moosmann] unknown locale");
        if (typeof locale === "function")
            throw new Error("[moosmann] locale is async");

        return makeTranslator(locale);
    }

    return {
        localeKeys: localeMapKeys,
        loadLocale,
        loadLocaleSync,
    };
}
