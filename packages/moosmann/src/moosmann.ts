import {
    callOrValue,
    get,
    type DynamicDefaultImport,
    type Get,
    type NestedKeyof,
    type NonObject,
    type ParametersOrValue,
    type DeepPartial,
} from "./utils";

export type GenericLocale = {
    [key: string]: NonObject | GenericLocale;
};

export type LocaleMap<Schema extends object> = Record<
    string,
    DynamicDefaultImport<Schema> | Schema
>;

export function translator<Schema extends GenericLocale>(
    locales: LocaleMap<Schema>
) {
    const localeKeys = Object.keys(locales);

    async function loadLocale(localeKey: string) {
        const loader = locales[localeKey];
        if (!loader) throw new Error("Unknown Locale");

        const locale =
            typeof loader === "function" ? (await loader()).default : loader;

        return function t<Key extends NestedKeyof<Schema>>(
            key: Key,
            ...params: ParametersOrValue<Get<Schema, Key>, []>
        ) {
            return callOrValue(get(locale, key), ...params);
        };
    }

    return {
        localeKeys,
        loadLocale,
    };
}

export function translatorWithFallback<Schema extends GenericLocale>(
    fallback: Schema,
    locales: LocaleMap<DeepPartial<Schema>>
) {
    const localeKeys = Object.keys(locales);

    async function loadLocale(localeKey: string) {
        const loader = locales[localeKey];
        if (!loader) throw new Error("Unknown Locale");

        const locale =
            typeof loader === "function" ? (await loader()).default : loader;

        return function t<Key extends NestedKeyof<Schema>>(
            key: Key,
            ...params: ParametersOrValue<Get<Schema, Key>, []>
        ) {
            const value = get(locale, key) ?? get(fallback, key);

            return callOrValue(value, ...params);
        };
    }

    return {
        localeKeys,
        loadLocale,
    };
}
