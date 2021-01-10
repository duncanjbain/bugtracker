import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import App from './App';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: 'no-cors',
  },
  link: new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URI,
  }),
  
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
