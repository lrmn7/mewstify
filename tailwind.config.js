/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'guppie-green': '#00f07e',
        'chinese-black': '#111112',
        'eerie-black': '#18181b',
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

