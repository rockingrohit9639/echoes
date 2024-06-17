import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        dark: colors.black,
        background: colors.zinc["950"],
        primary: {
          DEFAULT: colors.white,
          foreground: colors.black,
        },
        border: colors.zinc["900"],
        warning: colors.amber["500"],
        success: colors.emerald["500"],
        error: colors.red["500"],
        muted: {
          DEFAULT: colors.zinc["900"],
          foreground: colors.zinc["500"],
        },
      },
    },
    keyframes: {
      fade: {
        from: { opacity: "0.10" },
        to: { opacity: "1" },
      },
      pulse: {
        "0%, 100%": { opacity: "1" },
        "50%": { opacity: ".5" },
      },
    },
    animation: {
      fade: "fade 1s linear infinite",
      pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    },
  },
  plugins: [animate, typography],
} satisfies Config;
