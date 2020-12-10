import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Route, Switch } from "react-router-dom";
import {GlobalStyle, theme } from "./ui/theme"
import AuthenticationButton from "./components/AuthenticationButton/AuthenticationButton";
import Home from './Home'


function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Switch>
      <Route path="/" exact component={Home} />
      </Switch>
      <ul>
        <AuthenticationButton />
      </ul>
    </ThemeProvider>

  );
}

export default App;
