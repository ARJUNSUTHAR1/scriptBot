const { nextui } = require("@nextui-org/react");


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-diagonal': 'linear-gradient(135deg, var(--tw-gradient-stops))', // 135deg for top-left to bottom-right
      },
      gradientColorStops: {
        'purple-dark': '#6a0dad',
        'lavender-light': '#e6e6fa', 
        'blue-soft': '#add8e6', 
        'white-soft': '#f8f8ff', 
      },
    },
  },
  plugins: [nextui()]
}

