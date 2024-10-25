// src/components/BasicSettings.tsx
import React from 'react';
import { Grid, Paper, Typography, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ModeType, PowerModeType, TimeZoneType } from '../types/common';
import ModeSelector from './ModeSelector';
import PowerModeSelector from './PowerModeSelector';
import TimeZoneSelector from './TimeZoneSelector';

interface BasicSettingsProps {
  customer: string;
  setCustomer: (value: string) => void;
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
            <TextField
              fullWidth
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              placeholder={t('common.placeholder.enterName')}
            />
          </Grid>
        </Grid>

        <Grid item container alignItems="center" spacing={2}>
          <Grid item xs={2}>
            <Typography align="right">{t('common.label.mode')}</Typography>
          </Grid>
          <Grid item xs={10}>
            <ModeSelector value={mode} onChange={setMode} />
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
