/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./resources/**/*.{vue,js,php}",
        "./node_modules/tw-elements/dist/js/**/*.js",
    ],
    theme: {
        extend: {},
    },
    plugins: [require("tw-elements/dist/plugin")],
};
