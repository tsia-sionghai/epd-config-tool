// src/pages/BrowserNotSupported.tsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const BrowserNotSupported: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 3,
        p: 3,
      }}
    >
      <Typography variant="h4" component="h1" color="primary.dark">
        {t('common.error.browserNotSupportedTitle')}
      </Typography>
      
      <Typography color="text.primary">
        {t('common.error.browserNotSupportedDesc')}
      </Typography>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          href="https://www.google.com/chrome"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('common.button.downloadChrome')}
        </Button>
        <Button
          variant="contained"
          href="https://www.microsoft.com/edge"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('common.button.downloadEdge')}
        </Button>
      </Box>
    </Box>
  );
};

export default BrowserNotSupported;
