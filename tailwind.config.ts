import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

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
  },
  plugins: [],
} satisfies Config;
