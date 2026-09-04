import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";

import { ProductProvider } from "./context/productContext.jsx";
// import "@fortawesome/fontawesome-free/css/all.min.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider>
      <BrowserRouter>
        <ProductProvider>
          <App />
        </ProductProvider>
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>,
);
