// src/components/StaticIPFields.tsx
import React from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { NetworkConfig } from '../types/common';
import FormField from './common/FormField';

interface StaticIPFieldsProps {
  config: NetworkConfig;
  onFieldChange: (field: keyof NetworkConfig, value: string) => void;
  errors: {
    ip?: string;
    netmask?: string;
    gateway?: string;
    dns?: string;
  };
  fieldRefs: {
    ip: React.RefObject<HTMLInputElement>;
    netmask: React.RefObject<HTMLInputElement>;
    gateway: React.RefObject<HTMLInputElement>;
    dns: React.RefObject<HTMLInputElement>;
  };
}

const StaticIPFields: React.FC<StaticIPFieldsProps> = ({
  config,
  onFieldChange,
  errors = {},
  fieldRefs = {}
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Grid item xs={12}>
        <FormField
          label={t('common.label.ip')}
          value={config.ip}
          onChange={(value) => onFieldChange('ip', value)}
          error={errors.ip}
          placeholder={t('common.placeholder.ip')}
          inputRef={fieldRefs.ip}
        />
      </Grid>

      <Grid item xs={12}>
        <FormField
          label={t('common.label.netmask')}
          value={config.netmask}
          onChange={(value) => onFieldChange('netmask', value)}
          error={errors.netmask}
          placeholder={t('common.placeholder.netmask')}
          inputRef={fieldRefs.netmask}
        />
      </Grid>

      <Grid item xs={12}>
        <FormField
          label={t('common.label.gateway')}
          value={config.gateway}
          onChange={(value) => onFieldChange('gateway', value)}
          error={errors.gateway}
          placeholder={t('common.placeholder.gateway')}
          inputRef={fieldRefs.gateway}
        />
      </Grid>

      <Grid item xs={12}>
        <FormField
          label={t('common.label.dns')}
          value={config.dns}
          onChange={(value) => onFieldChange('dns', value)}
          error={errors.dns}
          placeholder={t('common.placeholder.dns')}
          inputRef={fieldRefs.dns}
        />
      </Grid>
    </>
  );
};

export default StaticIPFields;
