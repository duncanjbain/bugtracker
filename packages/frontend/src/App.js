import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from "./ui/theme"


function App() {
  return (
    <ThemeProvider theme={theme}>
    </ThemeProvider>

  );
}

export default App;
