import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import ContextApi from "./context/ContextApi.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider>
      <BrowserRouter>
        <ContextApi>
          <App />
        </ContextApi>
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>,
);
