import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        "vin-white": "#FEFAF6",
        "vin-pale": "#EADBC8",
        "vin-oat": "#DAC0A3",
        "vin-navy": "#102C57",
      },
      textColor: {
        "vin-white": "#FEFAF6",
        "vin-pale": "#EADBC8",
        "vin-oat": "#DAC0A3",
        "vin-navy": "#102C57",
      },
    },
  },
  plugins: [],
};
export default config;
