import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        panel: "0 20px 45px -24px rgba(15, 23, 42, 0.28)",
      },
      colors: {
        brand: {
          ink: "#112031",
          sky: "#E0F2FE",
          mint: "#D1FAE5",
          coral: "#FECACA",
          gold: "#FDE68A",
        },
      },
    },
  },
  plugins: [],
};

export default config;
