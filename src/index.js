import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./context/AuthContext"; // ✅ Ensure AuthProvider is imported
import App from "./App";
import theme from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </AuthProvider>
);
