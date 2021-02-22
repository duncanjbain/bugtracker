import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useUser } from './context/UserContext';
import AuthenticatedApp from './AuthenticatedApp';
import { GlobalStyle, theme } from './ui/theme';
import UnauthenticatedApp from './UnauthenticatedApp';

function App() {
  const user = useUser();
  return user ? (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthenticatedApp />
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <UnauthenticatedApp />
    </ThemeProvider>
  );
}

export default App;
