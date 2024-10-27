// src/components/SDCardPathSettings.tsx
import React from 'react';
import { Box, Grid, TextField, Button, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HintMessage from './HintMessage';

interface SDCardPathSettingsProps {
  sdCardPath: string;
  setSdCardPath: (path: string) => void;
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: 'transparent',
    padding: 0,
    minWidth: '20px',
    width: 'fit-content',
    '&::before': {
      display: 'none',
    },
    '&::after': {
      display: 'none',
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
    },
  },
  '& .MuiInputBase-input': {
    padding: 0,
    color: theme.palette.text.primary,
    '&.Mui-disabled': {
      WebkitTextFillColor: theme.palette.text.primary,
      color: theme.palette.text.primary,
      cursor: 'default',
    },
  },
}));

const LabelWrapper = styled('span')({
  whiteSpace: 'nowrap', // 防止 SD Card Path 文字斷行
});

const PathSelectionContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2), // 16px 下方邊距
}));

const SDCardPathSettings: React.FC<SDCardPathSettingsProps> = ({
  sdCardPath,
  setSdCardPath,
}) => {
  const { t } = useTranslation();

  const handleSelectPath = async () => {
    try {
      if ('showDirectoryPicker' in window) {
        const dirHandle = await window.showDirectoryPicker({
          mode: 'read',
        });
        setSdCardPath(dirHandle.name);
      } else {
        alert('請使用 Chrome 瀏覽器以獲得完整功能支援');
      }
    } catch (err) {
      console.error('Error selecting directory:', err);
    }
  };

  return (
    <PathSelectionContainer sx={{ pl: 1, pr: 1}}>
      <Grid item xs={12}>
        <Box sx={{ 
          display: 'inline-flex', 
          alignItems: 'center',
          gap: 2,
        }}>
          <LabelWrapper>{t('common.label.sdCardPath')}</LabelWrapper>
          <StyledTextField
            variant="standard"
            value={sdCardPath}
            disabled
            inputProps={{
              style: {
                cursor: 'default',
              }
            }}
          />
          <Button 
            variant="basic"
            onClick={handleSelectPath}
            sx={{ 
              minWidth: 'auto',
              textWrap: 'nowrap',
            }}
          >
            {t('common.button.selectPath')}
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <HintMessage 
          type="error"
          message={t('common.hint.sdCardPathCheck')}
          typographySx={{ color: 'text.primary' }}
        />
      </Grid>
    </PathSelectionContainer>
  );
};

export default SDCardPathSettings;
