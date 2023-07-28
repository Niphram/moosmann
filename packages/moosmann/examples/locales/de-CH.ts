import type en from "./en";

// import another locale
import de from "./de";

export default {
    // You can easily extend another locale! Make sure this spread appears at the top
    // Extending multiple locales is technically possible, but every spread operator will replace keys from the previous ones.
    ...de,

    // Keep in mind that the spread-operator has it's limitations. Overwriting deeply nested keys will be annoying
    // (I should probably write a utility-function for that... maybe later)
    navigation: {
        ...de.navigation,
        about: "I don't actually know swiss-german... forgive me",
    },

    greeting: (name) => `Grüezi ${name}!`,
} satisfies typeof en;
