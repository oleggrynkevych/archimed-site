import './App.css';
import {  BrowserRouter } from 'react-router-dom';
import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import AppContent from './AppContent/AppContent';


function App() {
  const client = new ApolloClient({
    uri: 'http://localhost:1337/graphql',
    cache: new InMemoryCache()
  })

  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <AppContent />
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
