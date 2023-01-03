/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-left": "fade-from-left 0.8s ease-in-out",
      },

      keyframes: () => ({
        "fade-from-left": {
          "0%": { opacity: "0", transform: "translateX(-500px)" },
          "100%": { opacity: "1", tranform: "translateX(0)" },
        },
      }),
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xxl: "1441px",
      },
    },
  },
  plugins: [],
};
