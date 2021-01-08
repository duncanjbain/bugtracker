import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './ui/theme';
import UserLogin from './components/UserLogin';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <UserLogin />
    </ThemeProvider>
  );
}

export default App;
