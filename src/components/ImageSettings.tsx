// src/components/ImageSettings.tsx
import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ModeType, ImageConfig } from '../types/common';
import SizeSelector from './SizeSelector';
import RotateSelector from './RotateSelector';
import IntervalSelector from './IntervalSelector';
import ImageSection from './ImageSection';

interface ImageSettingsProps {
  mode: ModeType;
  config: ImageConfig;
  onConfigChange: (updates: Partial<ImageConfig> | ((prev: ImageConfig) => ImageConfig)) => void;
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

            <Grid item container alignItems="center" spacing={2}>
              <Grid item xs={2}>
                <Typography align="right">{t('common.label.size')}</Typography>
              </Grid>
              <Grid item xs={10}>
                <SizeSelector
                  value={config.size}
                  onChange={(size) => onConfigChange({ size })}
                />
              </Grid>
            </Grid>

            <Grid item container alignItems="center" spacing={2}>
              <Grid item xs={2}>
                <Typography align="right">{t('common.label.rotate')}</Typography>
              </Grid>
              <Grid item xs={10}>
                <RotateSelector
                  value={config.rotate}
                  onChange={(rotate) => onConfigChange({ rotate })}
                />
              </Grid>
            </Grid>

            <Grid item container alignItems="center" spacing={2}>
              <Grid item xs={2}>
                <Typography align="right">{t('common.label.interval')}</Typography>
              </Grid>
              <Grid item xs={10}>
                <IntervalSelector
                  value={config.interval}
                  onChange={(interval) => onConfigChange({ interval })}
                  min={180}
                  max={3600}
                />
              </Grid>
            </Grid>

            <ImageSection
              mode={mode}
              config={config}
              onConfigChange={onConfigChange}
            />
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default ImageSettings;
