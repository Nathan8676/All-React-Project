/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    
    screens: {
      'sm': '480px',
      'mobile': '640px',
      'tablet': '768px',
      'laptop': '1024px',
      'desktop': '1280px',
    },
    extend: {
      colors: {
      cadetGray: "#A1A6B4",
      Rose: "#AB4E68",
      teaGreen: "#DCEAB2",
      oxfordBlue: "#03012C",
    },
    animation: {
      'slide-in-from-top': 'slideInFromTop 0.5s ease-out',
    },
    keyframes: {
      slideInFromTop: {
        '0%': {
          opacity: '0',
          transform: 'translateY(-50%)',
        },
        '100%': {
          opacity: '1',
          transform: 'translateY(0)',
        },
      },
    },
    },
  },
  plugins: [],
};
