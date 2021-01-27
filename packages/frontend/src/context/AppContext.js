import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { UserProvider } from './UserContext';
import client from '../apolloClient';

const AppProvider = ({ children }) => (
  <Router>
    <ApolloProvider client={client}>
      <AuthProvider>
        <UserProvider>{children}</UserProvider>
      </AuthProvider>
    </ApolloProvider>
  </Router>
);

export default AppProvider;
