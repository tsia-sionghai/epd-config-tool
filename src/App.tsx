import React from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import EPDConfigTool from './components/EPDConfigTool';
import theme from './theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <EPDConfigTool />
      </Container>
    </ThemeProvider>
  );
};

export default App;
