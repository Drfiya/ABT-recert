/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                navy: {
                    DEFAULT: '#003366',
                    50: '#e6ecf2',
                    100: '#b3c6d9',
                    200: '#809fbf',
                    300: '#4d79a6',
                    400: '#1a528c',
                    500: '#003366',
                    600: '#002952',
                    700: '#001f3d',
                    800: '#001429',
                    900: '#000a14',
                },
                abt: {
                    green: '#5B9A2F',
                    'green-light': '#7ab84d',
                    'green-dark': '#487a25',
                },
            },
        },
    },
    plugins: [],
};
