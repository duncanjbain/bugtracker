import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from './AuthContext';
import { UserProvider } from './UserContext';
import client from '../apolloClient'

const AppProvider = ({ children }) =>

    <ApolloProvider client={client}>
      <AuthProvider>
        <UserProvider>{children}</UserProvider>
      </AuthProvider>
    </ApolloProvider>

export default AppProvider
