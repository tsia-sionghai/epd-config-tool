// src/components/ImageSection.tsx
import React, { useCallback, useState } from 'react';
import { Grid, useTheme, SxProps, Theme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HintMessage from './HintMessage';
import ImageUploader from './ImageUploader';
import CustomButton from './common/CustomButton';
import { ModeType, ImageConfig, ImageFile, PowerModeType, TimeZoneType } from '../types/common';
import { createEPosterPackage } from '../utils/zipUtils';

interface ImageSectionProps {
  mode: ModeType;
  config: ImageConfig;
  onConfigChange: (updates: Partial<ImageConfig> | ((prev: ImageConfig) => ImageConfig)) => void;
  sx?: SxProps<Theme>;
  customer: string;
  powerMode: PowerModeType;
  timeZone: TimeZoneType;
}

const ImageSection: React.FC<ImageSectionProps> = ({ 
  mode, 
  config,
  onConfigChange,
  sx,
  customer,
  powerMode,
  timeZone
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // 保持原有的 handleImagesChange
  const handleImagesChange = useCallback((newImages: ImageFile[] | ((prev: ImageFile[]) => ImageFile[])) => {
    if (typeof newImages === 'function') {
      onConfigChange(prevConfig => ({
        ...prevConfig,
        images: newImages(prevConfig.images)
      }));
    } else {
      onConfigChange({ images: newImages });
    }
  }, [onConfigChange]);

  // 修改下載處理函數
  const handleDownloadBinary = useCallback(async () => {
    try {
      setIsProcessing(true);
      setError(null);
      setProcessingStatus(t('common.status.preparing'));

      const configData = {
        Customer: customer,
        Mode: mode,
        PowerMode: powerMode,
        TimeZone: timeZone,
        SoftAP: "0",
        Path: "/sdcard/image/slideshow",
        Size: config.size,
        Rotate: config.rotate.toString(),
        Interval: config.interval.toString(),
        WifiSetting: "",
        ServerURL: "",
        PackageName: "",
        ActivityName: ""
      };

      const zipBlob = await createEPosterPackage(
        configData, 
        config.images,
        (status) => setProcessingStatus(t(status))
      );

      // 觸發下載
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ePoster.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

    } catch (err) {
      console.error('Download failed:', err);
      setError(t('common.error.downloadFailed'));
    } finally {
      setIsProcessing(false);
      setProcessingStatus('');
    }
  }, [customer, mode, powerMode, timeZone, config, t]);

  return (
    <>
      <Grid 
        item 
        container 
        alignItems="flex-start" 
        spacing={2}
        sx={sx}
      >
        <Grid item xs={12}>
          <ImageUploader 
            images={config.images}
            setImages={handleImagesChange}
            maxImages={10}
            size={config.size}
            rotate={config.rotate}
          />
        </Grid>
      </Grid>

      {mode === 'nas' && (
        <>
          <Grid item container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <CustomButton 
                onClick={handleDownloadBinary}
                fullWidth
                disabled={isProcessing}
              >
                {isProcessing 
                  ? processingStatus || t('common.status.processing')
                  : t('common.button.downloadBinary')
                }
              </CustomButton>
            </Grid>
          </Grid>

          {error && (
            <Grid item container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <HintMessage
                  type="error"
                  message={error}
                  typographySx={{ 
                    color: theme.palette.error.main
                  }}
                />
              </Grid>
            </Grid>
          )}

          <Grid item container spacing={2} sx={{ mt: 0 }}>
            <Grid item xs={12}>
              <HintMessage
                type="error"
                message={t('common.hint.downloadBinaryToNAS')}
                typographySx={{ 
                  color: theme.palette.text.primary
                }}
              />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default ImageSection;
