/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        // primarylight: "#F7EDE2",
        // primary: "#F5CAC3",
        // primarydark: "#F28482",
        // primaryaccent: "#F6BD60",
        // secondary: "#84A59D" #d8b4fe,

        primary_100: "#E0B1CB",
        primary_200: "#BE95C4",
        primary_300: "#9F86C0",
        primary_400: "#5E548E",
        primary_500: "#231942",
        primary_accent: "#d8b4fe",
      },
    },
  },
  plugins: [],
};
