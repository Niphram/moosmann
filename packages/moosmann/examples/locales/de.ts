// Import the types of another locale to use for typechecking
import type en from "./en";

export default {
    navigation: {
        home: "Home",
        about: "Über uns",
        settings: "Einstellungen",
    },
    greeting: (name) => `Hallo ${name}!`,
    unreadMessages: (count) => `Ungelesene Nachrichten: ${count}`,
} satisfies typeof en; // This will enable TS to check your locales!
