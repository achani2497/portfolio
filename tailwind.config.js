export default {
    darkMode: "class",
    content: ["./src/**/*.{astro,html,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                base: "var(--color-base)",
                surface: "var(--color-surface)",
                elevated: "var(--color-elevated)",

                lilac: {
                    500: "var(--color-lilac-500)",
                    600: "var(--color-lilac-600)",
                    700: "var(--color-lilac-700)"
                },

                text: {
                    primary: "var(--color-text-primary)",
                    secondary: "var(--color-text-secondary)",
                    muted: "var(--color-text-muted)"
                }
            },

            boxShadow: {
                neumorphic: "var(--shadow-neumorphic)",
                "neumorphic-inset": "var(--shadow-neumorphic-inset)",
                "neumorphic-hover": "var(--app-shadow-neumorphic-hover)"
            },

            borderRadius: {
                soft: "1rem"
            },

            fontFamily: {
                sans: ["Inter", "sans-serif"],
                display: ["Doto", "sans-serif"]
            }
        }
    },
    plugins: []
};