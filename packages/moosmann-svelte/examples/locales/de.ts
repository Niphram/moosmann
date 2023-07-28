import type en from "./en";

export default {
    greeting: (name) => `Hallo ${name}!`,
} satisfies typeof en;
