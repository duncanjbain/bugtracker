import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppProvider from './context/AppContext'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URI,
  }),
});

ReactDOM.render(
  <React.StrictMode>
  <AppProvider>
    <App />
  </AppProvider>,
  </React.StrictMode>,
  document.getElementById('root')
);
