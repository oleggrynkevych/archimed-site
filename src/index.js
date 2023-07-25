import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';



i18n
  .use(initReactI18next) 
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
   
    
    fallbackLng: "ua",
    detection: {
        order: [ 'cookie', 'path', 'htmlTag', 'localStorage', 'subdomain' ],
        caches: ['cookie'],
    },
    backend:{
        loadPath: '/assets/locales/{{lng}}/translation.json',
    }
});

const loadingMarkup = (
  <div></div>
)


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Suspense>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
