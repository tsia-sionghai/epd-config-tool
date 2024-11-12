// src/components/BasicSettings.tsx
import React from 'react';
import { Paper, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ModeType, PowerModeType, TimeZoneType } from '../types/common';
import ModeSelector from './ModeSelector';
import PowerModeSelector from './PowerModeSelector';
import TimeZoneSelector from './TimeZoneSelector';
import FormField from './common/FormField';
import SelectorField from './common/SelectorField';

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

        <Grid item xs={12}>
          <FormField
            label={t('common.label.customer')}
            value={customer}
            onChange={setCustomer}
            error={customerError}
            placeholder={t('common.placeholder.enterCustomer')}
          />
        </Grid>

        <Grid item xs={12}>
          <SelectorField label={t('common.label.mode')}>
            <ModeSelector 
              value={mode} 
              onChange={setMode}
            />
          </SelectorField>
        </Grid>

        <Grid item xs={12}>
          <SelectorField label={t('common.label.powerMode')}>
            <PowerModeSelector 
              value={powerMode} 
              onChange={setPowerMode} 
            />
          </SelectorField>
        </Grid>

        <Grid item xs={12}>
          <SelectorField label={t('common.label.timeZone')}>
            <TimeZoneSelector 
              value={timeZone} 
              onChange={setTimeZone} 
            />
          </SelectorField>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BasicSettings;
