import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF204E",
        second: "#00224D",
      },
      backgroundImage: {
        main: "url('../../public/groot.jpg')",
        main2: "url('../../public/grooot.png')",
      },
    },
  },
  plugins: [],
};
export default config;
