import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n';
// import { LanguageContextProvider } from './Translation/LanguageContext.tsx';
// import LanguageSelect from "./Translation/LanguageSelect.tsx";



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <LanguageContextProvider> */}
      {/* <LanguageSelect /> */}
      <App />
    {/* </LanguageContextProvider> */}
  </React.StrictMode>,
)
