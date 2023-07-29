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
        if (!loadedLocale) throw new Error("Unknown Locale");

        const locale =
            typeof loadedLocale === "function"
                ? (await loadedLocale()).default
                : loadedLocale;

        return function t<Key extends NestedKeyof<Schema>>(
            key: Key,
            ...params: ParametersOrValue<Get<Schema, Key>, []>
        ) {
            return callOrValue(get(locale, key), ...params);
        };
    }

    return {
        localeKeys: localeMapKeys,
        loadLocale,
    };
}
