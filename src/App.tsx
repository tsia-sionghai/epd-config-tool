import React from 'react';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import EPDConfigTool from './components/EPDConfigTool.tsx';
import theme from './theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <EPDConfigTool />
      </Container>
    </ThemeProvider>
  );
};

export default App;
