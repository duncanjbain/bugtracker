import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { AuthProvider } from './AuthContext';
import { UserProvider } from './UserContext';
import client from '../apolloClient';

const AppProvider = ({ children }) => (
  <Router>
    <ApolloProvider client={client}>
      <AuthProvider>
        <UserProvider>
          <ToastProvider       placement='bottom-left'>{children}</ToastProvider>
        </UserProvider>
      </AuthProvider>
    </ApolloProvider>
  </Router>
);

export default AppProvider;
