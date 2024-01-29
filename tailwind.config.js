/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "node_modules/antd/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kanit: ["Sarabun", "sans-serif"],
      },
      width: {},
      height: {
        navbar: "4.375rem",
      },
      inset: {},
      translate: {},
      colors: {
        "primary-100": "#E1EFFE",
        "primary-600": "#1C64F2",
        "indigo-950": "#05004E",
        "slate-600": "#425166",
        "greys-blue-grey-900": "#151D48",
      },
    },
  },
  darkMode: "class",
  plugins: [require("flowbite/plugin")],
};
