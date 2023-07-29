# moosmann

i18n for typescript developers

> I'm currently developing this while doing other things because I wanted to have a simple system for localization. It is in no way ready to use in production and the API ~~may~~ will change on a whim.

## How to use

1. Create your locales:

```typescript
// [locales/en.ts]
export default {
    greeting: (name: string) => `Hello, ${name}!`,
};
```

```typescript
// [locales/de.ts]
import type en from "./en";

export default {
    greeting: (name) => `Hallo, ${name}!`,
} satisfies typeof en;
```

2. Construct an instance of moosmann

```typescript
export const i18n = moosmann({
    en: en,
    de: () => import("./locales/de"),
});
```

3. Load a locale and use it

```typescript
const t = await i18n.loadLocale("de");

const greeting = t("greeting", "Moosmann");
// => "Hallo, Moosmann!"
```

See [examples](/packages/moosmann/examples) for more!
