/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                gov: {
                    primary: "#9c1f6e", // The magenta/purple from the screenshot
                    secondary: "#1B365D", // Dark Blue often used in logos
                    accent: "#F26522", // Saffronish
                    text: "#333333"
                },
                primary: "#0F766E", // Keep original Teal as a secondary option or remove if clashing
            }
        },
    },
    plugins: [],
}
