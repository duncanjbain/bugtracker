import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import {GlobalStyle, theme } from "./ui/theme"


function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ul>
        <li>Test</li>
      </ul>
    </ThemeProvider>

  );
}

export default App;
