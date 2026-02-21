/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        primaryHover: "#1D4ED8",
        background: "#F9FAFB",
        accent: "#10B981",
        neutral: "#111827",
        border: "#E5E7EB",
      },
    },
  },
  plugins: [],
};
