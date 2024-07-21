import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n/index.ts";
import { LanguageContextProvider } from "./context/LanguageContext.tsx";
// import LanguageSelect from "./Components/LanguageSelect.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguageContextProvider>
      {/* <LanguageSelect /> */}
      <App />
    </LanguageContextProvider>
  </React.StrictMode>
);
