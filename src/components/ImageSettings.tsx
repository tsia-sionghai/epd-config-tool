// src/components/ImageSettings.tsx
import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ModeType, ImageConfig, PowerModeType, TimeZoneType } from '../types/common';
import SizeSelector from './SizeSelector';
import RotateSelector from './RotateSelector';
import IntervalSelector from './IntervalSelector';
import ImageSection from './ImageSection';
import SelectorField from './common/SelectorField';

interface ImageSettingsProps {
  mode: ModeType;
  config: ImageConfig;
  onConfigChange: (updates: Partial<ImageConfig> | ((prev: ImageConfig) => ImageConfig)) => void;
  // 新增需要的 props
  customer: string;
  powerMode: PowerModeType;
  timeZone: TimeZoneType;
}

const ImageSettings: React.FC<ImageSettingsProps> = ({
  mode,
  config = {
    size: '13.3',
    rotate: 0,
    interval: 180,
    images: []
  },
  onConfigChange,
  customer,
  powerMode,
  timeZone
}) => {
  const { t } = useTranslation();

  return (
    <>
      {mode !== 'cms' && (
        <Paper sx={{ p: 3, mb: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">
                {mode === 'auto' ? t('common.title.auto') : t('common.title.nasBinary')}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <SelectorField label={t('common.label.size')}>
                <SizeSelector
                  value={config.size}
                  onChange={(size) => onConfigChange({ size })}
                />
              </SelectorField>
            </Grid>

            <Grid item xs={12}>
              <SelectorField label={t('common.label.rotate')}>
                <RotateSelector
                  value={config.rotate}
                  onChange={(rotate) => onConfigChange({ rotate })}
                />
              </SelectorField>
            </Grid>

            <Grid item xs={12}>
              <SelectorField label={t('common.label.interval')}>
                <IntervalSelector
                  value={config.interval}
                  onChange={(interval) => onConfigChange({ interval })}
                  min={180}
                  max={3600}
                />
              </SelectorField>
            </Grid>

            <Grid item xs={12}>
              <SelectorField label={t('common.label.selectImage')} verticalAlign="flex-start">
                <ImageSection
                  mode={mode}
                  config={config}
                  onConfigChange={onConfigChange}
                  // 傳遞新增的 props
                  customer={customer}
                  powerMode={powerMode}
                  timeZone={timeZone}
                />
              </SelectorField>
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default ImageSettings;
