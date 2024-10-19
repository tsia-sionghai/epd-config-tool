import React from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import EPDConfigTool from './components/EPDConfigTool';

const theme = createTheme({
  // 自定義主題設置
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <EPDConfigTool />
      </Container>
    </ThemeProvider>
  );
};

export default App;
