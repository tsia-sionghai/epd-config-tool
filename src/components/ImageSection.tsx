// src/components/ImageSection.tsx
import React, { useCallback } from 'react';
import { Grid, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HintMessage from './HintMessage';
import ImageUploader from './ImageUploader';
import CustomButton from './common/CustomButton';
import { ModeType, ImageConfig } from '../types/common';

interface ImageSectionProps {
  mode: ModeType;
  config: ImageConfig;
  onConfigChange: (updates: Partial<ImageConfig> | ((prev: ImageConfig) => ImageConfig)) => void;
  sx?: any;
}

const ImageSection: React.FC<ImageSectionProps> = ({ 
  mode, 
  config,
  onConfigChange,
  sx 
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

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

  const handleDownloadBinary = useCallback(() => {
    console.log('Downloading binary...');
  }, []);

  return (
    <>
      <Grid 
        item 
        container 
        alignItems="flex-start" 
        spacing={2}
        sx={sx}
      >
        <Grid item xs={2}>
          <Typography align="right">{t('common.label.selectImage')}</Typography>
        </Grid>
        <Grid item xs={10}>
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
          <Grid item container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={2} />
            <Grid item xs={10}>
              <CustomButton 
                onClick={handleDownloadBinary}
                fullWidth
              >
                {t('common.button.downloadBinary')}
              </CustomButton>
            </Grid>
          </Grid>

          <Grid item container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={2} />
            <Grid item xs={10}>
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
