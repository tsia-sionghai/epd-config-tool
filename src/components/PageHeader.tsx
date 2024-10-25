// src/components/PageHeader.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import settingsIcon from '../assets/img_set.png';

const PageHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      mb={2}
    >
      <img
        src={settingsIcon}
        alt="Settings"
        style={{
          marginRight: '8px',
          width: '80px',
          height: '80px'
        }}
      />
      <Typography variant="h6" component="h6">
        {t('common.title.main')}
      </Typography>
    </Box>
  );
};

export default PageHeader;
