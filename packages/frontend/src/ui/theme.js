const screenSize = {
    sm: '320px',
    md: '480px',
    lg: '768px',
    xl: '1024px',
    "2xl": '1536px'
  };

const theme = {
  media: {
    sm: `min-width: ${screenSize.sm}`,
    md: `min-width: ${screenSize.md}`,
    lg: `min-width: ${screenSize.lg}`,
    xl: `min-width: ${screenSize.xl}`,
    "2xl": `min-width: ${screenSize['2xl']}`,
  },
};

export default theme;
