import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useUser } from './context/UserContext';
import Dashboard from './pages/Dashboard';
import { GlobalStyle, theme } from './ui/theme';
import UserLogin from './components/UserLogin';

function App() {
  const user = useUser();
  console.log('<App />', { user });
  return user ? (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Dashboard />
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <UserLogin />
    </ThemeProvider>
  );
}

export default App;
