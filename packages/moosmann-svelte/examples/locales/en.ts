import type { GenericLocale } from "moosmann";

export default {
    greeting: (name: string) => `Hello, ${name}!`,
} satisfies GenericLocale;
