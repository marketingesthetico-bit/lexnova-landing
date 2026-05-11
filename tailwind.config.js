/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#5BA478",
          dark: "#3D7A56",
          deep: "#2C5A40",
          soft: "#E8F2EC",
          tint: "#F3F8F5",
        },
        navy: {
          DEFAULT: "#0F2433",
          mid: "#1A3548",
          dark: "#081621",
        },
        ink: "#0F2433",
        muted: "#5B6B7A",
        cream: "#FAF9F6",
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        brand: "0 12px 30px -10px rgba(91, 164, 120, 0.45)",
        card: "0 8px 30px rgba(15, 36, 51, 0.08)",
        elevated: "0 24px 60px -20px rgba(15, 36, 51, 0.22)",
        soft: "0 4px 14px rgba(15, 36, 51, 0.06)",
      },
      backgroundImage: {
        "navy-gradient":
          "linear-gradient(135deg, #081621 0%, #0F2433 50%, #1A3548 100%)",
        "brand-gradient":
            "linear-gradient(135deg, #5BA478 0%, #3D7A56 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "draw-check": {
          "0%": { strokeDashoffset: "60" },
          "100%": { strokeDashoffset: "0" },
        },
        "draw-circle": {
          "0%": { strokeDashoffset: "300" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out forwards",
        "draw-check": "draw-check 0.5s ease-out 0.3s forwards",
        "draw-circle": "draw-circle 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
