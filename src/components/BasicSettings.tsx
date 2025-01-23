// src/components/BasicSettings.tsx
import React, { useCallback } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ModeType, PowerModeType, TimeZoneType } from '../types/common';
import { validateBasicField } from '../utils/basicSettingsValidators';
import SelectorField from './common/SelectorField';
import FormField from './common/FormField';
import ModeSelector from './ModeSelector';
import PowerModeSelector from './PowerModeSelector';
import TimeZoneSelector from './TimeZoneSelector';
import UpdateIntervalField from './UpdateIntervalField';
import FormFieldWithUnit from './common/FormFieldWithUnit';

interface BasicSettingsProps {
  customer: string;
  setCustomer: (value: string) => void;
  customerError?: string;
  mode: ModeType;
  setMode: (mode: ModeType) => void;
  powerMode: PowerModeType;
  setPowerMode: (mode: PowerModeType) => void;
  timeZone: TimeZoneType;
  setTimeZone: (zone: TimeZoneType) => void;
  serverSyncInterval: string;
  setServerSyncInterval: (interval: string) => void;
  serverSyncIntervalError?: string;
  onErrorChange?: (field: string, error: string) => void;
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
  serverSyncInterval,
  setServerSyncInterval,
  serverSyncIntervalError,
  onErrorChange
}) => {
  const { t } = useTranslation();

  const handleCustomerChange = useCallback((value: string) => {
    setCustomer(value);
    if (onErrorChange) {
      const error = validateBasicField(t, 'customer', value);
      onErrorChange('customer', error);
    }
  }, [setCustomer, onErrorChange, t]);

  const handleIntervalChange = useCallback((value: string) => {
    setServerSyncInterval(value);
    if (onErrorChange) {
      const error = validateBasicField(t, 'serverSyncInterval', value);
      onErrorChange('serverSyncInterval', error);
    }
  }, [setServerSyncInterval, onErrorChange, t]);

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
            onChange={handleCustomerChange}
            error={customerError}
            placeholder={t('common.placeholder.enterCustomer')}
          />
        </Grid>

        <Grid item xs={12}>
          <SelectorField label={t('common.label.mode')}>
            <ModeSelector value={mode} onChange={setMode} />
          </SelectorField>
        </Grid>

        <Grid item xs={12}>
          <SelectorField label={t('common.label.powerMode')}>
            <PowerModeSelector value={powerMode} onChange={setPowerMode} />
          </SelectorField>
        </Grid>

        <Grid item xs={12}>
          <SelectorField label={t('common.label.timeZone')}>
            <TimeZoneSelector value={timeZone} onChange={setTimeZone} />
          </SelectorField>
        </Grid>

        {(mode === 'cms' || mode === 'nas') && (
          <Grid item xs={12}>
            {/* <SelectorField label={t('common.label.serverSyncInterval')}> */}
              {/* <UpdateIntervalField
                value={serverSyncInterval}
                onChange={handleIntervalChange}
                error={serverSyncIntervalError}
              /> */}
              <FormFieldWithUnit
                label={t('common.label.serverSyncInterval')}
                value={serverSyncInterval}
                onChange={handleIntervalChange}
                unit={t('common.unit.minutes')}
                hintMessage={t('common.hint.serverSyncIntervalMin')}
                maxValue={1440}
                minValue={0}
                width="145px"
                error={serverSyncIntervalError}
              />
            {/* </SelectorField> */}
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default BasicSettings;
