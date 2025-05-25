// theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: {
      100: "#D4EDDA",
      500: "#28A745",
      900: "#155724",
    },
    secondary: {
      100: "#E2E8F0",
      500: "#3182CE",
      900: "#1A365D",
    },
    accent: {
      500: "#FFD700",
    },
  },
  styles: {
    global: {
      body: {
        bg: "#F7FFF7",
        color: "#155724",
      },
    },
  },
});

export default theme;
