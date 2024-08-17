/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "coin-balance-layer": "url('/layer.svg')",
        "center-layer": "url('/center-layer.jpg')",
        "coin-tap-bg": "url('/coin-tap-bg.svg')",
      },
      boxShadow: {
        // sm: "72px 69px 118px -33px rgba(203,16,172,1)",
      },
      keyframes: {
        fadeUp: {
          "0%": {
            opacity: "1",
            transform: "translate(-20%, -20%)",
          },
          "100%": {
            opacity: "0",
            transform: "translate(-50%, -100%)",
          },
        },
      },
      animation: {
        fadeUp: "fadeUp 1000ms ease-out forwards",
      },
    },
  },
  plugins: [],
};
