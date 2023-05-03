import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

export const theme = extendTheme(
  {
    colors: {
      colors: {
        gray: {
          "50": "#F4F4F1",
          "100": "#DFDFD8",
          "200": "#CACABE",
          "300": "#B6B6A5",
          "400": "#A1A18C",
          "500": "#8D8D72",
          "600": "#70705C",
          "700": "#545445",
          "800": "#38382E",
          "900": "#1C1C17",
        },
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "yellow" })
);
