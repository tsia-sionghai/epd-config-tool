// src/components/PageHeader.tsx
import React from 'react';
import { Alert, Box, Typography, styled } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import settingsIcon from '../assets/img_set.png';
import { checkBrowserSupport } from '../utils/browserCheck';

const BrowserNote = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.primary.dark,
}));

const StyledAlert = styled(Alert)(() => ({
  padding: 0,
  backgroundColor: 'transparent',
  alignItems: 'flex-start',  // 改善對齊
  '& .MuiAlert-icon': {
    padding: 0,
    marginRight: '4px',
    marginTop: '3px',  // 微調圖示垂直位置
    '& svg': {
      width: 18,
      height: 18,
    }
  },
  '& .MuiAlert-message': {
    padding: 0,
  }
}));

const PageHeader: React.FC = () => {
  const { t } = useTranslation();
  const isSupportedBrowser = checkBrowserSupport();

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
          {!isSupportedBrowser && (
            <StyledAlert severity="info">
              <BrowserNote>
                <Trans
                  i18nKey="common.note.browserSupport"
                  components={{
                    1: <strong key="chrome" />,
                  }}
                />
              </BrowserNote>
            </StyledAlert>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PageHeader;
