/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand color palette
        cream: "#fefdf9",        // Background color (from logo background)
        maroon: "#993f3c",       // Primary brand color (from "RANJAYA" text)
        darkMaroon: "#761f1c",   // Darker shade for hover states
        darkBrown: "#4a3e3e",    // Text color (muted brown)
        lightPink: "#f5e8e8",    // Light accent (very light pink)
      },
      boxShadow: {
        'custom': '0 4px 6px rgba(153, 63, 60, 0.1)',
      },
      borderColor: {
        'maroon-20': 'rgba(153, 63, 60, 0.2)',
      },
    },
  },
  plugins: [],
}