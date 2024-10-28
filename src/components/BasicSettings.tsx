// src/components/BasicSettings.tsx
import React from 'react';
import { 
  Paper, 
  Grid, 
  TextField, 
  Typography,
  FormHelperText, 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ErrorIcon from '@mui/icons-material/Error';
import { colors } from '../theme';  // 引入色彩常數
import { useTranslation } from 'react-i18next';

import { ModeType, PowerModeType, TimeZoneType } from '../types/common';
import ModeSelector from './ModeSelector';
import PowerModeSelector from './PowerModeSelector';
import TimeZoneSelector from './TimeZoneSelector';

// 自定義 TextField 樣式
const StyledTextField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    '&.Mui-error': {
      backgroundColor: colors.red20,  // 使用淺紅色背景
      '& fieldset': {
        borderColor: colors.red,  // 錯誤狀態的邊框顏色
      },
      '&:hover fieldset': {
        borderColor: colors.red,
      },
      '&.Mui-focused fieldset': {
        borderColor: colors.red,
      },
    },
  },
}));

// 自定義錯誤訊息的樣式
const ErrorMessage = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  color: colors.red,  // 使用紅色
  marginTop: theme.spacing(0.5),
}));

interface BasicSettingsProps {
  customer: string;
  setCustomer: (value: string) => void;
  customerError?: string;
  mode: ModeType;
  setMode: (value: ModeType) => void;
  powerMode: PowerModeType;
  setPowerMode: (value: PowerModeType) => void;
  timeZone: TimeZoneType;
  setTimeZone: (value: TimeZoneType) => void;
}

const BasicSettings: React.FC<BasicSettingsProps> = ({
  customer,
  setCustomer,
  customerError,
  mode,
  setMode,
  powerMode,
  setPowerMode,
  timeZone,
  setTimeZone,
}) => {
  const { t } = useTranslation();

  return (
    <Paper sx={{ p: 3, mb: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">{t('common.title.basic')}</Typography>
        </Grid>

        <Grid item container alignItems="center" spacing={2}>
          <Grid item xs={2}>
            <Typography align="right">{t('common.label.customer')}</Typography>
          </Grid>
          <Grid item xs={10}>
            <StyledTextField  // 使用自定義的 TextField
              value={customer}
              placeholder={t('common.placeholder.enterCustomer')} 
              onChange={(e) => setCustomer(e.target.value)}
              error={Boolean(customerError)}
              fullWidth
              size="small"
            />
            {customerError && (
              <ErrorMessage>
                <ErrorIcon fontSize="small" />
                <FormHelperText error>{customerError}</FormHelperText>
              </ErrorMessage>
            )}
          </Grid>
        </Grid>

        <Grid item container alignItems="center" spacing={2}>
          <Grid item xs={2}>
            <Typography align="right">{t('common.label.mode')}</Typography>
          </Grid>
          <Grid item xs={10}>
            <ModeSelector 
              value={mode} 
              onChange={setMode} 
              disabledModes={['nas']}  // 禁用 NAS 模式
            />
          </Grid>
        </Grid>

        <Grid item container alignItems="center" spacing={2}>
          <Grid item xs={2}>
            <Typography align="right">{t('common.label.powerMode')}</Typography>
          </Grid>
          <Grid item xs={10}>
            <PowerModeSelector value={powerMode} onChange={setPowerMode} />
          </Grid>
        </Grid>

        <Grid item container alignItems="center" spacing={2}>
          <Grid item xs={2}>
            <Typography align="right">{t('common.label.timeZone')}</Typography>
          </Grid>
          <Grid item xs={10}>
            <TimeZoneSelector value={timeZone} onChange={setTimeZone} />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BasicSettings;
