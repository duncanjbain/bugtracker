import React from 'react';
import { ThemeProvider } from 'styled-components';
// eslint-disable-next-line import/no-unresolved
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GlobalStyle, theme } from './ui/theme';
import UserLogin from './components/UserLogin';
import UserSignup from './components/UserSignup';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Switch>
          <Route path="/signup">
            <UserSignup />
          </Route>
          <Route path="/login">
            <UserLogin />
          </Route>
          <Route  path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
