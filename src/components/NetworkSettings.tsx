// src/components/NetworkSettings.tsx
import React, { useEffect } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { NetworkSettingsProps, NetworkConfig, ModeType } from '../types/common';
import WifiSelector from './WifiSelector';
import StaticIPFields from './StaticIPFields';
import FormField from './common/FormField';
import SelectorField from './common/SelectorField';
import { validateField, ValidatableField, NetworkMode } from '../utils/networkValidators';
import { useTranslation } from 'react-i18next';

const NetworkSettings: React.FC<NetworkSettingsProps> = ({
  mode,
  config,
  onConfigChange,
  serverURL,
  setServerURL,
  errors = {},
  onErrorChange,
  fieldRefs
}) => {
  const { t } = useTranslation();

  // 根據模式設定 serverURL 的預設值
  useEffect(() => {
    if (mode === 'cms') {
      setServerURL('https://api.ezread.com.tw/schedule');
    } else if (mode === 'nas') {
      setServerURL('');
    }
  }, [mode, setServerURL]);

  // 轉換配置為驗證用的格式
  const configAsRecord: Record<string, string> = {
    wifi: config.wifi,
    ssid: config.ssid,
    password: config.password,
    ip: config.ip || '',
    netmask: config.netmask || '',
    gateway: config.gateway || '',
    dns: config.dns || '',
    serverURL: serverURL
  };

  // 新增模式轉換函數
  const getNetworkMode = (mode: ModeType): NetworkMode | undefined => {
    return mode === 'auto' ? undefined : mode;
  };

  const handleFieldChange = (field: keyof NetworkConfig, value: string) => {
    onConfigChange({ ...config, [field]: value });
    
    if (isValidatableField(field)) {
      const validationResult = validateField(
        t, 
        field, 
        value,
        configAsRecord,
        getNetworkMode(mode)
      );
      
      if (onErrorChange) {
        onErrorChange(field, validationResult);
      }

      if (validationResult && field in fieldRefs) {
        const ref = fieldRefs[field as keyof typeof fieldRefs];
        ref?.current?.focus();
      }
    }
  };

  const handleServerUrlChange = (value: string) => {
    setServerURL(value);
    const validationResult = validateField(
      t,
      'serverURL',
      value,
      configAsRecord,
      getNetworkMode(mode)
    );
    
    if (onErrorChange) {
      onErrorChange('serverURL', validationResult);
    }
  };

  // Type guard 函數
  const isValidatableField = (field: string): field is ValidatableField => {
    return ['wifi', 'ssid', 'password', 'ip', 'netmask', 'gateway', 'dns', 'serverURL'].includes(field);
  };

  // 只在非 auto 模式下顯示網路設定
  if (mode === 'auto') {
    return null;
  }

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
              onChange={(value) => handleFieldChange('wifi', value)}
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
            errors={{
              ip: errors.ip,
              netmask: errors.netmask,
              gateway: errors.gateway,
              dns: errors.dns
            }}
            fieldRefs={{
              ip: fieldRefs.ip,
              netmask: fieldRefs.netmask,
              gateway: fieldRefs.gateway,
              dns: fieldRefs.dns
            }}
          />
        )}

        {(mode === 'cms' || mode === 'nas') && (
          <Grid item xs={12}>
            <FormField
              label={t(`common.label.serverURL.${mode}`)}
              value={serverURL}
              onChange={handleServerUrlChange}
              error={errors.serverURL}
              placeholder={t(`common.placeholder.serverURL.${mode}`)}
              inputRef={fieldRefs.serverURL}
            />
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default NetworkSettings;
