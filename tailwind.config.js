/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: { sans: "Roboto Mono, monospace" },
    extend: {
      colors: { pizza: "#123456" },
    },
  },
  plugins: [],
};
