import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

export const theme = extendTheme(
  {
    colors: {
      primary: {
        50: "#f4f8f9",
        100: "#d5e2e9",
        200: "#b0cad6",
        300: "#84abbf",
        400: "#6b9bb2",
        500: "#4a84a0",
        600: "#2d7091",
        700: "#185a7b",
        800: "#154c68",
        900: "#0f374b",
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "yellow" })
);
