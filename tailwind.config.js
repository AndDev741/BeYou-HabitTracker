/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    screens: {
      xs: "200px",
      sm: "481px",
      ms: "600px",
      md: "769px",
      lg: "1000px",
      xl: "1281px",
      "2xl": "1536px",
    },
    prefix: "tw-",
    extend: {
      colors: {
        blueFont: "#0082E1",
      },
      border: {
        
      },
      boxShadow: {
        footerInputShadow: "0px 3.33333px 3.33333px rgba(0, 0, 0, 0.25)",
        navBtnShadow: "-1px 2px 5px 0px #f47d31",
      },
      borderRadius: {
        footerBorderR: "6px 0px 0px 6px",
      },
      fontFamily: {
        mainFont: "Inter, sans-serif",
      },
    },
  },
  plugins: [],
};