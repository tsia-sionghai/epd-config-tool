// src/components/PageHeader.tsx
import React from 'react';
import { Alert, Box, Typography, styled } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import settingsIcon from '../assets/img_set.png';

const BrowserNote = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.primary.dark,
}));

const PageHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
      <Box display="flex" alignItems="center">
        <img
          src={settingsIcon}
          alt="Settings"
          style={{
            marginRight: '8px',
            width: '80px',
            height: '80px'
          }}
        />
        <Box>
          <Typography variant="h6" component="h6" sx={{ mb: 0, fontWeight: 'bold' }}>
            {t('common.title.main')}
          </Typography>
          <Alert 
            severity="info" 
            sx={{ 
              p: 0, 
              bgcolor: 'transparent', 
              fontSize: 0.75,
              '& .MuiAlert-icon': {  // 添加這個
                marginRight: '4px',  // 或是更小的值
              },
            }}
          >
            <BrowserNote>
              <Trans
                i18nKey="common.note.browserSupport"
                components={{
                  1: <strong key="chrome" />,
                }}
              />
            </BrowserNote>
          </Alert>
        </Box>
      </Box>
    </Box>
  );
};

export default PageHeader;
