// src/components/SDCardPathSettings.tsx
import React from 'react';
import { Box, Grid, TextField, Button, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HintMessage from './HintMessage';

interface SDCardPathSettingsProps {
  sdCardPath: string;
  setSdCardPath: (path: string) => void;
  onDirectorySelect: (handle: FileSystemDirectoryHandle) => void;
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: 'transparent',
    padding: '8px 12px',
    minWidth: '20px',
    width: 'fit-content',
    height: '40px',
    borderRadius: '20px',
    border: `1px solid ${theme.palette.grey[500]}`, // 使用 darkGray (#A2ABB3)
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
    '&.Mui-disabled': {
      border: `1px solid ${theme.palette.grey[500]}`, // disabled 狀態下的 border 顏色
    },
  },
  '& .MuiInputBase-input': {
    padding: 0,
    height: '40px',
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
  onDirectorySelect,
}) => {
  const { t } = useTranslation();

  const handleSelectPath = async () => {
    try {
      if ('showDirectoryPicker' in window) {
        const dirHandle = await window.showDirectoryPicker({
          mode: 'readwrite',  // 改為 readwrite 以確保有寫入權限
        });
        setSdCardPath(dirHandle.name);
        onDirectorySelect(dirHandle);  // 新增這行
      } else {
        alert(t('common.error.browserNotSupported'));
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
