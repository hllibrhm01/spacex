// const { fontFamily } = require("tailwindcss/defaultTheme")
// const plugin = require('tailwindcss/plugin')

const themesConfig = require("./themes.config.json")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        shake: {
          "0%, 100%": {
            transform: "none",
            animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
          },
          "25%": {
            transform: "translateX(-12.5%)",
            animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
          },
          "75%": {
            transform: "translateX(12.5%)",
            animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
          },
        },
      },
      animation: {
        "bounce-200": "bounce 1s infinite 200ms",
        "bounce-400": "bounce 1s infinite 400ms",
        shake: "shake 1s infinite",
      },
      transitionTimingFunction: {
        "in-sine": "cubic-bezier(0.12, 0, 0.39, 0)",
        "in-cubic": "cubic-bezier(0.32, 0, 0.67, 0)",
        "in-quint": "cubic-bezier(0.64, 0, 0.78, 0)",
        "in-circ": "cubic-bezier(0.55, 0, 1, 0.45)",
        "in-quad": "cubic-bezier(0.11, 0, 0.5, 0)",
        "in-quart": "cubic-bezier(0.5, 0, 0.75, 0)",
        "in-expo": "cubic-bezier(0.7, 0, 0.84, 0)",
        "in-back": "cubic-bezier(0.36, 0, 0.66, -0.56)",
        "out-sine": "cubic-bezier(0.61, 1, 0.88, 1)",
        "out-cubic": "cubic-bezier(0.33, 1, 0.68, 1)",
        "out-quint": "cubic-bezier(0.22, 1, 0.36, 1)",
        "out-circ": "cubic-bezier(0, 0.55, 0.45, 1)",
        "out-quad": "cubic-bezier(0.5, 1, 0.89, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-back": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "in-out-sine": "cubic-bezier(0.37, 0, 0.63, 1)",
        "in-out-cubic": "cubic-bezier(0.65, 0, 0.35, 1)",
        "in-out-quint": "cubic-bezier(0.83, 0, 0.17, 1);",
        "in-out-circ": "cubic-bezier(0.85, 0, 0.15, 1)",
        "in-out-quad": "cubic-bezier(0.45, 0, 0.55, 1)",
        "in-out-quart": "cubic-bezier(0.76, 0, 0.24, 1)",
        "in-out-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
        "in-out-back": "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
      },
      transitionProperty: {
        color: "color, text-decoration-color",
      },
      transitionDuration: {
        150: "150ms",
        250: "250ms",
        350: "350ms",
      },
      strokeWidth: {
        150: "1.5",
        250: "2.5",
      },
    },
  },
  experimental: "all",
  variants: {
    typography: ["dark"],
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
    require("@headlessui/tailwindcss"),
    require("daisyui"),
    require("flowbite/plugin"),
  ],
  daisyui: {
    themes: themesConfig.themes,
  },
}

/*
themes: [
  {
    custom: {
      primary: "#ec4899",
      secondary: "#60a5fa",
      accent: "#2dd4bf",
      neutral: "#6b7280",
      "base-100": "#374151",
      info: "#38bdf8",
      success: "#2dd4bf",
      warning: "#fdba74",
      error: "#f43f5e",
      // custom variables - optional
      "--rounded-box": "0.66rem", // border radius rounded-box utility class, used in card and other large boxes
      "--rounded-btn": "0.33rem", // border radius rounded-btn utility class, used in buttons and similar element
      "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
      "--animation-btn": "0.2s", // duration of animation when you click on button
      "--animation-input": "0.175s", // duration of animation for inputs like checkbox, toggle, radio, etc
      "--btn-text-case": "uppercase", // set default text transform for buttons
      "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
      "--border-btn": "1px", // border width of buttons
      "--tab-border": "1px", // border width of tabs
      "--tab-radius": "0.5rem", // border radius of tabs
    },
  },
  ...themesConfig.themes,
  ],
  },

*/