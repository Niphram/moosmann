import type { GenericLocale } from "moosmann";

// Locales are just simple objects and can contain anything you want!
export default {
    navigation: {
        home: "Home",
        about: "About us",
        settings: "Settings",
    },
    // Supports arrow-functions...
    greeting: (name: string) => `Hello, ${name}!`,
    // ...and regular functions
    unreadMessages(count: number) {
        if (count > 0) {
            return `You have ${numberWord(count)} unread ${
                count === 1 ? "message" : "messages"
            }!`;
        }

        return "You have no unread messages!";
    },
} satisfies GenericLocale; // This is not necessary

// You can even define functions to use in your messages!
function numberWord(n: number) {
    if (n < 10) {
        return [
            "zero",
            "one",
            "two",
            "three",
            "four",
            "five",
            "six",
            "seven",
            "eight",
            "nine",
        ][n];
    }

    return n;
}
