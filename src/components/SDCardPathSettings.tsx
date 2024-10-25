// src/components/SDCardPathSettings.tsx
import React from 'react';
import { Box, Grid, Typography, TextField, Button, InputBase } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HintMessage from './HintMessage';
import theme from '../theme';

interface SDCardPathSettingsProps {
  sdCardPath: string;
  setSdCardPath: (path: string) => void;
  onSelectPath: () => void;
}

const SDCardPathSettings: React.FC<SDCardPathSettingsProps> = ({
  sdCardPath,
  setSdCardPath,
  onSelectPath,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Grid item xs={12} sx={{ ml: 1, mr: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography component="span" noWrap={true}>{t('common.label.sdCardPath')}</Typography>
          <TextField
            variant="standard"
            value={sdCardPath}
            placeholder="\\E"
            disabled
            fullWidth={false}  // 添加這行，防止全寬
            slotProps={{
              input: {
                style: {
                  padding: 0,
                  color: theme.palette.text.primary,
                },
              },
            }}
            sx={{
              // ml: 4,
              display: 'inline-flex', // 添加這行，確保只占用需要的空間
              '& .MuiInputBase-root': {
                width: 'fit-content', // 改用 fit-content
                background: 'transparent',
                display: 'inline-flex', // 添加這行
              },
              '& .MuiInputBase-input': {
                padding: 0,
                minWidth: '24px',
                width: 'fit-content', // 改用 fit-content
                opacity: 1,
                '-webkit-text-fill-color': theme.palette.text.primary,
                background: 'transparent',
              },
              '& .MuiInput-underline:before': { 
                content: 'none'
              },
              '& .MuiInput-underline:after': { 
                content: 'none'
              },
              '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                content: 'none'
              },
              '& .MuiInput-underline.Mui-disabled:before': {
                content: 'none'
              },
              '& .Mui-disabled': {
                opacity: 1,
                color: theme.palette.text.primary,
                cursor: 'default',
                '-webkit-text-fill-color': theme.palette.text.primary,
                background: 'transparent', // 確保禁用狀態下背景透明
              },
              // 額外確保所有層級都是透明的
              '& *': {
                background: 'transparent !important',
              }
            }}
          />
          <Button variant="basic" onClick={onSelectPath} sx={{ ml: 1 }}>
            {t('common.button.selectPath')}
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <HintMessage
          type="error"
          message={t('common.hint.sdCardPathCheck')}
          containerSx={{ mt: 1, mb: 2 }}
          typographySx={{ color: theme.palette.text.primary }}
        />
      </Grid>
    </>
  );
};

export default SDCardPathSettings;
