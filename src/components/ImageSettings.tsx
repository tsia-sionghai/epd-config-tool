import React, { useCallback, useState } from 'react';
import { Grid, Paper, Typography, Snackbar, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ModeType, ImageConfig, PowerModeType, TimeZoneType, SizeType } from '../types/common';
import SizeSelector from './SizeSelector';
import RotateSelector from './RotateSelector';
import IntervalSelector from './IntervalSelector';
import ImageSection from './ImageSection';
import SelectorField from './common/SelectorField';
import { checkImageResolution, getResolutionRequirement } from '../utils/imageUtils';

interface ImageSettingsProps {
  mode: ModeType;
  config: ImageConfig;
  onConfigChange: (updates: Partial<ImageConfig> | ((prev: ImageConfig) => ImageConfig)) => void;
  customer: string;
  powerMode: PowerModeType;
  timeZone: TimeZoneType;
}

const ImageSettings: React.FC<ImageSettingsProps> = ({
  mode,
  config = {
    size: '31.5',
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
  const [error, setError] = useState<string | null>(null);

  const handleSettingChange = useCallback(async (
    type: 'size' | 'rotate',
    newValue: string | number
  ) => {
    // 沒有圖片時直接更新設定
    if (config.images.length === 0) {
      onConfigChange({ [type]: newValue });
      return;
    }

    // 檢查每張圖片的解析度
    const invalidImages: string[] = [];
    const newConfig = {
      ...config,
      [type]: newValue
    };

    for (const image of config.images) {
      const isValid = await checkImageResolution(image, newConfig);
      if (!isValid) {
        invalidImages.push(image.name);
      }
    }

    if (invalidImages.length > 0) {
      const requirement = getResolutionRequirement(
        type === 'size' ? newValue as SizeType : config.size,
        type === 'rotate' ? newValue as number : config.rotate
      );
      
      setError(t('common.error.resolutionChangeInvalid', {
        files: invalidImages.join(', '),
        requirement,
        setting: t(`common.label.${type}`),
        value: type === 'size' ? newValue : `${newValue}°`
      }));
    } else {
      onConfigChange({ [type]: newValue });
    }
  }, [config, onConfigChange, t]);

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
                  onChange={(size) => handleSettingChange('size', size)}
                />
              </SelectorField>
            </Grid>

            <Grid item xs={12}>
              <SelectorField label={t('common.label.rotate')}>
                <RotateSelector
                  value={config.rotate}
                  onChange={(rotate) => handleSettingChange('rotate', rotate)}
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
                  customer={customer}
                  powerMode={powerMode}
                  timeZone={timeZone}
                />
              </SelectorField>
            </Grid>
          </Grid>
        </Paper>
      )}

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setError(null)}
          severity="error"
          variant="filled"
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ImageSettings;
