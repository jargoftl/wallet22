module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // adjust as needed
  theme: {
    extend: {
      backgroundImage: {
        "animated-gradient":
          "linear-gradient(-45deg, #00eff8, #f800b4, #ebf503, #02f6c1, #00eff8, #9400f8)",
      },
      backgroundSize: {
        400: "400% 400%",
      },
      keyframes: {
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "25%": { backgroundPosition: "100% 100%" },
          "50%": { backgroundPosition: "100% 50%" },
          "75%": { backgroundPosition: "500% 0%" },
          "100%": { backgroundPosition: "50% 50%" },
        },
      },
      animation: {
        "gradient-bg": "gradient 40s ease infinite",
      },
    },
  },
  plugins: [],
};
