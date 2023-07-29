# moosmann-svelte

[![npm version](https://badge.fury.io/js/moosmann-svelte.svg)](https://badge.fury.io/js/moosmann-svelte)

Integrate moosmann into svelte

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

2. Create moosmann stores

```typescript
export const { locale, t, localeKeys } = await moosmannStores("en", {
    en: en,
    de: () => import("./locales/de"),
});
```

3. Use your created stores in your components

```Svelte
// [greeting.svelte]
<script lang="ts">
    import { t } from "./i18n";
</script>

<h1>{$t("greeting", "Moosmann")}</h1>
```

See [examples](/packages/moosmann-svelte/examples) for more!
