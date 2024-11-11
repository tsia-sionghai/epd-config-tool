// src/components/NetworkSettings.tsx
import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ModeType, NetworkConfig } from '../types/common';
import WifiSelector from './WifiSelector';
import FormField from './common/FormField';
import SelectorField from './common/SelectorField';

interface NetworkSettingsProps {
  mode: ModeType;
  config: NetworkConfig;
  onConfigChange: (updates: Partial<NetworkConfig>) => void;
  serverURL: string;
  setServerURL: (url: string) => void;
  errors?: {
    ssid?: string;
    password?: string;
    ip?: string;
    netmask?: string;
    gateway?: string;
    dns?: string;
    serverURL?: string;
  };
  fieldRefs?: {
    ssid: React.RefObject<HTMLInputElement>;
    password: React.RefObject<HTMLInputElement>;
    ip: React.RefObject<HTMLInputElement>;
    netmask: React.RefObject<HTMLInputElement>;
    gateway: React.RefObject<HTMLInputElement>;
    dns: React.RefObject<HTMLInputElement>;
    serverURL: React.RefObject<HTMLInputElement>;
  };
}

const NetworkSettings: React.FC<NetworkSettingsProps> = ({
  mode,
  config,
  onConfigChange,
  serverURL,
  setServerURL,
  nasURL,
  setNasURL,
  errors = {},
  fieldRefs = {},
}) => {
  const { t } = useTranslation();

  if (mode === 'auto') return null;

  const handleFieldChange = (field: keyof NetworkConfig, value: string) => {
    onConfigChange({ ...config, [field]: value });
  };

  return (
    <Paper sx={{ p: 3, mb: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">
            {mode === 'cms' ? t('common.title.cms') : t('common.title.nas')}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <SelectorField label={t('common.label.wifiSetting')}>
            <WifiSelector
              value={config.wifi}
              onChange={(value) => onConfigChange({ ...config, wifi: value })}
            />
          </SelectorField>
        </Grid>

        <Grid item xs={12}>
          <FormField
            label={t('common.label.ssid')}
            value={config.ssid}
            onChange={(value) => handleFieldChange('ssid', value)}
            error={errors.ssid}
            placeholder={t('common.placeholder.ssid')}
            inputRef={fieldRefs.ssid}
          />
        </Grid>

        {(config.wifi === 'wpa2Personal' || config.wifi === 'staticIP') && (
          <Grid item xs={12}>
            <FormField
              label={t('common.label.password')}
              value={config.password}
              onChange={(value) => handleFieldChange('password', value)}
              error={errors.password}
              placeholder={t('common.placeholder.password')}
              inputRef={fieldRefs.password}
            />
          </Grid>
        )}

        {config.wifi === 'staticIP' && (
          <>
            <Grid item xs={12}>
              <FormField
                label={t('common.label.ip')}
                value={config.ip}
                onChange={(value) => handleFieldChange('ip', value)}
                error={errors.ip}
                placeholder={t('common.placeholder.ip')}
                inputRef={fieldRefs.ip}
              />
            </Grid>

            <Grid item xs={12}>
              <FormField
                label={t('common.label.netmask')}
                value={config.netmask}
                onChange={(value) => handleFieldChange('netmask', value)}
                error={errors.netmask}
                placeholder={t('common.placeholder.netmask')}
                inputRef={fieldRefs.netmask}
              />
            </Grid>

            <Grid item xs={12}>
              <FormField
                label={t('common.label.gateway')}
                value={config.gateway}
                onChange={(value) => handleFieldChange('gateway', value)}
                error={errors.gateway}
                placeholder={t('common.placeholder.gateway')}
                inputRef={fieldRefs.gateway}
              />
            </Grid>

            <Grid item xs={12}>
              <FormField
                label={t('common.label.dns')}
                value={config.dns}
                onChange={(value) => handleFieldChange('dns', value)}
                error={errors.dns}
                placeholder={t('common.placeholder.dns')}
                inputRef={fieldRefs.dns}
              />
            </Grid>
          </>
        )}

        {mode === 'cms' && (
          <Grid item xs={12}>
            <FormField
              label={t('common.label.serverURL')}
              value={serverURL}
              onChange={setServerURL}
              error={errors.serverURL}
              placeholder={t('common.placeholder.serverURL')}
              inputRef={fieldRefs.serverURL}
            />
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default NetworkSettings;
