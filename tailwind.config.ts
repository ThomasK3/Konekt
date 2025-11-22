import type { Config } from "tailwindcss";

export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        konekt: {
          cream: "#f5efe3",
          white: "#ffffff",
          black: "#212121",
          green: "#4a6953",
          pink: "#c872a4",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
