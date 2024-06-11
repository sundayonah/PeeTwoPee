import { extendTheme, ThemeConfig } from "@chakra-ui/react";

import Button from "./components/button";

export * from "./components/Icons";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  components: {
    Button,
  },
  colors: {
    transparent: "transparent",
    black: "#000",
    white: "#ffffff",
    brand: "#319EF6",
  },
  breakpoints: {
    "sm": "320px",
    "md": "768px",
    "lg": "960px",
    "xl": "1200px",
    "2xl": "1536px"
  },
});

export default theme;
