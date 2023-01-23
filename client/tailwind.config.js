/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                "input-purple": "#f0effe",
                "placeholder-purple": "#bcb9fa",
                "signup-button": "#4c47bc",
                "signup-button-hover": "#2a2767",
            },
        },
    },
    plugins: [],
};