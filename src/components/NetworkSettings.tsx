// src/components/NetworkSettings.tsx
import React, { createRef } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { ModeType, NetworkConfig } from '../types/common';
import { shouldShowNetworkSettings } from '../utils/modeHelpers';
import WifiSelector from './WifiSelector';
import StaticIPFields from './StaticIPFields';
import FormField from './common/FormField';
import SelectorField from './common/SelectorField';
import { useTranslation } from 'react-i18next';

interface NetworkSettingsProps {
  mode: ModeType;
  config: NetworkConfig;
  onConfigChange: (updates: Partial<NetworkConfig>) => void;
  serverURL: string;
  setServerURL: (url: string) => void;
  errors: {  // 移除可選標記
    ssid?: string;
    password?: string;
    ip?: string;
    netmask?: string;
    gateway?: string;
    dns?: string;
    serverURL?: string;
  };
  fieldRefs: {  // 移除可選標記
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
  errors = {},
  // 提供完整的預設值
  fieldRefs = {
    ssid: createRef<HTMLInputElement>(),
    password: createRef<HTMLInputElement>(),
    ip: createRef<HTMLInputElement>(),
    netmask: createRef<HTMLInputElement>(),
    gateway: createRef<HTMLInputElement>(),
    dns: createRef<HTMLInputElement>(),
    serverURL: createRef<HTMLInputElement>()
  },
}) => {
  const { t } = useTranslation();

  if (!shouldShowNetworkSettings(mode)) {
    return null;
  }

  const handleFieldChange = (field: keyof NetworkConfig, value: string) => {
    onConfigChange({ ...config, [field]: value });
  };

  const staticIPErrors = {
    ip: errors.ip,
    netmask: errors.netmask,
    gateway: errors.gateway,
    dns: errors.dns
  };

  const staticIPRefs = {
    ip: fieldRefs.ip,
    netmask: fieldRefs.netmask,
    gateway: fieldRefs.gateway,
    dns: fieldRefs.dns
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
          <StaticIPFields
            config={config}
            onFieldChange={handleFieldChange}
            errors={staticIPErrors}
            fieldRefs={staticIPRefs}
          />
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
