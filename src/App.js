import './App.css';
import {  BrowserRouter } from 'react-router-dom';
import React, { Suspense, useEffect, useState } from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, gql, useMutation} from '@apollo/client';
import AppContent from './AppContent/AppContent';
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { I18nextProvider } from 'react-i18next';
import i18n from "i18next";
import i18next from 'i18next';

const client = new ApolloClient({
  uri: 'https://strapi-app-urd2.onrender.com/graphql',
  cache: new InMemoryCache()
})

i18n
  .use(initReactI18next) 
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
   
    
    fallbackLng: "ua",
    detection: {
        order: [ 'path', 'cookie', 'htmlTag', 'localStorage', 'subdomain' ],
        caches: ['cookie'],
    },
    backend:{
        loadPath: '/assets/locales/{{lng}}/translation.json',
    }
});

const loadingMarkup = (
  <div></div>
)

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <I18nextProvider i18n={i18next}> 
            <Suspense fallback={loadingMarkup}>
              <AppContent />
            </Suspense>
        </I18nextProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
