import { createGlobalStyle } from 'styled-components';
import reset from 'modern-css-reset';

const screenSize = {
  sm: '320px',
  md: '480px',
  lg: '768px',
  xl: '1024px',
  '2xl': '1536px',
};

export const theme = {
  media: {
    sm: `max-width: ${screenSize.sm}`,
    md: `max-width: ${screenSize.md}`,
    lg: `max-width: ${screenSize.lg}`,
    xl: `max-width: ${screenSize.xl}`,
    '2xl': `max-width: ${screenSize['2xl']}`,
  },
  colors: {
    white: 'hsl(0, 0%, 100%)',
    black: 'hsl(0, 0%, 4%)',
    light: 'hsl(0, 0%, 96%)',
    dark: 'hsl(0, 0%, 21%)',
    primary: 'hsl(171, 100%, 41%)',
    link: 'hsl(217, 71%, 53%)',
    info: 'hsl(204, 86%, 53%)',
    success: 'hsl(141, 53%, 53%)',
    warning: 'hsl(48, 100%, 67%)',
    danger: 'hsl(348, 100%, 61%)',
  },
};

export const GlobalStyle = createGlobalStyle`
${reset}

html {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
               Roboto, Oxygen-Sans, Ubuntu, Cantarell,
               "Helvetica Neue", sans-serif;
               font-size: min(max(1rem, 4vw), 22px);
}

`;
