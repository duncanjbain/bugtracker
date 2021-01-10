import React from 'react';
import { ThemeProvider } from 'styled-components';
// eslint-disable-next-line import/no-unresolved
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GlobalStyle, theme } from './ui/theme';
import UserLogin from './components/UserLogin';
import UserSignup from './components/UserSignup';

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Switch>
          <Route exact path="/signup">
            <UserSignup />
          </Route>
          <Route exact path="/login">
            <UserLogin />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
