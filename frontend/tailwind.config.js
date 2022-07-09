/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        noteworthy: ["noteworthy", "monospace"],
        mono: ["Space Mono", "monospace"],
        sans: ["DM Sans", "sans-serif"],
      },
      colors: {
        "light-green": "#ACBC8A",
        "btn-green": "#588C7E",
      },
    },
  },
  plugins: [],
};
